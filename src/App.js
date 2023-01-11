import './assets/scss/app.scss';
import { AuthModalContextProvider } from './context/AuthModalContext';
// import Navigation from './component/layouts/Navigation';
// import Hoho from './pages/Hoho';
// import MyOffer from './pages/MyOffer';
// import SendProject from './pages/SendProject';
import ViewProject from './pages/ViewProject';
// import MyOrder from './pages/MyOrder';
// import DetailUser from './pages/DetailUser';
// import Profile from './pages/Profile';
// import Detail from './pages/Detail';
// import EditProfile from './pages/EditProfile';
// import Hired from './pages/Hired';
// import Upload from './pages/Upload';
// import Home from './pages/Home';
// import Landing from './pages/Landing';

function App() {
  return (
		<>
			<AuthModalContextProvider>
				{/* <Landing /> */}
				{/* <Navigation /> */}
				{/* <Home /> */}
				{/* <Detail/> */}
				{/* <EditProfile/> */}
				{/* <Hired/> */}
				{/* <Upload/> */}
				{/* <DetailUser/> */}
				{/* <Profile/> */}
				{/* <MyOrder/> */}
				{/* <MyOffer/> */}
				{/* <SendProject/> */}
				<ViewProject/>
				{/* <Hoho/> */}
			</AuthModalContextProvider>
		</>
  );
}

export default App;
