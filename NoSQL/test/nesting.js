const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Nesting records', () => {
    beforeEach(done => {
        mongoose.connection.collections.users.drop(() => {
            done();
        });
    });

    it('Creates a User with sub-documents', done => {
        let dan = new User({
            firstName: 'Daniel',
            lastName: 'Yager',
            posts: [{title: 'Name of the war', content: 'This is some content'}]
        });

        dan.save().then(() => {
            User.findOne({firstName: 'Daniel'}).then(record => {
                assert(record.posts.length === 1);
                done();
            });
        });
    });

    it('Adds a post to User', done => {
        let dan = new User({
            firstName: 'Daniel',
            lastName: 'Yager',
            posts: [{title: 'Name of the war', content: 'This is some content'}]
        });

        dan.save().then(() => {
            User.findOne({firstName: 'Daniel'}).then(record => {
                record.posts.push({title: 'Wise mans Fear', content: 'Wow he scared'});
                record.save().then(() => {
                    User.findOne({firstName: 'Daniel'}).then(record => {
                        assert(record.posts.length === 2);
                        done();
                    });
                });
            });
        });
    });
});