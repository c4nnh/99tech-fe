import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, Typography } from "@mui/material";
import { CurrencySwapForm } from "./components/CurrencySwapForm";
import { ErrorBoundary } from "./components/ErrorBoundary";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontSize: "1rem",
        },
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ width: "100vw" }}>
          <Box
            sx={{
              minHeight: "100vh",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                px: 2,
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: "white",
                  mb: 2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Currency Swap
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "600px",
                  mx: "auto",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Swap your cryptocurrencies instantly with real-time exchange
                rates.
              </Typography>
            </Box>

            {/* Main Content - Centered */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
              }}
            >
              <CurrencySwapForm />
            </Box>

            {/* Footer */}
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 1,
                }}
              >
                Data from Switcheo Network
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                © 2025 Can Ngo. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
