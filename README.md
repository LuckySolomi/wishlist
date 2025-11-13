# Wishlist App

A responsive React + TypeScript application for managing your personal wishlist.  
Users can add, update, view, and delete wishes with a clean UI and smooth interactions.

---

## Technologies Used

- **React** (with hooks and context)
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **REST API** (CRUD operations)
- **GitHub Pages, Render.com, Velcel** for deployment
- The server is not running all the time, but “wakes up” only when someone makes a request again. The first request after “sleeping” can take 30–60 seconds to load (because the server is spinning up)

---

## Features

- Add new wishes with title, description, price, and image
- Edit or delete existing wishes via modal dialogs
- View detailed information about each wish
- Sort by price or creation date
- Responsive layout for desktop and mobile
- Persistent data using backend API (mock or real)

---

## How to Run Locally

Follow these simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/LuckySolomi/wishlist.git

# 2. Go to the project folder
cd wishlist

# 3. Install dependencies
npm install

# 4. Run the app in development mode
npm run dev
```
