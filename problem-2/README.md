# Problem 2: Currency Swap Application

## Overview

A modern, responsive currency swap application built with React, TypeScript, and Vite. This application allows users to swap cryptocurrencies with real-time exchange rates fetched from the Switcheo Network API.

## Features

- **Real-time Exchange Rates**: Fetches live token prices from Switcheo Network
- **Form Validation**: Comprehensive validation with user-friendly error messages
- **Responsive Design**: Mobile-first design with Material-UI components
- **Loading States**: Smooth loading indicators for better UX
- **Token Selection**: Dropdown selection with token icons, names and symbols
- **Exchange Rate Display**: Shows current exchange rates between selected tokens
- **Swap History**: Displays the last completed swap transaction
- **Error Handling**: Comprehensive error messages and validation

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (for fast development and optimized builds)
- **UI Library**: Material-UI (MUI) v6 with Emotion styling
- **Form Management**: Native React state with HTML5 validation
- **HTTP Client**: Axios for API calls
- **Date/Time**: Moment.js for timestamp formatting
- **Icons**: Material-UI Icons

## Project Structure

```
src/
├── components/
│   └── CurrencySwapForm.tsx # Main swap form component with MUI
├── services/
│   └── api.ts              # API service functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main application component with MUI Theme
├── main.tsx               # Application entry point
└── index.css              # Basic global styles
```

## Key Components

### CurrencySwapForm

The main component that handles:

- Token selection (from/to dropdowns) with icons
- Amount input with validation
- Real-time exchange rate calculation
- Swap functionality with loading states
- Transaction history display

### Form Validation

Using native React state management with HTML5 validation:

- Required token selection
- Positive number validation for amounts
- Maximum amount limits (1,000,000)
- Prevention of same-token swaps
- Real-time error feedback with MUI Alert components

### API Integration

- Fetches token prices from `https://interview.switcheo.com/prices.json`
- Filters tokens with valid prices
- Removes duplicates and uses latest price data
- Adds token icons from Switcheo token repository

## Design Decisions

1. **Material-UI (MUI)**: Using MUI v6 for consistent, accessible, and professional UI components
2. **Responsive Design**: MUI's Grid system and responsive breakpoints for all screen sizes
3. **Real-time Calculations**: Exchange rates update automatically when tokens or amounts change
4. **Loading States**: MUI CircularProgress components for better UX feedback
5. **Error Handling**: MUI Alert components for user-friendly error messages
6. **Theme Customization**: Custom MUI theme with gradient background and modern styling
7. **Accessibility**: MUI components come with built-in accessibility features

## Environment Requirements

Before running the application, ensure you have the following installed:

- **Node.js**: Version 20.19.0 or higher (or 22.12.0+)
  - Check your version: `node --version`
  - Download from: [https://nodejs.org/](https://nodejs.org/)
- **npm**: Version 10.0.0 or higher (comes with Node.js)
  - Check your version: `npm --version`

> **Important**: This project uses Vite 7.x which requires Node.js 20.19+ or 22.12+. If you're using an older version of Node.js, you'll encounter errors when running the development server.

**Note**: This project includes:

- `.npmrc` file with `engine-strict=true` to enforce Node.js version requirements
- `engines` field in `package.json` specifying minimum Node.js and npm versions
- Simplified dependencies using Material-UI instead of multiple UI libraries

### Node.js Version Issues

If you see errors like:

```
You are using Node.js 18.18.2. Vite requires Node.js version 20.19+ or 22.12+
```

or

```
TypeError: crypto.hash is not a function
```

Please upgrade your Node.js version to 20.19.0 or higher.

**Upgrade Options:**

- **Direct Install**: Download Node.js 20+ from [nodejs.org](https://nodejs.org/)
- **Using NVM** (recommended for managing multiple versions):
  - Install NVM: [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
  - Then run: `nvm install 20` and `nvm use 20`

**After upgrading Node.js, clean reinstall dependencies:**

```bash
# Remove existing node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies with correct Node.js version
npm install
```

## Running the Application

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:

   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## API Endpoints Used

- **Token Prices**: `https://interview.switcheo.com/prices.json`
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`

## Future Enhancements

- Add dark mode support
- Implement slippage tolerance settings
- Add transaction history persistence
- Include more detailed token information
- Add price charts and historical data
- Implement wallet connection
- Add more sophisticated error handling
- Include unit and integration tests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Built with ❤️ using modern web technologies
