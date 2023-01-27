import { Col, Container, Image, Row } from "react-bootstrap";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useEffect, useState } from "react";
import DownloadModal from "../component/modal/DownloadModal";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Loader from "../component/feature/Loader";
import parse from "html-react-parser";
export default function ViewProject() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	// download modal
	const [openDownloadModal, setOpenDownloadModal] = useState(false);
	// init post data
	const [projectResult, setProjectResult] = useState(null);
	// get data
	const { hired_id } = useParams(); // id from url
	let { data: project } = useQuery("projectCache", async () => {
		const response = await API.get(`/project/detail/${hired_id}`);
		return response.data.data;
	});
	useEffect(() => {
		if (project) setProjectResult(project);
	}, [project]);
	if (!projectResult) {
		return <Loader />;
	}
	// console.log(projectResult)
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
								{projectResult.project?.length !== 0 ? (
									<>
										{projectResult.project.photos?.map(
											(item, index) => (
												<SwiperSlide key={index}>
													<Image
														key={index}
														className="rounded-3"
														src={item.image}
														alt="project images"
														style={{
															cursor: "pointer",
														}}
														onClick={() =>
															setOpenDownloadModal(
																true
															)
														}
													/>
												</SwiperSlide>
											)
										)}
									</>
								) : (
									<></>
								)}
							</Swiper>
							<Swiper
								onSwiper={setThumbsSwiper}
								spaceBetween={10}
								slidesPerView={4}
								watchSlidesProgress={true}
								modules={[Navigation, Thumbs]}
								className="mySwiper project-images-slider-thumbs">
								{projectResult.project?.length !== 0 ? (
									<>
										{projectResult.project.photos?.map(
											(item, index) => (
												<SwiperSlide key={index}>
													<div className="project-images-slider-thumbs-wrapper">
														<Image
															className="rounded-3"
															src={item?.image}
															alt="project images"
														/>
														<div className="overlay rounded-3"></div>
													</div>
												</SwiperSlide>
											)
										)}
									</>
								) : (
									<></>
								)}
							</Swiper>
						</div>
					</Col>
					<Col md="5">
						<div id="description" className="mt-5">
							{parse(projectResult.project?.description)}
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
