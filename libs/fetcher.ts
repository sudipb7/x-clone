import axios from "axios";

const fethcer = (url: string) => axios.get(url).then((res) => res.data);

export default fethcer;
