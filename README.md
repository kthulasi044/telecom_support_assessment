Telecom Support Assistant & Customer Profile Aggregator

This project demonstrates two key functionalities for a telecom provider:

 Task 1: An AI-powered Telecom Support Assistant that uses OpenAI function calling to answer customer queries and perform actions like fetching billing info, retrieving plan details, and filing complaints.

 Task 2: A Customer Info Aggregator that combines data from multiple internal APIs (Customer, Billing, Subscription) into a single profile response.

📌 Features Implemented
=> Task 1: Telecom Support Assistant
Built using OpenAI API with function calling.

Handles queries like:

Fetch billing information

Get current telecom plan

File a complaint (with issue details)

Dynamically routes queries to the correct tool:

getBillingInfo(customerId)

getPlanDetails(customerId)

fileComplaint(customerId, issue)

=> Task 2: Customer Info Aggregator
Exposes an endpoint GET /customer/:customerId/profile.

Fetches:

Customer Info → /api/customer/:id

Billing Info → /api/billing/:id

Subscription Info → /api/subscription/:id

Uses Axios and Promise.allSettled() for concurrent API calls.

Handles partial failures gracefully by returning available data with error messages for missing parts.

 Tech Stack
Node.js (Express.js for API)

TypeScript

OpenAI API (for AI assistant)

Axios (for internal API calls)

Body-parser (for JSON parsing)

📂 Project Structure

telecom-support/
│
├── src/
│   ├── routes/
│   │   ├── assistant.ts        # Task 1 API (AI Assistant)
│   │   ├── customerRoutes.ts   # Task 2 API (Aggregator)
│   ├── tools.ts                # Mock tools for Task 1
│   ├── aiAgent.ts              # AI logic with OpenAI function calling
│   ├── server.ts               # Main server entry point
│
├── package.json
├── tsconfig.json
├── .env                        # OpenAI API key (Not shared in repo)
└── README.md                   # Documentation


 Setup Instructions
1. Clone the Repository

git clone <your-repo-link>
cd telecom_support_Assessment

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the project root:

OPENAI_API_KEY=your-openai-api-key

4. Start the Server
For development (with hot reload):

npm run dev

 API Endpoints
📌 Task 1: AI Assistant
Endpoint:

POST /api/assistant
Request Body:

{
  "query": "I have to file a complaint",
  "customerId": "0123456789",
  "issue": "slow internet"
}
Example Response:

{
    "response": "I have filed a complaint for you regarding the slow internet speed. Your ticket ID is #RA98371. We will work on resolving this issue as soon as possible. Thank you for bringing this to our attention."
}

📌 Task 2: Customer Profile Aggregator
Endpoint:

GET /customer/:customerId/profile

Example:
GET /customer/1234567890/profile
Response:

{
    "id": "1234567890",
    "name": "John Doe",
    "plan": "Fiber 500",
    "billing": {
        "balance": 25,
        "dueDate": "2025-06-15"
    },
    "subscription": {
        "status": "active",
        "renewalDate": "2025-07-01"
    }
}

 How to Test
✅ Using Postman or Thunder Client in VS Code
Task 1 (AI Assistant)
Method: POST

URL: http://localhost:3000/api/assistant

Body (JSON):

{
  "query": "What is my plan?",
  "customerId": "0123456789"
}

Task 2 (Customer Profile)
Method: GET

URL: http://localhost:3000/customer/0123456789/profile



⚠ Important Notes

OpenAI API key is required for Task 1 to work.

If API quota is exceeded, you will get a 429 Rate Limit Error.

Output Screenshots:
Task 1:
<img width="1232" height="545" alt="image" src="https://github.com/user-attachments/assets/853c1402-248e-4727-bcad-80c5ae99cf9e" />

<img width="1219" height="563" alt="image" src="https://github.com/user-attachments/assets/1d140bf3-cb07-4b94-b957-4490310f0fbe" />

<img width="1232" height="543" alt="image" src="https://github.com/user-attachments/assets/69fae98c-410a-424c-8df1-8c3cfec9a6c2" />

Task 2:
<img width="1216" height="587" alt="image" src="https://github.com/user-attachments/assets/afeac2eb-59ed-4ffc-ab2d-d65e0211f7f7" />


"# telecom_support_assessment" 
