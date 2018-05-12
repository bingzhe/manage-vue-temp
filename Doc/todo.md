## complete

#### 引入sass
#### 引入eslint
``` js
//添加
"lintfix": "eslint --fix --ext .js,.vue src test/unit test/e2e/specs"
//使用fix
npm run lintfix
//vscode自动修复设置
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    { "language": "vue", "autoFix": true }
    ],
    "eslint.options": {
    "plugins": ["html"]
    }
```
#### 引入element-ui

element-ui版本2.3.7

#### 加载全局sass文件

每个组件里加载一个设置文件，而无需每次都将其显式导入如为所有组件全局使用 scss 变。安装`sass-resources-loader`

``` js
npm install sass-resources-loader --save-dev

//webpack规则
{
  loader: 'sass-resources-loader',
  options: {
    resources: path.resolve(__dirname, '../src/style/_variables.scss')
  }
}
//vue-cli中，修改build/utils.js
scss: generateLoaders('sass').concat(
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/style/_variables.scss')
    }
  }
),
```

## todo
#### 基本布局搭建