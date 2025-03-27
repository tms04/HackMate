# HackMate

## 🚀 Overview
HackMate is a MERN stack platform that helps users find their ideal hackathon teammates. The platform allows users to create profiles, search for potential teammates based on skills and experience, and collaborate on hackathon projects.

## 📌 Features
- User authentication (Sign up/Login)
- Profile creation with skills and experience
- Search and filter teammates based on skills
- Team formation and collaboration tools

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Vercel (Frontend), Render (Backend)

## 📂 Project Structure
```
HackMate/
│── clients/       # Frontend (React)
│── server/       # Backend (Node.js, Express)
│── README.md
```

## 🛠️ Setup & Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/HackMate.git
   ```
2. Navigate to the project folder:
   ```bash
   cd HackMate
   ```
3. Install dependencies:
   ```bash
   cd clients && npm install
   cd server && npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the server directory with:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     ```
   - Create a `.env` file in the clients directory with:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     SECRET_KEY=your-secret-key
     NODE_ENV=development
     ```
5. Start the backend server:
   ```bash
   cd server
   npm start
   ```
6. Start the frontend:
   ```bash
   cd client
   npm start
   ```

## 🚀 Deployment
- **Frontend**: Deploy on [Vercel](https://vercel.com/)
- **Backend**: Deploy on [Render](https://render.com/) or [Heroku](https://www.heroku.com/)

## 🛡️ Security Considerations
- Store sensitive credentials in environment variables.
- Use HTTPS for secure API communication.
- Validate and sanitize user input to prevent attacks.

## 🤝 Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to your branch: `git push origin feature-branch`
5. Open a Pull Request.
