interface Props {
  children: React.ReactNode
  onClick: () => void
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
    >
      {children}
    </button>
  )
}