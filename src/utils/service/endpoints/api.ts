export const ApiRoutes = {
  //route for authentification
  login: 'login',
  logout: 'logout',
  changePassword: 'changePassword',
  //route for directory
  allDirectories: 'allDirectories',
  //route for invoice
  addInvoice: 'addInvoice',
  allInvoices: 'allInvoices',
  searchInvoice: '/invoices/filter', //this is for search
  //routes for images
  addImage: '/images/store',
  updateImage: 'images/update/{id}',
  deleteImage: 'images/delete/{id}',
  //route for invoiceKeys
  allInvoicesKeys: 'allInvoicesKeys',
  //route for Subdirectories
  allSubdirectories: 'allSubdirectories'
}
