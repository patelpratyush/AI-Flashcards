# AI FlashCard

## Features

# Project Structure

```bash
.
├── README.md
├── app
│   ├── api
│   │   ├── checkout_sessions.js
│   │   └── generate
│   │       └── route.js
│   ├── flashcard
│   │   └── page.js
│   ├── flashcards
│   │   └── page.js
│   ├── generate
│   │   └── page.js
│   ├── globals.css
│   ├── landingpage
│   │   └── page.js
│   ├── layout.js
│   ├── page.js
│   ├── page.module.css
│   ├── result
│   │   └── page.js
│   ├── sign-in
│   │   └── [[...sign-in]]
│   │       └── page.js
│   └── sign-up
│       └── [[...sign-up]]
│           └── page.js
├── firebase.js
├── middleware.ts
└── utils
    └── get-stripe.js
```

## Technologies Used

- **Frontend:**
  - React
  - Next.js
  - Material UI
- **Backend:**
  - Clerk
  - Stripe
  - OpenAI
  - Firebase
- **Deployment:**
  - Vercel
- **Additional:**
  - MUI (Material UI)

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository:**

```bash
    https://github.com/patelpratyush/AI-Flashcards
```

2. **Navigate to the project directory:**

```bash
    cd AI-Flashcards
```

3. **Install dependencies**

```bash
    npm install
    # or
    yarn install
```

4. **Set up Firebase:**

- Create a Firebase project and add your Firebase configuration.
- Set up Firestore, Authentication, and Storage in the Firebase console.
- Replace the Firebase configuration in `firebase.js` with your project's details.

5. **Set up Clerk:**

6. **Set up Stripe:**

7. **Run the development server:**

```bash
    npm run dev
    # or
    yarn dev
```

8. **Open your browser and go to:**

```bash
    http://localhost:3000
```

## Usage

- Sign In: Use your email and password to sign in.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
