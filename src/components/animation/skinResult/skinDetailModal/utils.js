Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.calcImagePos = calcImagePos;
function getRatio(faceSize, containerSize) {
    return Math.max(faceSize.width / containerSize.width, faceSize.height / containerSize.height);
}
var _wx$getSystemInfoSync = uni.getSystemInfoSync();
var windowWidth = _wx$getSystemInfoSync.windowWidth;
var defaultContainer = {
    width: 0.9 * windowWidth,
    height: 1.14 * windowWidth
};
function calcImagePos(faceSize, imageSize) {
    var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultContainer;
    var ratio = getRatio(faceSize, container);
    var center = {
        x: (faceSize.x + faceSize.width / 2) / ratio,
        y: (faceSize.y + faceSize.height / 2) / ratio
    };
    return {
        width: imageSize.width / ratio,
        height: imageSize.height / ratio,
        left: container.width / 2 - center.x,
        top: container.height / 2 - center.y
    };
}
