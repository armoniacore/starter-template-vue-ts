import { contextBridge } from 'electron'
import * as fs from 'node:fs'

contextBridge.exposeInMainWorld('fs', {
  readSettings() {
    return JSON.parse(fs.readFileSync('./settings.json', 'utf8')) as Record<string, any>
  }
})
