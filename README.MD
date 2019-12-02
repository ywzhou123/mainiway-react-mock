# 曼威C2M项目 MOCK-API服务 前端Web页面

    Mock服务目的在于前后端分离开发时，前端同学可以在Mock服务页面编辑已约定好的Api接口，实现模拟数据，不依赖于后端。

[demo](http://mock.ywzhou.shop)

![](https://raw.githubusercontent.com/ywzhou123/mainiway-react-mock/master/demo/mock_demo_index.png)

![](https://raw.githubusercontent.com/ywzhou123/mainiway-react-mock/master/demo/mock_demo_api.png)

# 安装

```
    npm install
```
# 配置

```
    webpack.config.js 修改后端接口地址 prefix，即django后端服务的接口，默认8000；
    server.js 启动的是node web服务，默认9999端口
```

# 开发

```
    nvm use 7.4.0
    npm run watch
    npm run start
```

# 打包

```
    npm run build:dll
    npm run build
```
# 访问

```
    http://localhost:9999
```

# 上传

修改sftp.sh中的远程主机信息
```
    npm run upload
```

# BUG
在node 10以上版本打包会有问题
nvm list
nvm use v7.4.0