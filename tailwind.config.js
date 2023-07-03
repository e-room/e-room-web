/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#53ac8e",
        "primary-2": "#77bfa7",
        "primary-3": "#a0d2c1",
        "primary-4": "#bbdfd3",
        "primary-5": "#d6ece5",
        "primary-6": "#f1f9f6",
        "secondary-1": "#ffd337",
        "secondary-2": "#ffdc5f",
        "secondary-3": "#ffe587",
        "secondary-4": "#ffedaf",
        "secondary-5": "#fff6d7",
        "secondary-6": "#fffbeb",
        black: "#212121",
        "gray-1": "#646464",
        "gray-2": "#909090",
        "gray-3": "#bdbdbd",
        "gray-4": "#e9e9e9",
        white: "#ffffff",
        success: "#3aa0ff",
        caution: "#ffd059",
        "danger-1": "#ff7865",
        "danger-2": "#f47e6e",
        "danger-3": "#f79e92",
        "danger-4": "#f9beb6",
        "danger-5": "#fcdfdb",
        kakao: "#fee500",
        google: "#ffffff",
        naver: "#03c75a",
        body: "#FAFAFA",
        overlay: "rgba(33, 33, 33, 0.2)",
      },
      fontSize: {
        /** [fontSize, {
        lineHeight, letterSpacing, fontWeight
      }] */
        "display-1": [
          "38px",
          {
            fontWeight: "800",
            lineHeight: "52px",
          },
        ],
        "display-2": [
          "36px",
          {
            fontWeight: "800",
            lineHeight: "48px",
          },
        ],
        "display-3": [
          "34px",
          {
            fontWeight: "800",
            lineHeight: "44px",
          },
        ],
        "display-4": [
          "32px",
          {
            fontWeight: "800",
            lineHeight: "40px",
          },
        ],
        "title-1": [
          "28px",
          {
            fontWeight: "700",
            lineHeight: "36px",
          },
        ],
        "title-2": [
          "26px",
          {
            fontWeight: "700",
            lineHeight: "32px",
          },
        ],
        "title-3": [
          "24px",
          {
            fontWeight: "700",
            lineHeight: "28px",
          },
        ],
        "subtitle-1": [
          "20px",
          {
            fontWeight: "700",
            lineHeight: "28px",
          },
        ],
        "subtitle-2": [
          "18px",
          {
            fontWeight: "700",
            lineHeight: "24px",
          },
        ],
        "body-1": [
          "18px",
          {
            fontWeight: "500",
            lineHeight: "24px",
          },
        ],
        "body-2": [
          "16px",
          {
            fontWeight: "500",
            lineHeight: "24px",
          },
        ],
        "body-3": [
          "14px",
          {
            fontWeight: "500",
            lineHeight: "20px",
          },
        ],
        "body-bold-1": [
          "18px",
          {
            fontWeight: "700",
            lineHeight: "24px",
          },
        ],
        "body-bold-2": [
          "16px",
          {
            fontWeight: "700",
            lineHeight: "24px",
          },
        ],
        "body-bold-3": [
          "14px",
          {
            fontWeight: "700",
            lineHeight: "20px",
          },
        ],
        "caption-1": [
          "14px",
          {
            fontWeight: "500",
            lineHeight: "20px",
          },
        ],
        "caption-2": [
          "12px",
          {
            fontWeight: "500",
            lineHeight: "16px",
          },
        ],
        "caption-bold-1": [
          "14px",
          {
            fontWeight: "600",
            lineHeight: "20px",
          },
        ],
        "caption-bold-2": [
          "12px",
          {
            fontWeight: "600",
            lineHeight: "16px",
          },
        ],
        toggle: [
          "14px",
          {
            fontWeight: "700",
            lineHeight: "18px",
          },
        ],
      },
      boxShadow: {
        header: "0px -4px 16px rgba(0, 0, 0, 0.04)",
        footer: "0px -1px 0px rgba(33, 33, 33, 0.02)",
        select: "0px 0px 12px rgba(0, 0, 0, 0.08)",
        quicklink: "8px 8px 32px rgba(0, 0, 0, 0.04)",
        button: "0px -4px 16px rgba(0, 0, 0, 0.04)",
        toast:
          "28px 28px 56px rgba(37, 39, 37, 0.08), 0px 0px 64px rgba(37, 39, 37, 0.04)",
        "search-bar": "8px 8px 32px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: 0, transform: "translateY(100%)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: 1, transform: "translateY(0)" },
          to: { opacity: 0, transform: "translateY(100%)" },
        },
        "fade-in-up-40": {
          from: { opacity: 0, transform: "translateY(40px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "fade-in-88": {
          from: { opacity: 0, transform: "scale(0.88)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "fade-out-88": {
          from: { opacity: 1, transform: "scale(1)" },
          to: { opacity: 0, transform: "scale(0.88)" },
        },
      },
      animation: {
        "toast-visible": "fade-in-up 0.3s ease-in-out forwards",
        "toast-hidden": "fade-in-down 0.3s ease-in-out forwards",
        "page-up": "fade-in-up-40 0.56s ease-in-out forwards",
        "popup-visible": "fade-in-88 0.3s ease-in-out forwards",
        "popup-hidden": "fade-out-88 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
