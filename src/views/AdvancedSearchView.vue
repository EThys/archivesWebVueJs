<script></script>
<template>
  <div class="bg-gray-800 text-white">
    <div class="container mx-auto py-8">
      <div class="flex flex-col space-y-4">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="code" class="block text-sm font-medium text-gray-300">Code</label>
            <input
              type="text"
              id="code"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-300"
              >Description</label
            >
            <input
              type="text"
              id="description"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="barcode" class="block text-sm font-medium text-gray-300">Barcode</label>
            <input
              type="text"
              id="barcode"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div>
            <label for="from" class="block text-sm font-medium text-gray-300">From</label>
            <input
              type="date"
              id="from"
              class="mt-1 p-2 w-full border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label for="to" class="block text-sm font-medium text-gray-300">To</label>
            <input type="date" id="to" class="mt-1 p-2 w-full border border-gray-700 rounded-md" />
          </div>
          <div>
            <label for="users" class="block text-sm font-medium text-gray-300">Users</label>
            <select id="users" class="mt-1 p-2 w-full border border-gray-700 rounded-md">
              <option>Select users</option>
            </select>
          </div>
          <div class="flex items-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Select all
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
              Clear all
            </button>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4"></div>

        <div class="flex items-center">
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="filter_keys"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label for="filter_keys" class="ml-2 text-sm font-medium text-gray-300"
              >Filter keys</label
            >
          </div>
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="old_directories"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label for="old_directories" class="ml-2 text-sm font-medium text-gray-300"
              >Old directories</label
            >
          </div>
          <div class="ml-auto">
            <input type="text" class="p-2 border border-gray-700 rounded-md" placeholder="20" />
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Search
            </button>
            <button
              class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Clear
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
