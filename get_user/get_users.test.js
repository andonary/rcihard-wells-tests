const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request');
const GetUsers = require('./get_users');

chai.should();
chai.use(sinonChai);

describe('GetUsers Tests', () => {
    let spy;

    beforeEach(() => {
        spy = sinon.spy();
        sinon.stub(request, 'get').callsFake((url, callback) => {
            callback({}, { body: JSON.stringify({ users: ['bob', 'marley'] }) });
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('calls the callback', () => {
        GetUsers(spy);
        spy.should.have.been.calledOnce;
    });

    it('calls the correct URL', () => {
        GetUsers(spy);
        request.get.should.have.been.calledWith('https://www.mysite.com/api/users');
    });

    it('returns the correct data', () => {
        GetUsers(spy);
        spy.should.have.been.calledWith({ users: ['bob', 'marley'] });
    });
});
