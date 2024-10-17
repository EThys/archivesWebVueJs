<script lang="ts" setup>
//@ts-ignore
import NavBar from '@/components/navbar/NavBar.vue'
//@ts-ignore
import { computed, ref, watchEffect } from 'vue'
//@ts-ignore
import {
  useAxiosRequestWithToken,
  useAxiosRequestWithTokenForImage //@ts-ignore
} from '@/utils/service/axios_api'
//@ts-ignore
import AxiosFormData from 'axios-form-data'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import { getToken } from '@/stores/token'
//@ts-ignore
import type { IDirectory, ISubdirectory } from '@/utils/interface/directory/IDirectory'
//@ts-ignore
import type { IDataFile } from '@/utils/interface/file/IDataFile'
//@ts-ignore
import type { IInvoice } from '@/utils/interface/invoice/IInvoice'
//@ts-ignore
import type { IInvoiceKey, IListKeys } from '@/utils/interface/invoiceKey/IInvoiceKey'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
//@ts-ignore
import { getUser } from '@/stores/user'
import axios from 'axios'
const token = getToken() as string
const router = useRouter()
const toast = useToast()
const directories = ref<Array<IDirectory>>([{} as IDirectory])
const subDirectories = ref<Array<ISubdirectory>>([{} as ISubdirectory])
const invoiceKeys = ref<Array<IInvoiceKey>>([{} as IInvoiceKey])
const isDragging = ref<Boolean>(false)
const dragText = ref('Drag and drop images here or <span class="select">Browse</span>')
const url = ref<Array<IDataFile>>([])
const images = ref<Array<IDataFile>>([])
const tabPicture = ref<any>()
const user = getUser()
const fileInput = ref()
const msg = ref('')
const file = ref()
const open = ref(false)
const fileName = computed(() => file.value?.name)
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf('.') + 1))
const fileMimeType = computed(() => file.value?.type)

