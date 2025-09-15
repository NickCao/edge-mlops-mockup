# MLOps Frontend with PatternFly

A modern frontend application built with React, PatternFly design system, and Bun package manager.

## 🚀 Features

- **React 19** - Latest React with modern features
- **PatternFly v6** - Red Hat's open-source design system
- **Bun** - Fast JavaScript runtime and package manager
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety and better developer experience

## 📦 Prerequisites

- [Bun](https://bun.sh/) installed on your system

## 🛠️ Installation

1. **Clone and navigate to the project:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

## 🏃‍♂️ Development

**Start the development server:**
```bash
bun run dev
```

The application will be available at `http://localhost:3000`

**Other useful commands:**
```bash
bun run build      # Build for production
bun run preview    # Preview production build
bun run lint       # Type checking with TypeScript
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # React entry point
│   ├── components/       # Reusable components
│   └── pages/           # Page components
├── dist/                # Build output
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🎨 PatternFly Components

The application demonstrates various PatternFly components:

- **Page Layout** - Main application structure
- **Navigation** - Sidebar navigation with multiple sections
- **Cards** - Content display in card format
- **Gallery** - Grid layout for cards
- **Buttons** - Various button styles
- **Alerts** - Information display

## 📱 Features Included

### Dashboard
- Overview of ML model training jobs
- Performance metrics display
- System health monitoring

### Models
- Model management interface
- Deployment and training controls
- Model registry access

### Users
- User account management
- Permission controls

### Settings
- System configuration
- Platform settings

## 🔧 Customization

The application uses PatternFly's design tokens and components. You can customize:

1. **Themes** - Modify PatternFly CSS variables
2. **Components** - Add new PatternFly components
3. **Layout** - Adjust the page structure
4. **Navigation** - Update sidebar items and routing

## 📚 Learn More

- [PatternFly Documentation](https://www.patternfly.org/)
- [PatternFly React Components](https://www.patternfly.org/components/)
- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request