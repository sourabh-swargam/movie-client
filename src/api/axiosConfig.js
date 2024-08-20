import axios from "axios";

export default axios.create({
  baseURL: "https://movie-api-b6inf4mg7a-vp.a.run.app",
  headers: { "Content-Type": "application/json" },
});
