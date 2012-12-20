var InterpolationGraph;

;(function($) {

InterpolationGraph = function(containerId, optionContainerId) {
    // The reason to disable the copyright was that it is too large for the small
    // graphs I'm using. Giving credit in the blog posts I'm using JXG though.
    this.jxg = JXG.JSXGraph.initBoard(containerId,
        {boundingbox: [-10, 1, 10, 0], axis: true, showCopyright: false, showNavigation: false}
    );

    Util.invokeFunctionWithOptions(optionContainerId, this, this.draw);
}

InterpolationGraph.prototype = {

    clear: function() {
        if(typeof this.graph === "undefined") {
            return;
        }

        this.graph.remove();
    },

    draw: function(options) {
        this.clear();

        var random = new Random(options.seed);

        this.graph = this.jxg.create('functiongraph', [function(x) {
            var a = random.pickValueFor(x);
            var b = random.pickValueFor(x+1);
            var xx = x - Math.floor(x);

            return cosine_interpolate(a, b, xx);
            //return random.pickValueFor(x);
        },-10, 10]);
    }

}

})(jQuery);
