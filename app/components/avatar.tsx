interface AvatarProps {
  initials: string
  index: number
}

export function Avatar({ initials, index }: AvatarProps) {
  const colors = [
    "bg-blue-600", // First avatar
    "bg-green-600", // Second avatar
    "bg-yellow-600", // Third avatar
  ]

  return (
    <div
      className={`w-10 h-10 rounded-full border border-white/20 ${colors[index]} flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  )
}

