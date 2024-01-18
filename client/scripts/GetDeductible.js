export const GetDeductible_EU = (amount) => {
    const saved_amount = amount * 100; // According to EU fine.
    console.log("saved: ", saved_amount);
    return saved_amount
}

export const GetDeductible_SG = (amount) => {
    console.log(amount);
    const saved_amount = amount * 25; // Up to 5% of total carbon tax.
    console.log("saved: ", saved_amount);
    return saved_amount;
}
 