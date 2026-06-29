import { motion } from "framer-motion";

export default function SunCard({ weather }) {
  function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <motion.div
      key={weather.name}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
    >
      <p className=" [text-shadow:_0_2px_10px_rgb(0_0_0_/_65%)]  text-sm font-medium text-white/85">
        Sun Cycle
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <p className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)] text-xs uppercase tracking-[0.2em] text-white/95">
            Sunrise
          </p>

          <p className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]  mt-3 text-2xl font-light text-white">
            {formatTime(weather.sys.sunrise)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <p className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]  text-xs uppercase tracking-[0.2em] text-white/95">
            Sunset
          </p>

          <p className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]  mt-3 text-2xl font-light text-white">
            {formatTime(weather.sys.sunset)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
