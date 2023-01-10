import './assets/scss/app.scss';
import NavigationBar from './component/layouts/NavigationBar';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Landing from './pages/Landing';

function App() {
  return (
		<>
      {/* <Landing /> */}
      <NavigationBar/>
      {/* <Home /> */}
      <Detail/>
		</>
  );
}

export default App;
