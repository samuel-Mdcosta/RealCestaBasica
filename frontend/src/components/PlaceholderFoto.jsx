const stripePattern = {
  backgroundImage:
    "repeating-linear-gradient(45deg, #ece0c4 0px, #ece0c4 12px, #e3d3ab 12px, #e3d3ab 24px)",
}

export default function PlaceholderFoto({ texto, className = "" }) {
  return (
    <div
      style={stripePattern}
      className={`flex items-center justify-center ${className}`}
    >
      <span className="bg-white/70 border border-black/10 text-gray-500 text-xs font-mono px-3 py-1 rounded">
        {texto}
      </span>
    </div>
  )
}
