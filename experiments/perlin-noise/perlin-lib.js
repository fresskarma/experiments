var Perlin = {

    /**
     * Generates an arary of "size" pseudo-random numbers based on the given "seed", i.e. when
     * passing the same seed to this function, the sequence of random numbers will always
     * be the same.
     */
    generateRandomSetWithSeed: function(seed, size) {
        var r, i, backupRandom, data;
        r = [ ];
        backupRandom = Math.random;

        Math.seedrandom(seed);
        for(i=0; i < size; i++) {
            r.push(Math.random());
        }

        Math.random = backupRandom;
        return r;
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
    pickValueFor: function(randoms, x) {
        var i;
        x = Math.round(x);

        if(x === 0) { i = 0 }
        else if(x > 0) { i = 2*x - 1 }
        else if(x < 0) { i = 2 * Math.abs(x) }
        else { return x } // Not an integer :(

        return randoms[i];
    }

};
