import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Error401() {
	// navigate
	const navigate = useNavigate();
	return (
		<>
			<div
				className="d-flex justify-content-center align-items-center min-vh-100">
				<div
					className="bg-white p-4 rounded-3"
					style={{ width: "600px" }}>
					<div className="text-center">
						<h1 className="display-1">401</h1>
						<p className="fs-2">🗿🗿🗿</p>
						<p className="fs-4">Error, Unauthorized.</p>
						<Button
							variant="primary"
							className="text-white btn-sm px-4 py-2"
							onClick={() => navigate(`/`)}>
							Back to Home
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}