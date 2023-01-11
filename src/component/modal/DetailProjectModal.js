import { Button, Modal } from "react-bootstrap";

export default function DetailProjectModal({ show, setOpenDetailProjectModal }) {
	return (
		<>
			<Modal
				show={show}
				onHide={() => setOpenDetailProjectModal(false)}
				aria-labelledby="LoginModal"
				centered>
				<Modal.Body className="bg-white rounded-3 shadow-sm px-4 py-3">
					<p className="mb-3">Title : Landing Design</p>
					<p className="mb-4">
						Description : Konsep landing ini mengusung aestetic dan
						enak di pandang
					</p>
					<h5 className="text-primary">Price : 1.000.000</h5>
					<p className="mb-0 d-flex justify-content-end">
						<Button
							variant="danger"
							className="py-2 px-3 btn-sm text-white me-3">
							Cancel
						</Button>
						<Button
							variant="primary"
							className="py-2 px-3  btn-sm text-white">
							Approve
						</Button>
					</p>
				</Modal.Body>
			</Modal>
		</>
	);
}