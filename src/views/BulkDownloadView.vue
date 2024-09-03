<script lang="ts" setup>
//@ts-ignore
import NavBar from '@/components/navbar/NavBar.vue'
</script>
<template>
  <NavBar />
  <div
    style="margin-top: -2%"
    class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5"
  >
    <div class="w-full max-w-xl mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div class="hidden md:block w-full bg-gray-400 py-5 px-10">
        <h1 class="text-white text-left text-2xl">Bulk Download</h1>
      </div>
      <div class="w-full">
        <form class="px-8 py-10" method="post">
          <div class="flex flex-col space-y-3">
            <div class="flex flex-col items-start w-full">
              <label for="Branch" class="text-lg text-black mb-2">Branch</label>
              <select
                id="Branch"
                name="Branch"
                class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
              >
                <option value="" class="text-gray-400">Select branch</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
                <option value="branch3">Branch 3</option>
              </select>
            </div>
            <div class="flex flex-col items-start w-full">
              <label for="Year" class="text-lg mb-2 text-black w-1/4">Year</label>
              <input
                type="number"
                id="Year"
                name="Year"
                class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>
            <div class="flex flex-col items-start w-full">
              <label for="Month" class="text-lg text-black w-1/4">Month</label>

              <select
                id="Month"
                name="Month"
                class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
              >
                <option value="" class="text-gray-400"></option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div class="flex flex-col items-start w-full">
              <label for="Folder" class="text-lg mb-2 text-black">Folder</label>
              <input
                type="file"
                id="Folder"
                name="Folder"
                class="w-full text-black pr-3 pl-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-col items-start mt-4">
            <div class="flex flex-col items-start w-full">
              <label class="text-lg text-black w-1/4"></label>
              <div class="flex space-x-2 mt-4">
                <button class="bg-blue-400 rounded-md text-white text-lg px-6 py-2" type="submit">
                  <i class="fa-solid fa-floppy-disk mr-2"></i>
                  Submit
                </button>
                <button class="bg-gray-400 rounded-md text-white text-lg px-6 py-2" type="submit">
                  <i class="fa-solid fa-arrow-left mr-2"></i>
                  Retour
                </button>
              </div>

              <!-- <p v-else style="color: green">
                <span class="fas fa-sync fa-spin"></span> Verification
              </p> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
