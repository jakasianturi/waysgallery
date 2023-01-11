import { Button, Col, Container, Image, Row } from "react-bootstrap";
import avatar from "../assets/images/avatar.png";
import img3 from "../assets/images/dummy/img3.jpg";
import img6 from "../assets/images/dummy/img6.jpg";
import img5 from "../assets/images/dummy/img5.jpg";
import img4 from "../assets/images/dummy/img4.jpg";
import img2 from "../assets/images/dummy/img2.jpg";
import rectangle from "../assets/shapes/rectangle.svg"
export default function Profile() {
    return (
		<>
			<div className="position-relative min-vh-100 bg-shape">
				<div
					className="icon-shape rectangle"
					style={{ top: "0", right: "0" }}>
					<img
						className="mw-100"
						src={rectangle}
						alt="WaysGallerry"
					/>
				</div>
				<Container className="py-5">
					<Row>
						<Col md="4" className="z-index-max mb-3 mb-md-0">
							<Image
								src={avatar}
								alt="WaysGallery"
								className="d-block rounded-circle objectfit-cover mb-3"
								width="90"
								height="90"
							/>
							<h5 className="mb-4">Radif Ganteng</h5>
							<h1 className="mb-5">Welcome To My Art</h1>
							<Button
								variant="primary"
								className="text-white px-4 py-2 btn-sm">
								Edit Profile
							</Button>
						</Col>
						<Col md="8" className="z-index-max">
							<Image
								className="mw-100 h-100"
								width="600"
								src={img4}
								alt="project images"
							/>
						</Col>
					</Row>
				</Container>
			</div>
			<Container className="py-5">
				<h5 className="mb-4">Geralt Works</h5>
				<Row>
					<Col md="3" className="mb-3">
						<div className="img-card rounded-3 overflow-hidden">
							<Image
								alt="Image"
								src={img6}
								className="rounded-3 w-100 h-100 mw-100 shadow-sm objectfit-cover"
							/>
							<div className="overlay"></div>
						</div>
					</Col>
					<Col md="3" className="mb-3">
						<div className="img-card rounded-3 overflow-hidden">
							<Image
								alt="Image"
								src={img5}
								className="rounded-3 w-100 h-100 mw-100 shadow-sm objectfit-cover"
							/>
							<div className="overlay"></div>
						</div>
					</Col>
					<Col md="3" className="mb-3">
						<div className="img-card rounded-3 overflow-hidden">
							<Image
								alt="Image"
								src={img4}
								className="rounded-3 w-100 h-100 mw-100 shadow-sm objectfit-cover"
							/>
							<div className="overlay"></div>
						</div>
					</Col>
					<Col md="3" className="mb-3">
						<div className="img-card rounded-3 overflow-hidden">
							<Image
								alt="Image"
								src={img2}
								className="rounded-3 w-100 h-100 mw-100 shadow-sm objectfit-cover"
							/>
							<div className="overlay"></div>
						</div>
					</Col>
					<Col md="3" className="mb-3">
						<div className="img-card rounded-3 overflow-hidden">
							<Image
								alt="Image"
								src={img3}
								className="rounded-3 w-100 h-100 mw-100 shadow-sm objectfit-cover"
							/>
							<div className="overlay"></div>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}