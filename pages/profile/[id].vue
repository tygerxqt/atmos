<script setup lang="ts">
import { BskyAgent } from '@atproto/api';
import { useRoute } from 'vue-router';

const agent = new BskyAgent({ service: 'https://bsky.social' });

const auth = useAuthStore()
let { session } = storeToRefs(auth);

if (session.value.data) await agent.resumeSession(session.value.data);
else console.error('Failed to resume session, try logging out and back in.');

const route = useRoute();
let actorId = route.params.id as string;

const { data: profile, pending: profilePending, refresh: refreshProfile } = await useAsyncData(
    'profile',
    () => agent.getProfile({ actor: actorId })
);

const { data: feed, pending: feedPending, refresh: refreshFeed } = await useAsyncData(
    'feed',
    () => agent.getAuthorFeed({ actor: actorId })
);

watch(() => session.value.data, async (session) => {
    if (session) await agent.resumeSession(session);
    else console.error('Failed to resume session, try logging out and back in.');

    await refreshProfile();
    await refreshFeed();
});
</script>

<template>
    <main v-if="session.data" class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full max-w-[600px]">
            <div v-if="profile" class="flex flex-col w-full h-full pb-4 bg-zinc-800/50">
                <div class="flex flex-col w-full h-full gap-4">
                    <img :src="profile.data.banner" height="200"
                        class="flex-1 object-center w-full grow h-[200px] object-cover" />
                    <div class="flex flex-row justify-between w-full">
                        <div class="relative w-1/2 h-full">
                            <div class="absolute h-full bottom-20 left-8">
                                <img :src="profile.data.avatar" width="112" height="112"
                                    class="border-2 rounded-full w-28 h-28 border-black/10 dark:border-white/10">
                            </div>
                        </div>
                        <div class="flex flex-row items-center gap-2 px-3">
                            <button class="px-2 py-1 rounded-lg bg-zinc-700/50">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-1 px-6 py-2">
                    <h1 class="text-3xl font-bold">
                        {{ profile.data.displayName }}
                    </h1>
                    <span class="text-zinc-500 dark:text-zinc-400">
                        @{{ profile.data.handle }}
                    </span>
                </div>
            </div>
            <Spinner size="24" v-else />
            <div v-if="feed" class="bg-zinc-800/50">
                <Post v-for="post in feed.data.feed" :key="post.post.cid" :post="post" />
            </div>
            <Spinner size="24" v-else />
        </div>
    </main>
    <Auth v-else />
</template>