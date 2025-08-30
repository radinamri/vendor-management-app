# Vendor Management Panel

A modern, responsive front-end application for managing vendor information, including their locations on an interactive map. This project was built with Next.js and the App Router, focusing on a clean user interface and a robust, scalable architecture using React's Context API for state management.

## ✨ Features

- **Vendor CRUD:** Full capabilities to Create, Read, Update, and Delete vendor information through an intuitive modal-based interface.

- **Interactive Map:** Utilizes React Leaflet to display all vendor locations on a map. Clicking a vendor in the list automatically pans and zooms to their pin.

- **Live Search:** Instantly filter the vendor list by brand name with a dynamic search bar in the header.

- **Responsive Design:** A mobile-first design that scales seamlessly from small phone screens to large desktop monitors.

- **Light & Dark Mode:** The interface respects the user's system theme preference for a comfortable viewing experience.

- **Toast Notifications:** Non-intrusive feedback for user actions like adding, updating, or deleting a vendor.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)

- **Language:** TypeScript

- **Styling:** Tailwind CSS

- **State Management:** React Context API with useReducer

- **Mapping:** React Leaflet

- **Icons:** Lucide React

- **Notifications:** React Hot Toast

## 🚀 Getting Started
Follow these instructions to get a local copy of the project up and running.

**Prerequisites**

You need to have Node.js (version 18.x or later) and npm installed on your machine.

> Node.js

**Installation**

1. Clone the repository

> git clone [https://github.com/radinamri/vendor-management-app.git](https://github.com/YourUsername/vendor-management-app.git)

2. Navigate to the project directory

> cd vendor-management-app

3. Install dependencies

> npm install

4. Run the development server

> npm run dev

Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure

_app/:_ Contains the core routing, pages, and global layout of the application. The page.tsx is the main entry point, and layout.tsx sets up global providers.

_components/:_ All UI components are modularized here. Each component is responsible for a specific piece of the interface.

_context/:_ The VendorContext.tsx file is the "single source of truth" for all application state, handling all business logic for vendors.

_data/:_ Holds mock data (vendors.js) and internationalization strings (i18n.tsx), decoupling static content from the component logic.

## 🔮 Future Improvements

Based on the initial project brief, here are some potential features that could be added:

- **Multi-Language Support:** Implement a mechanism to switch between English and Persian using the prepared i18n structure.

- **Skeleton Loading:** Show skeleton UI elements in the vendor list and map while initial data is being fetched (in a real-world API scenario).

- **API Integration:** Replace the mock data with a live API connection to fetch and persist vendor data.

- **Persistent State:** Use localStorage or a database to save changes across browser sessions.
