import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useCurrentUser from "../src/hooks/useCurrentUser";
import { useRouter } from "next/router";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Juhis
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(): React.ReactNode {
  const { user, register } = useCurrentUser();

  const router = useRouter();

  React.useEffect(() => {
    if (user.loggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  const classes = useStyles();
  const [loginObject, setLoginObject] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const setEmail = (email: string) => {
    setLoginObject({
      ...loginObject,
      email: email,
    });
  };
  const setName = (name: string) => {
    setLoginObject({
      ...loginObject,
      name: name,
    });
  };
  const setPassword = (password: string) => {
    setLoginObject({
      ...loginObject,
      password: password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your name"
            name="name"
            autoComplete="name"
            autoFocus
            value={loginObject.name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={loginObject.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={loginObject.password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !(
                loginObject.email.length > 0 &&
                loginObject.password.length > 0 &&
                loginObject.name.length > 0
              )
            }
            onClick={async (e) => {
              e.preventDefault();
              await register(
                loginObject.name,
                loginObject.email,
                loginObject.password
              );
              if (user.loggedIn) {
                router.push("/");
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
