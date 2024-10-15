export const ApiRoutes = {
  //route for authentification
  login: 'login',
  logout: 'logout',
  changePassword: 'changePassword',
  //route for directory
  allDirectories: 'allDirectories',
  allBranches: 'allBranches',
  //route for invoice
  addInvoice: 'addInvoice',
  allInvoices: 'allInvoices',
  deleteInvoice: 'deleteInvoice',
  searchInvoice: '/invoices/filter', //this is for search
  //routes for images
  addImage: '/images/store',
  allImage: '/images/all',
  updateImage: 'images/update/{id}',
  // deleteImage: 'deleteInvoice/{id}',
  //route for invoiceKeys
  allInvoicesKeys: 'allInvoicesKeys',
  //route for Subdirectories
  allSubdirectories: 'allSubdirectories'
}
