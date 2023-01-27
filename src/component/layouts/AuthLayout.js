import { Outlet } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

export default function AuthLayout() {
	return (
		<>
			<NavigationMenu />
			<Outlet />
		</>
	);
}
