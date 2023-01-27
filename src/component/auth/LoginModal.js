import { useContext, useState } from "react";
import { Form, Button, Modal, FormGroup, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { AuthModalContext } from "../../context/AuthModalContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../feature/BtnLoader";

export default function LoginModal() {
	// auth modal context
	const { lModal, setLModal, hRModal, message, setMessage } =
		useContext(AuthModalContext);
	const closeLoginModal = () => {
		setMessage(null);
		setLModal(false);
	};

	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);

	// sweetalert
	const MySwal = withReactContent(Swal);

	// init form state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// state userContect
	const [state, dispatch] = useContext(UserContext);

	// navigate
	const navigate = useNavigate();

	// submit form data
	const handleOnSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();

			setBtnLoader(true)

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			// Data body
			const body = JSON.stringify({
				email,
				password,
			});

			// Insert data user to database
			const response = await API.post("login", body, config);
			// Notification
			if (response.data.status === "success") {
				MySwal.fire({
					icon: "success",
					title: "Successfully login.",
					showConfirmButton: false,
					timer: 1500,
				});
				// Send data to useContext
				dispatch({
					type: "LOGIN_SUCCESS",
					payload: response.data.data.user,
				});
				setAuthToken(response.data.data.user.token);
				setEmail("")
				setPassword("")
				setMessage(null)
				setBtnLoader(false);
				navigate("/home");
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
					There is an error. Check your field again! <br />
					<strong>{error.response.data.message}</strong>
				</Alert>
			);
			setMessage(alert);
			setBtnLoader(false);
		}
	});

	return (
		<>
			<Button
				variant="secondary"
				className="text-black px-4 py-2"
				onClick={setLModal}>
				Login
			</Button>
			<Modal
				show={lModal}
				onHide={setLModal}
				aria-labelledby="LoginModal"
				className="custom-modal"
				centered>
				<Modal.Body className="bg-white rounded-3 shadow-sm py-5 px-md-4">
					<h2 className="text-primary mb-3">Login</h2>
					<Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
						{message && message}
						<FormGroup className="mb-3">
							<Form.Control
								type="email"
								placeholder="Email"
								className="bg-secondary border-primary border-2 border"
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
							/>
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
							/>
						</FormGroup>
						<Button
							variant="primary"
							className="text-white w-100 d-inline-block mb-4 "
							type="submit"
							onClick={(e) => handleOnSubmit.mutate(e)}
							disabled={btnLoader}>
							{!btnLoader ? "" : <BtnLoader />} Login
						</Button>
						<p className="text-center">
							Don't have an account? Klik{" "}
							<a
								type="button"
								href="#!"
								className="link text-black fw-bold"
								onClick={() => {
									setMessage(null);
									closeLoginModal(true);
									hRModal(true);
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
