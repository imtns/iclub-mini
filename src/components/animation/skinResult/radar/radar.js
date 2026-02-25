Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.drawRadar = drawRadar;
var mCount = 4;

//边数
var mCenter = 0;

//中心点
var mRadius = mCenter - 60;

//半径(减去的值用于给绘制的文本留空间)
var pointCount = 7;

//维度数量
var mAngle = (Math.PI * 2) / pointCount;

//角度
var mColorPolygon = '#B8B8B8';

//多边形颜色
var mColorLines = '#B8B8B8';

//顶点连线颜色
function drawRadar(ctx, data, size) {
    //安卓8.0.25以下部分手机ctx.canvas上没有clientWidth属性
    mCenter = size / 2;
    mRadius = mCenter - 60;
    drawPolygon(ctx);
    drawLines(ctx);
    drawText(ctx, data);
    drawRegion(ctx, data);
    drawCircle(ctx, data);
}
function drawPolygon(ctx) {
    ctx.save();
    ctx.strokeStyle = mColorPolygon;
    var r = mRadius / mCount;
    //单位半径
    //画6个圈
    for (var i = 0; i < mCount; i++) {
        ctx.beginPath();
        var currR = r * (i + 1);
        //当前半径
        ctx.arc(mCenter, mCenter, currR, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.restore();
}
function drawLines(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = mColorLines;
    for (var i = 0; i < pointCount; i++) {
        var x = mCenter + mRadius * Math.cos(mAngle * i - Math.PI / 2);
        var y = mCenter + mRadius * Math.sin(mAngle * i - Math.PI / 2);
        ctx.moveTo(mCenter, mCenter);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
}
var mColorText = '#A4A4AA';
var mColorNumber = '#2A2A2A';

//绘制文本
function drawText(ctx, mData) {
    var fontSize = mCenter / 12;
    var fontSizeNumber = 14;
    ctx.font = fontSize + 'px Microsoft Yahei';
    for (var i = 0; i < pointCount; i++) {
        var nAngle = mAngle * i - Math.PI / 2;
        var x = mCenter + mRadius * Math.cos(nAngle);
        var y = mCenter + mRadius * Math.sin(nAngle);
        //通过不同的位置，调整文本的显示位置
        if (nAngle === -Math.PI / 2) {
            x = x - ctx.measureText(mData[i][0]).width / 2;
            y -= 4;
        } else if (nAngle <= -Math.PI / 2 + (Math.PI * 2 * 1) / 7) {
            x += 4;
            y += fontSizeNumber / 2;
        } else if (nAngle <= -Math.PI / 2 + (Math.PI * 2 * 2) / 7) {
            x += 4;
            y += fontSizeNumber / 2 + 2;
        } else if (nAngle <= -Math.PI / 2 + (Math.PI * 2 * 3) / 7) {
            x -= ctx.measureText(mData[i][0]).width / 2;
            y += fontSizeNumber * 2 + 4;
        } else if (nAngle <= -Math.PI / 2 + (Math.PI * 2 * 4) / 7) {
            x -= ctx.measureText(mData[i][0]).width / 2;
            y += fontSizeNumber * 2 + 4;
        } else if (nAngle <= -Math.PI / 2 + (Math.PI * 2 * 5) / 7) {
            x = x - ctx.measureText(mData[i][0]).width - 4;
            y += 4;
        } else if (nAngle <= -Math.PI / 2 + (Math.PI * 2 * 6) / 7) {
            x = x - ctx.measureText(mData[i][0]).width - 4;
            y += 4;
        }
        ctx.save();
        ctx.fillStyle = mColorText;
        ctx.fillText(mData[i][0], x, y - fontSize);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = mColorNumber;
        ctx.font = fontSizeNumber + 'px Microsoft Yahei';
        ctx.fillText(mData[i][1], x, y + 2);
        ctx.restore();
    }
}
function drawRegion(ctx, mData) {
    ctx.save();
    ctx.beginPath();
    for (var i = 0; i < pointCount; i++) {
        var nAngle = mAngle * i - Math.PI / 2;
        var x = mCenter + (mRadius * Math.cos(nAngle) * mData[i][1]) / 100;
        var y = mCenter + (mRadius * Math.sin(nAngle) * mData[i][1]) / 100;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#FF6EB2';
    ctx.fillStyle = 'rgba(255, 110, 178, 0.05)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
function drawCircle(ctx, mData) {
    ctx.save();
    var r = 5;
    for (var i = 0; i < pointCount; i++) {
        var nAngle = mAngle * i - Math.PI / 2;
        var x = mCenter + (mRadius * Math.cos(nAngle) * mData[i][1]) / 100;
        var y = mCenter + (mRadius * Math.sin(nAngle) * mData[i][1]) / 100;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6EB2';
        ctx.fill();
    }
    ctx.restore();
}
