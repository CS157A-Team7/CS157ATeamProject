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


const validateInput = (username, password) => {
  axios.get('/api/sign_in.php', {
    params: {
      username: username,
      password: password
    }
  })
  .then((response) => {
    if (response.data === 1) {
      signIn(username, password);
    };
    console.log(response.data);
  })
  .catch(function(error) {
    //erase input fields & show error on frontend too
    console.log(error);
    document.getElementById('myForm').reset();
    alert('Incorrect login details. Please check your username/password and try again.');
  });
  console.log("done with validateInput function");
}

// const wipeInputFields = () => {
//   //username = x;
//   //setPassword(y);
//   //this.refs.wipeMe.$username = x;
//   //document.getElementById('wipeMe').innerHTML = 'rubberduck';
//   document.getElementById('myForm').reset(); //WORKS
//
// }

// const setDbChange = (username, password) => {
//   if(this.state.dbChange){
//     params.append(username, password);
//     axios.post('/api/sign_in.php', params)
//     .then((response) => {
//       if (response.data == 1) {
//         this.setState({ results:response.data });
//         console.log(this.state.results)
//       }
//
//       // if(response.data == 1) {
//       //   //allow the cookie setting
//       //   //echo ("it worked yall");
//       //   console.log("it worked Yall");
//       // }
//       // else {
//       //   //do not allow cookie to be set & throw error message
//       //   //echo ("it did not work yall");
//       //   console.log("it workedn't Yall");
//       //}
//     })
//     .catch(function(error){
//         console.log(error);
//     });
//
//     this.setState({dbChange: false});
//   }
// }


const setCookie = (cname, cvalue, exhours) => {
  var d = new Date();
  d.setTime(d.getTime() + (exhours*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  localStorage.setItem('wishliste', cname + "=" + cvalue + ";" + expires + ";path=/");
}

// const hashBrown = () => {
// }

//const getCookie = () => {
  //var theCookie = localStorage.getItem('wishliste');
  //console.log(username);
//}

const signIn = (username, password) => {
  //console.log("try to sign in w/ username " + username + " and password " + password);
  //check the db to see if account exists
  //if not, show error(?)


  var cookie = setCookie(username, username, 3)

  //localStorage.setItem('rememberMe', true);
  //localStorage.setItem('username', true ? username : '');
}

const logMeOut = () => {
  //localStorage.clear();
  localStorage.removeItem('wishliste');

//   //no auth for now
//   localStorage.setItem('rememberMe', true);
//   localStorage.setItem('username', true ? username : '');

}

const SignInPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dbChange, setDbChange] = useState("");

  const [inpUser, setInpUser] = useState("");
  const [inpPass, setInpPass] = useState("");

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
                  console.log(username)
                }}
                //onChange={(e)=>{this.setInpUser({text1: e.target.value})}}
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
            //onClick={() => signIn(username, password)}
            onClick={() => validateInput(username, password)}
          >
            Sign In
          </Button>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => logMeOut()}
          >
           Log out
          </Button>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => console.log(username)}
          >
           print out the username in the console
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => console.log("Go to forgot password page")}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => console.log("Go to sign up page")}>
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
