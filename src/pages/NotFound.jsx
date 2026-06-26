import { Link } from "react-router-dom";
import msg404 from "../assets/backgrounds/404.png";

export default function NotFound() {
  return (
    <>
      <main className="min-h-screen bg-[#f1f57c] flex flex-col items-center justify-center px-6 py-10">
        {/* 404 Image */}
        <img
          src={msg404}
          alt="404"
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl object-contain"
        />

        {/* Text */}
        <div className="mt-8 flex flex-col items-center text-center max-w-md">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-600 font-semibold">
            Error
          </span>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900">
            Oops! Page not found.
          </h1>

          <p className="mt-4 text-neutral-700 text-base md:text-lg leading-7">
            Sorry, but the page you're looking for doesn't exist or has been
            moved.
          </p>

          <Link
            to="/"
            className="mt-8 rounded-md bg-neutral-900 px-8 py-3 text-white font-medium transition-all duration-300 hover:bg-black hover:scale-105"
          >
            Go Home
          </Link>
        </div>
      </main>
    </>
  );
}
