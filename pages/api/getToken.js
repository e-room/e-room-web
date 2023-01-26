import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { accessToken, refreshToken, redirectPath } = req.query;
    console.log(req.headers);

    setCookie("accessToken", accessToken, {
      req,
      res,
      maxAge: 1800,
      path: "/",
    });
    setCookie("refreshToken", refreshToken, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 30 * 1,
      path: "/",
    });

    // res.status(200).json({ message: "test" });
    res.redirect(301, redirectPath);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
