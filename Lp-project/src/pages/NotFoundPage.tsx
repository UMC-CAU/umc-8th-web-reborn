export default function NotFoundPage(): React.ReactElement {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white flex-col">
      <h1 className="text-9xl font-extrabold text-red-600">404</h1>
      <p className="text-2xl font-bold mt-4">페이지를 찾을 수 없습니다.</p>
    </div>
  );
}
