import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Image,
	InputGroup,
	Row,
} from "react-bootstrap";
import calendar from "../assets/icons/calendar.svg";
export default function Hired() {
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Form>
					<FormGroup className="mb-3">
						<Form.Control
							type="text"
							placeholder="Title"
							className="bg-secondary border-primary border-2 border"
						/>
					</FormGroup>
					<FormGroup className="mb-3">
						<Form.Control
							className="bg-secondary border-primary border-2 border"
							as="textarea"
							rows="6"
							placeholder="Description Job"
						/>
					</FormGroup>
					<Row className="mb-3">
						<Col md="6">
							<FormGroup>
								<InputGroup className="bg-secondary rounded-3 border-primary border-2 border">
									<Form.Control
										type="text"
										placeholder="Start Project"
										className="bg-transparent"
									/>

									<Button
										type="submit"
										className="btn-link btn-sm px-3 py-2">
										<Image
											src={calendar}
											alt="Calendar Icon"
										/>
									</Button>
								</InputGroup>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<InputGroup className="bg-secondary rounded-3 border-primary border-2 border">
									<Form.Control
										type="text"
										placeholder="End Project"
										className="bg-transparent"
									/>

									<Button
										type="submit"
										className="btn-link btn-sm px-3 py-2">
										<Image
											src={calendar}
											alt="Calendar Icon"
										/>
									</Button>
								</InputGroup>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup className="mb-5">
						<Form.Control
							className="bg-secondary border-primary border-2 border"
							type="number"
							min="0"
							rows="6"
							placeholder="Price"
						/>
					</FormGroup>
					<div className="d-flex gap-3 justify-content-center">
						<Button
							variant="secondary"
							className="text-black px-4 py-2">
							Cancel
						</Button>
						<Button
							variant="primary"
							className="text-white px-4 py-2">
							Bidding
						</Button>
					</div>
				</Form>
			</Container>
		</>
	);
}
