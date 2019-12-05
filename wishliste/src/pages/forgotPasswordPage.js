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
import axios from 'axios';

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

// const resetPassword = (username) => {
//   //check to see if username is in db
//   //if it is, go to next page(?)
//   //if it isn't, print error here
//   console.log("reset password for account w/ username " + username);
// }

const ForgotPasswordPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const resetPassword = () => {
    axios.get('/api/forgotPassword.php', {
      params: {
        username: username
      }
    })
    .then((response) => {
      if(response.data===1){
        //send email
        history.push("/EmailSent");
      } else {
        setUsernameError(true);
      }
      console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
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
                error={usernameError}
                helperText={usernameError?"Username doesn't exist":""}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => resetPassword()}
          >
            Continue
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => history.push('/')}>
                Didn't mean to come here?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}

export default ForgotPasswordPage;