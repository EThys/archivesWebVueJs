import type { IInvoice } from '../invoice/IInvoice'

export interface IImage {
  InvoiceFId: number
  ImageId: number
  ImageName?: string
  ImageOriginalName: string
  ImagePath: string
  PublicUrl: string
  invoice: IInvoice
  isActive: boolean
}

export interface IPrevPicture {
  PublicUrl: string
}

export interface IMedia {
  thumb: string
  src: string
  caption: string
}

export interface IAllData {
  current_page: number
  data: Array<IInvoice>
  first_page_url: String
  from: number
  last_page: number
  last_page_url: String
  links: Array<ILink>
  next_page_ur: String
  path: String
  per_page: number
  prev_page_url?: string
  to: number
  total: number
}
interface ILink {
  url?: String
  label: String
  active: Boolean
}

export interface IMedia {
  thumb: string
  src: string
  caption: string
}
