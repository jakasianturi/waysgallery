import {
	Button,
	Col,
	Container,
	Form,
	Image,
	Row,
	Table,
} from "react-bootstrap";
import checked from "../assets/icons/checked.svg"

export default function MyOffer() {
	return (
		<>
			<Container className="py-3">
				<Row className="justify-content-between mb-5">
					<Col md="2" className="mb-3 mb-md-0">
						<Form>
							<Form.Select
								aria-label="My Offer"
								className="bg-secondary text-black border-0"
								style={{ width: "150px" }}>
								<option value="today">My Offer</option>
								<option value="following">My Order</option>
							</Form.Select>
						</Form>
					</Col>
				</Row>
				<div className="mx-auto" style={{ maxWidth: "1000px" }}>
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
							<tr>
								<td>1</td>
								<td>Sugiono</td>
								<td>
									<span className="text-blue">
										Landing Page
									</span>
								</td>
								<td>20 December 2022</td>
								<td>12 February 2023</td>
								<td className="text-center">
									<span className="text-success fw-bold">
										Success
									</span>
								</td>
								<td className="text-center">
									<Image src={checked} />
								</td>
							</tr>
							<tr>
								<td>2</td>
								<td>Sugiono</td>
								<td>
									<span className="text-blue">
										Landing Page
									</span>
								</td>
								<td>20 December 2022</td>
								<td>12 February 2023</td>
								<td className="text-center">
									<span className="text-success fw-bold">
										Success
									</span>
								</td>
								<td className="text-center">
									<Button
										variant="danger"
										className="py-0 px-2 btn-sm text-white me-3">
										Cancel
									</Button>
									<Button
										variant="primary"
										className="py-0 px-2  btn-sm text-white">
										Approve
									</Button>
								</td>
							</tr>
							<tr>
								<td>3</td>
								<td>Jhon Smith</td>
								<td>
									<span className="text-blue">
										Landing Lah
									</span>
								</td>
								<td>31 December 2020</td>
								<td>13 January 2023</td>
								<td className="text-center">
									<span className="text-info fw-bold">
										Project is complete
									</span>
								</td>
								<td className="text-center">
									<Button
										variant="primary"
										className="py-0 px-2  btn-sm text-white">
										Send Project
									</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Container>
		</>
	);
}
