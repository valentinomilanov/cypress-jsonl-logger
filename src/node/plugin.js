import fs from 'fs'
import path from 'path'

export default function setupJsonlLogger(on, config) {
  let currentFile = null

  on('task', {
    jsonlLog(entry) {
      if (entry.type === 'START') {
        const safeName = entry.title.replace(/[<>:"/\\|?*]/g, '')
        const today = new Date()
        const yyyy = today.getFullYear()
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const dd = String(today.getDate()).padStart(2, '0')
        const dateFolder = `${yyyy}-${mm}-${dd}`

        currentFile = path.join(
          config.projectRoot,
          'cypress',
          'logs',
          dateFolder,
          `${safeName}.jsonl`
        )

        fs.mkdirSync(path.dirname(currentFile), { recursive: true })
        fs.writeFileSync(currentFile, '')
      }

      const { ts, type, spec, test, text, ...rest } = {
        ts: new Date().toISOString(),
        ...entry
      }

      const ordered = {
        ts,
        ...(spec !== undefined && { spec }),
        ...(test !== undefined && { test }),
        type,
        ...(text !== undefined && { text }),
        ...rest
      }

      fs.appendFileSync(currentFile, JSON.stringify(ordered) + '\n')
      return null
    }
  })
}