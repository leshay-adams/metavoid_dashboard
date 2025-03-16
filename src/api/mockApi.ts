export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'viewer'
  status: 'active' | 'inactive'
  dateJoined: string
}

export interface Role {
  id: string
  name: string
}

const roles: Readonly<Role[]> = [
  {id: 'admin', name: 'Admin'},
  {id: 'manager', 'name': 'Manager'},
  {id: 'viewer', name: 'Viewer'}
]
const pastSixMonths = Date.now() - 180 * 24 * 60 * 60 * 1000;

let users: User[] = [...Array(50)].map((_, i) => ({
  id: (i + 1).toString(),
  name: `User ${i + 1}`,
  email: `alias${i + 1}@metavoid.com`,
  role: roles[i % 3].id,
  status: i % 2 ? 'inactive' : 'active',
  dateJoined: new Date(pastSixMonths + Math.random() * (Date.now() - pastSixMonths)).toISOString()
}))