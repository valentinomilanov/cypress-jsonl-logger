import fs from 'fs'
import path from 'path'

export default function setupJsonlLogger(on, config) {
  let currentFile = null

  on('task', {
    jsonlLog(entry) {
      if (entry.type === 'start') {
        const safeName = entry.title.replace(/[<>:"/\\|?*]/g, '')
        const today = new Date()
        const yyyy = today.getFullYear()
        const mm = String(today.getMonth() + 1).padStart(2,'0')
        const dd = String(today.getDate()).padStart(2,'0')
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

      fs.appendFileSync(
        currentFile,
        JSON.stringify({
          ts: new Date().toISOString(),
          ...entry
        }) + '\n'
      )

      return null
    }
  })
}
