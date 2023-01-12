const cors = require('cors');
var express = require("express");
var app = express();
const path = require('path');
var apiRoute = require('./route/api_route');
var bodyParser = require('body-parser');
app.use(cors());

app.use(express.static(path.join(__dirname, 'views')));
app.use('/public', express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
global.APIKEY = "45054a175a5c72e05dc26fabdfad700d";
const PORT = 3000

app.get('/', (req, res) => {
    res.render('views/index.html');
})

app.use('/api', apiRoute)

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})
