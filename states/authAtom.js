import { atom, selector } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: {
    status: false,
    type: null,
  },
});
