// Task 1 mock tools

export async function getBillingInfo(customerId: string) {
    return {
        customerId,
        amountDue: 100.50,
        reason: "Roaming charges"
    };
}

export async function getPlanDetails(customerId: string) {
    return {
        customerId,
        planName: "Fiber 500",
        dataLimit: "500GB"
    };
}

export async function fileComplaint(customerId: string, issue: string) {
    console.log("Issue by user or AI", issue);
    return {
        ticketId: "#RA" + Math.floor(Math.random() * 100000),
        status: "Filed",
        issue
    };
}
