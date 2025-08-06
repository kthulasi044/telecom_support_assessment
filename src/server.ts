// Main server entry point

import express from "express";
import bodyParser from "body-parser";
import assistantRoute from "./routes/assistant.ts";
import customerRoute from "./routes/customerRoutes.ts";

const app = express();
app.use(bodyParser.json());

// Task 1: AI Assistant 
app.use("/api", assistantRoute);

// Task 2: Customer Info Aggregator
app.use("/", customerRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
