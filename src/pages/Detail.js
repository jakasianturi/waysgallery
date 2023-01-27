import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import avatar from "../assets/images/avatar.svg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Navigation, Thumbs } from "swiper";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Loader from "../component/feature/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { UserContext } from "../context/UserContext";

export default function Detail() {
	// state userContect
	const [state, dispatch] = useContext(UserContext);
	// navigate
	const navigate = useNavigate();
	// swiper
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	// init post data
	const [postResult, setPostResult] = useState(null);
	// get data
	const { id } = useParams(); // id from url
	let { data: post } = useQuery("postCache", async () => {
		const response = await API.get(`/post/${id}`);
		return response.data.data;
	});
	useEffect(() => {
		if (post) setPostResult(post);
	}, [post]);

	if (!postResult) {
		return <Loader />;
	}
	// console.log(postResult)
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "800px" }}>
				<Row className="py-3">
					<Col md="8" className="mb-3 mb-md-0">
						<Row>
							<Col xs="auto">
								<Image
									onClick={() =>
										navigate(
											`/user/${postResult.post.createdBy?.id}`
										)
									}
									src={
										postResult.post.createdBy.avatar
											? postResult.post.createdBy.avatar
											: avatar
									}
									alt="WaysGallery"
									className="d-block rounded-circle objectfit-cover"
									width="48"
									height="48"
									style={{ cursor: "pointer" }}
								/>
							</Col>
							<Col xs="auto">
								<h5 className="mb-0">
									{postResult.post?.title}
								</h5>
								<span>
									{postResult.post.createdBy?.fullName}
								</span>
							</Col>
						</Row>
					</Col>
					<Col md="4" className="d-flex">
						<div className="ms-sm-auto">
							{state.user?.email ===
							postResult.post.createdBy?.email ? (
								<>
									<Link
										to={`/profile`}
										className="btn btn-primary text-white px-4 py-2 btn-sm">
										See Profile
									</Link>
								</>
							) : (
								<>
									{/* <Button
										variant="secondary"
										className="text-black px-4 py-2 me-3 btn-sm">
										Follow
									</Button> */}
									<Button
										variant="primary"
										className="text-white px-4 py-2 me-3 btn-sm"
										onClick={() =>
											navigate(`/hired`, {
												state: {
													orderTo: postResult.post.createdBy?.id
												},
											})
										}>
										Hire
									</Button>
								</>
							)}
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
						modules={[Navigation, Thumbs]}
						className="project-images-slider mb-3">
						{postResult.post?.photos.map((item, index) => (
							// console.log(item)
							<SwiperSlide key={index}>
								<Image
									className="rounded-3"
									src={item.image}
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
						modules={[Navigation, Thumbs]}
						className="mySwiper project-images-slider-thumbs">
						{postResult.post?.photos.map((item, index) => (
							<SwiperSlide key={index}>
								<div className="project-images-slider-thumbs-wrapper">
									<Image
										className="rounded-3"
										src={item.image}
										alt="project images"
									/>
									<div className="overlay rounded-3"></div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div id="description" className="mt-5">
					{parse(postResult.post?.description)}
				</div>
			</Container>
		</>
	);
}
