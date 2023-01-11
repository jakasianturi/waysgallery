import { useContext } from "react";
import { Form, Button, Modal, FormGroup } from "react-bootstrap";
import { AuthModalContext } from "../../context/AuthModalContext";

function LoginModal() {
	// auth modal context
	const { lModal, setLModal, hRModal, message, setMessage } =
		useContext(AuthModalContext);

	const closeLoginModal = () => {
		setLModal(false);
	};

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
					<Form>
						<FormGroup className="mb-3">
							<Form.Control
								type="email"
								placeholder="Email"
								className="bg-secondary border-primary border-2 border"
							/>
						</FormGroup>

						<FormGroup className="mb-3">
							<Form.Control
								type="password"
								placeholder="Password"
								className="bg-secondary border-primary border-2 border"
							/>
						</FormGroup>
						<Button
							variant="primary"
							className="text-white w-100 d-block mb-4"
							type="submit">
							Login
						</Button>
						<p className="text-center">
							Don't have an account? Klik {" "}
							<a
								type="button"
								href="#!"
								className="link text-black fw-bold"
								onClick={() => {
									closeLoginModal(true);
									hRModal(true);
									setMessage(null);
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
export default LoginModal;
