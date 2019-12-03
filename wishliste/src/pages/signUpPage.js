import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
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

const checkUsername = (username, setUsernameError) => {
  const usernameSplit = username.split("@");
  if (username === "") {
    setUsernameError("empty");
    return false;
  } else if (!username.includes("@") || usernameSplit.length !== 2 || !usernameSplit[1].includes(".")) {
    setUsernameError("nonEmail");
    return false;
  }
  return true;
}

const checkPasswords = (password1, password2, setPassword1Error, setPassword2Error) => {
  var p1_passed = true;

  var containsUpper = false;
  var passArray = password1.split('');
  for (var i = 0; i < passArray.length; i++) {
    if (passArray[i] === passArray[i].toUpperCase()) {
      containsUpper = true;
    }
  }

  function isNumeric(num){
    return !isNaN(num)
  }

  function isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }

  if (password1 === "") {
    setPassword1Error("empty");
    p1_passed = false;
  } else if (password1.length < 8) {
    setPassword1Error("unsafe");
    p1_passed = false;
  } else if (containsUpper === false) {
    setPassword1Error("uppercase");
    p1_passed = false;
  } else if (isNumeric(password1)) {
    setPassword1Error("numeric");
    p1_passed = false;
  } else if (isValid(password1)) {
    setPassword1Error("special");
  }


  if (password2 === "") {
    setPassword2Error("empty");
    return false;
  } else if (password2 !== password1) {
    setPassword2Error("notMatching");
    return false;
  }
  //  else if (password2.length < 8) {
  //   setPassword2Error("unsafe");
  //   return false;
  // }
  // else if (containsUpper === false) {
  //   setPassword2Error("uppercase");
  // } else if (isNumeric(password2)) {
  //   setPassword2Error("numeric");
  //   p1_passed = false;
  // } else if (isValid(password2)) {
  //   setPassword2Error("special");
  // }
  return p1_passed;
}

const signUp = (email, password1, password2, setUsernameError, setPassword1Error, setPassword2Error, history) => {
  setUsernameError("");
  setPassword1Error("");
  setPassword2Error("");
  const goodUsername = checkUsername(email, setUsernameError);
  const goodPasswords = checkPasswords(password1, password2, setPassword1Error, setPassword2Error);

  if (goodUsername && goodPasswords) {
    console.log("sign up w/ username " + email + " and password " + password1);

    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password1);
    axios.post('/api/addNewAccount.php', params)
    .then((response) => {
      if (response.data === 0) {
        console.log("Username already taken");
        setUsernameError("taken");
      } else {
        //redirect to home page
        history.push("/Home");
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
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  let history = useHistory();

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
                error={usernameError!==""}
                helperText={
                  usernameError==="empty"?"Username is required"
                  :usernameError==="nonEmail"?"Username must be an email address"
                  :usernameError==="taken"?"Username is taken"
                  :""
                }
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
                error={password1Error!==""}
                helperText={
                  password1Error==="empty"?"Password is required"
                  :password1Error==="unsafe"?"Password must be at least 8 characters long"
                  :password1Error==="uppercase"?"Password must contain at least 1 upper case character"
                  :password1Error==="numeric"?"Password must contain at least 1 numeric character"
                  :password1Error==="special"?"Password must contain at least 1 special character"
                  :""
                }
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
                error={password2Error!==""}
                helperText={
                  password2Error==="empty"?"Password is required"
                  :password2Error==="notMatching"?"Passwords don't match"
                  :password2Error==="unsafe"?"Password must be at least 8 characters long"
                  :password2Error==="uppercase"?"Password must contain at least 1 upper case character"
                  :password2Error==="numeric"?"Password must contain at least 1 numeric character"
                  :password2Error==="special"?"Password must contain at least 1 special character"
                  :""
                }
              />
            </Grid>

          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => signUp(email, password1, password2, setUsernameError, setPassword1Error, setPassword2Error, history)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => history.push('/')}>
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
