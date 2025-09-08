import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography, Button, Alert, Container } from "@mui/material";
import {
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <ErrorIcon
                sx={{
                  fontSize: 64,
                  color: "error.main",
                  mb: 2,
                }}
              />

              <Typography variant="h5" component="h1" gutterBottom>
                Something went wrong
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We encountered an unexpected error. Please try refreshing the
                page or contact support if the problem persists.
              </Typography>

              {this.state.error && (
                <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {this.state.error.message}
                  </Typography>
                </Alert>
              )}

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReload}
                >
                  Reload Page
                </Button>

                <Button variant="outlined" onClick={this.handleReset}>
                  Try Again
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
