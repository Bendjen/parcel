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

const targetPath = path.join(__dirname, '../src/data/demo/', type, name)
if (name && type) {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }
} else {
    console.error('type或者name没有输入')
}

