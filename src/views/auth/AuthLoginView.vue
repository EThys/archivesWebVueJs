<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import type { IUser, IUserAuth } from '@/utils/interface/user/IUser'
//@ts-ignore
import type { IToken } from '@/utils/interface/token'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
//@ts-ignore
import { setUser } from '@/stores/user'
//@ts-ignore
import { setToken } from '@/stores/token'
//@ts-ignore
import NavBarLogin from '@/components/navbar/NavBarLogin.vue'
const router = useRouter()
const toast = useToast()
const loading = ref<Boolean>(false)
const auth = ref<IUserAuth>({
  UserName: '',
  Password: ''
})

const login = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(auth.value))
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

  await useAxiosRequestWithToken()
    .post(`${ApiRoutes.login}`, data, { signal: abortSignal })
    .then(function (response) {
      //success
      clearTimeout(networkTimeout)
      const token = response.data.token
      if (token != null) {
        setToken(token as IToken)
        setUser(response.data as IUser)
      }
      router.push('/home')
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

const loginValidate = async () => {
  loading.value = true
  if (
    !auth.value.Password ||
    !auth.value.UserName ||
    auth.value.Password.trim() === '' ||
    auth.value.UserName.trim() === ''
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
    await login()
  }
}
</script>

<template>
  <NavBarLogin />
  <div
    style="margin-top: -5%"
    class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5"
  >
    <div class="w-full max-w-xl mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div class="hidden md:block w-full bg-gray-700 py-5 px-10">
        <h1 class="text-white text-left text-2xl">Login</h1>
      </div>
      <div class="w-full">
        <form class="px-8 py-10" @submit.prevent="loginValidate" method="post">
          <div class="flex flex-col space-y-4">
            <div class="flex items-center w-full">
              <label for="username" class="text-lg text-black w-1/4">User Name</label>
              <input
                id="username"
                name="username"
                type="text"
                v-model="auth.UserName"
                class="w-3/4 text-black pr-3 pl-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>
            <div class="flex items-center w-full">
              <label for="password" class="text-lg text-black w-1/4">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                v-model="auth.Password"
                class="w-3/4 text-black pr-3 pl-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-col items-start mt-4">
            <div class="flex items-center w-full">
              <label class="text-lg text-black w-1/4"></label>
              <input type="checkbox" id="remember" name="remember" class="mr-2" />
              <label for="remember" class="text-black text-sm">Remember Me</label>
            </div>
            <div class="flex items-center w-full">
              <label class="text-lg text-black w-1/4"></label>
              <button
                class="bg-gray-700 hover:bg-black rounded-md text-white text-lg px-6 py-2 mt-4"
                type="submit"
                v-if="!loading"
              >
                <i class="fa fa-sign-in-alt"></i>
                Login
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
