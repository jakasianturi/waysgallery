import {
	Button,
	Container,
	Dropdown,
	Image,
	Navbar,
} from "react-bootstrap";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.png";
import user_icon from "../../assets/icons/user.svg";
import order from "../../assets/icons/order.svg";
import logout from "../../assets/icons/logout.svg";

export default function Navigation() {
	return (
		<>
			<Navbar className="border-bottom">
				<Container>
					<Navbar.Brand href="#home">
						<Image
							src={logo}
							alt="WaysGallerry"
							width="126"
							className="mw-100"
						/>
					</Navbar.Brand>
					<Navbar.Collapse className="justify-content-end">
						<Button
							variant="primary"
							className="text-white px-4 py-2 me-4 btn-sm">
							Upload
						</Button>
						<Dropdown align="end" className="custom_dropdown">
							<Dropdown.Toggle className="no-carret">
								<Image
									src={avatar}
									alt="WaysGallery"
									className="d-block rounded-circle objectfit-cover"
									width="48"
									height="48"
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu className=" mt-3 shadow-sm border-0">
								<a
									href="/profile"
									className="dropdown-item fw-bold">
									<img
										width="24"
										src={user_icon}
										alt=""
										className="icon me-3"
									/>
									Profile
								</a>
								<a
									href="/payment"
									className="dropdown-item fw-bold">
									<img
										width="24"
										src={order}
										alt=""
										className="icon me-3"
									/>
									Order
								</a>
								<Dropdown.Divider className="border-3 border-top" />

								<button
									type="button"
									className="dropdown-item btn btn-link link fw-normal">
									<img
										width="24"
										src={logout}
										alt=""
										className="icon me-3"
									/>
									<strong>Logout</strong>
								</button>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
