import React, { Component, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface RegistrationState {
  username: string;
  password: string;
  password_confirmation: string;
  registrationErrors: string;
}

export default class Registration extends Component<{}, RegistrationState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event: FormEvent) {
    const { username, password, password_confirmation } = this.state;

    axios
      .post(
        "https://omerinanc.online/registrations",
        {
          user: {
            username: username,
            password: password,
            password_confirmation: password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          console.log("Registration data", response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  render() {
    return (
      <div style={{ marginLeft: 300, marginTop: 20 }}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="username"
              name="username"
              placeholder="Username"
              required
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              required
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-sm">
            Register
          </button>
          <p>
            Have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}
