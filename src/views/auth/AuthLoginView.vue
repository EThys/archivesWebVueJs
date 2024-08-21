<template>
  <div class="min-w-screen min-h-screen bg-green-600 flex items-center justify-center px-5 py-5">
    <div class="w-full">
      <div class="hidden md:block w-1/2 bg-gray-700 py-5 px-10">
        <h1 class="text-white text-left text-2xl">Login</h1>
      </div>
      <div class="w-full md:w-1/2 px-5 md:px-10 bg-white">
        <div>
          <form class="px-16" method="post">
            <div class="flex flex-col -mx-3 pt-10">
              <div class="w-full px-3 mb-3 flex items-center">
                <label for="username" class="text-lg text-black px-1 w-1/4">User Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="w-3/4 text-black pl-3 pr-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
                />
              </div>
              <div class="w-full px-3 mb-4 flex items-center">
                <label for="password" class="text-lg text-black px-1 w-1/4">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="w-3/4 text-black pl-3 pr-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
                />
              </div>
            </div>
            <!-- <div class="flex items-center -mx-3 mb-8 px-3">
              <input type="checkbox" id="remember" name="remember" class="mr-2" />
              <label for="remember" class="text-black text-sm mr-auto">Remember Me</label>
              <button
                class="bg-gray-700 hover:bg-black focus:border-gray-500 rounded-md text-white text-lg px-3 py-1"
                type="submit"
              >
                Login
              </button>
            </div> -->
            <input type="checkbox" id="remember" name="remember" class="mr-2" />
            <label for="remember" class="text-black text-sm mr-auto">Remember Me</label>
            <div class="flex -mx-3 mb-8">
              <div class="w-full px-3 mb-5">
                <button
                  class="max-w-xs mx-auto bg-gray-700 hover:bg-black focus:border-gray-500 rounded-md text-white text-lg px-3 py-1"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <!-- <form v-else @submit.prevent="otpValidation" class="px-16" method="post">
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-3">
                    <div class="mb-3">
                      <label for="" class="text-lg text-black px-1">Identifiant</label>
                    </div>
                    <div class="flex">
                      <div
                        class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                      ></div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"

                        class="w-full text-black -ml-10 pl-3 pr-3 py-1 border-2 border-gray-200 outline-none focus:border-gray-500"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex -mx-3 mb-8">
                  <div class="w-full px-3 mb-5">
                    <button

                      class="max-w-xs mx-auto bg-gray-700 hover:bg-black focus:border-gray-500 rounded-md text-white text-lg px-3 py-1"
                      type="submit"
                    >
                      <i class="fa fa-sign-in-alt"></i>
                      Connexion
                    </button>

                  </div>
                </div>
              </form> -->
        </div>
      </div>
      <!-- <div class="help">
          <div class="bg-red-600 text-white mb-3 w-full max-w-xs p-4 rounded-lg shadow-lg">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold"><i class="fa fa-question-circle mr-2"></i>Aide</h3>
              <button class="text-white hover:text-gray-200">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="mb-4">
              <p class="mb-2">Pour des mesures de securiter veuillez contacter ces numeros:</p>
              <table class="w-full text-left text-sm">
                <tbody>
                  <tr class="border-b border-gray-200">
                    <td class="py-1 px-2">Tel 1</td>
                    <td class="py-1 px-2">0817300081</td>
                  </tr>
                  <tr class="border-b border-gray-200">
                    <td class="py-1 px-2">Tel 2</td>
                    <td class="py-1 px-2">0818303419</td>
                  </tr>
                  <tr class="border-b border-gray-200">
                    <td class="py-1 px-2">Tel 3</td>
                    <td class="py-1 px-2">0818303447</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-right">
              <button class="bg-gray-500 text-white text-sm px-3 py-1 rounded hover:bg-gray-600">
                Fermer
              </button>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>
<style>
.help {
  width: 300px;
  height: 350px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  position: absolute;
  z-index: 2;
}
.k-icon.k-i-reload {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 0.6s infinite linear;
}
</style>
