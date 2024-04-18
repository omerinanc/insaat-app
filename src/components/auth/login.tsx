import React, { ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

interface LoginProps {
  handleSuccessfulAuth: (data: any) => void;
  handleSuccessfulDoctorAuth: (data: any) => void;
  handleLogin: () => void;
  // Make updateLoginStatus an optional prop
  updateLoginStatus?: (status: boolean) => void;
}

interface LoginState {
  username: string;
  password: string;
  loginErrors: string;
}

const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [state, setState] = React.useState<LoginState>({
    username: "",
    password: "",
    loginErrors: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { username, password } = state;
    axios
      .post(
        "https://omerinanc.online/sessions",
        {
          user: {
            username: username,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in && response.data.user) {
          // Check if the user is successfully logged in
          if (response.data.user.patient) {
            props.handleSuccessfulAuth(response.data);
            console.log("Patient is logged in.", response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Check if the updateLoginStatus function is defined before calling it
            if (props.updateLoginStatus) {
              props.updateLoginStatus(true);
            }

            // Redirect to the dashboard after successful login
            navigate("/dashboard");
          } else {
            props.handleSuccessfulDoctorAuth(response.data);
            console.log("Doctor is logged in.", response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Check if the updateLoginStatus function is defined before calling it
            if (props.updateLoginStatus) {
              props.updateLoginStatus(true);
            }

            // Redirect to the dashboard after successful login
            navigate("/dashboard");
          }
        } else {
          // Handle other possible scenarios (e.g., invalid login)
          console.log("Can't login");
          setState({ ...state, loginErrors: "Invalid username or password." });
        }
      })
      .catch((error) => {
        console.log("Login error", error);
        setState({
          ...state,
          loginErrors: "An error occurred during login. Please try again.",
        });
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      {state.loginErrors && (
        <div className="alert alert-danger">{state.loginErrors}</div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 10,
          marginLeft: 210,
          overflow: "initial",
        }}
      >
        <div className="form-group">
          <input
            className="form-control"
            type="username"
            name="username"
            placeholder="Username"
            required
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
