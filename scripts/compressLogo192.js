const fs = require('fs');
const path = require('path');

// 检查是否安装了 sharp 包
try {
  const sharp = require('sharp');
  
  const logoPath = path.join(__dirname, '..', 'src', 'assets', 'images', 'logo.png');
  const outputPath = path.join(__dirname, '..', 'src', 'assets', 'images', 'logo.png');
  
  if (!fs.existsSync(logoPath)) {
    console.error('错误: logo.png 文件不存在');
    process.exit(1);
  }
  
  // 压缩并调整大小为 192x192
  sharp(logoPath)
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outputPath.replace('.png', '_192.png'))
    .then(info => {
      console.log('✓ Logo 压缩成功！');
      console.log(`- 尺寸: ${info.width}x${info.height}`);
      console.log(`- 大小: ${(info.size / 1024).toFixed(2)} KB`);
      console.log(`- 输出文件: ${outputPath.replace('.png', '_192.png')}`);
      
      // 替换原文件
      fs.copyFileSync(outputPath.replace('.png', '_192.png'), outputPath);
      fs.unlinkSync(outputPath.replace('.png', '_192.png'));
      console.log('✓ 已替换原 logo.png 文件');
    })
    .catch(err => {
      console.error('压缩失败:', err);
      process.exit(1);
    });
    
} catch (e) {
  console.log('需要安装 sharp 包来压缩图片');
  console.log('请运行: npm install sharp --save-dev');
  console.log('\n如果不想安装 sharp，请手动将 logo.png 调整为 192x192 分辨率');
  process.exit(1);
}
