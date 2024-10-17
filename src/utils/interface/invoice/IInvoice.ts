import type { IDirectory, ISubdirectory } from '../directory/IDirectory'
import type { IImage } from '../image/IImage'
import type { InvoiceKey } from '../invoiceKey/IInvoiceKey'
import type { IUser } from '../user/IUser'

export interface IInvoice {
  InvoiceId: Number
  InvoiceCode: String
  InvoiceDesc: String
  isEditable: Boolean
  InvoiceBarCode: string
  DirectoryFId: Number
  subFolder: Number
  UserFId: Number
  InvoiceDate: String
  BranchFId: Number
  user?: IUser
  images?: IImage
  directory?: IDirectory
  InvoiceKeyFId: number
  dataCreated: string
  InvoicePath: string
  ClientPhone: string
  ExpiredDate: string
  ClientName: string
  AndroidVersion: string
  invoicekey?: InvoiceKey
  dateFrom?: string
  dateTo?: string
  isActive: boolean
  isSelected?: boolean
}
