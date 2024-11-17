````markdown
# Project Name

A brief description of your project goes here.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for a cloud instance)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```
````

### 2. Install dependencies

#### Frontend:

Navigate to the `frontend` folder and install the necessary dependencies:

````bash
cd src/frontend
npm install

#### Backend:

Next, navigate to the `backend` folder and install the necessary dependencies:

```bash
cd ../backend
npm install
````

### 3. Environment variables

You need to set up environment variables for your application to work properly. Create a `.env` file in both `frontend` and `backend` folders with the following content:

#### In both `frontend` and `backend` `.env` files:

- **MONGODB_URI**: MongoDB connection string to your database.
- **MAIL_USERNAME**: Your email address used for sending emails.
- **MAIL_PASSWORD**: Password for the email account (may require app-specific password).
- **OAUTH_CLIENTID**, **OAUTH_CLIENT_SECRET**, **OAUTH_REFRESH_TOKEN**, **OAUTH_ACCESSTOKEN**: OAuth credentials for email sending using Gmail API.

Make sure the **client secret ID** for email sending (Gmail API credentials) is correctly set in the environment variables above.

### 4. Start the Project

#### Start the Backend:

```bash
cd ../backend
npm start
```

The backend will run on `http://localhost:3002`.

#### Start the Frontend:

In another terminal window, navigate to the `frontend` folder and run:

```bash
cd ../frontend
npm start
```

The frontend will run on `http://localhost:3000`.

### 5. Accessing the Application

Once both the frontend and backend are running, you can access the application by navigating to `http://localhost:3000` in your browser.

```

```
