import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // setErrors(data);
      setErrors(["Credentials are invalid"]);
    } else {
        closeModal()
    }
  };

  return (
    <>
      <div className="login-modal">
      <h1 className="login">Log In</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="loginformerrors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </div>
        <label className="form-label2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label className="form-label2">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <button className="submit-button" type="submit">Log In</button>
      </form>
      <button className="submit-button" onClick={() => dispatch(login("demo@aa.io", "password")).then(() => closeModal())}>Demo User</button>
            </div>
    </>
  );
}

export default LoginFormModal;
