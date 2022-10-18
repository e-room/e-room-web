import Link from "next/link";

export default function Home() {
  return (
    <Link href={"/home"}>
      <a>
        <div style={{ background: "var(--primary-1)", width: "100vw", height: "100vh" }}>
          스플래시 화면~!! 클릭하면 넘어감~!!!!
          github action5
        </div>
      </a>
    </Link>
  );
}
