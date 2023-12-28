import { useStorage } from '@vueuse/core'
import { BskyAgent, type AtpSessionData } from '@atproto/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    session: useStorage<{ data: AtpSessionData | null, expires: number }>(
      "session",
      {
        data: null,
        expires: 0,
      },
      localStorage,
      {
        mergeDefaults: true
      }
    ),
  }),

  actions: {
    async login(handle: string, password: string) {
      const agent = new BskyAgent({ service: "https://bsky.social" });
      await agent.login({ identifier: handle, password }).then((res) => {
        console.log(`Successfully logged in as ${res.data.handle}`)

        this.session.data = res.data;
        this.session.expires = JSON.parse(atob(res.data.accessJwt.split(".")[1])).exp
      });
    },

    logout() {
      this.session.data = null
      this.session.expires = 0
    },

    async getUserData() {
      if (this.session.data) {
        const agent = new BskyAgent({ service: "https://bsky.social" });
        await agent.resumeSession(this.session.data)

        const actor = await agent.getProfile({ actor: this.session.data.did }).then((res) => {
          console.log(res.data)
          return res.data
        })

        return actor
      } else {
        console.error("You need to be logged in to get user data")
        return null
      }
    },
  }
})
