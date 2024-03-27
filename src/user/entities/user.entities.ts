export type userType = {
  user_id: number,
  first_name: string,
  last_name: string,
  phone_number: string,
  email: string,
  address: string,
  gender: string,
  daybirth: Date,
  role_id: number,
  password: string
}

export type userRole = {
  role_id: number,
  role_name: number
}

export type userLogin = {
  email: string,
  password: string
}