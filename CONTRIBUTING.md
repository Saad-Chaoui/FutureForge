<div align="center">
  <h1>Contributing to FutureLabs AI</h1>
  <p>First of all, thank you for considering contributing to our project! 🎉</p>
</div>

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Pull Requests](#pull-requests)
- [Development Workflow](#development-workflow)
  - [Setting Up](#setting-up)
  - [Style Guidelines](#style-guidelines)
  - [Commit Messages](#commit-messages)
- [Project Structure](#project-structure)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand what behaviors will and will not be tolerated.

## 🤔 How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue using our bug report template. Include:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, etc.)

### Suggesting Features

We love new ideas! For feature suggestions:

- Use the feature request template
- Describe the feature in detail
- Explain the use case and benefits
- Include mockups or diagrams if relevant

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

**Working on your first Pull Request?** Check out [First Contributions](https://github.com/firstcontributions/first-contributions) for helpful tutorials.

## ⚙️ Development Workflow

### Setting Up

1. Clone the repository
   ```bash
   git clone https://github.com/Saad-Chaoui/futurelabs-ai.git
   cd futurelabs-ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables as described in the README.md

4. Start the development server
   ```bash
   npm run dev
   ```

### Style Guidelines

- **TypeScript/JavaScript**: We follow the Airbnb style guide with some modifications
- **CSS/SCSS**: We use TailwindCSS with component-focused design
- **React**: Functional components with hooks are preferred

We use ESLint and Prettier for code formatting. Run `npm run lint` to check your code before submitting.

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) standard:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding/modifying tests
- `chore:` for maintenance tasks

Examples:
- `feat: add AI recommendation component`
- `fix: resolve scrolling issue in chat interface`

## 📂 Project Structure

```
futurelabs-ai/
├── client/            # Frontend React application
│   ├── public/        # Static assets
│   └── src/           # Source files
│       ├── components/  # React components
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility functions and services
│       └── pages/       # Page components
├── server/            # Backend Express server
│   ├── services/      # Service modules
│   └── routes.ts      # API routes
└── shared/            # Shared code between client and server
    └── schema.ts      # Type definitions
```

## 🎨 Design Guidelines

- **Colors**: Use the provided color palette from theme.json
- **Animation**: Keep animations subtle and purposeful
- **Accessibility**: Maintain WCAG 2.1 AA compliance
- **UI Components**: Use ShadCN components wherever possible

---

<div align="center">
  <sub>Thanks for contributing! 💙</sub>
</div>