import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Passwords must match",
			]);
		}
	};

	return (
		<>
			<div className="signup-modal">

			<h1 className="sign-up">Sign Up</h1>
			<form className='form' onSubmit={handleSubmit}>
				<ul className="signuperrors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
						))}
				</ul>
				<label className="form-label">
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						title='Please use a valid email'
						required
						/>
				</label>
				<label className="form-label">
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						pattern="[a-zA-Z ]*"
						maxLength={15}
						title='First Name must only include characters'
						required
						/>
				</label>
				<label className="form-label">
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						pattern="[a-zA-Z0-9 ]*"
						maxLength={15}
						title='Last Name must only include characters'
						required
						/>
				</label>
				<label className="form-label">
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
				</label>
				<label className="form-label">
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						/>
				</label>
				<button className="submit-button" type="submit">Sign Up</button>
			</form>
						</div>
		</>
	);
}

export default SignupFormModal;
