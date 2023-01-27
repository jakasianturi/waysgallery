import {
	Button,
	Container,
	Dropdown,
	Image,
	Navbar,
} from "react-bootstrap";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import user_icon from "../../assets/icons/user.svg";
import order from "../../assets/icons/order.svg";
import logout from "../../assets/icons/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function NavigationMenu() {
	// navigate
	const navigate = useNavigate();
	// state userContect
	const [state, dispatch] = useContext(UserContext);
	// handle logout
	const handleLogout = () => {
		dispatch({
			type: "LOGOUT",
		});
		navigate("/")
	};
	return (
		<>
			<Navbar className="border-bottom">
				<Container>
					<Link to="home">
						<Image
							src={logo}
							alt="WaysGallerry"
							width="126"
							className="mw-100"
						/>
					</Link>
					<Navbar.Collapse className="justify-content-end">
						<Button
							variant="primary"
							className="text-white px-4 py-2 me-4 btn-sm"
							onClick={() => navigate(`/upload`)}>
							Upload
						</Button>
						<Dropdown align="end" className="custom_dropdown">
							<Dropdown.Toggle className="no-carret">
								<Image
									src={
										state.user.avatar
											? state.user.avatar
											: avatar
									}
									alt="WaysGallery"
									className="d-block rounded-circle objectfit-cover"
									width="48"
									height="48"
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu className=" mt-3 shadow-sm border-0 z-index-max">
								<Link
									to="/profile"
									className="dropdown-item fw-bold">
									<img
										width="24"
										src={user_icon}
										alt=""
										className="icon me-3"
									/>
									Profile
								</Link>
								<Link
									to="/order"
									className="dropdown-item fw-bold">
									<img
										width="24"
										src={order}
										alt=""
										className="icon me-3"
									/>
									Order
								</Link>
								<Dropdown.Divider className="border-3 border-top" />

								<button
									type="button"
									className="dropdown-item btn btn-link link fw-normal"
									onClick={handleLogout}>
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
