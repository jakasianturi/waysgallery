import { Form, Button, Modal, FormGroup, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthModalContext } from "../../context/AuthModalContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { API, setAuthToken } from "../../config/api";
import { useMutation } from "react-query";
import BtnLoader from "../feature/BtnLoader";
import { useNavigate } from "react-router-dom";

export default function RegisterModal() {
	// auth modal context
	const { rModal, hLModal, setRModal, message, setMessage } =
		useContext(AuthModalContext);

	const closeRegisterModal = () => {
		setMessage(null);
		setErrorForm(null);
		setRModal(false);
	};

	// sweetalert
	const MySwal = withReactContent(Swal);
	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);

	// init form state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [errorForm, setErrorForm] = useState(null);

	// state userContect
	const [state, dispatch] = useContext(UserContext);

	// navigate
	const navigate = useNavigate();

	// submit form data
	const handleOnSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();

			setBtnLoader(true);

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			// Data body
			const body = JSON.stringify({
				email,
				password,
				fullName,
			});
			// Insert data user to database
			const response = await API.post("register", body, config);
			// Notification
			if (response.data.status === "success") {
				MySwal.fire({
					icon: "success",
					title: "Successfully registration.",
					showConfirmButton: false,
					timer: 1500,
				});
				// Send data to useContext
				dispatch({
					type: "LOGIN_SUCCESS",
					payload: response.data.data.user,
				});
				setAuthToken(response.data.data.user.token);
				setEmail("");
				setPassword("");
				closeRegisterModal(true);
				hLModal(true);
				setBtnLoader(false);
				setMessage(null);
				navigate("/");
			} else {
				const alert = (
					<Alert variant="danger" className="py-2 fs-sm">
						There is an error. Check your field again!
					</Alert>
				);
				setMessage(alert);
				setBtnLoader(false);
			}
		} catch (error) {
			const alert = (
				<Alert variant="danger" className="py-2 fs-sm">
					There is an error. Check your field again!
				</Alert>
			);
			setErrorForm(error.response.data);
			setMessage(alert);
			setBtnLoader(false);
		}
	});

	// console.log(errorForm);
	return (
		<>
			<Button
				variant="primary"
				className="text-white px-4 py-2"
				onClick={setRModal}>
				Join Now
			</Button>
			<Modal
				show={rModal}
				onHide={setRModal}
				aria-labelledby="RegisterModal"
				className="custom-modal"
				centered>
				<Modal.Body className="bg-white rounded-3 shadow-sm py-5 px-md-4">
					<h2 className="text-primary mb-3">Register</h2>
					<Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
						{message && message}
						<FormGroup className="mb-3">
							<Form.Control
								type="text"
								placeholder="Email"
								isInvalid={
									errorForm && errorForm.message?.email
								}
								className={`bg-secondary border-primary border-2 border`}
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								{errorForm &&
									(errorForm.message.email?.required ||
										errorForm.message.email?.email ||
										errorForm.message?.email)}
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup className="mb-3">
							<Form.Control
								type="password"
								placeholder="Password"
								className="bg-secondary border-primary border-2 border"
								value={password}
								onChange={(event) =>
									setPassword(event.target.value)
								}
								isInvalid={
									errorForm && errorForm.message?.password
								}
							/>
							<Form.Control.Feedback type="invalid">
								{errorForm &&
									errorForm.message.password?.required}
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup className="mb-3">
							<Form.Control
								type="text"
								placeholder="Full Name"
								className="bg-secondary border-primary border-2 border"
								value={fullName}
								onChange={(event) =>
									setFullName(event.target.value)
								}
								isInvalid={
									errorForm && errorForm.message?.fullName
								}
							/>
							<Form.Control.Feedback type="invalid">
								{errorForm &&
									errorForm.message.fullName?.required}
							</Form.Control.Feedback>
						</FormGroup>

						<Button
							variant="primary"
							className="text-white w-100 d-block rounded-3 mb-4"
							type="submit"
							onClick={(e) => handleOnSubmit.mutate(e)}
							disabled={btnLoader}>
							{!btnLoader ? "" : <BtnLoader />} Register
						</Button>
						<p className="text-center">
							Already have an account ? Klik{" "}
							<a
								type="button"
								href="#!"
								className="link text-black fw-bold"
								onClick={() => {
									setMessage(null);
									setErrorForm(null);
									closeRegisterModal(true);
									hLModal(true);
								}}>
								Here
							</a>
						</p>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
