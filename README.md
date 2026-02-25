## 爱+小程序demo版



### node版本：14.20.0

### 首次安装

```
npm ci
```

### 本地开发(分两步)

#### 一、run

npm run test // test环境

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
