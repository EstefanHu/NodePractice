'use strict';
const express = require('express');

const app = express();

app.get('/many', (req, res) => {

})

app.get('/one', (req, res) => {

});

app.post('/create', (req, res) => {
  
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});