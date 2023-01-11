import { Form, Button, Modal, FormGroup } from "react-bootstrap";
import { useContext } from "react";
import { AuthModalContext } from "../../context/AuthModalContext";


function RegisterModal() {

	// auth modal context
	const { rModal, hLModal, setRModal, message, setMessage } = useContext(AuthModalContext);

	const closeRegisterModal = () => {
		setRModal(false);
	};
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
						<FormGroup className="mb-3">
							<Form.Control
								type="text"
								placeholder="Full Name"
								className="bg-secondary border-primary border-2 border"
							/>
						</FormGroup>

						<Button
							variant="primary"
							className="text-white w-100 d-block rounded-3 mb-4"
							type="submit">
							Register
						</Button>
						<p className="text-center">
							Already have an account ? Klik {" "}
							<a
								type="button"
								href="#!"
								className="link text-black fw-bold"
								onClick={() => {
									closeRegisterModal(true);
									hLModal(true);
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
export default RegisterModal;
