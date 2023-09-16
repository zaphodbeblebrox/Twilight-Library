const mongoose = require('mongoose');
const dbAddress = '127.0.0.1';
const dbName = 'necronPuzzles';

mongoose
    .connect(`mongodb://${dbAddress}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Established connection to database!!!'))
    .catch((err) => console.log('Something went wrong, no souls detected :(', err));

require('../models/Puzzle');
