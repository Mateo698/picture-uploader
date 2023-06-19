<template>
  <q-layout view="lHh Lpr lFf" v-if="user != null">
    <q-header elevated>
      <q-toolbar v-if="user" class="row justify-center" >
          <q-toolbar-title>Picture.io</q-toolbar-title>
          <q-btn       
          icon="logout"
          flat
          @click="logOut"
          />
 
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
import { defineComponent} from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MainLayout',

  components: {
    
  },
  methods: {
    toggle () {
      this.user = !this.user
    },
    signIn () {
      this.$router.push('/sign-in')
    },
  },
  data () {
    const router = useRouter()
    const user = getAuth().currentUser
    
    const logOut = () => {
      signOut(getAuth()).then(() => {
        // Sign-out successful.
        router.push('/sign-in')
      }).catch((error) => {
        console.log(error)
        alert('Sign out fail')
      })
    }
    return {
      user,
      logOut
    }
  }
})
</script>
