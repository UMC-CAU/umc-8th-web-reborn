import { Outlet } from "react-router-dom";

export default function HomeLayout(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
