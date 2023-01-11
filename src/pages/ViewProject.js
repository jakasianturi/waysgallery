import {
	Col,
	Container,
	Image,
	Row,
} from "react-bootstrap";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";

import img1 from "../assets/images/dummy/img1.jpg";
import img2 from "../assets/images/dummy/img2.jpg";
import img3 from "../assets/images/dummy/img3.jpg";
import img4 from "../assets/images/dummy/img4.jpg";
import img5 from "../assets/images/dummy/img5.jpg";
import img6 from "../assets/images/dummy/img6.jpg";
import img7 from "../assets/images/dummy/img7.jpg";
import { useState } from "react";
import DownloadModal from "../component/modal/DownloadModal";
export default function ViewProject() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const images = [img1, img2, img3, img4, img5, img6, img7];
	// download modal
	const [openDownloadModal, setOpenDownloadModal] = useState(false);
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Row>
					<Col md="7">
						<div id="swiper-image">
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
								modules={[Navigation, Thumbs]}
								className="project-images-slider mb-3">
								{images.map((item, index) => (
									<SwiperSlide key={index}>
										<Image
											className="rounded-3"
											src={item}
											alt="project images"
											style={{ cursor: "pointer" }}
											onClick={() =>
												setOpenDownloadModal(true)
											}
										/>
									</SwiperSlide>
								))}
							</Swiper>
							<Swiper
								onSwiper={setThumbsSwiper}
								spaceBetween={10}
								slidesPerView={4}
								watchSlidesProgress={true}
								modules={[Navigation, Thumbs]}
								className="mySwiper project-images-slider-thumbs">
								{images.map((item, index) => (
									<SwiperSlide key={index}>
										<div className="project-images-slider-thumbs-wrapper">
											<Image
												className="rounded-3"
												src={item}
												alt="project images"
											/>
											<div className="overlay rounded-3"></div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</Col>
					<Col md="5">
						<div id="description" className="mt-5">
							<p>
								all with respect, I thank you for entrusting me
								as the project implementer, sir, hopefully with
								the completion of this project we can work
								together again in the future
							</p>
							<p>Thank you very much</p>
						</div>
					</Col>
				</Row>
			</Container>
			<DownloadModal
				show={openDownloadModal}
				setOpenDownloadModal={() => setOpenDownloadModal(false)}
			/>
		</>
	);
}
