# Resumify 🚀

Resumify is a modern, AI-powered resume analyzer built with **React Router 7**, **Puter.js**, and **Tailwind CSS**. It helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and provides actionable feedback using advanced AI models (Claude Sonnet via Puter.js).

![Resumify Screenshot](public/images/resume-scan.gif)

## ✨ Features

- **AI Resume Analysis**: Upload your PDF resume and get instant feedback on strengths, weaknesses, and improvement areas.
- **ATS Compatibility Check**: Scores your resume based on ATS-friendly formatting and keyword optimization.
- **Interactive Chat**: Ask questions about your resume and get tailored advice.
- **Modern UI/UX**: A sleek, responsive interface featuring glassmorphism, smooth animations, and a beautiful indigo-purple gradient theme.
- **Secure & Private**: leverages Puter.js for secure file handling and AI processing.
- **Real-time Scoring**: Visual score gauges and detailed breakdowns of your resume's performance.

## 🛠️ Tech Stack

- **Framework**: [React Router 7](https://reactrouter.com/) (formerly Remix)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + `tw-animate-css`
- **AI & Backend**: [Puter.js](https://puter.com/) (Claude Sonnet 3.5/3.7)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **PDF Handling**: `pdfjs-dist`
- **File Upload**: `react-dropzone`

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A [Puter.js](https://puter.com/) account (handled automatically via the app's auth)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/abidazamkhan-26/Resumify.git
    cd Resumify
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open your browser**:
    Navigate to `http://localhost:5173` to see the app in action.

## 📖 Usage

1.  **Sign In**: Log in using your Puter account (or create one instantly).
2.  **Upload Resume**: Drag and drop your PDF resume into the upload zone.
3.  **Analyze**: The AI will scan your resume and provide a detailed report.
4.  **Chat**: Use the chat interface to ask specific questions like "How can I improve my summary?" or "What keywords am I missing?".

## 📂 Project Structure

```
Resumify/
├── app/
│   ├── components/    # Reusable UI components (Navbar, ResumeCard, etc.)
│   ├── lib/           # Utilities and Puter.js integration
│   ├── routes/        # Application routes (home, upload, resume, etc.)
│   ├── app.css        # Global styles and Tailwind imports
│   └── root.tsx       # Root layout
├── public/            # Static assets (images, icons)
├── types/             # TypeScript type definitions
└── ...config files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Abid Azam Khan](https://github.com/abidazamkhan-26)
