import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Rupiah from "../../helpers/Currency";
import Loader from "../feature/Loader";

export default function DetailProjectModal({
	id,
	show,
	setShowDetailOrderModal,
}) {

	// get detail order
	const [orderResult, setOrderResult] = useState(null);
	let { data: orderDetail } = useQuery(["orderDetailCache", id], async () => {
		const response = await API.get(`hired/${id}`);
		return response.data.data;
	});
	// init state
	useEffect(() => {
		if (orderDetail) setOrderResult(orderDetail);
	}, [orderDetail]);
	// console.log(orderResult?.hired);
	return (
		<>
			<Modal
				show={show}
				onHide={() => setShowDetailOrderModal(false)}
				aria-labelledby="DetailProjectModal"
				centered>
				<Modal.Body className="bg-white rounded-3 shadow-sm px-4 py-3">
					{!orderResult ? (
						<Loader />
					) : (
						<>
							<p className="mb-3">
								Title : {orderResult.hired?.title}
							</p>
							<p className="mb-4">
								Description : {orderResult.hired?.description}
							</p>
							<h5 className="text-primary">
								Price : {Rupiah(orderResult.hired?.price)}
							</h5>
						</>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
