import type { SSRContext } from '@vue/server-renderer'
import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'
import type { Request } from 'express'
import manifest from 'ssr:manifest'
import template from 'ssr:template'

// @ts-ignore
import { createApp } from './main'

// export createApp
export { createApp } from './main'

type Manifest = Record<string, string[]>

function renderPreloadLink(file: string): string {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  }
  if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  }
  if (file.endsWith('.woff')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  }
  if (file.endsWith('.woff2')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  }
  if (file.endsWith('.gif')) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`
  }
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  }
  if (file.endsWith('.png')) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  }
  // TODO
  return ''
}

function renderPreloadLinks(modules: string[], ssr_manifest: Manifest): string {
  let links = ''
  const seen = new Set<string>()

  modules.forEach((id: string) => {
    const files = ssr_manifest[id]
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })

  return links
}

export async function render(req: Request): Promise<string> {
  const { app, router, head } = createApp()

  // set the router to the desired URL before rendering
  void router.push(req.originalUrl)

  // wait until router is ready
  await router.isReady()

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx: SSRContext = {}
  const appHtml = await renderToString(app, ctx)

  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(ctx.modules as string[], manifest)

  // render the head
  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)

  // inject the template
  return template
    .replace('<html', `<html${htmlAttrs}`)
    .replace('</head>', `${headTags}${preloadLinks}</head>`)
    .replace('<body', `<body${bodyAttrs}`)
    .replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)
}
