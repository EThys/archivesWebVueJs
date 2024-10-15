export interface IUser {
  UserId: Number
  UserName: String
  Password: String
  SerialNumber: String
  IsAdmin: Number
  BranchFId: Number
  branch: {
    BranchId: Number
    BranchName: string
  }
}

export interface IUserAuth {
  UserName: string
  Password: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
