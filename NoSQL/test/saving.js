const assert = require('assert');
const User = require('../models/user');

describe('Saving records', () => {
    it('Saving a record to the database', done => {
        let user = new User({
            firstName: 'Estefan',
            lastName: 'Hu'
        });

        user.save().then(() => {
            assert(user.isNew === false);
        });

        done();
    });
});