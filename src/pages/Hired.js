import moment from "moment/moment";
import { useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Image,
	InputGroup,
	Row,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useMutation } from "react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import calendar from "../assets/icons/calendar.svg";
import BtnLoader from "../component/feature/BtnLoader";
import OfferModal from "../component/modal/OfferModal";
import { API } from "../config/api";
export default function Hired() {
	// offer modal
	const [openOfferModal, setOpenOfferModal] = useState(false);
	// state user hired
	const { state } = useLocation();
	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);
	// sweetalert
	const MySwal = withReactContent(Swal);
	// message
	const [message, setMessage] = useState(null);
	const [errorForm, setErrorForm] = useState(null);
	// init form state
	const [title, setTitle] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [price, setPrice] = useState(0);
	const orderTo = state.orderTo;
	// editor state
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	// submit form data
	const handleOnSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();
			setBtnLoader(true);
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			// Data body
			const body = JSON.stringify({
				title,
				description: convertToHTML(editorState.getCurrentContent()),
				startDate: moment(startDate).format("yyyy-MM-DD"),
				endDate: moment(endDate).format("yyyy-MM-DD"),
				price: parseFloat(price),
				orderTo,
			});
			// console.log(body);
			// Insert data user to database
			const response = await API.post("hired", body, config);

			// console.log(response);

			// Notification
			if (response.data.status === "success") {
				MySwal.fire({
					icon: "success",
					title: "Successfully sent offer.",
					showConfirmButton: false,
					timer: 1500,
				});
				setTitle("");
				EditorState.createEmpty();
				setStartDate(new Date());
				setEndDate(new Date());
				setPrice(0);
				setMessage(null);
				setBtnLoader(false);
				setOpenOfferModal(true);
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
			setErrorForm(error.response.data);
			setMessage(alert);
			setBtnLoader(false);
		}
	});
	return (
		<>
			<Container className="py-5" style={{ maxWidth: "880px" }}>
				<Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
					{message && message}
					<FormGroup className="mb-3">
						<Form.Control
							type="text"
							placeholder="Title"
							className="bg-secondary border-primary border-2 border"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							isInvalid={errorForm && errorForm.message?.title}
						/>
						<Form.Control.Feedback type="invalid">
							{errorForm && errorForm.message.title?.required}
						</Form.Control.Feedback>
					</FormGroup>
					<FormGroup className="mb-3">
						<Editor
							toolbarClassName="toolbarClassName bg-secondary rounded-3 border-primary border-2 border"
							wrapperClassName="wrapperClassName"
							editorClassName="bg-secondary rounded-3 border-primary border-2 border px-2 lh-1 mh-300"
							editorState={editorState}
							onEditorStateChange={setEditorState}
							placeholder="Description"
						/>
						<Form.Control.Feedback type="invalid">
							{errorForm &&
								errorForm.message.description?.required}
						</Form.Control.Feedback>
					</FormGroup>
					<Row className="mb-3">
						<Col md="6">
							<FormGroup>
								<InputGroup
									className={`${
										errorForm &&
										errorForm.message?.startDate
											? "bg-secondary rounded-3 border-danger py-0 ps-0 form-control is-invalid "
											: "bg-secondary rounded-3 border-primary border-2 border"
									}`}>
									<div className="form-control">
										<ReactDatePicker
											selected={startDate}
											onChange={(date) =>
												setStartDate(date)
											}
											className="form-control outline-none shadow-none border-0 p-0 bg-transparent"
										/>
									</div>
									<Button
										type="button"
										className="btn-link btn-sm px-3 py-2">
										<Image
											src={calendar}
											alt="Calendar Icon"
										/>
									</Button>
								</InputGroup>
								<Form.Control.Feedback type="invalid">
									{errorForm &&
										errorForm.message.startDate?.required}
								</Form.Control.Feedback>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<InputGroup
									className={`${
										errorForm && errorForm.message?.endDate
											? "bg-secondary rounded-3 border-danger py-0 ps-0 form-control is-invalid "
											: "bg-secondary rounded-3 border-primary border-2 border"
									}`}>
									<div className="form-control">
										<ReactDatePicker
											selected={endDate}
											onChange={(date) =>
												setEndDate(date)
											}
											className="form-control outline-none shadow-none border-0 p-0 bg-transparent"
										/>
									</div>

									<Button
										type="button"
										className="btn-link btn-sm px-3 py-2">
										<Image
											src={calendar}
											alt="Calendar Icon"
										/>
									</Button>
								</InputGroup>
								<Form.Control.Feedback type="invalid">
									{errorForm &&
										errorForm.message.endDate?.required}
								</Form.Control.Feedback>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup className="mb-5">
						<Form.Control
							className="bg-secondary border-primary border-2 border"
							type="number"
							min="0"
							placeholder="Price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
							isInvalid={errorForm && errorForm.message?.price}
						/>
						<Form.Control.Feedback type="invalid">
							{errorForm && errorForm.message.price?.required}
						</Form.Control.Feedback>
					</FormGroup>
					<div className="d-flex gap-3 justify-content-center">
						<Button
							type="reset"
							variant="secondary"
							className="text-black">
							Cancel
						</Button>
						<Button
							variant="primary"
							className="text-white"
							onClick={(e) => handleOnSubmit.mutate(e)}
							disabled={btnLoader}>
							{!btnLoader ? "" : <BtnLoader />} Bidding
						</Button>
						{/* <Button
							variant="primary"
							className="text-white px-4 py-2"
							onClick={() => setOpenOfferModal(true)}>
							Bidding
						</Button> */}
					</div>
				</Form>
			</Container>
			<OfferModal
				show={openOfferModal}
				setOpenOfferModal={() => setOpenOfferModal(false)}
			/>
		</>
	);
}
