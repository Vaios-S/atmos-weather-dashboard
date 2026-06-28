export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2),transparent_35%)]">
      <div className="grid min-h-screen grid-rows-[auto_auto_auto] px-6 py-10 lg:grid-cols-2 lg:grid-rows-1 lg:px-12">
        <section className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Atmos
            </p>

            <h1 className="mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Weather intelligence for your personal cities.
            </h1>
          </div>
        </section>

        <section className="flex w-full items-center justify-center py-10 lg:py-0">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">
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

        <p className=" flex flex-col items-center text-center lg:items-start lg:text-left max-w-md text-center text-sm leading-6 text-white/50 lg:absolute lg:bottom-10 lg:left-12 lg:text-left">
          Search real-time weather, save your favorite cities, and build your
          own modern weather dashboard.
        </p>
      </div>
    </main>
  );
}
