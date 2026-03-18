# 🌍 Wanderlust

A full-stack web application for listing and discovering travel accommodations — built for real users with **Node.js**, **Express**, **MongoDB**, and **EJS**. Browse vacation homes and unique stays, leave reviews, upload images, and explore locations on an interactive map.

## ✨ Features

- 🔐 **User Authentication** — Secure login & signup so only registered users can create and manage listings
- 📝 **Create Listings** — Add vacation homes, treehouses, cabins, and other unique stays with title, description, price, location, country, and images
- 🖼️ **Image Uploads** — Upload listing images via **Cloudinary** for fast, reliable media delivery
- 👁️ **Browse Listings** — View all available listings in an intuitive interface
- 🔍 **View Details** — See full listing details and associated reviews
- ⭐ **Leave Reviews** — Post reviews with ratings (1–5 stars) on any listing
- ✏️ **Edit Listings** — Update listing information (listing owner only)
- 🗑️ **Delete Listings** — Only the listing owner can delete their own listing; other users will not see the delete option
- 🚫 **Delete Reviews** — Users can only delete their own reviews; the delete button is hidden for reviews written by others
- 🗺️ **Interactive Map** — Explore listing locations on a live map powered by Mapbox
- 🛡️ **Data Validation** — Server-side validation using Joi for data integrity
- 📱 **Responsive Design** — Clean, user-friendly interface across all devices

## 🛠️ Tech Stack

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web application framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **Passport.js** — Authentication middleware

### Frontend
- **EJS** — Embedded JavaScript templating
- **CSS** — Styling
- **JavaScript** — Client-side interactivity
- **Mapbox GL JS** — Interactive map for listing locations

### Cloud & Storage
- **Cloudinary** — Image upload and hosting
- **Render** — Production deployment

### Tools & Libraries
- **Joi** — Data validation
- **Method Override** — HTTP method override for PUT/DELETE requests
- **EJS Mate** — EJS layout engine
- **Multer** — Multipart form data / file uploads
- **Nodemon** — Development server with auto-reload

## 🚀 Live Demo

The app is deployed on **Render**:
> 🔗 _Add your Render deployment URL here_

## 📋 Prerequisites

Before running locally, ensure you have:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally or a remote connection string)
- **npm** (comes with Node.js)
- A **Cloudinary** account (for image uploads)
- A **Mapbox** account (for the map feature)

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret
MONGO_URL=your_mongodb_connection_string
```

## 🖥️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Fill in your values
   ```

4. **Initialize the database with sample data (optional)**
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   npm start
   # or for development with auto-reload
   npx nodemon app.js
   ```

6. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
wanderlust/
├── app.js                    # Main application file
├── schema.js                 # Joi validation schemas
├── package.json              # Project dependencies
├── cloudinary/
│   └── index.js             # Cloudinary configuration
├── models/
│   ├── listing.js           # Listing model
│   ├── review.js            # Review model
│   └── user.js              # User model
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
│       ├── show.ejs         # Listing details page + map
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
| GET | `/listings/new` | Show create listing form (auth required) |
| POST | `/listings` | Create a new listing (auth required) |
| GET | `/listings/:id` | Get listing details + map |
| GET | `/listings/:id/edit` | Show edit listing form (owner only) |
| PUT | `/listings/:id` | Update a listing (owner only) |
| DELETE | `/listings/:id` | Delete a listing (owner only) |

### Reviews
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/listings/:id/reviews` | Create a review (auth required) |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review (author only) |

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/register` | Show registration form |
| POST | `/register` | Create a new user account |
| GET | `/login` | Show login form |
| POST | `/login` | Log in a user |
| GET | `/logout` | Log out the current user |

## 📊 Database Schema

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  image: {
    filename: String,  // Cloudinary public_id
    url: String        // Cloudinary hosted URL
  },
  price: Number,
  location: String,
  country: String,
  geometry: {          // For Mapbox map display
    type: "Point",
    coordinates: [lng, lat]
  },
  reviews: [Review ObjectId],
  owner: User ObjectId
}
```

### Review Model
```javascript
{
  comment: String (required),
  rating: Number (1-5, required),
  createdAt: Date (default: current date),
  author: User ObjectId
}
```

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  // password handled by Passport.js (hashed)
}
```

## ✅ Data Validation

The application uses **Joi** for server-side validation:

- **Listings** must include: title, description, price, country, and location
- **Reviews** must include: comment and rating (1–5)
- Image uploads are handled via Cloudinary with Multer

## 🐛 Error Handling

- Custom `ExpressError` class for consistent error responses
- Async error wrapper to catch promise rejections
- User-friendly validation error messages displayed in the UI

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

- ❤️ Wishlist / saved listings feature
- 💬 Real-time messaging between hosts and guests
- ⚙️ Advanced filtering and search
- 📧 Email notifications for bookings and reviews
- 📅 Booking / availability calendar

### 🗂️ Category Tabs _(UI designed, coming soon)_

The following category tabs are planned and visible in the UI but not yet functional:

| Tab | Description |
|-----|-------------|
| 🔥 Trending | Most popular listings right now |
| 🛏️ Rooms | Private rooms in shared homes |
| 🏙️ Iconic Cities | Stays in world-famous cities |
| ⛰️ Mountains | Listings in mountain destinations |
| 🏰 Castles | Historic castle stays |
| 🏊 Amazing Pools | Properties with stunning pools |
| ⛺ Camping | Outdoor and camping experiences |
| 🌾 Farms | Farm stays and agritourism |
| 🧊 Arctic | Cold-weather and polar stays |
| 🔮 Domes | Unique geodesic dome stays |
| ⛵ Boats | Houseboats and floating stays |

## 📝 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.


**Happy Wandering!** 🌍✈️
