const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    webpack = require('webpack'),
    port = process.argv.splice(2)[0] || process.env.PORT || 9999,
    app = express();
    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.all('*', function (request, response, nextStep) {
    response.header("Access-Control-Allow-Origin", "*");
    response.sendFile(path.resolve(__dirname, 'dist/index.html'))
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop!`)
});