import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Image,
	InputGroup,
	Row,
} from "react-bootstrap";
import { useQuery } from "react-query";
import {  useNavigate } from "react-router-dom";
import search from "../assets/icons/search.svg";
import thumbnail from "../assets/images/thumbnail.jpg";
import Loader from "../component/feature/Loader";
import { API } from "../config/api";

export default function Home() {
	// navigate
	const navigate = useNavigate()
	// init post data
	const [postsResult, setPostsResult] = useState(null);
	// get data
	let { data: posts } = useQuery(
		"postsCache",
		async () => {
			const response = await API.get("/posts");
			return response.data.data;
		}
	);
	useEffect(() => {
		if (posts) setPostsResult(posts);
	}, [posts]);
	if (!postsResult) {
		return <Loader />;
	}
	// console.log(postsResult)
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
					{postsResult.posts?.length !== 0 ? (
						<>
							{postsResult.posts.map((item, index) => (
								// console.log(item)
									<Image
										key={index}
										onClick={() =>
											navigate(`/post/${item.id}`)
										}
										alt="Image"
										src={
											item.photos[0]
												? item.photos[0].image
												: thumbnail
										}
										className="img-zoom rounded-3 shadow-sm objectfit-cover border-0"
									/>
							))}
						</>
					) : (
						<>
							<Alert variant="dark">
								Sorry, there is no list of data yet.
							</Alert>
						</>
					)}
				</div>
			</Container>
		</>
	);
}
