🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using modern web technologies and clean coding practices.
This project was developed as part of the TDD Kata Assessment for the Next Steps – Software Craftsman Internship at Incubyte.

The application allows users to browse sweets, add items to a cart, place orders, and track order history.
The focus of the project is on clean architecture, TypeScript correctness, and frontend–backend separation.


🚀 Live Application

🔗 Deployed URL
https://assessment-submission-incubyte-3myl.vercel.app/

⚠️ Note: The backend APIs are mocked / local for frontend demonstration purposes.



🎯 Objective

The goal of this project is to demonstrate:

Clean frontend architecture using React & TypeScript

Context-based state management

Component-driven UI design

Proper data modeling with shared types

Error-free production builds (Vercel)

Git & deployment best practices

Readable, maintainable, and scalable code


✨ Features
👤 User Features

Browse available sweets with images and prices

Add sweets to cart

Increase quantity for existing cart items

Clear cart after checkout

View order history

Track orders using Order ID

Persistent state using localStorage


🛒 Cart Features

Add to cart from shop

Quantity management

Automatic subtotal calculation

Checkout simulation


📦 Order Management

Orders saved locally

Track order details by ID

View purchase date and total amount


🧱 Technology Stack
Layer	Technology
Frontend	React 18, TypeScript
Build Tool	Vite
Styling	Tailwind CSS
State Management	React Context API
Routing	React Router v6
Backend	Node.js + Express (local / mocked)
Testing	Jest (backend structure)
Deployment	Vercel


📁 Project Structure
sweet-shop-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── types/
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   └── vite.config.ts
│
└── README.md


🔌 API Endpoints (Backend – Design Level)
Sweets
Method	Endpoint	Description
GET	/api/sweets	Get all sweets
GET	/api/sweets/search	Search sweets
POST	/api/sweets	Add sweet
PUT	/api/sweets/:id	Update sweet
DELETE	/api/sweets/:id	Delete sweet
Orders
Method	Endpoint	Description
POST	/api/orders	Place order
GET	/api/orders/:id	Track order

APIs are implemented for structure and testing demonstration.


🧪 Test-Driven Development (TDD)

Backend logic structured with Red → Green → Refactor approach

Unit tests for core logic

API tests for routes

Manual end-to-end testing of UI flows

Tests are included to demonstrate understanding of TDD principles.


⚙️ Running Locally
Prerequisites

Node.js 18+

npm

Installation
git clone https://github.com/22BET10004/sweet-shop-management-system.git
cd sweet-shop-management-system

Frontend
cd frontend
npm install
npm run dev


Runs at:

http://localhost:5173

Backend
cd backend
npm install
npm run dev


💰 Currency

All prices are displayed in Indian Rupees (₹ INR).


📸 Screenshots
<img width="1733" height="906" alt="image" src="https://github.com/user-attachments/assets/0d02c61b-148e-43c4-9387-8149afb9f74b" />
<img width="1679" height="910" alt="image" src="https://github.com/user-attachments/assets/e04e4a05-7792-4cf7-9784-31e49a9c034e" />
<img width="1761" height="852" alt="image" src="https://github.com/user-attachments/assets/05815e94-d114-46ff-b66d-48e559e2a8c9" />
<img width="1707" height="865" alt="image" src="https://github.com/user-attachments/assets/87e15a6a-6807-4788-a023-39df579cf3f7" />
<img width="1732" height="910" alt="image" src="https://github.com/user-attachments/assets/9efeb5b0-2ff2-464a-8100-e5a14276bb5d" />
<img width="1746" height="903" alt="image" src="https://github.com/user-attachments/assets/c8baa7a6-61d5-4db9-a9ca-1b37c34a1e83" />


🤖 AI Usage Declaration
AI Tools Used

ChatGPT (OpenAI) and lovable.dev

How AI Was Used

Understanding error messages

Improving TypeScript correctness

Debugging build & deployment issues

Refining documentation

Reflection

AI was used as a learning and productivity aid.
All code was reviewed, tested, and corrected manually, and final responsibility for design and implementation lies with the developer.


👤 Author

Manik Naharia
Roll No: 22BET10004
Chandigarh University


❤️ Acknowledgement

This project was built as part of the Incubyte TDD Kata Assessment, with a strong focus on:

Software craftsmanship

Clean code

Type safety

Real-world debugging and deployment practices

The aim was not just to build a working application, but to demonstrate engineering discipline and problem-solving ability.


📜 License

This project is created for educational and assessment purposes only.
