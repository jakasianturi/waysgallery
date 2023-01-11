import { Button, Image, Modal } from "react-bootstrap";
import img1 from "../../assets/images/dummy/img1.jpg";
export default function DownloadModal({ show, setOpenDownloadModal }) {
	return (
		<>
			<Modal
				show={show}
				onHide={() => setOpenDownloadModal(false)}
				aria-labelledby="LoginModal"
				size="xl"
				centered>
				<Modal.Body className="bg-white rounded-3 shadow-sm px-4 py-3">
					<Image src={img1} style={{ height: "400px" }} className="d-block mx-auto rounded-3 shadow-sm w-100 objectfit-cover my-4" alt="Download Image" />
					<p className="text-center">
						<Button
							variant="primary"
							className="text-white px-4 py-2">
							Download
						</Button>
					</p>
				</Modal.Body>
			</Modal>
		</>
	);
}