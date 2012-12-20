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

// Get the "red" value at the specified position
function getValueAt(data, x, y) {
    return data.data[((y*(data.width*4)) + (x*4))];
}

// Set values for all colors to the specified value
function setValueAt(data, x, y, value) {
    var i = ((y*(data.width*4)) + (x*4));
    data.data[i] = value;
    data.data[i+1] = value;
    data.data[i+2] = value;
    data.data[i+3] = 255;
}

function init() {
    //new Canvas("linearInterpolationNoise").drawWithFunction(drawInterpolation, '#linearInterpolationOptions');
    new InterpolationGraph("testy", "#linearInterpolationOptions");

    var c = document.getElementById('foobar');
    var ctx = c.getContext('2d');

    ctx.save();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.restore();

    var oldData = ctx.getImageData(0, 0, c.width, c.height);
    var newData = ctx.createImageData(oldData);

    /*for(var i=0; i<newData.data.length; i++) {
        newData.data[i] = Math.random() * 255;
    }*/

    var granularity = 25
    var r = new Random("foo");
    for(var x=0; x < c.width; x++) {
        for(var y=0; y < c.height; y++) {
            var val = 0;
            /*if((x%granularity) === 0 || (y%granularity) === 0) {
                val = r.pick2dValueFor(c.width, x/granularity, y/granularity);
            } else {*/
                var xx = x / granularity
                var yy = y / granularity

                var q11 = r.pick2dValueFor(c.width, xx, yy);
                var q21 = r.pick2dValueFor(c.width, xx+1, yy);
                var q12 = r.pick2dValueFor(c.width, xx, yy+1);
                var q22 = r.pick2dValueFor(c.width, xx+1, yy+1);

                var x1 = Math.floor(xx)
                var y1 = Math.floor(yy)
                var x2 = x1 + 1 //Math.ceil(xx)
                var y2 = y1 + 1 //Math.ceil(yy)

                val = q11 * (x2 - xx) * (y2 - yy) +
                    q21 * (xx - x1) * (y2 - yy) +
                    q12 * (x2 - xx) * (yy - y1) +
                    q22 * (xx - x1) * (yy - y1)

                /*console.log("x1", x1, "y1", y1, "x2", x2, "y2", y2, "xx", xx, "yy", yy)
                console.log("1", q11 * (x2 - xx) * (y2 - yy))
                console.log("2", q21 * (xx - x1) * (y2 - yy))
                console.log("3", q12 * (x2 - xx) * (yy - y1))
                console.log("4", q22 * (xx - x1) * (yy - y1))
                console.log("val", val)
                console.log('---')*/

            //}

            if(val < 0) {
                val = 0;
            } else if(val > 1) {
                val = 1;
            }

            setValueAt(newData, x, y, val*255)

        }
    }



    ctx.putImageData(newData, 0, 0);
}

document.addEventListener("DOMContentLoaded", init, false);
