function linear_interpolate(a, b, x) {
    return a * (1 - x) + b * x;
}

function cosine_interpolate(a, b, x) {
    ft = x * Math.PI
    f = (1 - Math.cos(ft)) * 0.5
    return a * (1 - f) + b * f
}

function smooth(dots) {
    for(var i = 1; i < (dots.length - 1); i++) {
        dots[i][1] = (dots[i - 1][1] + dots[i][1] + dots[i + 1][1]) / 3.0
    }
}



function drawLinearInterpolation(ctx, width, height) {
    Math.seedrandom("Foo");

    this.clear(ctx);

    var x;
    var dots = [];

    for(x = 0; x < width; x += 20) {
        var y = Math.random() * height;
        dots.push([x, y]);
    }

    smooth(dots);

    for(i = 0; i < dots.length; i++) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(dots[i][0], dots[i][1], 4, 4);
    }

    this.connectTheDots(dots, cosine_interpolate);

    ctx.restore();

}

function init() {
    new Canvas("linearInterpolationNoise").drawWithFunction(drawLinearInterpolation);
}

document.addEventListener("DOMContentLoaded", init, false);
