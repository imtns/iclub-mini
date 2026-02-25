function _typeof(o) {
    module.exports = _typeof =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (o) {
                  return typeof o;
              }
            : function (o) {
                  return o && 'function' == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? 'symbol' : typeof o;
              };
    return _typeof(o);
}
module.exports = _typeof;
