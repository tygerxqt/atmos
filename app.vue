<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

const { session } = storeToRefs(auth);
</script>

<template>
  <main class="flex flex-row w-full min-h-screen text-white bg-zinc-900">
    <NuxtPage />
  </main>
</template>
