export const transformRole = (role: string): string => {
  switch (role) {
    case 'admin':
      return '🔮 Overseer of Realities'
    case 'manager':
      return '🛠️ Engineer of Existence'
    case 'viewer':
      return '👁️ Sentinel of the Unknown'
    default:
      return 'Wanderer'
  }
}
