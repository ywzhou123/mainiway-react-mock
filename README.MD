# 曼威C2M项目 MOCK-API服务 前端Web页面

Mock服务目的在于前后端分离开发时，前端同学可以在Mock服务页面编辑已约定好的Api接口，实现模拟数据，不依赖于后端。
当需要接口联调时，只需要修改```config.js```中的后端接口地址即可。

(demo)[http://mw.mock.ywzhou.shop]

![](https://raw.githubusercontent.com/ywzhou123/mainiway-react-mock/master/demo/mock_demo_index.png)

![](https://raw.githubusercontent.com/ywzhou123/mainiway-react-mock/master/demo/mock_demo_api.png)

# 安装

```
    npm install
```

# 开发

```
    npm run watch
    npm run start
```

# 打包

```
    npm run build:dll
    npm run build
```

# 上传

修改sftp.sh中的远程主机信息
```
    npm run upload
```