import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      try {
        let token = null;
        if (account.provider === "kakao") {
          token = account.access_token;
        }
        if (account.provider === "naver") {
          token = account.access_token;
        }
        if (account.provider === "google") {
          token = account.id_token;
        }
        // await getJwtToken({
        //   provider: account.provider,
        //   token,
        // });
        console.log("로그인 성공!");
        return true;
      } catch (error) {
        console.log(`로그인 실패. ERROR: ${error}`);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
});
