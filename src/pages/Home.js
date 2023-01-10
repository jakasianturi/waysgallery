import {
	Button,
	Col,
	Container,
	Form,
	Image,
	InputGroup,
	Row,
} from "react-bootstrap";
import search from "../assets/icons/search.svg";
import img1 from "../assets/images/dummy/img1.jpg";
import img2 from "../assets/images/dummy/img2.jpg";
import img3 from "../assets/images/dummy/img3.jpg";
import img4 from "../assets/images/dummy/img4.jpg";
import img5 from "../assets/images/dummy/img5.jpg";
import img6 from "../assets/images/dummy/img6.jpg";
import img7 from "../assets/images/dummy/img7.jpg";

export default function Home() {
	const images = [img1, img2, img3, img4, img5, img6, img7];
	return (
		<>
			<Container className="py-3">
				<Row className="justify-content-between">
					<Col md="2" className="mb-3 mb-md-0">
						<Form>
							<Form.Select
								aria-label="Today"
								className="bg-secondary text-black border-0"
								style={{ width: "150px" }}>
								<option value="today">Today</option>
								<option value="following">Following</option>
							</Form.Select>
						</Form>
					</Col>
					<Col md="3">
						<Form className="d-flex bg-secondary rounded-3">
							<InputGroup>
								<Button
									type="submit"
									className="btn-link btn-sm px-3 py-2">
									<Image src={search} alt="Search Icon" />
								</Button>
								<Form.Control
									type="text"
									className="py-2 bg-transparent shadow-none border-0"
									placeholder="Search"
								/>
							</InputGroup>
						</Form>
					</Col>
				</Row>
				<h5 className="my-4">today's post</h5>
				<div className="mansory-custom">
					{images.map((image, i) => (
						<>
							<Image
								key={i}
								alt="Image"
								src={image}
								className="rounded-3 shadow-sm objectfit-cover border-secondary border border-1"
							/>
						</>
					))}
				</div>
			</Container>
		</>
	);
}
