## C端爱+小程序

### 首次安装

node版本: 14

```node
  npm install --legacy-peer-deps
```

### 本地开发(分两步)

#### 一、run

npm run test  启动

#### 二、打开"微信开发者工具"，然后打开dist/dev/mp-weixin目录

或者，如果你跟我一样懒，不妨试试下面的命令（注意需要新开一个terminal，不能中断第一步的运行）

```
npm run serve // 会自动打开"微信开发者工具"，并打开dist/dev/mp-weixin目录
```

### 打包发版

```
npm run build // 连线上环境，自动build并打开"微信开发者工具"
npm run build:test // 连test环境，自动build并打开"微信开发者工具"
```

### 打包后自动提交预览版

不是不行，vue-cli有提供相应命令，但是不建议使用，因为每次打包后，用开发者工具测试一遍再用开发者工具上传预览版比较靠谱~
