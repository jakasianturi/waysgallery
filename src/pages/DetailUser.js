import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import avatar from "../assets/images/avatar.svg";
import thumbnail from "../assets/images/thumbnail.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import rectangle from "../assets/shapes/rectangle.svg"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Loader from "../component/feature/Loader";
import { UserContext } from "../context/UserContext";
export default function DetailUser() {
	// state userContect
	const [state, dispatch] = useContext(UserContext);
	// navigate
	const navigate = useNavigate();
	// init user data
	const [userResult, setUserResult] = useState(null);
	// get data
	const { id } = useParams(); // id from url
	let { data: user } = useQuery("userCache", async () => {
		const response = await API.get(`/user/${id}`);
		return response.data.data;
	});
	useEffect(() => {
		if (user) setUserResult(user);
	}, [user]);

	if (!userResult) {
		return <Loader />;
	}
	// console.log(userResult);
	return (
		<>
			<div className="position-relative bg-shape">
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
								src={
									userResult?.avatar
										? userResult?.avatar
										: avatar
								}
								alt="WaysGallery"
								className="d-block rounded-circle objectfit-cover mb-3"
								width="90"
								height="90"
							/>
							<h5 className="mb-4">{userResult?.fullName}</h5>
							<h1 className="mb-5">{userResult?.greeting}</h1>
							<div className="d-flex gap-3">
								{state.user?.email === userResult?.email ? (
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
											className="text-white px-4 py-2 btn-sm"
											onClick={() =>
												navigate(`/hired`, {
													state: {
														orderTo: userResult?.id,
													},
												})
											}>
											Hire
										</Button>
									</>
								)}
							</div>
						</Col>
						<Col md="8" className="z-index-max">
							{userResult.arts?.length !== 0 ? (
								<>
									<div id="swiper-image" className="my-4">
										<Swiper
											style={{
												"--swiper-navigation-color":
													"#fff",
												"--swiper-pagination-color":
													"#fff",
											}}
											spaceBetween={10}
											navigation={true}
											modules={[Navigation]}
											className="project-images-slider mb-3">
											{userResult.arts?.map(
												(item, index) => (
													// console.log(item)
													<SwiperSlide key={index}>
														<Image
															className="mw-100 h-100 rounded-3"
															width="600"
															src={item.image}
															alt="project images"
														/>
													</SwiperSlide>
												)
											)}
										</Swiper>
									</div>
								</>
							) : (
								<>
									<Image
										className="mw-100 h-100 rounded-3"
										width="600"
										src={thumbnail}
										alt="project images"
									/>
								</>
							)}
						</Col>
					</Row>
				</Container>
			</div>
			<Container className="py-5">
				<h5 className="mb-4">{userResult?.fullName} Works</h5>
				<Row>
					{userResult.arts?.length !== 0 ? (
						<>
							{userResult.posts?.map((item, index) => (
								// console.log(item)
								<Col
									key={item.id}
									md="3"
									className="mb-3"
									onClick={() =>
										navigate(`/post/${item.id}`)
									}>
									<div className="img-card rounded-3 overflow-hidden">
										<Image
											alt="Image"
											src={
												item.photos[0]
													? item.photos[0]?.image
													: thumbnail
											}
											className="rounded-3 w-100 h-100 mw-100 shadow-sm objectfit-cover"
										/>
										<div className="overlay"></div>
									</div>
								</Col>
							))}
						</>
					) : (
						<>
							<Alert variant="dark">
								Sorry, there is no list of data yet.
							</Alert>
						</>
					)}
				</Row>
			</Container>
		</>
	);
}