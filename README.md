# FoodExpress

FoodExpress is a food delivery web application built using Next.js and PostgreSQL. It allows users to browse restaurants, view menus, place orders, and track deliveries in real-time.

<img width="1735" height="901" alt="food_express" src="https://github.com/user-attachments/assets/cc422827-dfee-4d32-ba43-8c4f6f57b4f2" />

## Features

- **User Authentication**: Secure signup and login functionality
- **Restaurant Browsing**: Explore a variety of restaurants with filtering options
- **Menu Exploration**: View complete menus with detailed item descriptions
- **Cart Management**: Add, remove, and modify items in your cart
- **Order Placement**: Seamless checkout process with multiple payment options
- **Order Tracking**: Real-time updates on order status
- **User Profile**: Manage personal information and view order history
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, HTML5, CSS3, JavaScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe API
- **Geolocation**: Google Maps API
- **Real-time Updates**: Socket.io

## Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- PostgreSQL (v12 or later)

### Setting Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Mr-Malik-Aryan/FoodExpress.git
   cd FoodExpress
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your local PostgreSQL database:
   - Create a new database for the project
   - Note your database credentials for the next step

4. Create a `.env.local` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/foodexpress
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. Run the database migrations:
   ```bash
   npx prisma migrate dev
   ```
   (This assumes you're using Prisma as your ORM, adjust as needed)

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Database Schema

The PostgreSQL database includes the following main tables:
- Users
- Restaurants
- MenuItems
- Orders
- OrderItems
- Addresses
- Reviews

## API Routes

The API routes are implemented using Next.js API routes and can be found in the `pages/api` directory. Key endpoints include:
- `/api/auth` - Authentication endpoints
- `/api/restaurants` - Restaurant listing and details
- `/api/menu` - Menu items and categories
- `/api/orders` - Order creation and management
- `/api/users` - User profile management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Aryan Malik - [GitHub](https://github.com/Mr-Malik-Aryan)

Project Link: [https://github.com/Mr-Malik-Aryan/FoodExpress](https://github.com/Mr-Malik-Aryan/FoodExpress)


