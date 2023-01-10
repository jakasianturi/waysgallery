import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Image,
	Row,
} from "react-bootstrap";
import cloud_computing from "../assets/icons/cloud-computing.svg";
import plus from "../assets/icons/plus.svg";
export default function Upload() {
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Row>
					<Col md="8">
						<div className="position-relative custom-image-input mb-3">
							<div className="desc text-center">
								<Image
									src={cloud_computing}
									alt="Upload"
									width="250"
									height="250"
									className="p-2"
								/>
								<p className="mb-0">
									<span className="text-primary fw-semibold">
										Browse
									</span>{" "}
									to choose a file
								</p>
							</div>
							<Form.Control type="file" className="img-drag" />
						</div>
						<Row className="m-0 mb-3 add-image">
							<Col
								className="preview-add-image custom-border me-2">
								<Image
									src={plus}
									alt="Add"
									width="90"
									height="90"
									className="p-2 mx-auto"
								/>
							</Col>
							<Col
								
								className="preview-add-image custom-border me-2">
								<Image
									src={plus}
									alt="Add"
									width="90"
									height="90"
									className="p-2 mx-auto"
								/>
							</Col>
							<Col
								
								className="preview-add-image custom-border me-2">
								<Image
									src={plus}
									alt="Add"
									width="90"
									height="90"
									className="p-2 mx-auto"
								/>
							</Col>
							<Col
								
								className="preview-add-image custom-border">
								<Image
									src={plus}
									alt="Add"
									width="90"
									height="90"
									className="p-2 mx-auto"
								/>
							</Col>
						</Row>
					</Col>
					<Col md="4" className="px-md-4">
						<FormGroup className="mb-3">
							<Form.Control
								type="text"
								placeholder="Title"
								className="bg-secondary border-primary border-2 border"
							/>
						</FormGroup>
						<FormGroup className="mb-5">
							<Form.Control
								className="bg-secondary border-primary border-2 border"
								as="textarea"
								rows="6"
								placeholder="Description"
							/>
						</FormGroup>
						<div className="d-flex gap-3 justify-content-center">
							<Button
								variant="secondary"
								className="text-black px-4 py-2 btn-sm">
								Cancel
							</Button>
							<Button
								variant="primary"
								className="text-white px-4 py-2 btn-sm">
								Post
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}
