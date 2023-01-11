import { Modal } from "react-bootstrap";

export default function OfferModal({ show, setOpenOfferModal }) {
	return (
		<>
			<Modal
				show={show}
				onHide={() => setOpenOfferModal(false)}
				aria-labelledby="LoginModal"
				centered>
				<Modal.Body className="bg-white rounded-3 shadow-sm px-4 py-3">
					<p className="mb-0 text-center text-primary">
						We have sent your offer, please wait for the user to
						accept it
					</p>
				</Modal.Body>
			</Modal>
		</>
	);
}