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
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import checked from "../assets/icons/checked.svg"
import cancel from "../assets/icons/cancel.svg";
import hourglass from "../assets/icons/hourglass.svg";
import Loader from "../component/feature/Loader";
import DetailProjectModal from "../component/modal/DetailProjectModal";
import { API } from "../config/api";

export default function MyOrder() {
	// detail project modal
	const [openDetailProjectModal, setOpenDetailProjectModal] = useState(false);
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
	const [ordersResult, setOrdersResult] = useState(null);
	// get data
	let { data: orders } = useQuery("ordersCache", async () => {
		const response = await API.get(`/order`);
		return response.data.data;
	});
	useEffect(() => {
		if (orders) setOrdersResult(orders);
	}, [orders]);
	// modal detail order
	const [showDetailOrderModal, setShowDetailOrderModal] = useState(false);
	const handleDetailOrderModal = () => setShowDetailOrderModal(true);

	const [idOrder, setIdOrder] = useState(null);

	if (!ordersResult) {
		return <Loader />;
	}
	return (
		<>
			<Container className="py-3">
				<Row className="justify-content-between mb-5">
					<Col md="2" className="mb-3 mb-md-0">
						<Form>
							<Form.Select
								onChange={onChangeSelect}
								aria-label="My Order"
								className="bg-secondary text-black border-0"
								style={{ width: "150px" }}>
								<option value="order">My Order</option>
								<option value="offer">My Offer</option>
							</Form.Select>
						</Form>
					</Col>
				</Row>
				<div className="mx-auto" style={{ maxWidth: "1000px" }}>
					{ordersResult.hired?.length !== 0 ? (
						<>
							<Table
								responsive
								className="w-100 custom-table"
								bordered
								size="sm">
								<thead>
									<tr className="bg-secondary">
										<th>No</th>
										<th>Vendor</th>
										<th>Order</th>
										<th>Start Project</th>
										<th>End Project</th>
										<th>Status</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{ordersResult.hired?.map((item, index) => (
										<>
											<tr>
												<td className="text-center">
													{index + 1}
												</td>
												<td>
													{item.orderBy?.fullName}
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
																	Waiting
																	Approved
																	Project
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
																	<Image
																		src={
																			hourglass
																		}
																	/>
																</>
															);
														} else if (
															item?.status ===
															"Process"
														) {
															return (
																<>
																	<span className="text-dark fw-bold">
																		Process
																	</span>
																</>
															);
														} else if (
															item?.status ===
															"Review"
														) {
															return (
																<Button
																	variant="primary"
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
				</div>
			</Container>
			<DetailProjectModal
				id={idOrder}
				show={showDetailOrderModal}
				setShowDetailOrderModal={setShowDetailOrderModal}
				handleDetailOrderModal={handleDetailOrderModal}
			/>
		</>
	);
}
