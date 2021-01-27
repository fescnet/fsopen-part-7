import React from 'react'
import { useDispatch } from 'react-redux'
import { loginServer } from '../reducers/loginReducer'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useField from '../hooks'

const Login = () => {

  const dispatch = useDispatch()
  const username = useField('text', 'Username', 'username')
  const password = useField('password', 'Password', 'password')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginServer(username.value, password.value))
    username.reset()
    password.reset()
  }

  const useStyles = makeStyles((theme) => ({
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="Username"
              {...username}
              reset=''
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="Password"
              {...password}
              reset=''
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            id="login_button">
            login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
