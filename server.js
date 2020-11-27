console.log("Server starting...");


const express = require('express');

//Setup App;

const app = express();
const server = app.listen(3000);
app.use(express.static('public'));
