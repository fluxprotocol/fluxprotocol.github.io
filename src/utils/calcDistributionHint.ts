import Big from "big.js";

// Using Omen's utility functions adjusted where necessary 

export const calcDistributionHint = (initialOdds: number[]): Big[] => {
    if (initialOdds.some(x => x === 0)) {
        throw new Error("Invalid probability - can't assign a probability of zero to an outcome");
    }

    const initialOddsBig = initialOdds.map(x => new Big(x));
    const product = initialOddsBig.reduce((a, b) => a.mul(b));

    const distributionHint = initialOddsBig
        .map(o => product.div(o))
        .map(x => x.mul(1000000).round())
        .map(x => new Big(x.toString()));

    return distributionHint;
};
