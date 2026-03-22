import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => (
  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-800 p-8 text-white shadow-xl sm:p-12">
    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
    <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-2xl" />
    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative text-3xl font-extrabold sm:text-5xl">
      E-Commerce Product Explorer
    </motion.h1>
    <p className="relative mt-4 max-w-2xl text-sky-50/95">
      Discover top products, compare prices, save favorites, and checkout smoothly with a polished shopping
      experience.
    </p>
    <div className="relative mt-8 flex flex-wrap gap-3">
      <Link
        to="/products"
        className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-700 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-100"
      >
        Explore Products
      </Link>
      <Link
        to="/cart"
        className="inline-block rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
      >
        View Cart
      </Link>
    </div>
    <div className="relative mt-8 grid max-w-xl grid-cols-3 gap-3">
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
        <p className="text-lg font-extrabold">2 APIs</p>
        <p className="text-xs text-sky-100">Data Sources</p>
      </div>
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
        <p className="text-lg font-extrabold">Live</p>
        <p className="text-xs text-sky-100">Search + Filters</p>
      </div>
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
        <p className="text-lg font-extrabold">Smooth</p>
        <p className="text-xs text-sky-100">Cart Flow</p>
      </div>
    </div>
  </section>
);

export default Home;
