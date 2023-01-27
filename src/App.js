import { useCallback, useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./assets/scss/app.scss";
import Loader from "./component/feature/Loader";
import ScrollToTop from "./component/feature/ScrollToTop";
import { API, setAuthToken } from "./config/api";
import { AuthModalContextProvider } from "./context/AuthModalContext";
import { UserContext } from "./context/UserContext";
import Error401 from "./pages/error/401";
import Error404 from "./pages/error/404";
import Landing from "./pages/Landing";
// import Navigation from './component/layouts/Navigation';
// import Hoho from './pages/Hoho';
import SendProject from './pages/SendProject';
import ViewProject from './pages/ViewProject';
import MyOrder from './pages/MyOrder';
import DetailUser from './pages/DetailUser';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import EditProfile from './pages/EditProfile';
import Hired from './pages/Hired';
import Upload from './pages/Upload';
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "./component/layouts/AuthLayout";
import MyOffer from "./pages/MyOffer";

// init token on axios every time the app is refreshed
if (localStorage.token) {
	setAuthToken(localStorage.token);
}
function App() {
	// navigate
	const navigate = useNavigate();
	// state userContext
	const [state, dispatch] = useContext(UserContext);
	// loader
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (localStorage.token) {
			const checkUser = async () => {
				try {
					// get new token and set token to API
					setAuthToken(localStorage.token);
					const response = await API.get("/check-auth");
					// Get user data
					let payload = response.data.data.user;
					// Get token from local storage
					payload.token = localStorage.token;
					// Send data to useContext
					dispatch({
						type: "USER_SUCCESS",
						payload,
					});
					setIsLoading(false);
				} catch (error) {
					// console.log(error);
					dispatch({
						type: "AUTH_ERROR",
					});
					setIsLoading(false);
					navigate("/");
				}
			};
			checkUser()
			return;
		}
		setIsLoading(false);
	}, [dispatch, navigate]);
	
	return (
		<>
			<>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<ScrollToTop />
						<AuthModalContextProvider>
							<Routes>
								<Route
									element={
										<ProtectedRoute
											isAllowed={!state.isLogin}
											redirectPath="/home"
										/>
									}>
									<Route
										exact
										path="/"
										element={<Landing />}
									/>
								</Route>
								{/* auth */}
								<Route
									element={
										<ProtectedRoute
											redirectPath="/401"
											isAllowed={state.isLogin}
										/>
									}>
									<Route element={<AuthLayout />}>
										<Route path="home" element={<Home />} />
										<Route
											exact
											path="/post/:id"
											element={<Detail />}
										/>
										<Route
											exact
											path="/profile"
											element={<Profile />}
										/>
										<Route
											exact
											path="/edit-profile"
											element={<EditProfile />}
										/>
										<Route
											exact
											path="/upload"
											element={<Upload />}
										/>
										<Route
											exact
											path="/user/:id"
											element={<DetailUser />}
										/>
										<Route
											exact
											path="/order"
											element={<MyOrder />}
										/>
										<Route
											exact
											path="/offer"
											element={<MyOffer />}
										/>
										<Route
											exact
											path="/project"
											element={<SendProject />}
										/>
										<Route
											exact
											path="/project/detail/:hired_id"
											element={<ViewProject />}
										/>
										<Route
											exact
											path="/hired"
											element={<Hired />}
										/>
									</Route>
								</Route>
								{/* another pages */}
								<Route path="401" element={<Error401 />} />
								<Route path="*" element={<Error404 />} />
							</Routes>
						</AuthModalContextProvider>
					</>
				)}
			</>
		</>
	);
}

export default App;
