// Task 1 OpenAI logic

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

import { getBillingInfo, getPlanDetails, fileComplaint } from "./tools.ts";

dotenv.config();
console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function processCustomerQuery(query: string, customerId: string) {
    const tools = [
        {
            type: "function",
            function: {
                name: "getBillingInfo",
                description: "Fetch billing info for a customer",
                parameters: {
                    type: "object",
                    properties: {
                        customerId: { type: "string" }
                    },
                    required: ["customerId"]
                }
            }
        },
        {
            type: "function",
            function: {
                name: "getPlanDetails",
                description: "Get the customer's current telecom plan",
                parameters: {
                    type: "object",
                    properties: {
                        customerId: { type: "string" }
                    },
                    required: ["customerId"]
                }
            }
        },
        {
            type: "function",
            function: {
                name: "fileComplaint",
                description: "File a support complaint",
                parameters: {
                    type: "object",
                    properties: {
                        customerId: { type: "string" },
                        issue: { type: "string" }
                    },
                    required: ["customerId", "issue"]
                }
            }
        }
    ];

    // Step 1: Send query to OpenAI with tool schema
    const response = await openai.chat.completions.create({
        // model: "gpt-4o-mini", // or gpt-4.1
        model: "gpt-3.5-turbo-1106",
        messages: [
            { role: "system", content: "You are a telecom support assistant. Use tools to answer queries." },
            { role: "user", content: query }
        ],
        tools,
        tool_choice: "auto"
    });

    const message = response.choices[0].message;
    
    if (message.tool_calls && message.tool_calls.length > 0) {
        const toolCall = message.tool_calls[0];
        const toolName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);

        let toolResult: any;

        if (toolName === "getBillingInfo") {
            toolResult = await getBillingInfo(args.customerId);
        } else if (toolName === "getPlanDetails") {
            toolResult = await getPlanDetails(args.customerId);
        } else if (toolName === "fileComplaint") {
            toolResult = await fileComplaint(args.customerId, args.issue);
        }

        // Step 2: Return final structured response
        const finalResponse = await openai.chat.completions.create({
            // model: "gpt-4o-mini",
            model: "gpt-3.5-turbo-1106",
            messages: [
                { role: "system", content: "You are a telecom support assistant." },
                { role: "user", content: query },
                { role: "assistant", tool_calls: message.tool_calls }, // original function call
                { role: "tool", tool_call_id: toolCall.id, name: toolName, content: JSON.stringify(toolResult) }
            ]
        });

        return finalResponse.choices[0].message.content;
    } else {
        return "I couldn't process your request.";
    }
}
