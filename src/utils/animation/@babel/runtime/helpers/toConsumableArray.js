var arrayWithoutHoles = require('./arrayWithoutHoles');
var iterableToArray = require('./iterableToArray');
var unsupportedIterableToArray = require('./unsupportedIterableToArray');
var nonIterableSpread = require('./nonIterableSpread');
function _toConsumableArray(r) {
    return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray;
