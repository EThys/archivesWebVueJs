<script lang="ts" setup>
//@ts-ignore
import NavBar from '@/components/navbar/NavBar.vue'
import { ref } from 'vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import { clearUser } from '@/stores/user'
//@ts-ignore
import { clearToken } from '@/stores/token'
//@ts-ignore
import { getToken } from '@/stores/token'
//@ts-ignore
import type { IChangePassword } from '@/utils/interface/user/IUser'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const token = getToken() as string

const router = useRouter()
const toast = useToast()
const loading = ref<Boolean>(false)
const changePassword = ref<IChangePassword>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const changePasswored = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(changePassword.value))
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    toast.open({
      message: 'Network Error, please check your internet.',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  }, 30000)

  await useAxiosRequestWithToken(token)
    .post(`${ApiRoutes.changePassword}`, data, { signal: abortSignal })
    .then(function (response) {
      //success
      clearTimeout(networkTimeout)
      toast.open({
        message: response.data.message,
        type: 'success',
        position: 'bottom',
        duration: 5000
      })
      clearUser(), clearToken()
      setTimeout(() => {
        router.push('/')
      }, 3000)
      loading.value = false
    })
    .catch(function (error) {
      //error
      clearTimeout(networkTimeout)
      toast.open({
        message: error.response.data.message,
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    })
}

const changePasswordValidate = async () => {
  loading.value = true
  if (
    !changePassword.value.oldPassword ||
    !changePassword.value.newPassword ||
    !changePassword.value.confirmPassword ||
    changePassword.value.oldPassword.trim() === '' ||
    changePassword.value.newPassword.trim() === '' ||
    changePassword.value.confirmPassword.trim() === ''
  ) {
    setTimeout(() => {
      toast.open({
        message: 'Oops...Veuillez remplir vos informations!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    }, 300)
    return
  } else {
    await changePasswored()
  }
}
</script>

<template>
  <NavBar />
  <div
    style="margin-top: -5%"
    class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5"
  >
    <div class="w-full max-w-2xl mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div class="hidden md:block w-full bg-gray-400 py-5 px-10">
        <h1 class="text-white text-left text-2xl">Change Password</h1>
      </div>
      <div class="w-full">
        <form class="px-8 py-10" @submit.prevent="changePasswordValidate" method="post">
          <div class="flex flex-col space-y-4">
            <div class="flex items-center w-full">
              <label for="Password" class="text-lg text-black w-1/4">Passsword</label>
              <input
                id="Password"
                name="Password"
                type="password"
                v-model="changePassword.oldPassword"
                class="w-3/4 text-black pr-3 pl-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>

            <div class="flex items-center w-full">
              <label for="newPassword" class="text-lg text-black w-1/4">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                v-model="changePassword.newPassword"
                class="w-3/4 text-black pr-3 pl-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>
            <div class="flex items-center w-full">
              <label for="confirmPassword" class="text-lg text-black w-1/4">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                v-model="changePassword.confirmPassword"
                class="w-3/4 text-black pr-3 pl-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-col items-start mt-4">
            <div class="flex items-center w-full">
              <label class="text-lg text-black w-1/4"></label>
              <button
                class="bg-blue-400 rounded-md text-white text-lg px-6 py-2 mt-4"
                type="submit"
                v-if="!loading"
              >
                <i class="fa-solid fa-lock-open"></i>
                Change password
              </button>
              <p v-else style="color: green">
                <span class="fas fa-sync fa-spin"></span> Verification
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.fas.fa-sync {
  animation: spin 0.6s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
