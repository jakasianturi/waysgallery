// Rupiah format
export default function Rupiah (number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		currencyDisplay: "code",
	}).format(number);
};
