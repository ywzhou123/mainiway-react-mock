var ip = '192.168.11.8',
    arrive = "/opt/mockweb",
    EasyFtp = require('easy-ftp'),
    path = require("path"),
    ftp = new EasyFtp(),
    config = {
        host: ip,
        port: 22,
        type: 'sftp',
        username: 'root',
        password: 'youshiker'
    },
    dir = path.join(__dirname, "dist/**");
ftp.connect(config);
ftp.upload(dir, arrive, function (err) {
    console.log(err);
    console.log("已经传输完成至 " + ip + ":" + arrive);
    ftp.close();
});

