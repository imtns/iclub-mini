var toPropertyKey = require('./toPropertyKey');
function _defineProperty(e, r, t) {
    if ((r = toPropertyKey(r)) in e) {
        Object.defineProperty(e, r, {
            value: t,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        e[r] = t;
    }
    return e;
}
module.exports = _defineProperty;
