const assert = require('assert');
const User = require('../models/user');

describe('Finding records', () => {

    let newUser;
    
    beforeEach(done => {
        newUser = new User({
            firstName: 'Estefan',
            lastName: 'Hu'
        });

        newUser.save().then(() => {
            assert(newUser.isNew === false);
            done();
        });
    });

    it('Finds one record from the database', done => {
        User.findOne({firstName: 'Estefan'}).then(result => {
            assert(result.firstName === 'Estefan');
            done();
        });
    });

    it('Finds one record by ID from the database', done => {
        User.findOne({_id: newUser._id}).then(result => {
            assert(result._id.toString() === newUser._id.toString());
            done();
        });
    });
});