---
layout: post
title: "An experiment with Perlin Noise"
date: 2012-08-30 17:50
comments: true
categories:
---

**This blogpost is not finished yet :)**

This is basically an implementation of [this great article](http://freespace.virgin.net/hugo.elias/models/m_perlin.htm) on Perlin Noise in JavaScript, mainly so that I gain a little understanding on how it works.


### The Noise Function

A noise function is the foundation of the perlin noise that we want to generate. Wikipedia defines a function as *[...] a relation between a set of inputs and a set of permissible outputs [...]*, and in our case we have a single input, the **Seed**, and an out

<div markdown="0">
\[
    f(Seed, Time) \rightarrow Noise
 \]
</div>

<!-- We need these so Maruku doesn't cry -->
<div class="text-right bs-docs-box">
    <div class="canvas-div">
        <canvas id="linearInterpolationNoise" width="350" height="350" class="canvas in-example"> </canvas>
    </div>
    <div class="bs-docs-box bs-docs-options" id="linearInterpolationOptions">
        <label>
            <input type="checkbox" name="smooth" /> Smooth
        </label>
        <label>
            <input type="text" name="seed" value="Foo" /> Seed
        </label>
        <label>
            <select name="interpolation">
                <option value="none">None</option>
                <option value="linear" selected="selected">Linear Interpolation</option>
                <option value="cosine">Cosine Interpolation</option>
            </select>
        </label>
    </div>
    <div style="clear: both"></div>
</div>
<!-- We need these so Maruku doesn't cry -->


<!-- We need these so Maruku doesn't cry -->
<script src="/experiments/perlin-noise/vendor/seedrandom.js" type="text/javascript"> </script>
<script src="/experiments/perlin-noise/canvas-util.js" type="text/javascript"> </script>
<script src="/experiments/perlin-noise/perlin.js" type="text/javascript"> </script>
<!-- We need these so Maruku doesn't cry -->
