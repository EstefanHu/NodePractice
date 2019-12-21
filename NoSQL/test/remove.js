const assert = require('assert');
const User = require('../models/user');

describe('Deleting records', () => {

    let newUser;
    
    beforeEach(done => {
        newUser = new User({
            firstName: 'Justin',
            lastName: 'Hu'
        });

        newUser.save().then(() => {
            done();
        });
    });

    it('Deletes one record from the database', done => {
        User.findOneAndRemove({firstName: 'Justin'}).then(() => {
            User.findOne({firstName: 'Justin'}).then(result => {
                assert(result === null);
                done();
            });
        });
    });
});