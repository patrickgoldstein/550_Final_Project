const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//Route 1: 

app.get('/hello', routes.hello)

app.get('/question', routes.question)


//Route 2: 
app.get('/subject', routes.subject)

//Route 3: 
app.get('/userCorrectness', routes.userCorrectness)

//Route 4
app.get('/weaknessStrength', routes.weaknessStrength)

app.get('/grow', routes.growQuestions)







app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
