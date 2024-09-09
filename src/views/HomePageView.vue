<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import NavBar from '@/components/navbar/NavBar.vue'

const isCategorySearchOpen = ref(false)
const isChecked = ref<boolean>(false)
const selectedItem = ref('All')
const showSortOptions = ref<boolean>(false)
const advancedSearch = ref<boolean>(false)
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
            id="search-dropdown"
            class="block py-2 px-4 w-full z-20 text-lg text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="What are you looking for?"
            required
          />
          <button
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
          class="block h-6 w-14 rounded-full bg-gray-400 cursor-pointer transition-colors duration-300"
          :class="{ 'bg-blue-500': isChecked }"
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
  <div
    style="width: 69%"
    class="ethberge bg-gray-700 rounded-md pt-2 pb-5 px-4 mx-auto mt-3"
    v-if="showSortOptions"
  >
    <div class="flex items-center">
      <div class="flex-1 mr-4">
        <label for="sort-by" class="text-md font-semibold text-gray-400">Sort By</label>
        <input
          type="text"
          id="sort-by"
          class="w-full px-3 py-2 border border-gray-700 rounded-md"
        />
      </div>
      <div class="flex-1 mr-4">
        <label for="order-by" class="text-md font-semibold text-gray-400">Order By</label>
        <input
          type="text"
          id="order-by"
          class="w-full px-3 py-2 border border-gray-700 rounded-md"
        />
      </div>
      <div class="flex-2 mr-4">
        <label for="order-by" class="text-md block font-semibold text-gray-400">Actions</label>
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm py-2 px-4 mr-2 rounded"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          Search
        </button>
        <button class="bg-yellow-300 text-black font-medium text-sm py-2 px-4 mr-2 rounded">
          <i class="fa-solid fa-eraser"></i>
          Clear
        </button>
        <button
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
              type="date"
              id="from"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="to" class="block text-sm font-medium mb-2 text-gray-300">To</label>
            <input type="date" id="to" class="mt-1 p-2 w-full border border-gray-700 rounded-md" />
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
            <label for="users" class="block text-sm font-medium mb-2 text-gray-300"
              >Directories</label
            >
            <select
              id="users"
              class="mt-1 text-gray-400 font-medium p-2 w-full border border-gray-700 rounded-md"
            >
              <option>Select directories</option>
            </select>
          </div>
          <div>
            <label for="users" class="block text-sm font-medium mb-2 text-gray-300">Keys</label>
            <select
              id="users"
              class="mt-1 text-gray-400 font-medium p-2 w-full border border-gray-700 rounded-md"
            >
              <option>Select Keys</option>
            </select>
          </div>
          <div>
            <label for="users" class="block text-sm font-medium mb-2 text-gray-300">Branches</label>
            <select
              id="users"
              class="mt-1 text-gray-400 font-medium p-2 w-full border border-gray-700 rounded-md"
            >
              <option>Select branches</option>
            </select>
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
            class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm py-2 px-4 mr-2 rounded"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            Search
          </button>
          <button class="bg-yellow-300 text-black font-medium text-sm py-2 px-4 mr-2 rounded">
            <i class="fa-solid fa-eraser"></i>
            Clear
          </button>
          <button
            class="bg-blue-400 hover:bg-blue-500 hover:text-white text-black font-medium text-sm py-2 px-4 rounded"
          >
            <i class="fa-solid fa-xmark"></i>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
