import axios from "axios";

export default function ajax(url, data = {}, method = "GET") {
	axios.defaults.withCredentials = true;
	axios.defaults.baseURL = "http://localhost:4000";
	if (method === "GET") {
		let paramStr = "";
		Object.keys(data).forEach((key) => {
			paramStr += key + "=" + data[key] + "&";
		});
		// get请求可以不带参数字符串
		if (paramStr) {
			paramStr = paramStr.substring(0, paramStr.length - 1);
		}
		return axios.get(url + "?" + paramStr);
	} else if (method === "POST") {
		return axios.post(url, data);
	}
}