const getCurrentDate = () => {
  var date = new Date()
  var year = date.getFullYear()
  var month = String(date.getMonth() + 1).padStart(2, '0')
  var day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const removeImageList = (indice: number) => {
  url.value.splice(indice, 1)
  images.value.slice(indice, 1)
}

const invoice = ref<IInvoice>({
  InvoiceId: 0,
  ClientPhone: '',
  InvoiceCode: '',
  InvoiceDesc: '',
  InvoiceBarCode: '',
  DirectoryFId: 0,
  subFolder: 0,
  InvoiceKeyFId: 0,
  dataCreated: '',
  InvoicePath: '',
  ClientName: '',
  ExpiredDate: getCurrentDate(),
  AndroidVersion: '',
  UserFId: user!.UserId,
  InvoiceDate: getCurrentDate(),
  BranchFId: user!.BranchFId,
  dateFrom: '',
  dateTo: '',
  isActive: false
})

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

const getAllSubDirectories = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allSubdirectories}`)
    .then(function (response) {
      subDirectories.value = response.data.subdirectories as Array<ISubdirectory>
      console.log(subDirectories.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}

const getAllInvoiceKeys = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allInvoicesKeys}`)
    .then(function (response) {
      invoiceKeys.value = response.data.invoiceKeys as Array<IInvoiceKey>
      console.log(invoiceKeys.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}

watchEffect(async () => {
  try {
    await getAllDirectories()
    await getAllInvoiceKeys()
    await getAllSubDirectories()
  } catch (error) {
    console.log(error)
  }
})

const updateSelections = () => {
  invoice.value.DirectoryFId = 0
  invoice.value.DirectoryFId = 0
}
const updateFilter = () => {
  filteredInvoiceKeys()
  filteredSubDirectories()
}

const filteredInvoiceKeys = () =>
  invoiceKeys.value.filter((key: any) => key.DirectoryFId == invoice.value.DirectoryFId)

const filteredSubDirectories = () =>
  subDirectories.value.filter((sub) => sub.DirectoryFId == invoice.value.DirectoryFId)

const isEnabled = ref<Boolean>(true)

const getAllInvoices = async () => {
  await useAxiosRequestWithToken(token)
    .get(`${ApiRoutes.allInvoices}`)
    .then(function (response) {
      invoice.value = response.data
      console.log(directories.value)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {})
}

const clear = () => {
  invoice.value.InvoiceBarCode = ''
  invoice.value.InvoiceDate = getCurrentDate()
  invoice.value.InvoiceCode = ''
  invoice.value.InvoiceDesc = ''
  invoice.value.DirectoryFId = 0
  invoice.value.InvoiceKeyFId = 0
  url.value = []
}

const createInvoice = async () => {
  open.value = true
  const date = new Date()
  const formData = new FormData()
  const milliseconds = date.getSeconds() * 1000
  invoice.value.AndroidVersion = navigator.userAgent
  invoice.value.InvoicePath = 'test'
  const data = JSON.parse(JSON.stringify(invoice.value))
  if (images.value.length > 0) {
    formData.append('image[]', images.value[0].content)
  }
  const axiosInstance = axios.create()
  axiosInstance.defaults.transformRequest = AxiosFormData

  await useAxiosRequestWithToken(token)
    .post(`${ApiRoutes.addInvoice}`, data)
    .then(function (response) {
      //success
      if (response.data.status === 201) {
        images.value.forEach(async (v, k) => {
          const formData = new FormData()
          formData.append('image', v.content)
          formData.append('uniqueId', `${milliseconds}`)
          formData.append('InvoiceFId', `${response.data.invoiceId}`)
          // for (let [key, value] of formData.entries()) {
          //   console.log('ethogange', key, value)
          // }

          await useAxiosRequestWithTokenForImage(token)
            .post(`${ApiRoutes.addImage}`, formData)
            .then(function (rep) {
              if (images.value.length - 1 == k) {
                toast.open({
                  message: "'Enregistremet réussi avec succès",
                  type: 'success',
                  position: 'bottom',
                  duration: 5000
                })

                clear()
                const data: any = rep.data.image
                console.log('ethberg---------->', data)
                tabPicture.value = data
              }
            })
            .catch(function (error) {
              // erreur
              toast.open({
                message: "Erreur lors de l'upload des images",
                type: 'error',
                position: 'bottom',
                duration: 5000
              })
            })
        })
      }
    })
    .catch(function (error) {
      //error
      toast.open({
        message: "Erreur lors de l'upload de la facture",
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
    })
  open.value = false
}

const dragover = (e: any) => {
  e.preventDefault()
  isDragging.value = true
  dragText.value = 'Drop images here'
}
const dragLeave = () => {
  isDragging.value = false
  dragText.value = 'Drag and drop images here or <span class="select">Browse</span>'
}
const drop = (e: any) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  console.log(files)
  for (let i = 0; i < e.dataTransfer.files.length; i++) {
    let fileSrc = URL.createObjectURL(files[i])
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc)
    }, 1000)
    const data = {
      name: files[i].name,
      content: files[i],
      file: files[i]
    }
    url.value.push({ file: fileSrc as string, content: files[i] })
    images.value.push(data)
  }
  isDragging.value = false
}
const removeImage = (index: number) => {
  images.value.splice(index, 1)
  url.value.splice(index, 1)
}
const uploadFile = (event: any) => {
  const files = event.target.files

  console.log('image ', files)
  console.log('Test ', files.length)

  for (let i = 0; i < files.length; i++) {
    const fileType = files[i].type
    let fileSrc: string

    // Vérifiez le type de fichier
    if (fileType === 'application/pdf') {
      fileSrc = 'http://localhost:5173/assets/pdf.png'
      console.log('ethberg ', fileSrc)
    } else if (
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      fileSrc = 'http://localhost:5173/assets/doc.png'
    } else {
      fileSrc = URL.createObjectURL(files[i])
      console.log('ethberg ', fileSrc)
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc)
      }, 1000)
    }

    // Créez un objet de données pour chaque fichier
    const data = {
      name: files[i].name,
      content: files[i],
      file: event.target.files[i],
      fileType: fileType
    }

    // Ajoutez le fichier à votre tableau d'URLs
    url.value.push({ file: fileSrc, content: files[i], fileType: fileType })
    images.value.push(data)
  }
}
</script>
<template>
  <NavBar />
  <div
    style="margin-top: -3%"
    class="min-h-screen bg-slate-50 flex items-center justify-center px-5"
  >
    <div style="width: 90%" class="flex space-x-6">
      <!-- Invoice Form Section -->
      <div class="bg-white border-gray-200 border w-1/2">
        <div
          class="hidden md:block w-full border-b border-gray-200 rounded-t-lg bg-gray-100 py-2 px-10"
        >
          <h1 class="text-black text-left text-lg">Invoice</h1>
        </div>
        <div class="w-full">
          <form
            class="px-8 pb-10"
            method="post"
            @submit.prevent="createInvoice"
            enctype="multipart/form-data"
          >
            <div class="flex flex-col space-y-3">
              <div class="flex space-x-2 mt-4">
                <div class="flex flex-col items-start w-full">
                  <label for="Code" class="text-lg mb-2 text-black">Code</label>
                  <input
                    v-model="invoice.InvoiceCode"
                    required
                    type="text"
                    id="Code"
                    name="Code"
                    placeholder="Enter Code"
                    class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                  />
                </div>
                <div class="flex flex-col items-start w-full">
                  <label for="Description" class="text-lg mb-2 text-black">Description</label>
                  <input
                    v-model="invoice.InvoiceDesc"
                    type="text"
                    id="Description"
                    placeholder="Enter Description"
                    name="Description"
                    class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                  />
                </div>
              </div>
              <div class="flex flex-col items-start w-full">
                <label for="Folder" class="text-lg mb-2 text-black">Folder</label>
                <select
                  v-model="invoice.DirectoryFId"
                  id="Folder"
                  name="Folder"
                  @change="updateFilter()"
                  class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                >
                  <option
                    v-for="item in directories"
                    :Key="item.DirectoryId"
                    :value="item.DirectoryId"
                  >
                    {{ item.DirectoryName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col items-start w-full">
                <label for="SubFolder" class="text-lg mb-2 text-black">Sub Folder</label>
                <select
                  v-model="invoice.subFolder"
                  id="SubFolder"
                  name="SubFolder"
                  class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                >
                  <option
                    v-for="item in filteredSubDirectories()"
                    :Key="item.DirectoryFId"
                    :value="item.SubDirectoryId"
                  >
                    {{ item.SubDirectoryName }}
                  </option>
                </select>
              </div>
              <div class="flex space-x-2 mt-4">
                <div class="flex flex-col items-start w-full">
                  <label for="BarCode" class="text-lg mb-2 text-black">BarCode</label>
                  <input
                    type="text"
                    v-model="invoice.InvoiceBarCode"
                    id="BarCode"
                    name="BarCode"
                    placeholder="Enter BarCode"
                    class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                  />
                </div>
                <div class="flex flex-col items-start w-full">
                  <label for="Date" class="text-lg mb-2 text-black">Date</label>
                  <input
                    v-model="invoice.InvoiceDate"
                    type="date"
                    id="Date"
                    name="Date"
                    class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                  />
                </div>
              </div>
              <div class="flex flex-col items-start w-full">
                <label for="Key" class="text-lg mb-2 text-black w-1/4">Key</label>
                <select
                  v-model="invoice.InvoiceKeyFId"
                  id="Key"
                  name="Key"
                  class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
                >
                  <option
                    v-for="key in filteredInvoiceKeys()"
                    :key="key.DirectoryFId"
                    :value="key.InvoiceKeyId"
                  >
                    {{ key.Invoicekey }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Submit Buttons -->
            <div class="flex flex-col items-start">
              <div class="flex space-x-2 mt-3">
                <button
                  class="bg-blue-400 rounded-md text-white text-lg px-6 py-2"
                  type="submit"
                  :disabled="open"
                >
                  <i v-if="!open" class="fa-solid fa-floppy-disk mr-2"></i>
                  <span v-if="!open">Submit</span>
                  <i v-else class="fa fa-spinner fa-spin"></i>
                </button>
                <button
                  class="bg-gray-400 rounded-md text-white text-lg px-6 py-2"
                  type="button"
                  @click="clear()"
                  :disabled="open"
                >
                  <i class="fa-solid fa-arrow-left mr-2"></i>
                  Retour
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Image Upload Section -->
      <div class="bg-white w-1/2 border-gray-200 border">
        <div
          class="hidden md:block w-full rounded-t-lg border-b border-gray-200 bg-gray-100 py-2 px-10"
        >
          <h1 class="text-black text-left text-lg">Upload Images</h1>
        </div>
        <div class="px-6 py-4">
          <div class="w-full max-w-xl">
            <div
              :class="{ 'bg-transparent ': isDragging }"
              class="myColor bg-blue-500 drag-area rounded-md border-dashed border-2 border-[#fff] h-[295px] mb-8 flex flex-col items-center justify-center mt-[6px] select-none"
              @dragover="dragover"
              @dragleave="dragLeave"
              @drop="drop"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="150"
                viewBox="0 0 200 150"
              >
                <!-- Nuage -->
                <path
                  d="M50 100c-20 0-35-15-35-35 0-15 10-27 25-32 5-15 20-25 40-25 15 0 30 6 40 20 15-10 35-10 50 0 15 10 20 25 20 40 0 20-15 35-35 35H50z"
                  fill="#FFFFFF"
                />
              </svg>

              <label
                for="fileInput"
                class="relative px-4 rounded-md text-white text-2xl cursor-pointer"
              >
                <div v-if="isDragging">Release to drop files here.</div>
                <div v-else>Drag your files here</div>
                <br />
              </label>
              <label class="mb-2">
                <span class="text-white text-xl">OR</span>
              </label>
              <label
                for="fileInput"
                class="relative bg-[#fff] px-8 py-2 rounded cursor-pointer mb-4"
              >
                <span class="text-blue-500 text-xl">Select files</span>
                <input
                  id="fileInput"
                  type="file"
                  name="files"
                  ref="fileInput"
                  required
                  @change="uploadFile"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </label>
            </div>
            <div class="container grid grid-cols-6 gap-4 p-4">
              <div class="image" v-for="(item, index) in url" :key="index">
                <span
                  class="delete text-red-500 text-xl cursor-pointer ml-2 top-4"
                  @click="removeImage(index)"
                  >&times;</span
                >
                <img
                  class="preview-img"
                  :src="item.fileType === 'application/pdf' ? 'assets/images.png' : item.file"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container .image span {
  cursor: pointer;
  top: -6px;
  left: 50px;
  position: absolute;
  font-size: 20px;
}
.container .image img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.container .image {
  width: 75px;
  height: 75px;
  margin-left: 5px;
  position: relative;
  margin-bottom: 12px;
}
.preview-img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
.delete {
  z-index: 999;
  color: #fe0000;
}
</style>
