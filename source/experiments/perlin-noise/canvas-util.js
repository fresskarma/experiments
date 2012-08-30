var Canvas;

;(function($) {

Canvas = function (canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
}

Canvas.prototype = {

    drawWithFunction: function (drawFunction, optionsContainer) {
        var options = {};
        var that = this;

        var f = function() {
            drawFunction.call(that, that.ctx, that.canvas.width, that.canvas.height, that.determineOptions(optionsContainer));
        }

        if(typeof optionsContainer !== "undefined") {
            $(optionsContainer).find('input').each(function() {
                var obj = $(this);
                obj.click(f);
            });
        }

        f();
    },

    determineOptions: function(optionsContainer) {
        if(typeof optionsContainer === "undefined") {
            return {};
        }

        var options = {};
        $(optionsContainer).find('input').each(function() {
            var obj = $(this);
            options[obj.attr('name')] = obj.prop('checked');
        });

        return options;
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


})(jQuery);
