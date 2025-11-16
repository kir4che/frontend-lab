import { Link } from 'react-router';

const NotFound = () => (
  <section className="flex-center relative min-h-[80vh] text-center">
    <div className="w-full max-w-lg rounded-2xl bg-white p-[clamp(2rem,5vw,3rem)] text-center shadow-xl">
      <p className="inline-flex items-center justify-center text-sm tracking-wider text-gray-500">
        404
      </p>
      <h1 className="mb-4">找不到此頁面</h1>
      <p className="mb-10 leading-relaxed text-gray-600">
        看起來您想找的頁面不存在，或已被移動位置。
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-pink-700 px-6 py-2.5 font-medium text-white"
      >
        返回首頁
      </Link>
    </div>
  </section>
);

export default NotFound;
