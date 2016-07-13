const httpProxy = require('http-proxy');
const express = require('express');
const api = 'http://api.openweathermap.org';
const currentWeatherUrl = '/data/2.5/weather?q=';
const apiKey = '&APPID=7ee5c819e2fb6434658c07bb3b810158';

const app = express();
const proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    const location = req.query.location;
    proxyReq.path = currentWeatherUrl + location + apiKey;
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/currentWeather/', (req, res) => {
    proxy.web(req, res, {
        target: api,
    });
});

app.listen(3000, () => {
    console.log('all ears on 3000...');
});
