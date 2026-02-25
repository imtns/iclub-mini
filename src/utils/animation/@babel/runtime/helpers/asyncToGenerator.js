function asyncGeneratorStep(n, e, r, t, o, a, c) {
    try {
        var i = n[a](c);
        var u = i.value;
    } catch (n) {
        console.log('CatchClause', n);
        console.log('CatchClause', n);
//         n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
        return void r(n);
    }
    if (i.done) {
        e(u);
    } else {
        Promise.resolve(u).then(t, o);
    }
}
function _asyncToGenerator(n) {
    return function () {
        var that = this;
        var r = arguments;
        return new Promise(function (t, o) {
            var a = n.apply(that, r);
            function c(n) {
                asyncGeneratorStep(a, t, o, c, i, 'next', n);
            }
            function i(n) {
                asyncGeneratorStep(a, t, o, c, i, 'throw', n);
            }
            c(void 0);
        });
    };
}
module.exports = _asyncToGenerator;
