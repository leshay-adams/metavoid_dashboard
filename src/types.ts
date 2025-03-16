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

export interface GetUsersParams {
  page?: number;
  limit?: number;
  filter?: {
    name?: string;
    role?: 'admin' | 'manager' | 'viewer';
    status?: 'active' | 'inactive';
  };
  sort?: {
    field?: 'name' | 'dateJoined';
    order?: 'asc' | 'desc';
  };
}