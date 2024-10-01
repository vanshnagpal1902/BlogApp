
# **WriteNest**

## **Project Description**
The **Blog Management System** is a web application designed for authors and administrators to create, update, and manage blog posts. Users can register as authors or be designated as admins, who have distinct privileges for managing content and user accounts. The platform supports multiple roles and features, such as adding posts, uploading images, and managing user permissions.

## **Tech Stack**
- **Frontend:**
  - **HTML5**
  - **CSS3**
  - **EJS (Embedded JavaScript)**

- **Backend:**
  - **Node.js**
  - **Express.js**

- **Database:**
  - **MongoDB**
  - **Mongoose**

- **File Handling:**
  - **Multer** (for file uploads)

- **Session Management:**
  - **express-session**

## **Features**
1. **User Authentication & Role-Based Authorization:**
   - Supports multiple roles: **Admin** and **Author**.
   - Admins can manage authors, while authors can create and manage their own blog posts.
2. **Post Creation and Management:**
   - Authors can create, update, and delete their posts.
   - Posts can contain multiple images, managed through file uploads.
3. **Image Upload:**
   - Users can upload up to 5 images for each post.
4. **Admin Panel:**
   - Admins have access to view all posts, delete authors, and manage user accounts.
5. **User Dashboard:**
   - Authors can view a list of their own posts and navigate to their profile pages.
6. **Profile Management:**
   - Users can view and manage their own profiles and authored posts.

## **Installation and Setup**
To run the application locally, follow these steps:

### **Prerequisites**
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### **Steps:**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/blog-management-system.git
   cd blog-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory to set environment variables:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog
   SESSION_SECRET=your_secret_key
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Navigate to the following URLs in your browser:**
   - `http://localhost:3000` - Home Page
   - `http://localhost:3000/signup` - User Signup Page
   - `http://localhost:3000/login` - User Login Page
   - `http://localhost:3000/admin` - Admin Dashboard
   - `http://localhost:3000/author` - Author Dashboard

## **File Structure**
```plaintext
├── views                  # EJS templates for rendering pages
│   ├── home.ejs           # Home page
│   ├── login.ejs          # User login page
│   ├── signup.ejs         # User signup page
│   ├── admin.ejs          # Admin dashboard
│   ├── author.ejs         # Author dashboard
│   ├── addpost.ejs        # Form to create a new post
│   ├── update.ejs         # Form to update existing posts
│   ├── profile.ejs        # User profile page
│   ├── fullpost.ejs       # Full post display
│   └── deleteauthor.ejs   # Admin page to delete authors
├── models                 # Mongoose schema and models
│   ├── user.js            # User schema
│   └── post.js            # Blog post schema
├── public                 # Static files (CSS, images, etc.)
├── index.js               # Main server file
└── README.md              # Project documentation
```

## **Usage**
- **Admins** can log in, manage authors, and view all posts.
- **Authors** can log in, create and manage their own posts, and view their profile.

## **Routes Overview**
- **`/`** - Home page.
- **`/login`** - User login.
- **`/signup`** - User signup.
- **`/admin`** - Admin dashboard.
- **`/author`** - Author dashboard.
- **`/addpost`** - Create a new post.
- **`/updatepost/:title`** - Update an existing post.
- **`/deletepost/:title`** - Delete a post.
- **`/deleteauthor`** - Admin panel for deleting authors.
- **`/fullpost/:title`** - View a full post.
- **`/profile`** - View user profile and posts.

## **Contributions**
Feel free to fork the repository and submit pull requests. Contributions are welcome to add new features or fix bugs!

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Author**
**Vansh Nagpal**

---

Let me know if you'd like to modify or add more details!
