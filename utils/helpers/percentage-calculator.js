exports.percentageCalculator = (fraction, total) => {
    let percentage = (parseInt(fraction) / parseInt(total)) * 100;
    if (isNaN(percentage)) {
        percentage = 100;
    }
    return `${Math.round(percentage)}%`;
};
