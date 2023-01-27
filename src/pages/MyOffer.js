import moment from "moment";
import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Image,
	Row,
	Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import checked from "../assets/icons/checked.svg"
import cancel from "../assets/icons/cancel.svg"
import Loader from "../component/feature/Loader";
import { API } from "../config/api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import BtnLoader from "../component/feature/BtnLoader";
import DetailProjectModal from "../component/modal/DetailProjectModal";

export default function MyOffer() {
	// navigate
	const navigate = useNavigate();
	// order/offer
	const onChangeSelect = (event) => {
		const value = event.target.value;
		if (value === "order") {
			navigate("/order");
		} else if (value === "offer") {
			navigate("/offer");
		}
	};
	// init state
	const [offersResult, setOffersResult] = useState(null);
	// get data
	let { data: offers, refetch } = useQuery("offersCache", async () => {
		const response = await API.get(`/offer`);
		return response.data.data;
	});
	useEffect(() => {
		if (offers) setOffersResult(offers);
	}, [offers]);
	// btn Loader
	const [btnLoader, setBtnLoader] = useState(false);
	// sweetalert
	const MySwal = withReactContent(Swal);
	// submit form data
	const handleOnSubmit = useMutation(async (data) => {
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
				status: data.status,
			});
			// console.log(body);
			// Insert data user to database
			const response = await API.patch(`hired/${data.id}`, body, config);

			// console.log(response);

			// Notification
			if (response.data.status === "success") {
				if (data.status === "Process") {
					MySwal.fire({
						icon: "success",
						title: "Successfully approve offer.",
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (data.status === "Cancel") {
					MySwal.fire({
						icon: "success",
						title: "Successfully cancel offer.",
						showConfirmButton: false,
						timer: 1500,
					});
				}
				refetch()
				setBtnLoader(false);
			} else {
				setBtnLoader(false);
			}
		} catch (error) {
			console.log(error);
			setBtnLoader(false);
		}
	});

	// modal detail order
	const [showDetailOrderModal, setShowDetailOrderModal] = useState(false);
	const handleDetailOrderModal = () => setShowDetailOrderModal(true);

	const [idOrder, setIdOrder] = useState(null);

	if (!offersResult) {
		return <Loader />;
	}
	// console.log(offersResult);
	return (
		<>
			<Container className="py-3">
				<Row className="justify-content-between mb-5">
					<Col md="2" className="mb-3 mb-md-0">
						<Form>
							<Form.Select
								onChange={onChangeSelect}
								aria-label="My Offer"
								className="bg-secondary text-black border-0"
								style={{ width: "150px" }}>
								<option value="offer">My Offer</option>
								<option value="order">My Order</option>
							</Form.Select>
						</Form>
					</Col>
				</Row>
				<div className="mx-auto" style={{ maxWidth: "1000px" }}>
					{offersResult.hired?.length !== 0 ? (
						<>
							<Table
								responsive
								className="w-100 custom-table"
								bordered
								size="sm">
								<thead>
									<tr className="bg-secondary">
										<th>No</th>
										<th>Client</th>
										<th>Order</th>
										<th>Start Project</th>
										<th>End Project</th>
										<th>Status</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{offersResult.hired?.map((item, index) => (
										<>
											<tr>
												<td className="text-center">
													{index + 1}
												</td>
												<td>
													{item.orderTo?.fullName}
												</td>
												<td>
													<Button
														type="button"
														className="btn-link btn-sm bg-transparent link text-blue"
														onClick={() => {
															setIdOrder(
																item?.id
															);
															setShowDetailOrderModal(
																true
															);
														}}>
														{item?.title}
													</Button>
												</td>
												<td>
													{item.startDate
														? moment(item.startDate)
																.locale("en")
																.format(
																	"DD MMMM YYYY"
																)
														: ""}
												</td>
												<td>
													{item.endDate
														? moment(item.endDate)
																.locale("en")
																.format(
																	"DD MMMM YYYY"
																)
														: ""}
												</td>
												<td className="text-center">
													{(() => {
														if (
															item?.status ===
															"Waiting Accept"
														) {
															return (
																<span className="text-warning fw-bold">
																	Waiting
																	Accept
																</span>
															);
														} else if (
															item?.status ===
															"Process"
														) {
															return (
																<span className="text-dark fw-bold">
																	Process
																</span>
															);
														} else if (
															item?.status ===
															"Waiting Approved Project"
														) {
															return (
																<span className="text-info fw-semibold">
																	Waiting
																	Approved
																	Project
																</span>
															);
														} else if (
															item?.status ===
															"Review"
														) {
															return (
																<span className="text-info fw-semibold">
																	Review
																</span>
															);
														} else if (
															item?.status ===
															"Success"
														) {
															return (
																<span className="text-success fw-semibold">
																	Success
																</span>
															);
														} else {
															return (
																<span className="text-danger fw-semibold">
																	Cancel
																</span>
															);
														}
													})()}
												</td>
												<td className="text-center">
													{(() => {
														if (
															item?.status ===
															"Waiting Accept"
														) {
															return (
																<>
																	<Button
																		variant="danger"
																		className="py-0 px-2 btn-sm text-white me-3"
																		onClick={() =>
																			handleOnSubmit.mutate(
																				{
																					id: item?.id,
																					status: "Cancel",
																				}
																			)
																		}
																		disabled={
																			btnLoader
																		}>
																		{!btnLoader ? (
																			""
																		) : (
																			<BtnLoader />
																		)}{" "}
																		Cancel
																	</Button>
																	<Button
																		variant="primary"
																		className="py-0 px-2  btn-sm text-white"
																		onClick={() =>
																			handleOnSubmit.mutate(
																				{
																					id: item?.id,
																					status: "Process",
																				}
																			)
																		}
																		disabled={
																			btnLoader
																		}>
																		{!btnLoader ? (
																			""
																		) : (
																			<BtnLoader />
																		)}{" "}
																		Accept
																	</Button>
																</>
															);
														} else if (
															item?.status ===
															"Process"
														) {
															return (
																<Button
																	variant="primary"
																	className="py-0 px-2  btn-sm text-white"
																	onClick={() =>
																		navigate(
																			`/project`,
																			{
																				state: {
																					hiredId:
																						item?.id,
																				},
																			}
																		)
																	}>
																	Send Project
																</Button>
															);
														} else if (
															item?.status ===
															"Review"
														) {
															return (
																<Button
																	variant="info"
																	className="py-0 px-2  btn-sm text-white"
																	onClick={() =>
																		navigate(
																			`/project/detail/${item?.id}`
																		)
																	}>
																	View Project
																</Button>
															);
														} else if (
															item?.status ===
															"Success"
														) {
															return (
																<Image
																	src={
																		checked
																	}
																/>
															);
														} else {
															return (
																<Image
																	src={cancel}
																/>
															);
														}
													})()}
												</td>
											</tr>
										</>
									))}
								</tbody>
							</Table>
						</>
					) : (
						<>
							<>
								<Alert variant="dark">
									Sorry, there is no list of data yet.
								</Alert>
							</>
						</>
					)}
					<DetailProjectModal
						id={idOrder}
						show={showDetailOrderModal}
						setShowDetailOrderModal={setShowDetailOrderModal}
						handleDetailOrderModal={handleDetailOrderModal}
					/>
				</div>
			</Container>
		</>
	);
}
