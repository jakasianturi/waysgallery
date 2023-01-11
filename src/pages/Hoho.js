import { Button, Col, Form, FormGroup, Image, Row } from "react-bootstrap";
// import icons
import train from "../assets/icons/train.svg"
import change from "../assets/icons/change.svg"
export default function Hoho() {
    return (
		<>
			<div className="d-flex py-5">
				<div
					// style={{ maxWidth: "880px" }}
					className=" mx-auto shadow">
					<Row>
						<Col md="3" className="py-3 px-0 bg-light">
							<div
								style={{ borderLeft: "8px solid #E67E22" }}
								className="d-flex p-3 bg-white">
								<Image
									src={train}
									alt="Train"
									className="me-3"
								/>
								Tiket Kreta Api
							</div>
						</Col>
						<Col md="9" className="py-3">
							<h3 className="fw-light">Tiket Kreta Api</h3>
							<Row className="align-items-center">
								<Col md="5">
									<FormGroup className="mb-3">
										<Form.Label className="fw-bold text-black">
											Asal
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Jakarta"
											className="border boder-2"
										/>
									</FormGroup>
									<Row>
										<Col md="6">
											<h6 className="fw-bold text-black">
												Tanggal Berangkat
											</h6>
											<Form.Control
												type="date"
												className="border boder-2"
											/>
										</Col>
										<Col md="6">
											<div className="d-flex align-items-center">
												<Form.Check
													aria-label="Pulang Pergi"
													className="d-inline-block me-2"
												/>
												<h6 className="d-inline-block m-0">
													Pulang Pergi
												</h6>
											</div>
										</Col>
									</Row>
								</Col>
								<Col
									md="1"
									className="align-self-baseline pt-md-4">
									<Button className="p-0 m-0 bg-transparent border-0">
										<Image src={change} alt="Icons"/>
									</Button>
								</Col>
								<Col md="5">
									<FormGroup className="mb-3">
										<Form.Label className="fw-bold text-black">
											Tujuan
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Surabaya"
											className="border boder-2"
										/>
										<Row className="py-3 align-items-center">
											<Col md="4">
												<Form.Label className="fw-bold text-black">
													Dewasa
												</Form.Label>
												<Form.Control
													type="number"
													min="0"
													className="border boder-2"
												/>
											</Col>
											<Col md="4">
												<Form.Label className="fw-bold text-black">
													Bayi
												</Form.Label>
												<Form.Control
													type="number"
													min="0"
													className="border boder-2"
												/>
											</Col>
											<Col
												md="4"
												className="d-flex align-self-end">
												<Button
													variant="primary"
													className="px-2 py-1 fs-6 text-white ">
													Cari Tiket
												</Button>
											</Col>
										</Row>
									</FormGroup>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
}