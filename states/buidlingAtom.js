import { atom, selector } from "recoil";

export const imageViewState = atom({
  key: "imageViewState",
  default: {
    visible: false,
    uuid: null,
  },
});
