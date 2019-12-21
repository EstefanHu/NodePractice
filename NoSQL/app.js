'use strict';
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connects to db creating if doesnt exist
const db = 'testaroo';
mongoose.connect(`mongodb://localhost/${db}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.once('open', () => {
    console.log(`connected has been established to ${db}`);
}).on('err', (err) => {
    console.log('Connection Error: ' + err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});