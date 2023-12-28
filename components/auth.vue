<script lang="ts" setup>
const login = ref(true)
const loading = ref(false)

const auth = useAuthStore()

const onLoginSubmit = async (e: Event) => {
  e.preventDefault()

  // reset error message
  const errorMsg = document.getElementById('error') as HTMLParagraphElement
  errorMsg.style.display = 'none'

  const identifier = document.getElementById('identifier') as HTMLInputElement
  const password = document.getElementById('password') as HTMLInputElement

  if (identifier.value.length < 3 || password.value.length < 3) {
    errorMsg.innerText = 'Error: Handle or password too short.'
    errorMsg.style.display = 'block'
    return
  }

  loading.value = true

  await auth.login(identifier.value, password.value).then(() => {
    loading.value = false
  }).catch((err) => {
    loading.value = false
    errorMsg.innerText = `Error: ${err}`
    errorMsg.style.display = 'block'
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full p-8">
    <div class="flex flex-col items-center w-full gap-6">
      <Logo />
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold">
          Atmos
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400">
          Yet another BlueSky client.
        </p>
      </div>
      <p class="text-red-500" id="error" style="display: none;">
        Error: message
      </p>
      <div class="flex flex-row gap-3" v-if="login === true">
        <div class="flex flex-col gap-6">
          <form class="flex flex-col gap-3" @submit="onLoginSubmit">
            <input type="text" placeholder="Handle" id="identifier" autocomplete="username"
              class="px-2 py-1 rounded-md bg-zinc-800" />
            <input type="password" placeholder="Password" autocomplete="current-password" id="password"
              class="px-2 py-1 rounded-md bg-zinc-800" />
            <button class="flex flex-row items-center justify-center gap-2 px-4 py-1 bg-blue-600 rounded-md">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="loading === true">
                <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"
                  fill="currentColor" />
                <path
                  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                  class="duration-500 origin-center animate-spin" fill="currentColor" />
              </svg>
              <span v-else>Submit</span>
            </button>
          </form>
          <div class="w-full border-b border-black/10 dark:border-white/10" />
          <div class="flex flex-row items-center gap-8">
            <span>Haven't got an account?</span>
            <button class="px-2 py-1 bg-blue-600 rounded-md" @click="login = false">
              Register
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-3" v-else>
        <div class="flex flex-col gap-6">
          <form class="flex flex-col gap-3">
            <input type="email" placeholder="Email" id="email" autocomplete="email"
              class="px-2 py-1 rounded-md bg-zinc-800" />
            <input type="password" placeholder="Password" id="password" autocomplete="new-password"
              class="px-2 py-1 rounded-md bg-zinc-800" />
            <input type="text" placeholder="Handle (@tygr.dev)" id="handle" autocomplete="username"
              class="px-2 py-1 rounded-md bg-zinc-800" />
            <input type="text" placeholder="Invite code" id="invCode" class="px-2 py-1 rounded-md bg-zinc-800" />
            <button class="px-4 py-1 bg-blue-600 rounded-md">
              Submit
            </button>
          </form>
          <div class="w-full border-b border-black/10 dark:border-white/10" />
          <div class="flex flex-row items-center gap-12">
            <span>Haven't got an account?</span>
            <button class="px-2 py-1 bg-blue-600 rounded-md" @click="login = true">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style></style>