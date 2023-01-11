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
export default function SendProject() {
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Row>
					<Col md="7">
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
									to choose a project
								</p>
							</div>
							<Form.Control type="file" className="img-drag" />
						</div>
						<Row className="m-0 mb-3 add-image">
							<Col className="preview-add-image custom-border me-2">
								<Image
									src={plus}
									alt="Add"
									width="60"
									height="60"
									className="p-2 mx-auto"
								/>
							</Col>
							<Col className="preview-add-image custom-border me-2">
								<Image
									src={plus}
									alt="Add"
									width="60"
									height="60"
									className="p-2 mx-auto"
								/>
							</Col>
							<Col className="preview-add-image custom-border me-2">
								<Image
									src={plus}
									alt="Add"
									width="60"
									height="60"
									className="p-2 mx-auto"
								/>
							</Col>
							<Col className="preview-add-image custom-border">
								<Image
									src={plus}
									alt="Add"
									width="60"
									height="60"
									className="p-2 mx-auto"
								/>
							</Col>
						</Row>
					</Col>
					<Col md="5" className="px-md-4">
						<FormGroup className="mb-5">
							<Form.Control
								className="bg-secondary border-primary border-2 border"
								as="textarea"
								rows="6"
								placeholder="Description"
							/>
						</FormGroup>
						<p className="text-center">
							<Button
								type="submit"
								className="text-white"
								variant="primary">
								Send Project
							</Button>
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
}
