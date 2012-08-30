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



function drawInterpolation(ctx, width, height, options) {
    Math.seedrandom(options.seed);

    this.clear(ctx);

    var x;
    var dots = [];

    for(x = 0; x < width; x += 20) {
        var y = Math.random() * height;
        dots.push([x, y]);
    }

    if(options.smooth) {
        smooth(dots);
    }

    for(i = 0; i < dots.length; i++) {
        ctx.fillStyle = "rgb(80, 80, 80)";
        ctx.beginPath();
        // 2.5px dot radius (+1 on both coords for centering the dot on the coordinate)
        ctx.arc(dots[i][0]+1, dots[i][1]+1, 2.5, 0, Math.PI*2, false);
        ctx.fill();
    }


    switch(options.interpolation) {
        case 'linear':
            this.connectTheDots(dots, linear_interpolate);
            break;
        case 'cosine':
            this.connectTheDots(dots, cosine_interpolate);
            break;
        case 'none':
        default:
            // "None" - Don't connect the dots :)
    }

    ctx.restore();

}

function init() {
    new Canvas("linearInterpolationNoise").drawWithFunction(drawInterpolation, '#linearInterpolationOptions');
}

document.addEventListener("DOMContentLoaded", init, false);
