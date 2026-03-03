// 生成简单的PNG图标
// 运行: node scripts/generate-icons.js

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 简单的PNG生成器（生成带有锁图标的简单图像）
function createSimplePNG(size) {
  // PNG文件头
  const signature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
  
  // IHDR chunk
  const width = size
  const height = size
  const bitDepth = 8
  const colorType = 6 // RGBA
  const compression = 0
  const filter = 0
  const interlace = 0
  
  const ihdrData = [
    (width >> 24) & 0xff, (width >> 16) & 0xff, (width >> 8) & 0xff, width & 0xff,
    (height >> 24) & 0xff, (height >> 16) & 0xff, (height >> 8) & 0xff, height & 0xff,
    bitDepth, colorType, compression, filter, interlace
  ]
  
  const ihdrCrc = crc32(Buffer.from([0x49, 0x48, 0x44, 0x52, ...ihdrData]))
  const ihdr = [
    0, 0, 0, 13, // length
    0x49, 0x48, 0x44, 0x52, // "IHDR"
    ...ihdrData,
    (ihdrCrc >> 24) & 0xff, (ihdrCrc >> 16) & 0xff, (ihdrCrc >> 8) & 0xff, ihdrCrc & 0xff
  ]
  
  // 创建图像数据 - 简单的渐变紫色背景
  const rawData = []
  const primaryColor = [99, 102, 241] // #6366f1
  
  for (let y = 0; y < height; y++) {
    rawData.push(0) // filter byte
    for (let x = 0; x < width; x++) {
      // 简单的圆形图标
      const cx = width / 2
      const cy = height / 2
      const radius = width * 0.4
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      
      if (dist <= radius) {
        rawData.push(primaryColor[0], primaryColor[1], primaryColor[2], 255)
      } else {
        rawData.push(0, 0, 0, 0) // 透明
      }
    }
  }
  
  // 使用简单的zlib压缩（无压缩存储）
  const deflatedData = deflateRaw(Buffer.from(rawData))
  
  const idatCrc = crc32(Buffer.concat([Buffer.from([0x49, 0x44, 0x41, 0x54]), deflatedData]))
  const idatLen = deflatedData.length
  const idat = [
    (idatLen >> 24) & 0xff, (idatLen >> 16) & 0xff, (idatLen >> 8) & 0xff, idatLen & 0xff,
    0x49, 0x44, 0x41, 0x54, // "IDAT"
    ...deflatedData,
    (idatCrc >> 24) & 0xff, (idatCrc >> 16) & 0xff, (idatCrc >> 8) & 0xff, idatCrc & 0xff
  ]
  
  // IEND chunk
  const iendCrc = crc32(Buffer.from([0x49, 0x45, 0x4E, 0x44]))
  const iend = [
    0, 0, 0, 0, // length
    0x49, 0x45, 0x4E, 0x44, // "IEND"
    (iendCrc >> 24) & 0xff, (iendCrc >> 16) & 0xff, (iendCrc >> 8) & 0xff, iendCrc & 0xff
  ]
  
  return Buffer.from([...signature, ...ihdr, ...idat, ...iend])
}

// 简单的CRC32实现
function crc32(data) {
  let crc = 0xffffffff
  const table = []
  
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c
  }
  
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8)
  }
  
  return (crc ^ 0xffffffff) >>> 0
}

// 简单的deflate（存储模式）
function deflateRaw(data) {
  const chunks = []
  const chunkSize = 65535
  
  // zlib header
  chunks.push(0x78, 0x01)
  
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize)
    const isLast = (i + chunkSize >= data.length) ? 1 : 0
    
    chunks.push(isLast)
    chunks.push(chunk.length & 0xff, (chunk.length >> 8) & 0xff)
    chunks.push((~chunk.length) & 0xff, ((~chunk.length) >> 8) & 0xff)
    chunks.push(...chunk)
  }
  
  // Adler-32 checksum
  let a = 1, b = 0
  for (let i = 0; i < data.length; i++) {
    a = (a + data[i]) % 65521
    b = (b + a) % 65521
  }
  const adler = (b << 16) | a
  chunks.push((adler >> 24) & 0xff, (adler >> 16) & 0xff, (adler >> 8) & 0xff, adler & 0xff)
  
  return Buffer.from(chunks)
}

// 生成图标
const sizes = [16, 48, 128]
const publicDir = resolve(__dirname, '../public/icons')
const distDir = resolve(__dirname, '../dist/icons')

;[publicDir, distDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  
  sizes.forEach(size => {
    const png = createSimplePNG(size)
    const filename = `icon${size}.png`
    writeFileSync(resolve(dir, filename), png)
    console.log(`Generated ${filename} in ${dir}`)
  })
})

console.log('Icons generated successfully!')
