# Touch - Anonymous Q&A Platform

A modern, anonymous Q&A discussion platform built with React, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication System
- User registration and login
- Secure authentication with localStorage simulation
- Anonymous posting (user identities hidden from other users)

### 💬 Discussion Features
- Create topics with categories
- Anonymous commenting on topics
- Like/dislike functionality for topics and comments
- Heart favorite system for topics

### 🎯 Interactive Elements
- Real-time filtering by category, recent, and hot topics
- Animated UI with Framer Motion
- Responsive design with Tailwind CSS
- Touch branding with custom logo

### 📊 Admin Dashboard
- Statistics overview (topics, users, comments, hot topics)
- Interactive charts showing:
  - Topics created over time
  - Category distribution
  - Most active topics
- Chart.js integration for data visualization

### 🎨 Design & UX
- Modern color palette optimized for discussion platforms
- Smooth animations and transitions
- Mobile-responsive design
- Clean, intuitive interface

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Heroicons
- **State Management**: React Context API
- **Data Persistence**: localStorage (for demo purposes)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd touch-qa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Usage

1. **Registration**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Create Topics**: Start new discussions with categories
4. **Engage**: Comment, like, dislike, and favorite topics anonymously
5. **Filter**: Browse topics by category, recent activity, or popularity
6. **Admin Access**: First registered user gets admin privileges to view dashboard

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── comments/       # Comment-related components
│   ├── common/         # Shared components (logo, etc.)
│   ├── dashboard/      # Admin dashboard components
│   ├── layout/         # Navigation and layout
│   └── topics/         # Topic-related components
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   └── DataContext.tsx # Data state management
└── App.tsx            # Main application component
```

## Features in Detail

### Anonymous System
- Users can see their own posts but others cannot identify the author
- All posts appear as "Anonymous" to other users
- Maintains user engagement tracking for likes/dislikes

### Filtering System
- **All**: Shows all topics chronologically
- **Recent**: Sorts by creation date (newest first)
- **Hot**: Sorts by engagement score (likes + comments + favorites - dislikes)
- **Category**: Filter by topic categories

### Admin Dashboard
- Only available to admin users (first registered user)
- Real-time statistics and charts
- Activity monitoring and engagement metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.