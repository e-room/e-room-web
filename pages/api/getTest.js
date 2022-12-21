import axios from "axios";

function get() {
  try {
    axios.get(`/building/marking`).then((response) => {
      console.log("success", response);
    });
  } catch (e) {
    console.log("error", e);
  }
}

export default get;
