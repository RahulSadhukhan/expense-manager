import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import request from '../../lib/request';
import utils from '../../lib/utils';

const style = theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            password: '',
            email: ''
        }
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { history } = this.props;
        this.setState({ isLoading: true }, async () => {
          try {
            const { data: { token = '' } } = await request.post(utils.getServerUrl('/user/login'), { email, password });
            localStorage.setItem('token', token);
            history.push('/expense-manager/expenses');
          } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
          }
        });
    }

    render () {  
        const { password, email, isLoading } = this.state;
        const { classes, history } = this.props;
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(event) => this.setState({ email: event.target.value })}
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => this.setState({ password: event.target.value })}
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
                  disabled={isLoading}
                  onClick={this.handleSignIn}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link component="p" variant="body2" onClick={() => (history.push('/expense-manager/sign-up'))}>
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
    }
}

export default withStyles(style)(SignIn);
