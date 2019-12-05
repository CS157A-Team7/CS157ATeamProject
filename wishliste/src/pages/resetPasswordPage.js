import React, {useState} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';

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

const checkPasswords = (password1, password2, setPassword1Error, setPassword2Error) => {
  var p1_passed = true;

  var containsUpper = false;
  var containsNumeric = false;
  var passArray = password1.split('');

  function isUpper(str) {
    for (var i = 0; i < passArray.length; i++) {
      if ((passArray[i] === passArray[i].toUpperCase()) && isAlpha(passArray[i])) {
        containsUpper = true;
      }
    }
    console.log(containsUpper)
    return containsUpper;
  }

  function isNumeric(str) {
    for (var i = 0; i < passArray.length; i++) {
      if (passArray[i] == 0 || passArray[i] == 1 || passArray[i] == 2 ||
        passArray[i] == 3 || passArray[i] == 4 || passArray[i] == 5 ||
      passArray[i] == 6 || passArray[i] == 7 || passArray[i] == 8 || passArray[i] == 9) {
        containsNumeric = true;
      }
    }
    console.log(containsNumeric)
    return containsNumeric;
  }

  function isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }

  function isAlpha(str) {
    return /^[a-zA-Z]$/.test(str);
  }

  if (password1 === "") {
    setPassword1Error("empty");
    p1_passed = false;
  }
  if (password1.length < 8) {
    setPassword1Error("unsafe");
    p1_passed = false;
  }
  if (!isNumeric(password1)) {
    setPassword1Error("numeric");
    p1_passed = false;
  }
  if (isValid(password1)) {
    setPassword1Error("special");
  }
  if (!isUpper(password1)) {
    setPassword1Error("uppercase");
    p1_passed = false;
  }


  if (password2 === "") {
    setPassword2Error("empty");
    return false;
  } else if (password2 !== password1) {
    setPassword2Error("notMatching");
    return false;
  }
  return p1_passed;
} 

const setNewPassword = (password1, password2, code, setPassword1Error, setPassword2Error, history) => {
  if (checkPasswords(password1, password2, setPassword1Error, setPassword2Error)) {
    console.log("reset password to " + password1);
    const params = new URLSearchParams();
    params.append('password', password1);
    params.append('code', code);
    axios.post('/api/resetPassword.php', params)
    .then((response) => {
      if(response.data instanceof String)
      {
        console.log(response.data);
      }
      else{
        history.push("/");
      }
    })
    .catch(function(error){
        console.log(error);
    });
    //do db stuff
    //if code is also correct, redirect to sign in page
    
  }
}

const ResetPasswordPage = () => {
  let history = useHistory();
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="code"
                label="Code"
                type="name"
                id="code"
                onChange={(event) => {
                  setCode(event.target.value)
                  console.log(code)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="New Password"
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
            onClick={() => setNewPassword(password1, password2, code, setPassword1Error, setPassword2Error, history)}
          >
            Set new password
          </Button>
        </form>
      </div>

    </Container>
  );
}

export default ResetPasswordPage;