import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Image,
	Row,
} from "react-bootstrap";
import camera from "../assets/icons/camera.svg";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import Loader from "../component/feature/Loader";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import BtnLoader from "../component/feature/BtnLoader";
export default function EditProfile() {
	// sweetalert
	const MySwal = withReactContent(Swal);
	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);

	// init state
	const [artsResult, setArtsResult] = useState(null);
	const [profileResult, setprofileResult] = useState(null);
	// get data
	let { data: arts } = useQuery("artsCache", async () => {
		const response = await API.get(`/arts`);
		return response.data.data;
	});
	let { data: profile, refetch } = useQuery("profileCache", async () => {
		const response = await API.get(`/profile`);
		return response.data.data;
	});
	useEffect(() => {
		if (arts) setArtsResult(arts);
		if (profile) setprofileResult(profile);
	}, [arts, profile]);

	// dropzone
	const onDrop = useCallback(
		async (acceptedFiles) => {
			const formInputValue = new FormData();
			for (let i = 0; i < acceptedFiles.length; i++) {
				formInputValue.append(
					"arts",
					acceptedFiles[i],
					acceptedFiles[i].name
				);
			}
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};
			const response = await API.post(
				`upload-arts`,
				formInputValue,
				config
			);
			// Notification
			// console.log(response);
			if (response.data.status === "success") {
				MySwal.fire({
					icon: "success",
					title: "Successfully add arts.",
					showConfirmButton: false,
					timer: 1500,
				});
				refetch();
			} else {
				MySwal.fire({
					icon: "error",
					title: "Ops.. something wrong.",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		},
		[MySwal, refetch]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	// profile
	// init form state
	const [greeting, setGreeting] = useState("");
	const [fullName, setFullName] = useState("");
	const [avatar, setAvatar] = useState(null);

	// submit form data
	const handleOnSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();
			setBtnLoader(true)
			// form data
			const formInputValue = new FormData();
			// console.log(avatar)
			if (avatar) {
				formInputValue.append("avatar", avatar[0], avatar[0].name);
			}
			formInputValue.set("greeting", greeting);
			formInputValue.set("fullName", fullName);
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};
			// Insert data user to database
			const response = await API.patch(
				"update-profile",
				formInputValue,
				config
			);

			// console.log(response);

			// Notification
			if (response.data.status === "success") {
				MySwal.fire({
					icon: "success",
					title: "Successfully update profile.",
					showConfirmButton: false,
					timer: 1500,
				});
				setGreeting("");
				setFullName("");
				setAvatar(null);
				setBtnLoader(false);
				refetch();
			} else {
				console.log("hoho");
				setBtnLoader(false);
			}
		} catch (error) {
			console.log(error);
			setBtnLoader(false);
		}
	});

	if (!artsResult || !profileResult) {
		return <Loader />;
	}
	// console.log(profileResult);
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Row>
					<Col
						md="8"
						{...getRootProps()}
						className="position-relative custom-image-input  p-0">
						<p className="mb-0 desc">
							<span className="text-primary fw-semibold">
								Upload
							</span>{" "}
							Your Best Art
						</p>

						<Form.Control
							type="file"
							{...getInputProps()}
							className="img-drag"
						/>
						{/* <Image
							src={img1}
							alt="thumbnail"
							className="thumbnail"
						/>
						<Button
							className="mb-0 btn-input text-white"
							variant="primary">
							Change Your Best Art
						</Button> */}
					</Col>
					<Col md="4" className="px-md-4">
						<Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
							<div
								className="position-relative mx-auto custom-border rounded-circle mb-3 overflow-hidden"
								style={{
									height: "180px",
									width: "180px",
								}}>
								{profileResult.user?.avatar ? (
									profileResult.user.avatar !== "" &&
									!avatar ? (
										<Image
											src={profileResult.user.avatar}
											alt="Camera"
											className="w-100 h-100 mw-100 objectfit-cover"
										/>
									) : avatar ? (
										<Image
											src={URL.createObjectURL(avatar[0])}
											alt="Camera"
											width="120"
											height="120"
											className="p-2"
										/>
									) : (
										<Image
											src={camera}
											alt="Camera"
											width="120"
											height="120"
											className="p-2"
										/>
									)
								) : avatar ? (
									<Image
										src={URL.createObjectURL(avatar[0])}
										alt="Camera"
										width="120"
										height="120"
										className="p-2"
									/>
								) : (
									<Image
										src={camera}
										alt="Camera"
										width="120"
										height="120"
										className="p-2"
									/>
								)}
								<Button
									className="mb-0 btn-input text-white"
									variant="primary">
									Change Avatar
								</Button>
								<Form.Control
									type="file"
									className="img-drag"
									onChange={(event) =>
										setAvatar(event.target.files)
									}
								/>
							</div>
							<FormGroup className="mb-3">
								<Form.Control
									type="text"
									placeholder="Greeting"
									className="bg-secondary border-primary border-2 border"
									defaultValue={profileResult.user?.greeting}
									onChange={(event) =>
										setGreeting(event.target.value)
									}
								/>
							</FormGroup>
							<FormGroup className="mb-5">
								<Form.Control
									type="text"
									placeholder="Full Name"
									className="bg-secondary border-primary border-2 border"
									defaultValue={profileResult.user?.fullName}
									onChange={(event) =>
										setFullName(event.target.value)
									}
								/>
							</FormGroup>
							<p className="text-center">
								<Button
									variant="primary"
									className="text-white"
									onClick={(e) => handleOnSubmit.mutate(e)}
									disabled={btnLoader}>
									{!btnLoader ? "" : <BtnLoader />} Save
								</Button>
							</p>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}
