import { Box, LinearProgress } from "@mui/material";

interface ProgressBarProps {
  progress: number;
  max: number;
}

export default function ProgressBar({ progress, max }: ProgressBarProps) {
  const normalizedProgress = (progress / max) * 100;
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={normalizedProgress} />
    </Box>
  );
}
