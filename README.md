# TIN-PRO
# Project Setup

This project uses environment variables for configuration. Below is a **simple example** of how your `.env` file might look.

> ⚠️ **Important:** The secrets shown here are **examples only**. Do **not** commit real secrets to version control.

## Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
PORT=8000

MONGODB_URL=mongodb://mongo:27017/jwtmongoproject

ACCESS_TOKEN_SECRET=8bb53d0d463374f468cfb0a3682913b276171b3aebdbf773caf68a0a9381cdecf6b0a2fff58d444b7aba29f2e51d5371957f66f06a0c797a3ac6db271d7f1f52
REFRESH_TOKEN_SECRET=d4dd516c430e29746a99b21a67d234b7cf77e13e5842b108fc577a1c875375eea42389ea2b76e51d40bd75ccaebd7d6b1f2458804dffcdfdb1711ab91e215542

FRONTEND_URL=http://localhost:8000
PAGE_LIMIT=10
```

## Variable Description

* **PORT** – Port on which the backend server runs
* **MONGODB_URL** – MongoDB connection string
* **ACCESS_TOKEN_SECRET** – Secret key for signing access JWTs
* **REFRESH_TOKEN_SECRET** – Secret key for signing refresh JWTs
* **FRONTEND_URL** – Allowed frontend origin (CORS)
* **PAGE_LIMIT** – Default number of items per page for pagination

## Getting Started

1. Copy the example above into a `.env` file
2. Replace secrets with your own secure values
3. Install dependencies
4. Start the application

---

Happy coding 🚀
