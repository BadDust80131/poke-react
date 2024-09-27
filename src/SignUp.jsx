import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Container,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";

const SignUp = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Typography variant="h4" component="div" gutterBottom>
          Pokemon
        </Typography>
        <Typography variant="h5" gutterBottom>
          Sign up
        </Typography>

        {/* Form */}
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full name"
            name="fullName"
            autoComplete="name"
            autoFocus
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            type="email"
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />

          {/* Checkbox */}
          <FormControlLabel
            control={<Checkbox value="allowEmails" color="primary" />}
            label="I want to receive updates via email."
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>

          {/* Sign In option */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Button href="#" variant="text">
                Sign in
              </Button>
            </Typography>
          </Box>

          {/* Social Sign Up */}
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{ mb: 1 }}
          >
            Sign up with Google
          </Button>
          <Button variant="outlined" startIcon={<FacebookIcon />} fullWidth>
            Sign up with Facebook
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
