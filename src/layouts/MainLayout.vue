<template>
  <q-layout view="lHh Lpr lFf" >
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
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    return {
      
    }
  },
  methods: {
    toggle () {
      this.user = !this.user
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
