import seedrandom from 'seedrandom';

const rng = seedrandom('mydankseed.memes');

let nextNextGaussian;
let haveNextNextGaussian = false;

export default {
    nextInt(bound) {
        return Math.floor(rng() * bound);
    },

    nextDouble() {
        return rng();
    },

    nextBoolean() {
        return rng() >= 0.5;
    },

    // Thanks Donald E. Knuth!
    // https://docs.oracle.com/javase/7/docs/api/java/util/Random.html#nextGaussian()
    nextGaussian() {
        if (haveNextNextGaussian) {
            haveNextNextGaussian = false;
            return nextNextGaussian;
        } else {
            let v1, v2, s;
            do {
                v1 = 2 * rng() - 1;
                v2 = 2 * rng() - 1;
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s === 0);
            const multiplier = Math.sqrt(-2 * Math.log(s)/s);
            nextNextGaussian = v2 * multiplier;
            haveNextNextGaussian = true;
            return v1 * multiplier;
        }
    }
};
