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

## todo
#### 基本布局搭建