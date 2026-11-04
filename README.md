# 📚 BookNook – A Small Online Library

**Live Website:** https://book-nook-reduan.vercel.app/

## 📖 About the Project

BookNook is a small online library where users can explore books, add new books, borrow books, and return them. It provides a simple and user-friendly platform for managing books and borrowing activities.

**"Add a book, borrow a book, return a book."**

## ✨ Key Features

- **User Authentication:** Secure registration and login using Better Auth with email/password and Google authentication.
- **Browse Books:** Explore all available books with their images, titles, authors, and categories.
- **New Arrivals:** Discover the latest six books added to the library.
- **Add Books:** Logged-in users can add new books with images, descriptions, categories, and total copies.
- **Book Details:** View detailed information about each book.
- **Borrow Books:** Borrow available books through a confirmation process.
- **My Books:** Manage your own books with edit and delete functionality.
- **My Borrows:** View borrowed books and their borrowing and return dates.
- **Return Books:** Return borrowed books and update available copies.
- **Responsive Design:** Enjoy a consistent experience on desktop, tablet, and mobile devices.
- **Custom 404 Page:** A custom Not Found page with a Back to Home button.
- **Toast Notifications:** Get success and error messages through toast notifications.

## 🛠️ Technologies Used

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Swiper.js
- Lucide React
- React Hot Toast

### Authentication & Database
- Better Auth
- MongoDB Adapter
- MongoDB

### Backend
- Express.js
- TypeScript
- MongoDB
- JWT Authentication

## 🚀 Run Locally

### 1. Clone the Repository


git clone https://github.com/reduanahmed2022-reduan/Book-Nook.git


### 2. Navigate to the Project Folder


cd Book-Nook/book-nook-client


### 3. Install Dependencies


npm install


### 4. Configure Environment Variables

Create a `.env.local` file in the frontend project root and add the required environment variables:

    env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BACKEND_URL=


Add your own credentials and configuration values. Never share or commit secret values.

### 5. Start the Development Server


npm run dev


Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production


npm run build


## 🌐 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 👨‍💻 Developer

**Reduan Ahmed**

- GitHub: [reduanahmed2022-reduan](https://github.com/reduanahmed2022-reduan)
- Project Repository: [Book-Nook](https://github.com/reduanahmed2022-reduan/Book-Nook)
- Live Website: https://book-nook-reduan.vercel.app/

---

© 2026 BookNook. All Rights Reserved.