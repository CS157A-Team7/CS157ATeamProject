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

import axios from 'axios';

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
    marginTop: theme.spacing(10),
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


const validateInput = (username, password, props, history, setPasswordError) => {
  axios.get('/api/sign_in.php', {
    params: {
      username: username,
      password: password
    }
  })
  .then((response) => {
    if (response.data === 1) {
      signIn(username, password);
      //redirect to home page
      props.toggleLogIn();
      props.setUsername(username);
      history.push("/Home");
    } else {
      setPasswordError(true);
    }
  })
  .catch(function(error) {
    //erase input fields & show error on frontend too
    document.getElementById('myForm').reset();
    // alert('Incorrect login details. Please check your username/password and try again.');
  });
}

const setCookie = (cname, cvalue, exhours) => {
  var d = new Date();
  d.setTime(d.getTime() + (exhours*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  localStorage.setItem('wishliste', cname + "=" + cvalue + ";" + expires + ";path=/");
}

const signIn = (username, password) => {
  var cookie = setCookie(username, username, 3)
}

const SignInPage = props => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
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
        <form className={classes.form} noValidate id='myForm'>
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
                }}
                error={passwordError}
                helperText={passwordError?"Incorrect login details. Please check your username/ password and try again.":""}
              />
            </Grid>

          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => validateInput(username, password, props, history, setPasswordError)}
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
