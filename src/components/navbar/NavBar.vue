<script setup lang="ts">
//@ts-ignore
import { clearUser, getUser } from '@/stores/user'
//@ts-ignore
import { clearToken } from '@/stores/token'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const isProfileMenuOpen = ref(false)

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const user = getUser()
const logout = () => {
  clearUser(), clearToken(), router.push('/')
}

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
                <router-link class="text-lg text-white font-semibold" to="/home">
                  Soficom Drive <span class="bg-gray-500 px-2 rounded-sm">BETA</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            @click="toggleProfileMenu"
            class="relative rounded-full bg-red-500 p-1 text-white font-semibold text-md hover:text-white"
          >
            {{ user?.user.UserName }}
            <i class="fas fa-caret-down"></i>
          </button>

          <!-- Profile dropdown -->
          <div class="relative mt-4" :aria-expanded="isProfileMenuOpen">
            <div
              :class="{ hidden: !isProfileMenuOpen }"
              class="menu absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a
                class="block px-4 py-2 text-sm text-black cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Rapport</a
              >
              <a
                class="block px-4 py-2 text-sm text-black cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Bulk download</a
              >
              <a
                class="block px-4 py-2 text-sm text-black cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Add invoice</a
              >
              <a
                class="block px-4 py-2 text-sm text-black cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                ><router-link to="/changePassword">Change password</router-link></a
              >
              <a
                @click="logout"
                href=""
                class="block px-4 py-2 text-sm text-black cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
                >Logout</a
              >
            </div>
          </div>
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
