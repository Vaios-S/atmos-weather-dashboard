import loaderVideo from "../../assets/animation/Globe Animation.webm";

export default function Loader({
  message = "Loading...",
  subMessage = "Please wait while we get the data for you.",
}) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div
        className="
    flex
    w-full
    max-w-sm
    flex-col
    items-center
    rounded-[2rem]
    border
    border-black/5
    bg-white
    px-8
    py-10
    text-center
    shadow-[0_25px_80px_rgba(0,0,0,0.35)]
  "
      >
        <video className="w-64 object-contain" autoPlay loop muted playsInline>
          <source src={loaderVideo} type="video/webm" />
        </video>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
          {message}
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">{subMessage}</p>
      </div>
    </div>
  );
}
