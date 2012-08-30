function Canvas(canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
}

Canvas.prototype = {

    drawWithFunction: function (drawFunction) {
        drawFunction.call(this, this.ctx, this.canvas.width, this.canvas.height);
    },

    clear: function (ctx) {
        ctx.save();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    },

    connectTheDots: function (dots, interpolationFunction) {
        for(var d = 0; d < (dots.length - 1); d++) {
            var a = dots[d];
            var b = dots[d + 1];
            var lastY = a[1];
            for(var i = 0; i <= 20; i++) {
                var y = interpolationFunction(a[1], b[1], i / 20.0);
                this.ctx.beginPath();
                this.ctx.moveTo(a[0] + i, lastY);
                this.ctx.lineTo(a[0] + i + 1, y);
                this.ctx.stroke();
                lastY = y;
            }
        }
    }

};
