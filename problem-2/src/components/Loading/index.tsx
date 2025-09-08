import { Box, CircularProgress, Typography } from "@mui/material";
import { loadingStyles } from "./styles";

interface LoadingProps {
  message?: string;
  size?: number;
}

export function Loading({ message = "Loading...", size = 60 }: LoadingProps) {
  return (
    <Box sx={loadingStyles.container}>
      <CircularProgress size={size} sx={loadingStyles.spinner} />
      {message && (
        <Typography variant="h6" sx={loadingStyles.text}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
