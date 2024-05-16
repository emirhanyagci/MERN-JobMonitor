import Login from "@/features/auth/Login";

export default function Home() {
  return (
    <main className="pt-10">
      <div className=" flex flex-col items-center gap-5">
        <header className="text-2xl">JobMonitor - Emirhan Yagci</header>
        <Login />
      </div>
    </main>
  );
}
