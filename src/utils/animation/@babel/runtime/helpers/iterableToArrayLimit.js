function _iterableToArrayLimit(r, e) {
    var l = null == r ? null : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
    if (null != l) {
        var t;
        var n;
        var i;
        var a;
        var u = [];
        var o = true;
        var f = false;
        try {
            i = (l = l.call(r)).next;
            if (0 === e) {
                if (Object(l) !== l) {
                    return;
                }
                o = false;
            } else {
                for (; !(o = (t = i.call(l)).done) && (u.push(t.value), u.length !== e); o = true) {}
            }
        } catch (r) {
            console.log('CatchClause', r);
            console.log('CatchClause', r);
//             r = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(r);
            f = true;
            n = r;
        } finally {
            try {
                if (!o && null != l.return && ((a = l.return()), Object(a) !== a)) {
                    return;
                }
            } finally {
                if (f) {
                    throw n;
                }
            }
        }
        return u;
    }
}
module.exports = _iterableToArrayLimit;
