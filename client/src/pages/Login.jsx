import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi({
        email,
        password,
      });

      login(data.user, data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    }
  };

  return (
    <main className="content">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;