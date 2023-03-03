module.exports = {
    semi: false, // 没句句末不加';'号
    tabWidth: 4, // 一个 tab 键缩进相当于 4 个空格
    singleQuote: true, // 字符串用单引号
    printWidth: 150, // 长度超过100断行
    trailingComma: 'none', // 对象属性、方法最后一个加';'
    endOfLine: 'auto', // 自动换行
    htmlWhitespaceSensitivity: 'ignore', // 可以解决格式化的时候结尾>不对齐的情况
    arrowParens: 'avoid' // 当箭头函数中只有一个参数的时候可以忽略括弧
}
