export default function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring */}
        <div
          className="
            h-8 w-8
            rounded-full
            border-4
            border-white/10
            border-t-white
            animate-spin
            shadow-[0_0_25px_rgba(255,255,255,0.15)]
          "
        />

        {/* Inner Glow */}
        <div
          className="
            absolute
            h-4 w-4
            rounded-full
            bg-white/20
            blur-md
          "
        />
      </div>
    </div>
  );
}