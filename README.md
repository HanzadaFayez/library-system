📚 Library Management System

A simple backend system to manage books, borrowers, and book loans.
This project is built with Node.js, Express, Sequelize, and MySQL.

⚙️ How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/HanzadaFayez/library-system.git
cd library-system

2️⃣ Install Dependencies
npm install

3️⃣ Setup the Database

Make sure you have MySQL installed and running.

Create a database called library_db:

CREATE DATABASE library_db;


Run migrations to create tables:

npx sequelize-cli db:migrate


4️⃣ Configure Environment Variables

Create a file named .env in the root directory:

DB_USER=root
DB_PASS=your_password
DB_NAME=library_db
DB_HOST=127.0.0.1

5️⃣ Run the Server

npx nodemon app.js


The server will start at:
👉 http://localhost:3000

📡 API Endpoints
📘 Books

POST /books → Add a book

PUT /books/:id → Update book details

DELETE /books/:id → Delete a book

GET /books → List books 

GET /books/search?query=keyword → Search books by title, author, or ISBN

👤 Borrowers

POST /borrowers → Register a borrower

PUT /borrowers/:id → Update borrower details

DELETE /borrowers/:id → Delete borrower

GET /borrowers→ List borrowers 

📖 Book Loans

POST /loans/checkout → Checkout a book

PUT /loans/return/:id → Return a book

GET /loans/borrower/:id → Get books borrowed by a specific borrower

GET /loans/overdue → List overdue books


## Postman Collection
You can import the Postman collection from:
./docs/Library.postman_collection.json



Open Postman , import the collection and test endpoints.
