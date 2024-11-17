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

#### Src:

Install concurrently on src file

```bash
npm install
```

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

You need to set up environment variables for your application to work properly. Create a `.env` file in `backend` folders with the following content:
Save the .env file inside backend folder.

#### .env file content:

```bash
MONGODB_URI=mongodbURI
PORT=3002
MAIL_USERNAME=your-email@gmail.com
APP_PASSWORD=your-email-password

```

- **MONGODB_URI**: MongoDB connection string for your database.
- **MAIL_USERNAME**: Your email address for sending emails.
- **APP_PASSWORD**: The password for your email account, made using google's 2FA app specific password.

### 4. Running the Application

#### Start the project:

```bash
npm start
```

### 5. Accessing the Application

Once both the frontend and backend are running, you can access the application by navigating to `http://localhost:3001` in your web browser.

## Notes

- Ensure that the MongoDB instance is running and accessible.

## License

Include any relevant license information for your project, such as MIT or GPL.

## Acknowledgments

- [Node.js](https://nodejs.org/) - JavaScript runtime used for the backend.
- [MongoDB](https://www.mongodb.com/) - NoSQL database used for storing data.
- [Nodemailer](https://www.nodemailer.com/) - For providing mailing modules.
- [Agenda](https://github.com/agenda/agenda) - For providing easy job scheduling.

