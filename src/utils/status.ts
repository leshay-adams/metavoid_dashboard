export const transformStatus = (status: string): string => {
  switch (status) {
    case 'active':
      return '🟢 Active in the MetaVoid'
    case 'inactive':
      return '🔴 Offline, Link Severed'
    default:
      return 'Unknown Status'
  }
}
