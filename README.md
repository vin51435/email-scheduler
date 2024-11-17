# Node Scheduler

A brief description of your project goes here. This section can include what the project does, its features, and any important details.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for a cloud instance)

## Getting Started

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### 2. Install dependencies

#### Frontend:

Navigate to the `frontend` folder and install the necessary dependencies:

```bash
cd src/frontend
npm install
```

#### Backend:

Navigate to the `backend` folder and install the necessary dependencies:

```bash
cd ../backend
npm install
```

### 3. Set up environment variables

You need to set up environment variables for your application to work properly. Create a `.env` file in both the `frontend` and `backend` folders with the following content:

#### .env file content:

```bash
MONGODB_URI=mongodbURI
PORT=3002
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-email-password
OAUTH_CLIENTID=your-oauth-client-id
OAUTH_CLIENT_SECRET=your-oauth-client-secret
OAUTH_REFRESH_TOKEN=your-oauth-refresh-token
OAUTH_ACCESSTOKEN=your-oauth-access-token
```

- **MONGODB_URI**: MongoDB connection string for your database.
- **MAIL_USERNAME**: Your email address for sending emails.
- **MAIL_PASSWORD**: The password for your email account (may require an app-specific password).
- **OAUTH_CLIENTID**, **OAUTH_CLIENT_SECRET**, **OAUTH_REFRESH_TOKEN**, **OAUTH_ACCESSTOKEN**: OAuth credentials for email sending using Gmail API.

> **Important**: Ensure you securely store your credentials and do not expose them in public repositories.

### 4. Running the Application

#### Start the Backend:

Navigate to the `backend` folder and start the backend server:

```bash
cd ../backend
npm start
```

The backend will run on `http://localhost:3002`.

#### Start the Frontend:

In a separate terminal window, navigate to the `frontend` folder and start the frontend server:

```bash
cd ../frontend
npm start
```

The frontend will run on `http://localhost:3001`.

### 5. Accessing the Application

Once both the frontend and backend are running, you can access the application by navigating to `http://localhost:3001` in your web browser.

## Notes

- Ensure that the MongoDB instance is running and accessible.
- Make sure that you have valid OAuth credentials set up for email functionality.
- If using Gmail API, enable the necessary permissions and scopes in the Google Cloud Console.

## License

Include any relevant license information for your project, such as MIT or GPL.

## Acknowledgments

- [Node.js](https://nodejs.org/) - JavaScript runtime used for the backend.
- [MongoDB](https://www.mongodb.com/) - NoSQL database used for storing data.
- [Gmail API](https://developers.google.com/gmail/api) - Used for email sending functionality.

> Feel free to customize this README further based on your project's specific needs!

