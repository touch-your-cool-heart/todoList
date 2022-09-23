export interface listType {
  id: number
  content: string
  done: boolean
}

export interface userType {
  account: string
  password: string
  list: listType[]
}