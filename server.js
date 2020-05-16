const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var morgan = require('morgan');
const app = express();


//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
var routes = require('./routes');
routes(app);

//daftarkan menu routes dari index
app.use('/auth', require('./middleware'));


app.listen(3000, () => {
    console.log('Server started on port 3000');
}); 

//nim 201701023
//nama mathias purwoko