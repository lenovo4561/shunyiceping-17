const fs = require('fs')
const path = require('path')

// 检查是否安装了 sharp 包
try {
  const sharp = require('sharp')

  const imagePath = path.join(
    __dirname,
    '..',
    'src',
    'assets',
    'img',
    'loading-bg.png'
  )
  const outputPath = path.join(
    __dirname,
    '..',
    'src',
    'assets',
    'img',
    'loading-bg.png'
  )

  if (!fs.existsSync(imagePath)) {
    console.error('错误: loading-bg.png 文件不存在')
    process.exit(1)
  }

  // 压缩图片，使用更高的压缩级别和调整尺寸
  sharp(imagePath)
    .resize(250, 542, {
      // 调整到设计宽度比例
      fit: 'cover'
    })
    .png({ quality: 50, compressionLevel: 9, palette: true })
    .toFile(outputPath.replace('.png', '_compressed.png'))
    .then(info => {
      console.log('✓ loading-bg.png 压缩成功！')
      console.log(`- 尺寸: ${info.width}x${info.height}`)
      console.log(`- 大小: ${(info.size / 1024).toFixed(2)} KB`)

      // 替换原文件
      fs.copyFileSync(outputPath.replace('.png', '_compressed.png'), outputPath)
      fs.unlinkSync(outputPath.replace('.png', '_compressed.png'))
      console.log('✓ 已替换原 loading-bg.png 文件')
    })
    .catch(err => {
      console.error('压缩失败:', err)
      process.exit(1)
    })
} catch (e) {
  console.log('需要安装 sharp 包来压缩图片')
  console.log('请运行: npm install sharp --save-dev')
  process.exit(1)
}
