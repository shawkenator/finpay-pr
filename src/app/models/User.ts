export interface User {
  id: number,
  name: string,
  email: string,
  gender: 'male' | 'female',
  status: 'active' | 'inactive'
}
