<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
//@ts-ignore
import NavBar from '@/components/navbar/NavBar.vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
//@ts-ignore
import { getToken } from '@/stores/token'
//@ts-ignore
import { getUser } from '@/stores/user'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
//@ts-ignore
import type { IInvoice } from '@/utils/interface/invoice/IInvoice'
const searchTerm = ref('')
import axios from 'axios'
//@ts-ignore
import type { IImage } from '@/utils/interface/image/IImage'
import { useRouter } from 'vue-router'
//@ts-ignore
import FsLightbox from 'fslightbox-vue/v3'
//@ts-ignore
import type { IDirectory } from '@/utils/interface/directory/IDirectory'
//@ts-ignore
import type { IInvoiceKey } from '@/utils/interface/invoiceKey/IInvoiceKey'
//@ts-ignore
import type { IBranch } from '@/utils/interface/branch/IBranch'
import Multiselect from '@vueform/multiselect'

const fsLightbox = FsLightbox
const lightboxToggler = ref(false)
const media = ref<Array<String>>([])
const customAttributes = ref<Array<String>>([])
const imageUrls = ref([])
const router = useRouter()
const token = getToken() as string
const toast = useToast()
const isCategorySearchOpen = ref(false)
const user = getUser()
const searching = ref<Boolean>(false)
const isChecked = ref<boolean>(false)
const isEditable = ref<Boolean>()
const selectedItem = ref('All')
const showSortOptions = ref<boolean>(false)
const advancedSearch = ref<boolean>(false)
const invoices = ref<Array<IInvoice>>([{} as IInvoice])
const currentPage = ref(1)
const totalPages = ref(0)
const perPage = ref(20)
const totalInvoices = ref(0)
const selectedInvoiceIds = ref(new Set())
const images = ref<Array<IImage>>([{} as IImage])
const baseUrl = 'http://localhost:8000'
const directories = ref<Array<IDirectory>>([{} as IDirectory])
const invoiceKeys = ref<Array<IInvoiceKey>>([{} as IInvoiceKey])
const branches = ref<Array<IBranch>>([{} as IBranch])

const toggleSelectInvoice = (invoiceId: any) => {
  if (selectedInvoiceIds.value.has(invoiceId)) {
    selectedInvoiceIds.value.delete(invoiceId)
  } else {
    selectedInvoiceIds.value.add(invoiceId)
  }
}

