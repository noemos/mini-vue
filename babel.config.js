//告诉babel以我当前的node版本为基础作为转换
module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',],
};