export const formatAmount = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });

    return formatter.format(amount);
};

export const transactionIndicator = (status) => {
    let statusColor = "blue";
    if (status === "approved") {
        statusColor = "green";
    } else if (status === "declined") {
        statusColor = "red";
    }
    return statusColor;
};
