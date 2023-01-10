import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import avatar from "../assets/images/avatar.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Navigation, Thumbs } from "swiper";

import img1 from "../assets/images/dummy/img1.jpg";
import img2 from "../assets/images/dummy/img2.jpg";
import img3 from "../assets/images/dummy/img3.jpg";
import img4 from "../assets/images/dummy/img4.jpg";
import img5 from "../assets/images/dummy/img5.jpg";
import img6 from "../assets/images/dummy/img6.jpg";
import img7 from "../assets/images/dummy/img7.jpg";
export default function Detail() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const images = [img1, img2, img3, img4, img5, img6, img7];
	return (
		<>
			<Container style={{ maxWidth: "800px" }}>
				<Row className="py-3">
					<Col md="8" className="mb-3 mb-md-0">
						<Row>
							<Col xs="auto">
								<Image
									src={avatar}
									alt="WaysGallery"
									className="d-block rounded-circle objectfit-cover"
									width="48"
									height="48"
								/>
							</Col>
							<Col xs="auto">
								<h5 className="mb-0">Robo-x Landing Page</h5>
								<span>Geralt</span>
							</Col>
						</Row>
					</Col>
					<Col md="4" className="d-flex">
						<div className="ms-sm-auto">
							<Button
								variant="secondary"
								className="text-black px-4 py-2 me-3 btn-sm">
								Follow
							</Button>
							<Button
								variant="primary"
								className="text-white px-4 py-2 btn-sm">
								Hire
							</Button>
						</div>
					</Col>
				</Row>
				<div id="swiper-image" className="my-4">
					<Swiper
						style={{
							"--swiper-navigation-color": "#fff",
							"--swiper-pagination-color": "#fff",
						}}
						spaceBetween={10}
						navigation={true}
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed
									? thumbsSwiper
									: null,
						}}
						modules={[ Navigation, Thumbs]}
						className="project-images-slider">
						{images.map((item, index) => (
							<SwiperSlide key={index}>
								<Image
									className="rounded-3"
									src={item}
									alt="project images"
								/>
							</SwiperSlide>
						))}
					</Swiper>
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={4}
						watchSlidesProgress={true}
						modules={[ Navigation, Thumbs]}
						className="mySwiper">
						{images.map((item, index) => (
							<SwiperSlide key={index}>
								<div className="project-images-slider-thumbs-wrapper">
									<Image
										className="rounded-3"
										src={item}
										alt="project images"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div id="description" className="mt-5">
					<p>
						👋 Say Hello{" "}
						<span className="text-primary">
							<a
								href="mailto:geralt@gmail.com"
								className="link fw-semibold">
								geralt@gmail.com
							</a>
						</span>
					</p>
					<p>
						Hey, guys! Super excited to share my new web app
						interface and elements that I recently worked on. Hope
						you enjoyed it. Thanks for your likes and comments!
					</p>
				</div>
			</Container>
		</>
	);
}
