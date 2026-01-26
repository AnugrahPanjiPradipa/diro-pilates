# DIRO Pilates Reservation App

A frontend web application designed for booking Pilates sessions. This project was developed as a technical assessment for the Frontend Developer position, focusing on user interface design, state management, and reservation logic using Next.js.

## Project Overview

The application allows users to book a Pilates class by selecting their personal details, preferred date, time duration, and studio type. The system automatically calculates the total duration and price based on the selected criteria.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Library:** React.js
- **Styling:** Tailwind CSS
- **Language:** JavaScript

## Key Features

1.  **Dynamic Reservation Logic**
    - Users cannot select dates in the past (validation using HTML5 min attribute).
    - End time options are dynamically filtered to ensure they are always later than the start time.
    - Automatic calculation of session duration and total price based on the selected studio's hourly rate.

2.  **Tiered Studio Pricing**
    - Includes three different studio types (Mat, Reformer, Private Suite) with distinct pricing tiers.

3.  **Component-Based Architecture**
    - The application is refactored into modular components (DateStep, TimeStep, CourtStep, etc.) for better maintainability and code readability.

4.  **Simulated Payment Flow**
    - Includes a simulated asynchronous payment process with loading states and success feedback.

## Project Structure

The project follows a clean, feature-based structure:

- `app/` : Contains the main page logic (Controller) and layout.
- `components/` : Contains reusable UI components and form steps.
  - `Header.jsx` : Navigation bar.
  - `InformationStep.jsx` : User details input.
  - `DateStep.jsx` : Date picker with validation.
  - `TimeStep.jsx` : Duration selector with logic.
  - `CourtStep.jsx` : Studio selection cards.
  - `ConfirmationScreen.jsx` : Booking summary and checkout view.
  - `SuccessBookingScreen.jsx` : Post-transaction success view.
- `data/` : Contains mock data for studio information and time slots.

## Configuration

- Image Optimization:
This project uses images from Unsplash. The next.config.mjs file has been configured to allow remote patterns from images.unsplash.com.

- Mock Data:
Since this is a frontend-focused assessment, the data for studios (Courts) and time slots are stored locally in data/data.js to simulate database records.

- License:
This project is for educational and assessment purposes.