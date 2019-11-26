import React, {useState} from 'react';
import axios from 'axios';
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

const signUp = (email, password1, password2, setUsernameError) => {
  if (password1 === password2) {
    console.log("sign up w/ username " + email + " and password " + password1);

    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password1);
    axios.post('/api/addNewAccount.php', params)
    .then((response) => {
      if (response.data === 0) {
        console.log("Username already taken");
        setUsernameError(true);
      } else {
        //redirect to home page
      }
      console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
  }
}

const SignUpPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up for WishListé!
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address (Username)"
                name="email"
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value)
                  console.log(email)
                }}
                error={usernameError}
                helperText={usernameError?"Username is taken":""}
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
                  setPassword1(event.target.value)
                  console.log(password1)
                }}
              />
            </Grid>
            <Grid item xs={12}> 
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword2(event.target.value)
                  console.log(password2)
                }}
                error={password2!==""&&password1!==password2}
                helperText={password2!==""&&password1!==password2?"Passwords don't match":""}
              />
            </Grid>

          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => signUp(email, password1, password2, setUsernameError)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => console.log("Go to sign in page")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}

export default SignUpPage;