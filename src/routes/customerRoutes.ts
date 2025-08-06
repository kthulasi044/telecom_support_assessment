// Task 2 API

import pkg from "express";
const express = pkg;
const { Request, Response } = pkg;

import axios from "axios";

const router = express.Router();

// Mock APIs
router.get("/api/customer/:id", (req: Request, res: Response) => {
    res.json({
        id: req.params.id,
        name: "John Doe",
        plan: "Fiber 500"
    });
});

router.get("/api/billing/:id", (req: Request, res: Response) => {
    res.json({
        balance: 25.0,
        dueDate: "2025-06-15"
    });
});

router.get("/api/subscription/:id", (req: Request, res: Response) => {
    res.json({
        status: "active",
        renewalDate: "2025-07-01"
    });
});

// Aggregator Endpoint
router.get("/customer/:customerId/profile", async (req: Request, res: Response) => {
    const { customerId } = req.params;

    const baseURL = `http://localhost:3000`; // server

    const customerApi = `${baseURL}/api/customer/${customerId}`;
    const billingApi = `${baseURL}/api/billing/${customerId}`;
    const subscriptionApi = `${baseURL}/api/subscription/${customerId}`;

    try {
        // Fetch all APIs concurrently
        const [customerRes, billingRes, subscriptionRes] = await Promise.allSettled([
            axios.get(customerApi),
            axios.get(billingApi),
            axios.get(subscriptionApi)
        ]);

        const profile: any = { id: customerId };
        console.log("customerRes.status : ", customerRes.status);

        if (customerRes.status === "fulfilled") {
            profile.name = customerRes.value.data.name;
            profile.plan = customerRes.value.data.plan;
        } else {
            console.error("Customer API failed:", customerRes.reason);
            profile.name = null; // fallback for name
            profile.plan = null; // fallback for plan
        }

        if (billingRes.status === "fulfilled") {
            profile.billing = billingRes.value.data;
        } else {
            console.error("Billing API failed:", billingRes.reason);
            profile.billing = { error: "Billing data unavailable" };
        }

        if (subscriptionRes.status === "fulfilled") {
            profile.subscription = subscriptionRes.value.data;
        } else {
            console.error("Subscription API failed:", subscriptionRes.reason);
            profile.subscription = { error: "Subscription data unavailable" };
        }

        return res.json(profile);
    } catch (error) {
        console.error("Error aggregating profile:", error);
        return res.status(500).json({ error: "Failed to fetch customer profile" });
    }
});

export default router;
