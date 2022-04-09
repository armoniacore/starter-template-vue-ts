# Vite + Tailwind + Electron + SSR + SSG

## Quick Start

Make sure to have [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/) installed on your machine, then run:

```bash
# Clone this repository
$ git clone https://github.com/armoniacore/starter-template-vue-ts my-project

# Go into the repository
$ cd my-project

# Install dependencies
$ pnpm install

# Run the app in ssr
$ pnpm dev:ssr

# Run the app in electron
$ pnpm i electron electron-builder -D
$ pnpm dev:electron
```

Note: You can use your preferred package manager such as `yarn` or `npm`, however, make sure to read the [notes for electron-builder](#note-for-electron-builder).

## References

This template project uses:

- [Electron](http://electron.atom.io/)
- [Electron Builder](https://www.electron.build/)
- [Electron Packager](https://github.com/electron/electron-packager)
- [Vite](https://vitejs.dev/)

## Note for Electron-Builder

If you are using `pnpm` with `electron-builder`, make sure to adjust your `.npmrc` as noted in the official `electron-builder` [documentation](https://www.electron.build/index.html#note-for-pnpm), or use another package manager such as `yarn`.

```txt
// pick one of these
node-linker=hoisted
public-hoist-pattern=*
shamefully-hoist=true
```

Follow the ref: [#6389](https://github.com/electron-userland/electron-builder/issues/6289#issuecomment-1042620422) to explore more about this issue.

## Vite vue-ts Starter Template

This project has been initialized from the official vite template [vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts)

```bash
$ pnpm create vite starter-template-vue-ts -- --template vue-ts
```

So make sure to read the [vue-ts readme](https://github.com/vitejs/vite/blob/main/packages/create-vite/template-vue-ts/README.md) if you want to explore more about this starter template.

---

> [armonia](https://github.com/armoniacore/armonia-vite)
