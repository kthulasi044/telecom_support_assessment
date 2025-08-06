// Task 1 API

import pkg from "express";
const express = pkg;
const { Request, Response } = pkg;

import { processCustomerQuery } from "../aiAgent.ts";

const router = express.Router();

router.post("/assistant", async (req: Request, res: Response) => {
    console.log("Incoming request body:", req.body); 
    const { query, customerId } = req.body;

    if (!query || !customerId) {
        console.log("Missing fields: query or customerId");
        return res.status(400).json({ error: "Missing query or customerId" });
    }

    try {
        const answer = await processCustomerQuery(query, customerId);
        console.log("AI Response:", answer);
        res.json({ response: answer });
    } catch (error) {
        console.error("Error processing query:", error);
        res.status(500).json({ error: "Failed to process query" });
    }
});

export default router;
