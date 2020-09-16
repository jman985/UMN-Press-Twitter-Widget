import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={10}
                className="login-background"
              >
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Register New User
                  </Typography>
                </Grid>

                <Grid item>
                  <form className="form" onSubmit={this.registerUser}>
                    <Grid container direction="column" spacing={4}>
                      <Grid item>
                        <TextField
                          type="string"
                          placeholder="Type in a User Name"
                          fullWidth
                          style={{ width: "100%" }}
                          name="username"
                          variant="outlined"
                          value={this.state.username}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          size="normal"
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Type in Secure Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={this.state.password}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="submit"
                          className="button-block"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item>
                  <center>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
                      }}
                    >
                      Login
                    </button>
                  </center>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);
