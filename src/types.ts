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
