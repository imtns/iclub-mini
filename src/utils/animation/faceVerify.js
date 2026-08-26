Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.faceDetext = faceDetext;
exports.initFaceDetect = initFaceDetect;
exports.initialState = void 0;
exports.validFaceDetect = validFaceDetect;
exports.validFacePosition = validFacePosition;
exports.validFrontFace = validFrontFace;
exports.validLeftFace = validLeftFace;
exports.validRightFace = validRightFace;
exports.voiceSourceMap = exports.validState = void 0;
var voiceSourceMap = {
    kaca: '咔嚓',
    // complete: "拍摄完成",
    stay: '拍摄中请保持不动',
    // keepRight: "请保持不动准备拍摄左侧脸",
    // keepLeft: "请保持不动准备拍摄右侧脸",
    keepFront: '准备拍摄正脸请闭眼',
    lockEyes: '请平视摄像头',
    farther: '移远一点',
    closer: '移近一点',
    upper: '移上一点',
    lower: '移下一点',
    right: '移右一点',
    left: '移左一点',
    turnLeft: '左转一点',
    turnRight: '右转一点',
    readyTakeRight: '准备拍摄右侧脸请向左转动',
    readyTakeLeft: '准备拍摄左侧脸请向右转动'
};

/**
 * faceState {0|1|2} 0: 初始状态或没人脸；1: 人脸不合法；3: 人脸位置合法
 */
exports.voiceSourceMap = voiceSourceMap;
var initialState = {
    faceState: 0,
    playVoice: 'lockEyes'
};
exports.initialState = initialState;
var validState = {
    faceState: 2,
    playVoice: 'stay'
};
exports.validState = validState;
function validFaceDetect(_ref) {
    var result = _ref.result;
    var frame = _ref.frame;
    var faceDirection = _ref.faceDirection;
    var x = result.x;
    var y = result.y;
    if (x === -1 || y === -1) {
        return initialState;
    }
    var _validFacePosition = validFacePosition({
        result: result,
        frame: frame
    });
    var isValid = _validFacePosition.isValid;
    var playVoice = _validFacePosition.playVoice;
    if (!isValid) {
        return {
            faceState: 1,
            playVoice: playVoice
        };
    }
    // 正脸合法测试
    if (faceDirection === 'front') {
        var _validFrontFace = validFrontFace({
            result: result
        });
        var _isValid = _validFrontFace.isValid;
        var _playVoice = _validFrontFace.playVoice;
        var faceState = 2;
        if (!_isValid) {
            faceState = 1;
        }
        return {
            faceState: faceState,
            playVoice: _playVoice
        };
    }
    // 侧脸合法测试
    if (faceDirection === 'left') {
        var _validLeftFace = validLeftFace({
            result: result
        });
        var _isValid2 = _validLeftFace.isValid;
        var _playVoice2 = _validLeftFace.playVoice;
        var _faceState = 2;
        if (!_isValid2) {
            _faceState = 1;
        }
        return {
            faceState: _faceState,
            playVoice: _playVoice2
        };
    }
    if (faceDirection === 'right') {
        var _validRightFace = validRightFace({
            result: result
        });
        var _isValid3 = _validRightFace.isValid;
        var _playVoice3 = _validRightFace.playVoice;
        var _faceState2 = 2;
        if (!_isValid3) {
            _faceState2 = 1;
        }
        return {
            faceState: _faceState2,
            playVoice: _playVoice3
        };
    }
    return initialState;
}
function validFacePosition(_ref2) {
    var result = _ref2.result;
    var frame = _ref2.frame;
    var _result$detectRect = result.detectRect;
    var width = _result$detectRect.width;
    var height = _result$detectRect.height;
    var originX = _result$detectRect.originX;
    var originY = _result$detectRect.originY;
    var isValid = true;
    var playVoice = validState.playVoice;
    // 监测远近
    if (width / frame.width < 0.5) {
        playVoice = 'closer';
        isValid = false;
    }
    if (width / frame.width > 0.7) {
        playVoice = 'farther';
        isValid = false;
    }
    // 监测人脸区域在画面中
    if (originX < 0) {
        playVoice = 'right';
        isValid = false;
    }
    if (originX + width > frame.width) {
        playVoice = 'left';
        isValid = false;
    }
    if (originY < 0) {
        playVoice = 'lower';
        isValid = false;
    }
    if (originY + height > frame.height) {
        playVoice = 'upper';
        isValid = false;
    }
    return {
        isValid: isValid,
        playVoice: playVoice
    };
}
function validFrontFace(_ref3) {
    var result = _ref3.result;
    var playVoice = 'keepFront';
    var isValid = true;
    if (result.angleArray.pitch > 0.333 || result.angleArray.pitch < -0.333 || result.angleArray.roll > 0.333 || result.angleArray.roll < -0.333) {
        playVoice = 'lockEyes';
        isValid = false;
    }
    if (result.angleArray.yaw > 0.167) {
        playVoice = 'turnLeft';
        isValid = false;
    }
    if (result.angleArray.yaw < -0.167) {
        playVoice = 'turnRight';
        isValid = false;
    }
    return {
        isValid: isValid,
        playVoice: playVoice
    };
}
function validLeftFace(_ref4) {
    var result = _ref4.result;
    var playVoice = validState.playVoice;
    var isValid = true;
    if (result.angleArray.yaw < 0.333) {
        playVoice = 'turnLeft';
        isValid = false;
    }
    if (result.angleArray.yaw > 0.777) {
        playVoice = 'turnRight';
        isValid = false;
    }
    return {
        isValid: isValid,
        playVoice: playVoice
    };
}
function validRightFace(_ref5) {
    var result = _ref5.result;
    var playVoice = validState.playVoice;
    var isValid = true;
    if (result.angleArray.yaw > -0.333) {
        playVoice = 'turnRight';
        isValid = false;
    }
    if (result.angleArray.yaw < -0.777) {
        playVoice = 'turnLeft';
        isValid = false;
    }
    return {
        isValid: isValid,
        playVoice: playVoice
    };
}
function initFaceDetect() {
    return new Promise(function (resolve, reject) {
        uni.initFaceDetect({
            success: resolve,
            fail: reject
        });
    });
}
function faceDetext(frame, fail, success) {
    uni.faceDetect({
        frameBuffer: frame.data,
        width: frame.width,
        height: frame.height,
        enableAngle: true,
        success: success,
        fail: fail
    });
}
