const mongoose = require('mongoose');

// Connect to db before test run
before(done => {
    // Connects to db creating if doesnt exist
    const db = 'testaroo';
    mongoose.connect(`mongodb://localhost/${db}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    mongoose.connection.once('open', () => {
        console.log(`connected has been established to ${db}`);
        done();
    }).on('err', err => {
        console.log('Connection Error: ' + err);
        done();
    });
});

