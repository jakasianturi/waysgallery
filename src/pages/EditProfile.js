import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Image,
	Row,
} from "react-bootstrap";
import img1 from "../assets/images/dummy/img1.jpg";
import camera from "../assets/icons/camera.svg";
export default function EditProfile() {
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Row>
					<Col
						md="8"
						className="position-relative custom-image-input p-0">
						{/* <p className="mb-0 desc">
                            <span className="text-primary fw-semibold">
                                Upload
                            </span>{" "}
                            Your Best Art
                        </p> */}

						<Form.Control type="file" className="img-drag" />
						<Image
							src={img1}
							alt="thumbnail"
							className="thumbnail"
						/>
						<Button
							className="mb-0 btn-input text-white"
							variant="primary">
							Change Your Best Art
						</Button>
					</Col>
					<Col md="4" className="px-md-4">
						<div
							className="position-relative mx-auto custom-border rounded-circle mb-3"
							style={{
								height: "180px",
								width: "180px",
							}}>
							<Image
								src={camera}
								alt="Camera"
								width="120"
								height="120"
								className="p-2"
							/>
							<Button
								className="mb-0 btn-input text-white"
								variant="primary">
								Change Avatar
							</Button>
							<Form.Control type="file" className="img-drag" />
						</div>
						<FormGroup className="mb-3">
							<Form.Control
								type="text"
								placeholder="Greeting"
								className="bg-secondary border-primary border-2 border"
							/>
						</FormGroup>
						<FormGroup className="mb-5">
							<Form.Control
								type="text"
								placeholder="Full Name"
								className="bg-secondary border-primary border-2 border"
							/>
						</FormGroup>
						<p className="text-center">
							<Button
								type="submit"
								className="text-white"
								variant="primary">
								Save
							</Button>
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
}
