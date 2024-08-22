<script setup lang="ts">
import { ref } from 'vue'

const name = 'Nav'
</script>

<template>
  <nav class="bg-red-500" style="position: sticky; top: 0; z-index: 100">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <ul>
              <li>
                <router-link class="text-lg text-white font-semibold" to="/">
                  Soficom Drive <span class="bg-gray-500 px-2 rounded-sm">BETA</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <p class="text-white">Login</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
#navlinks {
  display: flex;
  justify-content: center;
  color: white;
  font-size: 18px;
}
</style>
