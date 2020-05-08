require('dotenv').config();
const express = require('express');
const app = express();
// const logger = require('morgan');
// const bodyParser = require('body-parser');
// const cors = require('cors');




//middleware
// app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
//to parsee the body of incoming request (body-parser)
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(cors());





//error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err :{};
    const status = err.status || 500;


//respond to client
    res.status(status).json({
        error:{
            message:error.message
        }
    });

//respond to ourselves
    console.error(err);

});

app.use(express.static(__dirname + '/dist/'));
//handle SPA
app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));


module.exports = app;
