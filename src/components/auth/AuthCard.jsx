export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="relative hidden flex-1 overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Atmos
              </p>
              <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight tracking-tight">
                Weather intelligence for your personal cities.
              </h1>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/50">
              Search real-time weather, save your favorite cities, and build
              your own modern weather dashboard.
            </p>
          </div>
        </section>

        <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-white/40">
                Atmos
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/50">{subtitle}</p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
