A React.js frontend built with TypeScript, Tailwind CSS, and Shadcn UI, providing a clean and user-friendly interface to create, manage, and track shortened URLs. It integrates seamlessly with the backend APIs for real-time URL management and analytics.


# Frontend Setup Guide

## Requirements

### Programming Languages, Frameworks, and Tools
- Node.js
- TypeScript
- React.js
- Shadcn
- Tailwind CSS
- VSCode (anything of your liking)
---

## Steps to Run the Frontend

### 1. Install Prerequisites
- Make sure **NODEJS** is installed

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```
### 3. Install dependencies
```bash
npm install
# or
yarn
```
### 3. ENVIRONMENT VARIABLE REQUIRED
For this project, for now, if you want to attach a different PostgreSQL server,  it would need to push the migration
``` env
VITE_BACKEND_URI=http://localhost:8080/shortener
```
### 6. Run the app in dev mode
```bash
npm run dev
# or
yarn dev
```
After starting the development server, you can access the application at:
## http://localhost:5173 
