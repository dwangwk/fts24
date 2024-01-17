export const GetDeductible_EU = (amount) => {
    const saved_amount = amount * 100; // According to EU fine.
    console.log("saved: ", saved_amount);
    return saved_amount
}

export const GetDeductible_SG = (amount) => {
    console.log(amount);
    const saved_amount = amount * 80; // According to SG Carbon tax.
    console.log("saved: ", saved_amount);
    return saved_amount;
}
 