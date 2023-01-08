import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
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

      res.status(200).json({ message: "test" });
      //   res.redirect(301, redirectPath);
      break;

    case "POST":
      //some code...
      res.status(201).json({ message: "post method response object" });
      break;

    case "PATCH":
      //some code...
      res.status(200).json({ message: "patch method response object" });
      break;

    default:
      res.status(405).end(`${method} Not Allowed`);
      break;
  }
}
