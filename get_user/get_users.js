const request = require('request');

module.exports = function GetUsers(callback) {
    request.get('https://www.mysite.com/api/users', (err, res) => {
        if (!!callback) callback(JSON.parse(res.body));
    });
};
