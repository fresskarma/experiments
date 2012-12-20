var Random;

;(function() {

Random = function(seed) {
    // Initialize our number generator without affecting the currently existing one
    var randomBackup = Math.random;
    Math.seedrandom(seed);
    this.randomGenerator = Math.random;
    Math.random = randomBackup;

    // The initial size of our random "table"
    this.size = 0;

    // The size by which we increment the table if a non-generated number is accessed
    this.incrementSize = 100;

    // Our random table
    this.randomTable = [ ];

    // Fill the table
    this.generate(this.incrementSize);

}

Random.prototype = {

    /**
     * Generates an arary of "size" pseudo-random numbers based on the given "seed", i.e. when
     * passing the same seed to this function, the sequence of random numbers will always
     * be the same.
     */
    generate: function(size) {
        console.log("generating", size);
        var r, i;

        for(i=0; i < size; i++) {
            this.randomTable.push(this.randomGenerator());
        }

        this.size += size;
    },

    /**
     * Returns the value out of an array of random values ("randoms") that corresponds to
     * the value "x" in a 2-dimensional coordinate system, assuming that the random values
     * are assigned to a positive and a negative value in an alternating fashion, e.g. if
     * we had the following array of random values:
     *
     *      [8, 1, 3, 8, 6, 0, 4, 7]
     *
     * The first value corresponds to 0 in our coordinate system, the 2nd corresponds to 1,
     * the 3rd to -1 and so on:
     *
     *      [ [0, 8], [1, 1], [-1, 3], [2, 8], [-2, 6], [3, 0], [-3, 4], [4, 7] ]
     *
     * Note that this function assumes integer input for x.
     */
    pickValueFor: function(x) {
        var i, diff;

        x = Math.floor(x);

        if(x === 0) { i = 0 }
        else if(x > 0) { i = 2*x - 1 }
        else if(x < 0) { i = 2 * Math.abs(x) }
        else { return x } // Not an integer :(

        // Increase the size of our random table if a non-generated value is accessed
        if(i > this.size) {
            diff = (i - this.size) + this.incrementSize ;
            this.generate(diff);
        }

        return this.randomTable[i];
    },

    pick2dValueFor: function(width, x,y) {
        x = Math.floor(x);
        y = Math.floor(y);

        var i = ((y*(width)) + (x));

        // Increase the size of our random table if a non-generated value is accessed
        if(i > this.size) {
            diff = (i - this.size) + this.incrementSize ;
            this.generate(diff);
        }

        return this.randomTable[i];
    }

}

})();
