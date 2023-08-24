export type User =
  | {
      token: string
      id: string | number
      account: string
      mobile: string | number
      avatar: string
    }
  | undefined
