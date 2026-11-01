import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, sep, extname } from 'node:path'

const root = resolve('.output/public')
const base = '/kinship/'
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

await stat(root)
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname)
    if (pathname === '/kinship') {
      response.writeHead(301, { Location: base }).end()
      return
    }
    if (!pathname.startsWith(base)) {
      response.writeHead(404).end('Not found')
      return
    }
    let file = resolve(root, pathname.slice(base.length))
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end('Forbidden')
      return
    }
    let status = 200
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
      await stat(file)
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error
      // Pages serves the exported 404 shell for client-only deep links.
      file = resolve(root, '404.html')
      status = 404
    }
    const body = await readFile(file)
    response.writeHead(status, { 'Content-Type': contentTypes[extname(file)] || 'application/octet-stream' })
    response.end(body)
  } catch (error) {
    console.error('Static request failed:', error)
    response.writeHead(500).end('Static request failed')
  }
}).listen(3000, '127.0.0.1', () => console.log('Static showcase: http://127.0.0.1:3000/kinship/'))