const getAllBranches = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allBranches}`)
    .then(function (response) {
      branches.value = response.data.branchs as Array<IBranch>
      console.log('hakunamatata', branches.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}

const getAllDirectories = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allDirectories}`)
    .then(function (response) {
      directories.value = response.data.directories as Array<IDirectory>
      console.log(directories.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}
const getAllInvoicesKeys = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allInvoicesKeys}`)
    .then(function (response) {
      invoiceKeys.value = response.data.invoiceKeys as Array<IInvoiceKey>
      console.log('mutanba', invoiceKeys.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}

watchEffect(async () => {
  try {
    await getAllDirectories()
    await getAllInvoicesKeys()
    await getAllBranches()
  } catch (error) {
    console.log(error)
  }
})

const Images = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allImage}`)
    .then(function (response) {
      images.value = response.data.images as Array<IImage>
      console.log(images.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}
const slide = ref(1)
const toggler = ref<Boolean>(false)

const getPict = (data: any, value: number) => {
  const clickedItem = data[value]
  const fileExtension = clickedItem.ImageOriginalName.split('.').pop()?.toLowerCase()

  switch (fileExtension) {
    case 'pdf':
      console.log('PDF détecté:', clickedItem.ImageOriginalName)
      window.open(`${baseUrl}${clickedItem.PublicUrl}`, '_blank')
      return
    case 'doc':
    case 'docx':
      console.log('Document Word détecté:', clickedItem.ImageOriginalName)
      downloadFile(clickedItem)
      return
    default:
      // Pour les images
      media.value = data.map((v: IImage) => `${baseUrl}${v.PublicUrl}`)
      toggler.value = !toggler.value
      slide.value = Number(value) + 1
      console.log('Images chargées:', media.value)
  }
}
// Fonction  pour télécharger les fichiers
const downloadFile = (item: IImage) => {
  const link = document.createElement('a')
  link.href = `${baseUrl}${item.PublicUrl}`
  link.download = item.ImageOriginalName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const getImageSource = (item: IImage) => {
  const fileExtension = item.ImageOriginalName.split('.').pop()?.toLowerCase()

  switch (fileExtension) {
    case 'pdf':
    case 'doc':
    case 'docx':
      return `${baseUrl}${item.IconPath}`
    default:
      return `${baseUrl}${item.PublicUrl}`
  }
}

const toggleSortOptions = () => {
  showSortOptions.value = !showSortOptions.value
}
const toggleAdvancedSearch = () => {
  advancedSearch.value = !advancedSearch.value
}
const items = ref([
  'All',
  'Key',
  'Code',
  'Description',
  'BarCode',
  'UserName',
  'DirectoryName',
  'BranchName',
  'Date'
])
const getCurrentDate = () => {
  var date = new Date()
  var year = date.getFullYear()
  var month = String(date.getMonth() + 1).padStart(2, '0')
  var day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const loading = ref(false)
const pagination = ref()

const showData = (value: any) => {
  const { href } = router.resolve({
    path: '/invoice',
    query: { value }
  })
  window.open(href, '_blank')
}

const code = ref('')
const description = ref('')
const barcode = ref('')
const branchName = ref('')
const Selectdirectories = ref([])
const SelectinvoicesKeys = ref([])
const selectedBranches = ref([])
const dateFrom = ref('')
const dateTo = ref('')
const sortOrder = ref('')

const clearSorting = () => {
  sortOrder.value = ''
}

const clearFields = () => {
  code.value = ''
  description.value = ''
  barcode.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  Selectdirectories.value = []
  SelectinvoicesKeys.value = []
  selectedBranches.value = []
}

const searchInvoices = async () => {
  searching.value = true
  loading.value = true
  const searchParams = new URLSearchParams()
  let key
  switch (selectedItem.value) {
    case 'All':
      key = 'All'
      break
    case 'Description':
      key = 'InvoiceDesc'
      break
    case 'BranchName':
      key = 'BranchName'
      break
    case 'Date':
      key = 'InvoiceDate'
      break
    default:
      key = `Invoice${selectedItem.value}`
  }

  searchParams.append(key, searchTerm.value)

  if (code.value) searchParams.append('InvoiceCode', code.value)
  if (description.value) searchParams.append('InvoiceDesc', description.value)
  if (barcode.value) searchParams.append('InvoiceBarCode', barcode.value)
  if (barcode.value) searchParams.append('InvoiceBarCode', barcode.value)
  if (branchName.value) searchParams.append('BranchName', branchName.value)
  Selectdirectories.value.forEach((directory) => {
    searchParams.append('DirectoryName', directory)
  })
  SelectinvoicesKeys.value.forEach((invoiceKey) => {
    searchParams.append('Invoicekey', invoiceKey)
  })
  selectedBranches.value.forEach((branch) => {
    searchParams.append('BranchName', branch)
  })

  if (dateFrom.value) searchParams.append('date_from', dateFrom.value)
  if (dateTo.value) searchParams.append('date_to', dateTo.value)
  // if (sortOrder.value) searchParams.append('sort_order', sortOrder.value)
  searchParams.append('sort_by', 'CreatedAt')
  searchParams.append('sort_order', sortOrder.value)
  console.log('BABABABBAABBA', sortOrder.value)
  // if (SelectinvoicesKeys.value) searchParams.append('Invoicekey', SelectinvoicesKeys.value)
  searchParams.append('per_page', perPage.value.toString())
  searchParams.append('page', currentPage.value.toString())

  try {
    const response = await useAxiosRequestWithToken(token).get(
      `${ApiRoutes.searchInvoice}?${searchParams.toString()}`
    )
    invoices.value = response.data.data.data
    pagination.value = response.data
    totalInvoices.value = response.data.data.total
    totalPages.value = response.data.data.last_page
    console.log('eeeeeeeebababa', invoices.value)
    console.log('mutu munene', totalInvoices.value)
    console.log('mutu munene', totalPages.value)
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const getImagesWithMatchingInvoiceId = (currentInvoiceId: any) => {
  try {
    const matchedImages = images.value.filter((image) =>
      invoices.value.some((invoice) => currentInvoiceId == image.InvoiceFId)
    ).length

    console.log('Matched Images:', matchedImages)
    return matchedImages
  } catch (error) {
    console.log('Error fetching matched images:', error)
  }
}

const changePage = (page: any) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
    searchInvoices()
  }
}
const downloadSelected = () => {
  // Implement the download logic here
  console.log('Downloading invoices:', [...selectedInvoiceIds.value])
}
const invoice = ref<IInvoice>({
  InvoiceId: 0,
  ClientPhone: '',
  InvoiceCode: '',
  InvoiceDesc: '',
  isEditable: false,
  InvoiceBarCode: '',
  DirectoryFId: 0,
  subFolder: 0,
  InvoiceKeyFId: 0,
  dataCreated: '',
  InvoicePath: '',
  ClientName: '',
  ExpiredDate: '',
  AndroidVersion: '',
  UserFId: user!.UserId,
  InvoiceDate: '',
  BranchFId: user!.BranchFId,
  dateFrom: '',
  dateTo: '',
  isActive: false
})

const open = ref(false)
const updateInvoice = async (invoiceId: any) => {
  try {
    open.value = true
    const updatedInvoice = invoices.value.find((inv) => inv.InvoiceId === invoiceId)
    console.log('Invoice updated:', updatedInvoice)
    if (window.confirm('Do you want to save changes?')) {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.updateInvoice}/${invoiceId}`,
        updatedInvoice
      )

      if (response.data.status === 200) {
        toast.open({
          message: '"Changes saved successfully!',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        console.log('MUZOLLLLLLLLLLLLLA', response)
        setTimeout(() => searchInvoices(), 100)
      } else {
        toast.open({
          message: response.data.errors.InvoiceCode,
          type: 'error',
          position: 'bottom',
          duration: 5000
        })
      }
    }
  } catch (error) {
    console.error('Erreur du serveur', error)
    toast.open({
      message: 'Erreur du serveur',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  } finally {
    open.value = false
  }
}
const deleteInvoice = async (invoiceId: any) => {
  try {
    if (window.confirm('Do you want to delete this invoice?')) {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.deleteInvoice}/${invoiceId}`
      )

      if (response.data.status === 200) {
        toast.open({
          message: 'Suppression réussie',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        setTimeout(() => searchInvoices(), 1000)
      } else {
        toast.open({
          message: 'Erreur lors de la suppression',
          type: 'error',
          position: 'bottom',
          duration: 5000
        })
      }
    }
  } catch (error) {
    console.error('Erreur du serveur', error)
    toast.open({
      message: 'Erreur du serveur',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  }
}

const selectAllInvoices = () => {
  invoices.value.forEach((invoice) => {
    selectedInvoiceIds.value.add(invoice.InvoiceId)
  })
}

const deselectAllInvoices = () => {
  selectedInvoiceIds.value.clear()
}

const selectItem = (item: string) => {
  selectedItem.value = item
  isCategorySearchOpen.value = false
}
const toggleSwitch = () => {
  isChecked.value = !isChecked.value
}
const toggleCategorySearchOpen = () => {
  isCategorySearchOpen.value = !isCategorySearchOpen.value
}
const originalData = ref<Array<IInvoice>>([{} as IInvoice])

const toggleEdit = (invoice: any) => {
  if (invoice.isEditable) {
    // Annuler l'édition : restaurer les données originales
    Object.assign(
      invoice,
      originalData.value.find((v) => v.InvoiceId === invoice.InvoiceId)
    )
    invoice.isEditable = false
  } else {
    // Passer en mode édition : sauvegarder les données originales
    const originalInvoice = { ...invoice } // Créer une copie des données actuelles
    originalData.value = originalData.value.filter((v) => v.InvoiceId !== invoice.InvoiceId) // Supprimer l'ancienne entrée
    originalData.value.push(originalInvoice) // Ajouter la nouvelle entrée
    invoice.isEditable = true
  }
}

const cancelEdit = (invoice: any) => {
  invoice = { ...originalData.value }
  invoice.isEditable = false
}
// const toggleEdit = (invoice: any) => {
//   invoice.isEditable = !invoice.isEditable
// }

const handleSelect = (selected: any) => {
  console.log('Selected directories:', selected)
}

const getDirectoryNames = (directories: any) => {
  return directories.map((directory: any) => directory.DirectoryName)
}
const getInvoicesNames = (invoiceKeys: any) => {
  return invoiceKeys.map((invoiceKey: any) => invoiceKey.Invoicekey)
}
const getBranchesNames = (branches: any) => {
  return branches.map((branche: any) => branche.BranchName)
}
</script>

<template>
  <NavBar />

  <div class="mt-10">
    <form style="width: 69%" class="mx-auto">
      <div class="flex">
        <label
          for="search-dropdown"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Your Email</label
        >
        <button
          id="dropdown-button"
          @click="toggleCategorySearchOpen"
          class="flex-shrink-0 z-10 inline-flex items-center py-2 px-2 text-sm font-medium text-center text-white bg-gray-500 border border-gray-300 rounded-s-md hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          {{ selectedItem }}
          <svg
            class="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div class="absolute mt-10" :aria-expanded="isCategorySearchOpen">
          <div
            :class="{ hidden: !isCategorySearchOpen }"
            class="menu absolute right-50 z-10 mt-2 w-40 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <a
              v-for="item in items"
              :key="item"
              @click="selectItem(item)"
              class="px-4 py-2 hover:bg-gray-200 text-sm text-black cursor-pointer flex items-center justify-between"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              {{ item }}
            </a>
          </div>
        </div>

        <div class="relative w-full">
          <input
            type="search"
            v-model="searchTerm"
            id="search-dropdown"
            class="block py-2 px-4 w-full z-20 text-lg text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="What are you looking for?"
            required
          />
          <button
            @click.prevent="searchInvoices()"
            type="submit"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  </div>
  <div style="width: 69%" class="flex justify-between mx-auto mt-3">
    <div class="flex items-center">
      <span class="relative" @click="toggleSwitch">
        <input type="checkbox" class="sr-only" />
        <span
          class="block h-6 w-14 rounded-full cursor-pointer transition-colors duration-300"
          :class="{ 'bg-blue-500': isChecked, 'bg-gray-400': !isChecked }"
        >
          <span
            class="absolute top-1 left-1 block h-4 w-6 rounded-full bg-white transition-transform duration-300"
            :style="{ transform: isChecked ? 'translateX(100%)' : 'translateX(0)' }"
          ></span>
        </span>
      </span>
      <span class="ml-2 text-gray-900 dark:text-gray-200">Images</span>
    </div>

    <div class="flex">
      <button @click="toggleSortOptions" class="flex text-blue-500 hover:text-blue-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
        <span class="ml-1 text-md hover:underline">Sorting</span>
      </button>
      <button @click="toggleAdvancedSearch" class="flex text-blue-500 hover:text-blue-700 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span class="ml-1 text-md hover:underline">Advanced search</span>
      </button>
    </div>
  </div>
  <div v-if="loading" class="loader flex justify-center items-center h-32">
    <i style="font-size: 50px" class="fa-solid fa-spinner fa-spin"></i>
  </div>
  <div
    style="width: 69%"
    class="ethberge bg-gray-700 rounded-md pt-2 pb-5 px-4 mx-auto mt-3"
    v-if="showSortOptions"
  >
    <div class="flex items-center">
      <div class="flex-1 mr-4">
        <label for="sort-by" class="text-md font-semibold text-gray-400">Sort By</label>
        <select
          id="sort-by"
          class="mt-1 text-black-400 p-2 w-full border border-gray-700 rounded-md"
        >
          <option>Branch</option>
          <option>Time</option>
        </select>
      </div>
      <div class="flex-1 mr-4">
        <label for="order-by" class="text-md font-semibold text-gray-400">Order By</label>
        <select
          id="order-by"
          v-model="sortOrder"
          class="mt-1 text-black-400 p-2 w-full border border-gray-700 rounded-md"
        >
          <option value="asc">Asc</option>
          <!-- Valeur pour tri ascendant -->
          <option value="desc">Desc</option>
          <!-- Valeur pour tri descendant -->
        </select>
      </div>
      <div class="flex-2 mr-4">
        <label for="order-by" class="text-md block font-semibold text-gray-400">Actions</label>
        <button
          @click="searchInvoices()"
          class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm py-2 px-4 mr-2 rounded"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          Search
        </button>
        <button
          @click="clearSorting()"
          class="bg-yellow-300 text-black font-medium text-sm py-2 px-4 mr-2 rounded"
        >
          <i class="fa-solid fa-eraser"></i>
          Clear
        </button>
        <button
          @click="showSortOptions = false"
          class="bg-blue-400 hover:bg-blue-500 hover:text-white text-black font-medium text-sm py-2 px-4 rounded"
        >
          <i class="fa-solid fa-xmark"></i>
          Close
        </button>
      </div>
    </div>
  </div>
  <div style="width: 69%" class="bg-gray-700 rounded-md px-3 mx-auto mt-10" v-if="advancedSearch">
    <div class="container mx-auto pt-3 pb-2">
      <div class="flex flex-col space-y-4">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="code" class="block text-sm font-medium text-gray-300 mb-2">Code</label>
            <input
              type="text"
              id="code"
              v-model="code"
              placeholder="Code"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium mb-2 text-gray-300"
              >Description</label
            >
            <input
              type="text"
              v-model="description"
              id="description"
              placeholder="Description"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="barcode" class="block text-sm font-medium text-gray-300 mb-2"
              >Barcode</label
            >
            <input
              type="text"
              v-model="barcode"
              id="barcode"
              placeholder="Barcode"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="from" class="block text-sm font-medium mb-2 text-gray-300">From</label>
            <input
              v-model="dateFrom"
              type="date"
              id="from"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="to" class="block text-sm font-medium mb-2 text-gray-300">To</label>
            <input
              v-model="dateTo"
              type="date"
              id="to"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="users" class="block text-sm font-medium mb-2 text-gray-300">Users</label>
            <select
              id="users"
              class="mt-1 text-gray-400 font-medium p-2 w-full border border-gray-700 rounded-md"
            >
              <option>Select users</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="directories" class="block text-sm font-medium mb-2 text-gray-300">
              Directories
            </label>
            <Multiselect
              v-model="Selectdirectories"
              :options="getDirectoryNames(directories)"
              :close-on-select="false"
              track-by="DirectoryId"
              label="DirectoryName"
              placeholder="Select directories"
              class="multiselect-green"
              mode="tags"
              @input="handleSelect"
            />
          </div>
          <div>
            <label for="keys" class="block text-sm font-medium mb-2 text-gray-300"> Keys </label>
            <Multiselect
              v-model="SelectinvoicesKeys"
              :options="getInvoicesNames(invoiceKeys)"
              :close-on-select="false"
              track-by="Invoicekey"
              label="Invoicekey"
              placeholder="Select Keys"
              class="multiselect-green"
              mode="tags"
            />
          </div>
          <div>
            <label for="branches" class="block text-sm font-medium mb-2 text-gray-300">
              Branches
            </label>
            <Multiselect
              v-model="selectedBranches"
              :options="getBranchesNames(branches)"
              :close-on-select="false"
              track-by="BranchName"
              label="BranchName"
              placeholder="Select branches"
              class="multiselect-green"
              mode="tags"
            />
          </div>
        </div>

        <div class="flex items-center space-x-5">
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="filter_keys"
              class="w-3 h-3 text-blue-600 border-gray-300 rounded"
            />
            <label for="filter_keys" class="ml-2 text-sm font-medium text-gray-300"
              >Filter keys</label
            >
          </div>
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="old_directories"
              class="w-3 h-3 text-blue-600 border-gray-300 rounded"
            />
            <label for="old_directories" class="ml-2 text-sm font-medium text-gray-300"
              >Old directories</label
            >
          </div>
        </div>
        <div class="flex items-center justify-center">
          <input type="number" class="p-1 border text-black border-gray-700 mr-2 w-12" value="20" />
          <button
            @click.prevent="searchInvoices()"
            class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm py-2 px-4 mr-2 rounded"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            Search
          </button>
          <button
            @click="clearFields()"
            class="bg-yellow-300 text-black font-medium text-sm py-2 px-4 mr-2 rounded"
          >
            <i class="fa-solid fa-eraser"></i>
            Clear
          </button>
          <button
            @click="advancedSearch = false"
            class="bg-blue-400 hover:bg-blue-500 hover:text-white text-black font-medium text-sm py-2 px-4 rounded"
          >
            <i class="fa-solid fa-xmark"></i>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    style="width: 69%"
    v-if="searching && invoices.length == 0 && !loading"
    class="block justify-between mx-auto mt-8 text-center text-white bg-red-400 py-4 rounded-sm"
  >
    No results found
  </div>
  <div v-if="selectedInvoiceIds.size > 0" class="fixed bottom-4 left-4">
    <button
      @click="downloadSelected"
      class="relative flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      <span
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-black text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
      >
        {{ selectedInvoiceIds.size }}
      </span>
      <i class="fa-solid fa-download mr-2"></i>
      Download
    </button>
  </div>
  <div
    v-if="searching && !loading && invoices.length > 0"
    style="width: 69%"
    class="block justify-between mx-auto mt-3"
  >
    <div class="flex justify-between items-center mb-4 mt-8">
      <div class="flex">
        <a @click="selectAllInvoices()" class="ml-1 text-blue-500 text-md underline cursor-pointer">
          Select All
        </a>
        <a
          @click="deselectAllInvoices()"
          class="ml-1 text-blue-500 text-md underline cursor-pointer"
        >
          | Deselect All
        </a>
      </div>

      <div class="flex space-x-2">
        <button
          class="bg-gray-300 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Prev
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{
            'bg-blue-400 text-white': page === currentPage,
            'bg-gray-300 text-gray-800 hover:text-white ': page !== currentPage
          }"
          class="hover:bg-blue-500 font-bold py-2 px-4 rounded"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button
          class="bg-gray-300 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
      <span class="text-gray-500">
        {{ (currentPage - 1) * perPage + 1 }} to
        {{ Math.min(currentPage * perPage, totalInvoices) }} of
        {{ totalInvoices }}
      </span>
    </div>

    <div
      v-for="invoice in invoices"
      :Key="invoice"
      class="relative overflow-x-auto shadow-md sm:rounded-sm border mb-3 border-gray-200"
    >
      <table
        :class="{
          'border-2 border-red-500': selectedInvoiceIds.has(invoice.InvoiceId)
        }"
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 custom-table"
      >
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Id
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              {{ invoice.InvoiceId }}
            </td>
            <td
              rowspan="10"
              class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/2 align-top"
            >
              <div>
                <div
                  class="grid grid-cols-1 gap-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 mb-24"
                >
                  <img
                    v-if="isChecked"
                    v-for="(item, index) in invoice.images"
                    :key="item?.InvoiceFId || index"
                    :alt="item?.ImageName"
                    class="object-cover w-full h-auto cursor-pointer"
                    :src="getImageSource(item)"
                    @click="getPict(invoice.images, index)"
                  />
                  <span v-else class="w-[100px] h-[150px] mr-3"></span>
                </div>
              </div>
              <div
                :style="{ marginTop: isChecked ? '44%' : '1px' }"
                class="bg-white p-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              >
                <div class="flex flex-row justify-center space-x-2">
                  <button
                    style="background-color: #5a6268"
                    @click="toggleEdit(invoice)"
                    class="edit text-white font-bold py-2 px-4 rounded"
                  >
                    {{ invoice.isEditable ? 'Cancel' : 'Edit' }}
                  </button>
                  <button
                    @click="deleteInvoice(invoice.InvoiceId)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                  <button
                    @click="updateInvoice(invoice.InvoiceId)"
                    :disabled="open"
                    class="save bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <span v-if="!open">Save</span>
                    <i v-else class="fa fa-spinner fa-spin"></i>
                  </button>
                  <button
                    @click="toggleSelectInvoice(invoice.InvoiceId)"
                    class="select bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Select
                  </button>
                  <button
                    @click="showData(invoice.InvoiceId)"
                    class="view bg-black text-white font-bold py-2 px-4 rounded"
                  >
                    View
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Key
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              {{ invoice.invoicekey?.Invoicekey }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Code
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              <input
                v-if="invoice.isEditable"
                type="text"
                v-model="invoice.InvoiceCode"
                class="w-full h-full border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                style="box-sizing: border-box"
              />
              <span v-else>{{ invoice.InvoiceCode }}</span>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Description
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              <input
                v-if="invoice.isEditable"
                type="text"
                v-model="invoice.InvoiceDesc"
                class="w-full h-full border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                style="box-sizing: border-box"
              />
              <span v-else>{{ invoice.InvoiceDesc }}</span>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              BarCode
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              <input
                v-if="invoice.isEditable"
                type="text"
                v-model="invoice.InvoiceBarCode"
                class="w-full h-full border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                style="box-sizing: border-box"
              />
              <span v-else>{{ invoice.InvoiceBarCode }}</span>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Username
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              {{ invoice.user?.UserName }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Directory
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              {{ invoice.directory?.DirectoryName }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Branch
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              {{ invoice.user?.branch.BranchName }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Date
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              <input
                v-if="invoice.isEditable"
                type="date"
                v-model="invoice.InvoiceDate"
                class="w-full h-full border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                style="box-sizing: border-box"
              />
              <span v-else>{{ invoice.InvoiceDate }}</span>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300 dark:border-gray-600 w-1/6"
            >
              Files
            </th>
            <td class="px-6 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">
              <a
                href="invoice.images?.PublicUrl"
                class="text-blue-500 font-bold no-underline hover:underline"
              >
                {{ invoice.images?.length || 0 }} Files
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between items-center mb-4 mt-8">
      <div class="flex">
        <a @click="selectAllInvoices()" class="ml-1 text-blue-500 text-md underline cursor-pointer">
          Select All
        </a>
        <a
          @click="deselectAllInvoices()"
          class="ml-1 text-blue-500 text-md underline cursor-pointer"
        >
          | Deselect All
        </a>
      </div>

      <div class="flex space-x-2">
        <button
          class="bg-gray-300 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Prev
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{
            'bg-blue-400 text-white': page === currentPage,
            'bg-gray-300 text-gray-800 hover:text-white ': page !== currentPage
          }"
          class="hover:bg-blue-500 font-bold py-2 px-4 rounded"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button
          class="bg-gray-300 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
      <span class="text-gray-500">
        {{ (currentPage - 1) * perPage + 1 }} to
        {{ Math.min(currentPage * perPage, totalInvoices) }} of
        {{ totalInvoices }}
      </span>
    </div>
  </div>
  <FsLightbox
    initialAnimation="example-initial-animation"
    :loadOnlyCurrentSource="true"
    :toggler="toggler"
    :slide="slide"
    crossorigin="anonymous"
    type="image"
    :sources="media"
  />
</template>
<style>
.custom-table td:not(:last-child),
.custom-table th:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}
.custom-table th,
.custom-table td {
  padding-top: 5px;
  padding-bottom: 5px;
}
.custom-table td:nth-child(2) {
  text-align: right;
  color: black;
}

.custom-table td:last-child,
.custom-table th:last-child {
  border-bottom: none;
}
.example-initial-animation {
  animation: initial-animation 2s ease;
}

@keyframes initial-animation {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.action-buttons .edit {
  color: gray;
}

.action-buttons .save {
  color: green;
}

.action-buttons .select {
  color: blue;
}

.action-buttons .view {
  color: black;
}
</style>
