import { User, Role } from '../types'

const roles: Readonly<Role[]> = [
  {id: 'admin', name: 'Admin'},
  {id: 'manager', name: 'Manager'},
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

const simDelay = (min = 300, max = 800) => (
  new Promise(res => setTimeout(res, Math.random() * (max - min) + min))
)

export const mockApi = {

  async getUser(id: string) {
    await simDelay()
    return users.find(i => i.id === id) || Promise.reject('Error: No User found')
  },

  async getUsers({ page = 1, limit = 10, filter = {}, sort = {} }: GetUsersParams = {}) {
    await simDelay();
    let data = users.filter(i =>
      (!filter.name || i.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.role || i.role === filter.role) &&
      (!filter.status || i.status === filter.status)
    );

    if (sort.field) {
      data.sort((a, b) =>
        sort.field === 'name' 
          ? sort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
          : sort.order === 'asc' 
          ? new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime()
          : new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
      );
    }

    return { data: data.slice((page - 1) * limit, page * limit), total: data.length, page, limit };
  },

}