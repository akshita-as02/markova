# Markova - AI-Powered Branding Platform

Markova is an AI-powered platform that helps users create stunning brand identities, logos, taglines, and marketing materials. With advanced AI algorithms, users can generate unique and professional designs tailored to their business needs.

## Features

- **AI-Powered Design**: Generate unique brand identities, logos, and taglines using advanced AI algorithms.
- **Lightning Fast**: Create and iterate on designs quickly with an intuitive interface.
- **Customizable**: Fine-tune every aspect of your brand identity, from colors to typography.
- **Firebase Integration**: Secure user authentication and real-time database for storing user-generated brands.
- **Image Upload**: Upload generated images to ImgBB for easy sharing and downloading.
- **Tagline Generation**: Generate creative and catchy taglines for your brand using AI.

## Tech Stack

- **Frontend**: React, React Router, TailwindCSS, Styled Components
- **Backend**: Firebase (Authentication, Realtime Database, Storage)
- **AI Integration**: Hugging Face Inference API for text-to-image and tagline generation
- **Image Hosting**: ImgBB API for image uploads

## Project Structure

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components (Login, Register)
│   │   ├── generateForm/  # Form for generating brand assets
│   │   ├── home/          # Landing page
│   │   ├── imageGenerator # Image generation logic
│   │   ├── layout/        # Layout components
│   │   ├── navbar/        # Navigation bar
│   │   ├── results/       # Results page for generated brands
│   │   └── ProtectedRoute.jsx # Route protection logic
│   ├── contexts/          # Context for authentication
│   ├── firebase/          # Firebase configuration and utilities
│   ├── hooks/             # Custom hooks
│   ├── theme/             # Theme configuration
│   ├── utils/             # Utility functions (Hugging Face, ImgBB)
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── .env.local             # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## How to Run the Project

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (v16 or higher recommended).
2. Create a Firebase project and configure the following services:
   - Authentication
   - Realtime Database
   - Storage
3. Obtain API keys for:
   - Hugging Face Inference API
   - ImgBB API

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd markova
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     REACT_APP_HF_API_KEY=<Your Hugging Face API Key>
     REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
     REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
     REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
     REACT_APP_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
     REACT_APP_FIREBASE_APP_ID=<Your Firebase App ID>
     REACT_APP_FIREBASE_MEASUREMENT_ID=<Your Firebase Measurement ID>
     REACT_APP_IMGBB_API_KEY=<Your ImgBB API Key>
     ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## How It Works

1. **User Authentication**: Users can register or log in using email/password or Google authentication.
2. **Brand Generation**:
   - Users provide details about their brand (name, mission, vision).
   - Select industries and a preferred style.
   - The app generates a logo using Hugging Face's text-to-image API.
3. **Results Page**:
   - Users can view their generated brands, download logos, and revisit their creations.
4. **Image Hosting**:
   - Generated images are uploaded to ImgBB for easy sharing and downloading.

## Scripts

- `npm start`: Start the development server.
- `npm run build`: Build the app for production.
- `npm test`: Run tests.
