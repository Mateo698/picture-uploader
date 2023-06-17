<template>
  <q-layout view="lHh Lpr lFf" v-if="user">
    <q-header elevated>
      <q-toolbar v-if="user" class="row justify-center" style="height: 65px;">
        <div style="display: flex; flex-grow: 1;justify-content: center;">
          <h4>Picture Uploader</h4>
        </div>
        <div>
          <q-btn       
          icon="logout"
          flat
          />
      </div> 
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view 
      :toggle="toggle"
      />
    </q-page-container>
  </q-layout>
  <q-layout v-else view="lHh Lpr lFf" class="column flex-center" style="border: 1px solid red;">
    <h1>You don't have access to this page</h1>
    <q-btn
      color="primary"
      label="Sign In"
      @click="signIn()"
    />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  methods: {
    toggle () {
      this.user = !this.user
    },
    signIn () {
      this.$router.push('/sign-in')
    }
  },
  data () {
    return {
      user: true,
      currentPage: 'Home',
      pages: [
        'Home',
        'Feed',
      ]
    }
  }
})
</script>
