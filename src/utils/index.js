export function getRedirectTo(usertype, avatar) {
	let path = "";
	if (usertype === "boss") {
		path += "/boss";
	} else {
		path += "/jobseeker";
	}
	if (!avatar) {
		path += "Info";
	}
	return path;
}
