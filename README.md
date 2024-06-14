# SEOSpaceTrax - Task Portal

Welcome to SEOSpaceTrax! This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). SEOSpaceTrax is a task portal with Google authentication, Stripe payment integration, and AWS S3 bucket integration. The application offers functionalities like searching, sorting, and uploading pictures.

## Features

- **Google Authentication**: Secure login and authentication via Google.
- **Stripe Payment Integration**: Seamless payment processing using Stripe.
- **AWS S3 Bucket Integration**: Efficient storage and retrieval of uploaded pictures.
- **Search and Sort**: Powerful searching and sorting capabilities for tasks.
- **Upload Pictures**: Easily upload and manage pictures within tasks.

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Link To Backend Code](#backend)


## Demo

Check out the live demo [here](https://task-portal.vercel.app/).

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/seospacetrax.git
    ```
2. Navigate to the project directory:
    ```bash
    cd seospacetrax
    ```
3. Install the dependencies for both the server and client:
    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```
4. Set up environment variables:

    Create a `.env` file in the `server` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    S3_BUCKET_NAME=your_s3_bucket_name
    ```

5. Start the development server:

    In the `server` directory, run:
    ```bash
    npm run dev
    ```

    In the `client` directory, run:
    ```bash
    npm start
    ```

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Log in using your Google account.
3. Create, view, search, sort, and manage tasks.
4. Upload pictures to tasks using the integrated AWS S3 bucket.
5. Make payments through Stripe for any premium features.

## Technologies

SEOSpaceTrax is built with the following technologies:

- **MongoDB**: Database for storing task information.
- **Express.js**: Backend framework for handling server-side logic.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for the backend.
- **Next.js**: Framework for server-side rendering and static site generation.
- **Google Authentication**: For secure user authentication.
- **Stripe**: For payment processing.
- **AWS S3**: For storing and retrieving uploaded pictures.

##Backend

Check out the backend code[here](https://github.com/ashug09/backend-task_portal).
---

Thank you for using SEOSpaceTrax! We hope it helps you manage your tasks efficiently and effectively. Happy coding!
