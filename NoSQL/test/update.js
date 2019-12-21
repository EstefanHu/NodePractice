const assert = require('assert');
const User = require('../models/user');

describe('Update records', () => {

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

    it('Updates one record from the database', done => {
        User.findOneAndUpdate({firstName: 'Justin'}, {firstName: 'Benti'}).then(() => {
            User.findOne({_id: newUser._id}).then(result => {
                assert(result.firstName === 'Benti');
                done();
            });
        });
    });
});