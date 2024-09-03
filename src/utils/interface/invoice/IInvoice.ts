import type { IDirectory } from '../directory/IDirectory'
import type { IImage } from '../image/IImage'
import type { IUser } from '../user/IUser'

export interface IInvoice {
  InvoiceCode: String
  InvoiceDesc: String
  InvoiceBarCode: string
  DirectoryFId: Number
  subFolder: Number
  InvoiceKeyFId: Number
  dataCreated: String
  UserFId: Number
  InvoiceDate: String
  BranchFId: Number
  user?: IUser
  images: Array<IImage>
  directory?: IDirectory
}
