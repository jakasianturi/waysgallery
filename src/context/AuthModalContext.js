import { createContext, useState } from "react";

// create context
export const AuthModalContext = createContext();

export const AuthModalContextProvider = ({ children }) => {
	// isi untuk context
	const [lModal, setLModal] = useState(false);
	const hLModal = () => setLModal(true);
	const [rModal, setRModal] = useState(false);
	const hRModal = () => setRModal(true);

	// message
	const [message, setMessage] = useState(null);

	return (
		<AuthModalContext.Provider
			value={{
				lModal,
				hLModal,
				setLModal,
				rModal,
				setRModal,
				hRModal,
				message,
				setMessage,
			}}>
			{children}
		</AuthModalContext.Provider>
	);
};
