# CyberTechNinja Medical Dashboard

A modern, responsive medical dashboard application built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing medical studies, patient data, and radiology workflows.

## 🏥 Project Overview

CyberTechNinja Medical Dashboard is a sophisticated web application designed for medical professionals, particularly radiologists and hospital administrators. It features a clean, modern interface with advanced filtering, responsive design, and intuitive navigation.

## ✨ Features

### 🔐 Authentication System
- **Role-based Authentication**: Separate login portals for Hospital/Diagnostic Centers and Radiologists
- **Modern UI**: Animated login pages with gradient backgrounds and smooth transitions
- **Secure Platform**: Enhanced security features with professional styling

### 📊 Medical Dashboard
- **Active Studies Management**: Real-time tracking of ongoing medical studies
- **Completed Studies Archive**: Historical data management and analysis
- **Advanced Filtering**: Search by Order ID, Patient Name, and date ranges
- **Responsive Tables**: Optimized for all screen sizes with horizontal scrolling

### 🎯 Key Functionalities
- **Patient Data Management**: Complete patient information tracking
- **Study Assignment**: Dropdown selection for doctor assignments
- **Priority Management**: Color-coded priority levels (Routine, Normal, Urgent)
- **Date Formatting**: Professional date and time display
- **Action Icons**: Quick access to email, links, documents, and images

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all device sizes
- **Touch-Friendly Interface**: Smooth scrolling and intuitive navigation
- **Hidden Scrollbars**: Clean UI with functional scrolling
- **Adaptive Layout**: Automatic adjustment to screen dimensions

## 🛠️ Tech Stack

### Frontend Framework
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Headless UI primitives
- **React Icons**: Comprehensive icon library

### Routing & Navigation
- **React Router DOM**: Client-side routing and navigation
- **Responsive Sidebar**: Collapsible navigation with smooth animations

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cyber-study-vue-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
cyber-study-vue-main/
├── src/
│   ├── components/
│   │   ├── MedicalDashboard.tsx      # Main dashboard component
│   │   ├── AuthRoleSelect.tsx        # Role selection page
│   │   ├── HospitalAuthPage.tsx      # Hospital login page
│   │   └── RadiologistAuthPage.tsx   # Radiologist login page
│   ├── pages/
│   │   ├── Index.tsx                 # Main page wrapper
│   │   ├── Auth.tsx                  # Authentication wrapper
│   │   ├── HospitalAuth.tsx          # Hospital auth wrapper
│   │   └── RadiologistAuth.tsx       # Radiologist auth wrapper
│   ├── App.tsx                       # Main application component
│   ├── index.css                     # Global styles and CSS variables
│   └── main.tsx                      # Application entry point
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
├── tailwind.config.ts               # Tailwind CSS configuration
├── vite.config.ts                   # Vite build configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6` (Medical Blue)
- **Sidebar**: `#1e293b` (Dark Blue)
- **Background**: `#f8fafc` (Light Gray)
- **Text**: `#374151` (Dark Gray)
- **Borders**: `#e5e7eb` (Light Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Components
- **Buttons**: Consistent styling with hover effects
- **Inputs**: Clean, accessible form controls
- **Tables**: Responsive with proper spacing and borders
- **Cards**: Elevated containers with subtle shadows

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Medical-specific color palette
- Custom animations and keyframes
- Responsive breakpoints
- Component-specific utilities

### TypeScript
- Strict type checking enabled
- Custom type definitions for medical data
- Interface-based component props

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Laptop**: 1024px - 1280px
- **Desktop**: > 1280px

## 🎯 Key Features Implementation

### Authentication Flow
1. **Role Selection**: Users choose between Hospital/Diagnostic Centre or Radiologist
2. **Dedicated Login Pages**: Separate authentication interfaces for each role
3. **Modern UI**: Animated elements, gradients, and professional styling

### Dashboard Features
1. **Data Filtering**: Real-time search and date range filtering
2. **Responsive Tables**: Horizontal scrolling on small screens
3. **Interactive Elements**: Dropdowns, buttons, and action icons
4. **Priority Management**: Color-coded priority levels
5. **Date Formatting**: Professional date and time display

### Responsive Design
1. **Mobile Optimization**: Touch-friendly interface
2. **Hidden Scrollbars**: Clean UI with functional scrolling
3. **Adaptive Layout**: Automatic screen size adjustment
4. **Performance**: Optimized for smooth interactions

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Production Considerations
- Optimized bundle size
- Minified CSS and JavaScript
- Static asset optimization
- Environment variable configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Real-time data synchronization
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with medical systems
- [ ] Enhanced security features
- [ ] Multi-language support

---

**Built with ❤️ by CyberTechNinja Team**
