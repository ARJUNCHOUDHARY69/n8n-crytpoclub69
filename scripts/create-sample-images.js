const fs = require('fs')
const path = require('path')

// Create a simple SVG image
function createSVGImage(filename, color, text) {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${color}"/>
    <text x="100" y="100" text-anchor="middle" fill="white" font-family="Arial" font-size="16">${text}</text>
  </svg>`
}

// Create sample images
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
const galleryDir = path.join(__dirname, '..', 'public', 'images', 'gallery')

// Ensure directory exists
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true })
}

// Create 10 sample images
for (let i = 1; i <= 10; i++) {
  const color = colors[i % colors.length]
  const svgContent = createSVGImage(`sample-${i}.svg`, color, `SAMPLE ${i}`)
  const filepath = path.join(galleryDir, `sample-${i}.svg`)
  fs.writeFileSync(filepath, svgContent)
  console.log(`Created: sample-${i}.svg`)
}

console.log('✅ Created 10 sample images in /public/images/gallery/')

