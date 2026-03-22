import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="rounded-3xl border border-white/70 bg-white/90 p-10 text-center shadow-sm">
    <h1 className="text-3xl font-extrabold">Page Not Found</h1>
    <p className="mt-2 text-slate-600">The page you requested does not exist.</p>
    <Link to="/" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white">
      Go Home
    </Link>
  </section>
);

export default NotFound;
