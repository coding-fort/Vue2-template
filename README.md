### 项目首次启动

1. 安装依赖

```command
npm install
```

2. 启动项目

```
npm run serve
或
npm run dev

```

### 目录结构说明

```
    |--- node-modules               npm包
    |--- public                     vue-cli引用公共目录
    |    |---constant                 公共资源
    |    |   └─--server.js              后台接口配置文件
    |    |---favicon.ico              页面ICON
    |    └─--index.html               index.html
    └─--src                         开发目录
        |---assets                    静态资源
        |    |---css                    公共css样式
        |    └─--imgs                   图片
        |---components                全局组件
        |---mixins                    全局mixin
        |---modules                   业务模块
        |     |---system                系统模块
        |     └─--log                   日志模块
        |---utils                     工具库
        |    |---constant               公共
        |    |    └─--utils.js          公共工具
        |    |---request              axios 请求封装类
        |    |---storage              webStorage 存储封装
        |    └─--validator            表单校验封装
        |---App.vue                项目入口
        |---main.js                项目入口配置文件
        |---router.js              项目路由文件
        |---.env.development       开发环境配置
        |---.env.production        生产环境配置
        |---package.json           项目启动命令配置及依赖包版本管理文件
        |---README.md              项目说明文件
        └─--vue.config.js          项目打包配置文件

```
