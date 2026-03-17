# 🌍 Wanderlust 

A full-stack web application for listing and discovering travel accommodations, built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can browse travel listings, create new listings, and leave reviews with ratings.

## ✨ Features

- 📝 **Create Listings** - Add new travel accommodations with title, description, price, location, country, and images
- 👁️ **Browse Listings** - View all available listings in an intuitive interface
- 🔍 **View Details** - See full listing details and associated reviews
- ⭐ **Leave Reviews** - Post reviews with ratings (1-5 stars) on listings
- ✏️ **Edit Listings** - Update listing information
- 🗑️ **Delete Listings** - Remove listings from the database
- 🛡️ **Data Validation** - Server-side validation using Joi for data integrity
- 📱 **Responsive Design** - Clean, user-friendly interface with CSS styling

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Embedded JavaScript templating
- **CSS** - Styling
- **JavaScript** - Client-side interactivity

### Tools & Libraries
- **Joi** - Data validation
- **Method Override** - HTTP method override for PUT/DELETE requests
- **EJS Mate** - EJS layout engine
- **Nodemon** - Development server with auto-reload

## 📋 Prerequisites

Before running this project, ensure you have installed:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally or remote connection)
- **npm** (comes with Node.js)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   ```bash
   # For local MongoDB (Windows)
   mongod
   
   # Or use your MongoDB connection string in app.js
   ```

4. **Start the application**
   ```bash
   npm start
   # or for development with auto-reload
   npx nodemon app.js
   ```

5. **Open in browser**
   ```
<<<<<<< HEAD
   http://localhost:3000
=======
   http://localhost:8080
>>>>>>> ccc9e27a868f05c99d39e8bf52ffdef9070860ea
   ```

## 📁 Project Structure

```
wanderlust/
├── app.js                    # Main application file
├── schema.js                 # Joi validation schemas
├── package.json              # Project dependencies
├── models/
│   ├── listing.js           # Listing model
│   └── review.js            # Review model
├── views/
│   ├── error.ejs            # Error page
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs       # Navigation bar
│   │   └── footer.ejs       # Footer
│   └── listings/
│       ├── index.ejs        # Browse listings page
│       ├── new.ejs          # Create new listing form
│       ├── show.ejs         # Listing details page
│       └── edit.ejs         # Edit listing form
├── public/
│   ├── css/
│   │   └── style.css        # Stylesheet
│   └── js/
│       └── script.js        # Client-side scripts
├── utils/
│   ├── ExpressError.js      # Custom error class
│   └── wrapAsync.js         # Async error wrapper
└── init/
    ├── data.js              # Sample data
    └── index.js             # Database initialization
```

## 🔄 API Routes

### Listings
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | Get all listings |
| GET | `/listings/new` | Show create listing form |
| POST | `/listings` | Create a new listing |
| GET | `/listings/:id` | Get listing details |
| GET | `/listings/:id/edit` | Show edit listing form |
| PUT | `/listings/:id` | Update a listing |
| DELETE | `/listings/:id` | Delete a listing |

### Reviews
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/listings/:id/reviews` | Create a review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review |

## 📊 Database Schema

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [Review ObjectId]
}
```

### Review Model
```javascript
{
  comment: String (required),
  rating: Number (1-5, required),
  createdAt: Date (default: current date)
}
```

## ✅ Data Validation

The application uses **Joi** for server-side validation:

- **Listings** must include: title, description, price, country, and location
- **Reviews** must include: comment and rating (1-5)
- Image URLs are optional with defaults provided

## 🐛 Error Handling

- Custom `ExpressError` class for consistent error responses
- Async error wrapper to catch promise rejections
- Validation error messages displayed to users

## 🔧 Development

### Run with Auto-reload
```bash
npx nodemon app.js
```

### Initialize Database with Sample Data
```bash
node init/index.js
```

## 🚀 Future Enhancements

- 🔐 User authentication and authorization
- ❤️ Wishlist feature
- 💬 Real-time messaging
- 📍 Map integration
- 🖼️ Image upload functionality
- ⚙️ Advanced filtering and search
- 📧 Email notifications

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with improvements.

<<<<<<< HEAD
## 📞 Support

For questions or issues, please open an issue on the repository.

=======
>>>>>>> ccc9e27a868f05c99d39e8bf52ffdef9070860ea
---

**Happy Wandering!** 🌍✈️
