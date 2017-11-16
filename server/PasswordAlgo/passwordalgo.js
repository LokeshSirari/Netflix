var md5 = require('md5');

exports.passwordAlgo = function (password) {

    return md5(password);
}
