import React, {useState} from 'react';
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
  if (password1 === "") {
    setPassword1Error("empty");
    p1_passed = false;
  } else if (password1.length < 8) {
    setPassword1Error("unsafe");
    p1_passed = false;
  }
  if (password2 === "") {
    setPassword2Error("empty");
    return false;
  } else if (password2 !== password1) {
    setPassword2Error("notMatching");
    return false;
  } else if (password2.length < 8) {
    setPassword2Error("unsafe");
    return false;
  }
  return p1_passed;
} 

const setNewPassword = (password1, password2, setPassword1Error, setPassword2Error, history) => {
  if (checkPasswords(password1, password2, setPassword1Error, setPassword2Error)) {
    console.log("reset password to " + password1);
    //do db stuff
    //if code is also correct, redirect to sign in page
    history.push("/")
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
            onClick={() => setNewPassword(password1, password2, setPassword1Error, setPassword2Error, history)}
          >
            Set new password
          </Button>
        </form>
      </div>

    </Container>
  );
}

export default ResetPasswordPage;