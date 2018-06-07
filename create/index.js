// 用来新建项目的脚本
// yarn new --[type] --[name]

const fs = require('fs');
const path = require('path');
const arguments = process.argv.splice(2);

let legalType = ['javaScript', 'css', 'idea']
let type = null;
let name = null;

arguments.forEach((item, index) => {
    let param = item.substring(2)
    if (index == 0 && legalType.some(son => son == param)) {
        type = param
    } else if (index == 1) {
        name = param
    } else {
        console.error(`${param}是非法参数格式`)
    }

})


if (name && type) {
    const targetDemoDir = path.join(__dirname, '../src/data/demo/', type, name)
    if (!fs.existsSync(targetDemoDir)) {
        //demo模板创建
        let originDemoJs = path.join(__dirname, './template/demo/index.js');
        let originDemoCss = path.join(__dirname, './template/demo/index.scss');
        let targetDemoJs = path.join(targetDemoDir, 'index.js');
        let targetDemoCss = path.join(targetDemoDir, 'index.scss');
        fs.mkdirSync(targetDemoDir);
        copyFileSync(targetDemoJs, originDemoJs)
        copyFileSync(targetDemoCss, originDemoCss)
        //文本模板创建
        let originText = path.join(__dirname, './template/text/index.js');
        let targetText = path.join(__dirname, '../src/data/text/', type, `${name}.js`);
        copyFileSync(targetText, originText)
    }else{
        console.log('文件夹已存在，请重新确认')
    }

} else {
    console.error('type或者name没有输入')
}


function copyFileSync (targetFile, originFile) {
    try {
        let data = fs.readFileSync(originFile);
        fs.writeFileSync(targetFile, data)
    } catch (error) {
        console.log('文件复制时出错')
        console.log(error)
    }

}

