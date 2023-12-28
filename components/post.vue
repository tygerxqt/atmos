<script lang="ts" setup>
import type { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

const props = defineProps<{
  key: string,
  post: FeedViewPost
}>()
</script>

<template>
  <div class="flex flex-col gap-2 p-4 border-t border-black/10 dark:border-white/10">
    <div class="flex flex-row gap-2">
      <img :src="post.post.author.avatar" width="64" height="64" class="rounded-full max-w-12 max-h-12" />
      <div class="flex flex-col gap-1">
        <div>
          <h1>{{ post.post.author.displayName }}</h1>
        </div>
        <p>{{ post.post.record.text }}</p>
      </div>
    </div>
  </div>
</template>