import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const signIn = (username, password) => {
  //console.log("try to sign in w/ username " + username + " and password " + password);
  //check the db to see if account exists
  //if not, show error(?)

  //no auth for now
  localStorage.setItem('rememberMe', true);
  localStorage.setItem('username', true ? username : '');

}

const SignInPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to WishListé
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                onChange={(event) => {
                  setUsername(event.target.value)
                  console.log(username)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value)
                  console.log(password)
                }}
              />
            </Grid>

          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => signIn(username, password)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={() => history.push('/ForgotPassword')}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={() => history.push('/SignUp')}>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

    </Container>
  );
}

export default SignInPage;
