import React, { Component } from 'react';
import './TestPLDStack.css';
import { Grid, Button, Snackbar, IconButton } from '@material-ui/core';
import { UserContext } from '../../../contexts/UserContext';
import LSTokenService from '../../../services/LSTokenService';

class TestPLDStack extends Component {
  static contextType = UserContext;

  state = {
    snackBarOpen: false,
    snackBarMessage: '',
  };
  componentDidMount() {}

  manualLogin = () => {
    this.context.auth(
      {
        username: 'Homer',
        password: '1234',
      },
      { type: 'AUTH_MANUAL_LOGIN' }
    );
    this.setSnackMessge('AUTH_MANUAL_LOGIN SENT, check log');
    this.snackBarOpen();
  };

  autoLogin = () => {
    this.context.auth(
      {
        username: LSTokenService.getUsername(),
        token: LSTokenService.getToken(),
      },
      { type: 'AUTH_AUTO_LOGIN' }
    );
    this.setSnackMessge('AUTH_AUTO_LOGIN SENT, check log');
    this.snackBarOpen();
  };
  isAuth = () => {
    const message =
      this.context.isAuth !== '' ? this.context.isAuth : 'NOT_AUTH';
    if (this.context != null) this.setSnackMessge('isAuth: ' + message);

    this.snackBarOpen();
  };
  token = () => {
    this.setSnackMessge('token: ' + this.context.token);
    this.snackBarOpen();
  };
  username = () => {
    this.setSnackMessge('username: ' + this.context.username);
    this.snackBarOpen();
  };
  homeAlias = () => {
    this.setSnackMessge('home-alias: ' + this.context.homeAlias);
    this.snackBarOpen();
  };
  isAdmin = () => {
    this.setSnackMessge(
      'user-type: ' + this.context.isAdmin ? 'admin' : 'user'
    );
    this.snackBarOpen();
  };
  alter = () => {
    this.setSnackMessge('alter request sent, check console');
    this.snackBarOpen();
  };

  snackBarOpen = () => {
    this.setState({ snackBarOpen: true });
  };
  snackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };
  setSnackMessge = (message) => {
    this.setState({ snackBarMessage: message });
  };
  render() {
    return (
      <div className="test-pldstack">
        <div className="containers">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="full"
          >
            <h1 className="title">Test: Protocol layer design</h1>
            <h2 className="subtitle">individual layer per-request testing</h2>
            <div className="buttons-wrapper">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2 className="category">Auth:</h2>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.manualLogin}
                >
                  manual-login
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.autoLogin}
                >
                  auto-login
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.logOut}
                >
                  log-out
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2 className="category">state:</h2>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.isAdmin}
                >
                  user-type
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.isAuth}
                >
                  is-auth
                </Button>
                <Button variant="outlined" color="primary" onClick={this.token}>
                  token
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.username}
                >
                  username
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.homeAlias}
                >
                  home-alias
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2 className="category">gadgets:</h2>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.setSnackMessge('check console');
                    this.snackBarOpen();
                  }}
                >
                  gadget-groups
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.setSnackMessge('check console');
                    this.snackBarOpen();
                  }}
                >
                  gadget-list
                </Button>
                <Button variant="outlined" color="primary" onClick={this.alter}>
                  alter-state
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2 className="category">exceptions:</h2>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.context.auth(
                      {
                        username: 's',
                        password: 's',
                      },
                      { type: 'AUTH_MANUAL_LOGIN' }
                    );
                    this.setSnackMessge('check console');
                    this.snackBarOpen();
                  }}
                >
                  AUTH-ERROR
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.setSnackMessge('check console');
                    this.snackBarOpen();
                  }}
                >
                  exception
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2 className="category">miscs:</h2>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.setSnackMessge('ping sent');
                    this.snackBarOpen();
                  }}
                >
                  ping
                </Button>
              </Grid>
            </div>
          </Grid>

          <Snackbar
            open={this.state.snackBarOpen}
            autoHideDuration={3000}
            onClose={this.snackBarClose}
            message={this.state.snackBarMessage}
            action={[
              <IconButton
                key="close"
                arial-label="Close"
                onClick={this.snackBarClose}
              >
                x
              </IconButton>,
            ]}
          />
        </div>
      </div>
    );
  }
}

export default TestPLDStack;
