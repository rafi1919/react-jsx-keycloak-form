import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      // Add your authentication logic here
      // For simplicity, we'll just check if the username and password are both "admin"
      if (username === "admin" && password === "admin") {
        navigate("/dashboard"); // Navigate to the dashboard route
      } else {
        alert("Invalid username or password");
      }
    };
  
    return (
      <div className="login">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  export default Login;
  