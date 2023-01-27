import { useCallback, useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Image,
	Row,
} from "react-bootstrap";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import cloud_computing from "../assets/icons/cloud-computing.svg";
import plus from "../assets/icons/plus.svg";
import { API } from "../config/api";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BtnLoader from "../component/feature/BtnLoader";
import { useDropzone } from "react-dropzone";
export default function SendProject() {
	// state user hired
	const { state } = useLocation();
	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);
	// sweetalert
	const MySwal = withReactContent(Swal);
	// message
	const [message, setMessage] = useState(null);
	const [errorForm, setErrorForm] = useState(null);
	// data form
	const [photos, setPhotos] = useState([]);
	// dropzone
	const onDrop = useCallback(
		(acceptedFiles) => {
			setPhotos([...photos, ...acceptedFiles]);
		},
		[photos]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});
	// editor state
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	// navigate
	const navigate = useNavigate();
	// submit form data
	const handleOnSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();
			setBtnLoader(true);
			// form data
			const formInputValue = new FormData();
			if (photos.length !== 0) {
				for (let i = 0; i < photos.length; i++) {
					formInputValue.append("photos", photos[i], photos[i].name);
				}
			} else {
				const alert = (
					<Alert variant="danger" className="py-2 fs-sm">
						Add minimal 1 photo.
					</Alert>
				);
				setBtnLoader(false);
				setMessage(alert);
				return;
			}
			if (editorState.getCurrentContent().hasText()) {
				formInputValue.set(
					"description",
					convertToHTML(editorState.getCurrentContent())
				);
			} else {
				const alert = (
					<Alert variant="danger" className="py-2 fs-sm">
						Add description.
					</Alert>
				);
				setBtnLoader(false);
				setMessage(alert);
				return;
			}
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};
			// console.log(body);
			// Insert data user to database
			const response = await API.post(`project/${state?.hiredId}`, formInputValue, config);

			// console.log(response);

			// Notification
			if (response.data.status === "success") {
				
				try {
					setBtnLoader(true);
					const config = {
						headers: {
							"Content-type": "application/json",
						},
					};
					// const status = "Approve"

					// Data body
					const body = JSON.stringify({
						status: "Review",
					});
					// console.log(body);
					// Insert data user to database
					const response = await API.patch(
						`hired/${state?.hiredId}`,
						body,
						config
					);

					// console.log(response);

					// Notification
					if (response.data.status === "success") {
						MySwal.fire({
							icon: "success",
							title: "Successfully sent project.",
							showConfirmButton: false,
							timer: 1500,
						});
						EditorState.createEmpty();
						setPhotos([]);
						setMessage(null);
						setBtnLoader(false);
						navigate("/offer");
					} else {
						setBtnLoader(false);
					}
				} catch (error) {
					console.log(error);
					setBtnLoader(false);
				}
			} else {
				const alert = (
					<Alert variant="danger" className="py-2 fs-sm">
						There is an error. Check your field again!
					</Alert>
				);
				setMessage(alert);
				setBtnLoader(false);
			}
		} catch (error) {
			console.log(error);
			const alert = (
				<Alert variant="danger" className="py-2 fs-sm">
					There is an error. Check your field again!
				</Alert>
			);
			setErrorForm(error.response?.data);
			setMessage(alert);
			setBtnLoader(false);
		}
	});
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				{message && message}
				<Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
					<Row>
						<Col md="7">
							<div
								{...getRootProps()}
								className="position-relative custom-image-input mb-3">
								<div className="desc text-center">
									<Image
										src={cloud_computing}
										alt="Upload"
										width="250"
										height="250"
										className="p-2"
									/>
									<p className="mb-0">
										<span className="text-primary fw-semibold">
											Browse
										</span>{" "}
										to choose a file
									</p>
								</div>
								<Form.Control
									{...getInputProps()}
									type="file"
									className="img-drag"
								/>
							</div>
							<Row className="m-0 mb-3 add-image">
								{photos?.length !== 0 ? (
									<>
										{photos?.map((item, index) => (
											// console.log(item)
											<Col
												key={index}
												className="preview-add-image custom-border me-2">
												<Image
													src={URL.createObjectURL(
														item
													)}
													alt="Add"
													width="60"
													height="60"
													className="p-2 mx-auto"
												/>
											</Col>
										))}
										<Col className="preview-add-image custom-border me-2">
											<Image
												src={plus}
												alt="Add"
												width="60"
												height="60"
												className="p-2 mx-auto"
											/>
										</Col>
									</>
								) : (
									<>
										<Col className="preview-add-image custom-border me-2">
											<Image
												src={plus}
												alt="Add"
												width="60"
												height="60"
												className="p-2 mx-auto"
											/>
										</Col>
										<Col className="preview-add-image custom-border me-2">
											<Image
												src={plus}
												alt="Add"
												width="60"
												height="60"
												className="p-2 mx-auto"
											/>
										</Col>
										<Col className="preview-add-image custom-border me-2">
											<Image
												src={plus}
												alt="Add"
												width="60"
												height="60"
												className="p-2 mx-auto"
											/>
										</Col>
										<Col className="preview-add-image custom-border me-2">
											<Image
												src={plus}
												alt="Add"
												width="60"
												height="60"
												className="p-2 mx-auto"
											/>
										</Col>
									</>
								)}
							</Row>
						</Col>
						<Col md="5" className="px-md-4">
							<FormGroup className="mb-5">
								<Editor
									toolbarClassName="toolbarClassName bg-secondary rounded-3 border-primary border-2 border"
									wrapperClassName="wrapperClassName"
									editorClassName="bg-secondary rounded-3 border-primary border-2 border px-2 lh-1 mh-300"
									editorState={editorState}
									onEditorStateChange={setEditorState}
									placeholder="Description"
								/>
							</FormGroup>
							<p className="text-center">
								<Button
									variant="primary"
									className="text-white"
									type="submit"
									onClick={(e) => handleOnSubmit.mutate(e)}
									disabled={btnLoader}>
									{!btnLoader ? "" : <BtnLoader />} Send
									Project
								</Button>
							</p>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
}
