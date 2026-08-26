## C端用户四级查询小程序

### 首次

```
npm install
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

**提交审核时，因为小程序中包含需要资质才能用的AI相关功能，所以审核一般会被拒，此时，需要在OSS文件夹中，更改小程序配置文件"isShenHe",  将isShenHe 更改为true后提审，审核后将isShenHe还原**

oss配置文件地址：https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/config_test.json
