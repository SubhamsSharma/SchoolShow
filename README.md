School Submission App
A simple web application for submitting and displaying school information. The platform allows users to input school details—including name, address, contact information, and an image—via a form. The submitted data is then showcased on a dynamic, clean, and interactive list of school cards.

Features
School Data Submission Form: A user-friendly form to collect essential school information.

Image Upload: Integrated with Cloudinary to handle image uploads for each school.

Dynamic School Card Display: A responsive and interactive list of cards, each representing a submitted school with its name, address, city, and image.

Data Validation: Utilizes Zod for robust form data validation, ensuring data integrity.

Persistent Storage: Data is stored in a PostgreSQL database, managed by Prisma.

Technologies Used
Framework: Next.js 15

Database: PostgreSQL

ORM: Prisma

Form Validation: Zod

Image Handling: Cloudinary

Deployment: Render

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
You will need the following installed:

Node.js (v18 or higher)

npm or yarn

A PostgreSQL database instance

A Cloudinary account

Installation
Clone the repository:

git clone [https://github.com/SubhamsSharma/SchoolShow/](https://github.com/SubhamsSharma/SchoolShow/)

cd your-repo-name

Install the dependencies:

npm install

Create a .env file in the root directory and add your environment variables. You will need to configure your database and Cloudinary credentials.

# Database connection string
DATABASE_URL="postgresql://username:password@host:port/database"

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"

CLOUDINARY_API_KEY="your_cloudinary_api_key"

CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

Push the Prisma schema to your database and generate the Prisma client:

npx prisma db push
npx prisma generate

Run the development server:

npm run dev

Open http://localhost:3000 in your browser to view the application.

Project Walkthrough
A screen recording of a project walkthrough with audio is available to provide a detailed overview of the application's features and functionality.

[https://www.youtube.com/watch?v=oaF7C6NFZlU]

