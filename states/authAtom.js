import axios from "axios";
import { atom, selector } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: {
    status: false,
    type: null,
  },
});

// export const profileState = atom({
//   key: "profileState",
//   default: {
//     id: null,
//     name: null,
//     email: null,
//     profileImageUrl: null,
//   },
// });

// export const profileSelector = selector({
//   key: "profileSelector",
//   get: async ({ get }) => {
//     await axios
//       .get(`/apis/member/profile`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         return get(response.data);
//       })
//       .catch((error) => console.log("get error", error));
//   },
// });
