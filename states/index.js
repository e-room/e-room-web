import { atom } from "recoil";

export const pageNameState = atom({
  key: "pageNameState",
  default: "",
});

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});
