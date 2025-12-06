export function validateDate(date){
	const d = new Date();
	const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2, "0")}`;

	const formatDate = date.substr(0, 10);

	return today <= formatDate;
}
