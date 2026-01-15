export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-posterTeal shadow-soft ring-1 ring-black/5">
      {children}
    </span>
  )
}
