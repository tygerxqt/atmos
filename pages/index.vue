<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore()

const { session } = storeToRefs(auth);

const handle = () => {
  const handle = document.getElementById('handle') as HTMLInputElement
  navigateTo(`/profile/${handle.value}`)
}
</script>

<template>
  <main v-if="session.data">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-2">
          <input type="text" placeholder="Handle" id="handle" class="px-2 py-1 rounded-md bg-zinc-800" />
          <button @click="handle()">
            Go!
          </button>
        </div>
        <button @click="auth.logout()">
          Log out
        </button>
      </div>
    </div>
  </main>
  <Auth v-else />
</template>
