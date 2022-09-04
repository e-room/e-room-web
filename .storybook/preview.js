import "../styles/reset.css";
import "../styles/palette.css";
import "react-perfect-scrollbar/dist/css/styles.css";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
