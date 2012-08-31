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

        Math.seedrandom(options.seed);
        var data = [];
        for(var i=0; i<20; i++) {
            data.push(Math.random());
        }

        this.graph = this.jxg.create('functiongraph', [function(x){
            return Perlin.pickValueFor(data, x);
        },-10, 10]);
    }

}

})(jQuery);
