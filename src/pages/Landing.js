import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../assets/images/logo.svg"
import programmer from "../assets/images/programmer.svg"
import shape1 from "../assets/shapes/shape1.svg"
import shape2 from "../assets/shapes/shape2.svg"
import shape3 from "../assets/shapes/shape3.svg"
import LoginModal from "../component/auth/LoginModal";
import RegisterModal from "../component/auth/RegisterModal";

export default function Landing(){
    return (
		<>
			<div className="position-relative d-flex justify-content-center align-items-center min-vh-100">
				<div
					className="icon-shape shape1"
					style={{ top: "0", left: "0" }}>
					<img
						className="mw-100"
						width="200"
						src={shape1}
						alt="WaysGallerry"
					/>
				</div>
				<div
					className="icon-shape shape2"
					style={{ bottom: "0", left: "0" }}>
					<img
						width="200"
						className="mw-100"
						src={shape2}
						alt="WaysGallerry"
					/>
				</div>
				<div
					className="icon-shape shape3"
					style={{ bottom: "0", right: "0" }}>
					<img
						width="100"
						className="mw-100"
						src={shape3}
						alt="WaysGallerry"
					/>
				</div>
				<Container className="py-5">
					<Row className="align-items-center">
						<Col md="6" className="z-index-max mb-3 mb-md-0">
							<Image
								src={logo}
								width="250px"
								alt="WaysGallerry"
								className="mw-100"
							/>
							<h3>show your work to inspire everyone</h3>
							<p>
								Ways Exhibition is a website design creators
								gather to share their work with other creators
							</p>
							<div className="d-flex gap-3">
								<RegisterModal/>
								<LoginModal />
							</div>
						</Col>
						<Col md="6">
							<Image
								src={programmer}
								alt="WaysGallerry"
								className="mw-100"
							/>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}