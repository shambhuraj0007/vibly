# Vibly 🧑‍🤝‍🧑✨

**Vibly** is a full-stack social networking platform built with the MERN stack (MongoDB, Express, React, Node.js). It brings together features like user authentication, real-time interactions, profile management, and a beautiful modern UI powered by Tailwind CSS, Zustand, and Framer Motion.  

---

## 🌐 Live Demo

🚀 **Frontend**: [https://vibly.vercel.app](https://vibly.vercel.app)  
🛠️ **Backend**: [https://vibly-backend.onrender.com](https://vibly-backend.onrender.com)

---

## 🔧 Tech Stack

### Frontend:
- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) for responsive styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for icons
- [Zustand](https://zustand-demo.pmnd.rs/) for global state management
- [Axios](https://axios-http.com/) for API requests
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) for form validation
- [Next Auth](https://next-auth.js.org/) or custom JWT auth

### Backend:
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/) for image uploads
- JWT for authentication
- CORS, secure HTTP headers, and custom middleware
- RESTful API design

---

## 📦 Features

- 🔐 User authentication (Google OAuth + Email/Password)
- 🧑‍💼 User profiles with tabs (About, Posts, Friends, Photos)
- 📝 Post creation with caption, image, hashtags
- ❤️ Like / Dislike system
- 💬 Comments with toggle and interaction
- 🔗 Post sharing with social dialog
- 💬 Instagram-like messaging interface
- 🌗 Dark / Light mode toggle
- 🧠 Friend suggestions & request system
- 📱 Responsive UI for all screen sizes

---

## 🛠️ Setup Instructions

### 🔁 Clone the Repository

```bash
git clone https://github.com/shambhuraj0007/vibly.git
cd vibly
🚀 Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Create a .env.local file in frontend/ with:

🔧 Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
Create a .env file in backend/ with:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

env
Copy code
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

🙌 Contributing
Contributions are welcome! Feel free to fork this repo, make changes, and open a pull request.

👨‍💻 Author
Made with ❤️ by Shambhuraj Gadhave