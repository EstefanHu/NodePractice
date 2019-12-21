const assert = require('assert');
const User = require('../models/user');

describe('Finding records', () => {
    
    beforeEach(done => {
        let user = new User({
            firstName: 'Estefan',
            lastName: 'Hu'
        });

        user.save().then(() => {
            assert(user.isNew === false);
            done();
        });
    });

    it('Finds one record from the database', done => {
        User.findOne({firstName: 'Estefan'}).then(result => {
            assert(result.firstName === 'Estefan');
            done();
        });
    });
});