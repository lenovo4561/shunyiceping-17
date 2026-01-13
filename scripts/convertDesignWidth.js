const fs = require('fs')
const path = require('path')

// 转换比例: 250 / 1080
const ratio = 250 / 1080

// 需要转换的文件列表
const files = [
  'src/app.ux',
  'src/pages/Ceping/index.ux',
  'src/pages/Changshi/index.ux',
  'src/pages/DemoDetail/index.ux',
  'src/pages/Fenlei/index.ux',
  'src/pages/TestResult/index.ux',
  'src/pages/Splash/index.ux',
  'src/pages/TestQuestions/index.ux',
  'src/pages/Mine/index.ux',
  'src/pages/QingshangTest/index.ux',
  'src/pages/Web/index.ux',
  'src/pages/Demo/index.ux',
  'src/widgets/CardDemo/index.ux',
  'src/pages/Main/index.ux',
  'src/pages/ChangshiDetail/index.ux'
]

function convertPxValue(match, value) {
  const originalValue = parseFloat(value)
  const newValue = Math.round(originalValue * ratio)
  return `${newValue}px`
}

function processFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath)

  if (!fs.existsSync(fullPath)) {
    console.log(`文件不存在: ${filePath}`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf8')
  let changeCount = 0

  // 匹配所有的 数字px 格式
  const newContent = content.replace(/(\d+(?:\.\d+)?)px/g, (match, value) => {
    changeCount++
    return convertPxValue(match, value)
  })

  if (changeCount > 0) {
    fs.writeFileSync(fullPath, newContent, 'utf8')
    console.log(`✓ ${filePath} - 转换了 ${changeCount} 个尺寸值`)
  } else {
    console.log(`- ${filePath} - 没有需要转换的尺寸值`)
  }
}

console.log('开始转换尺寸单位 (1080px -> 250px)...\n')
console.log(`转换比例: ${ratio.toFixed(4)}\n`)

files.forEach(file => {
  processFile(file)
})

console.log('\n转换完成！')
