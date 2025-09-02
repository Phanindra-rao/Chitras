# Chitrasethu - Photography Platform

A collaborative visual and event platform that connects customers with photographers, models, and event organizers.

## 🚀 Features

- **Photographer Discovery**: Browse and filter photographers by category
- **Booking System**: Real-time calendar availability and custom time slots
- **Community Buzz**: Event-based chat and photo sharing
- **Moodboard System**: Create and share vision boards
- **Memory Timeline**: Personalized event timeline
- **Professional Portfolios**: Showcase photographer work

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with custom design system
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Chitrasethu.git
   cd Chitrasethu/Chitras
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Method 1: GitHub Actions (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save

3. **Automatic Deployment**
   - The GitHub Actions workflow will automatically deploy on every push to main
   - Your site will be available at: `https://yourusername.github.io/Chitrasethu`

### Method 2: Manual Deployment

1. **Update package.json homepage**
   ```json
   {
     "homepage": "https://yourusername.github.io/Chitrasethu"
   }
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### Vite Configuration
The project is configured for GitHub Pages deployment with:
- Base path: `/Chitrasethu/`
- Build output: `dist/`
- Source maps disabled for production

### Environment Variables
No environment variables required for basic functionality.

## 📱 Usage

### For Customers
1. **Login/Register** with email
2. **Browse photographers** by category
3. **View portfolios** and book sessions
4. **Join Community Buzz** for events
5. **Create moodboards** for inspiration

### For Photographers
1. **Complete profile** with portfolio
2. **Set availability** and pricing
3. **Manage bookings** and client communication
4. **Share work** in Community Buzz

## 🎨 Design System

The platform uses a comprehensive CSS design system with:
- **Color Palette**: Primary blue, secondary purple
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components
- **Responsive**: Mobile-first design

## 🚀 Performance

- **Lazy Loading**: Images and components
- **Optimized Build**: Minified and compressed assets
- **CDN**: Fast loading from GitHub Pages
- **Caching**: Browser caching enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

**Chitrasethu** - Connecting photographers with their perfect clients! 📸✨
