export default function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again.",
}) {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-red-200
        bg-white
        p-5
        shadow-lg
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-100
            text-xl
          "
        >
          ⚠️
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold text-zinc-900">{title}</h3>

          <p className="mt-1 text-sm leading-6 text-zinc-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
