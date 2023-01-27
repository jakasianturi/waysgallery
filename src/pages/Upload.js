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
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import cloud_computing from "../assets/icons/cloud-computing.svg";
import plus from "../assets/icons/plus.svg";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../component/feature/BtnLoader";
export default function Upload() {
	// editor state
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	// sweetalert
	const MySwal = withReactContent(Swal);
	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);
	const [errorForm, setErrorForm] = useState(null);
	// message
	const [message, setMessage] = useState(null)

	// data form
	const [photos, setPhotos] = useState([]);
	const [title, setTitle] = useState("");
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
	// navigate
	const navigate = useNavigate();
	// submit form data
	const handleOnSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();
			setMessage(null);
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
				return
			}
			if (
				editorState.getCurrentContent().hasText()
			) {
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
			formInputValue.set("title", title);
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};
			// Insert data user to database
			const response = await API.post("post", formInputValue, config);

			// console.log(response);

			// Notification
			if (response.data.status === "success") {
				MySwal.fire({
					icon: "success",
					title: "Successfully upload post.",
					showConfirmButton: false,
					timer: 1500,
				});
				EditorState.createEmpty();
				setTitle("");
				setPhotos([]);
				setBtnLoader(false);
				const alert = (
					<Alert variant="success" className="py-2 fs-sm">
						Successfully add post.
					</Alert>
				);
				setMessage(alert);
				navigate("/home");
			} else {
				console.log("hoho");
				const alert = (
					<Alert variant="danger" className="py-2 fs-sm">
						Something wrong, check your field again.
					</Alert>
				);
				setMessage(alert);
				setBtnLoader(false);
			}
		} catch (error) {
			console.log(error);
			setErrorForm(error.response?.data);
			const alert = (
				<Alert variant="danger" className="py-2 fs-sm">
					Something wrong, check your field again.
				</Alert>
			);
			setMessage(alert);
			setBtnLoader(false);
		}
	});
	// console.log(photos);
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
					{message && message}
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
							<FormGroup className="mb-3">
								<Form.Control
									type="text"
									placeholder="Title"
									className="bg-secondary border-primary border-2 border"
									defaultValue={title}
									isInvalid={
										errorForm && errorForm.message?.title
									}
									onChange={(event) =>
										setTitle(event.target.value)
									}
								/>
								<Form.Control.Feedback type="invalid">
									{errorForm &&
										errorForm.message.title?.required}
								</Form.Control.Feedback>
							</FormGroup>

							<FormGroup className="mb-5">
								<Editor
									toolbarClassName="toolbarClassName bg-secondary rounded-3 border-primary border-2 border"
									wrapperClassName="wrapperClassName"
									editorClassName="bg-secondary rounded-3 border-primary border-2 border px-2 lh-1 mh-300"
									editorState={editorState}
									onEditorStateChange={setEditorState}
								/>
							</FormGroup>
							<div className="d-flex gap-3 justify-content-center">
								<Button
									onClick={() => window.location.reload()}
									variant="secondary"
									className="text-black px-4 py-2 btn-sm">
									Cancel
								</Button>
								<Button
									variant="primary"
									className="text-white"
									type="submit"
									onClick={(e) => handleOnSubmit.mutate(e)}
									disabled={btnLoader}>
									{!btnLoader ? "" : <BtnLoader />} Post
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
}
