<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row justify-center">
        <q-card style="width: 400px; height: 400px;background-color: #fff4c3;" >
            <q-card-section>
                <h4 class="text-h4">Register</h4>
            </q-card-section>
            <q-card-section>
                <q-input
                filled
                v-model="email"
                label="Email"
                />
                <q-input
                filled
                v-model="password"
                label="Password"
                class="q-mt-md"
                type="password"
                />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn
                color="secondary"
                label="Cancel"
                @click="signIn()"
                />
                <q-btn
                color="primary"
                label="Register"
                @click="register()"
                />
            </q-card-actions>
        </q-card>   
        </div>
        
    </q-page>
</template>

<script>
import { defineComponent,ref} from 'vue'
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'RegisterPage',
    setup () {
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const register = () => {
            createUserWithEmailAndPassword(getAuth(), email.value, password.value).then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;
                alert('Register success')
                
                // ...
              })
              .catch((error) => {
                alert('Register fail')
                //const errorCode = error.code;
                //const errorMessage = error.message;
                // ..
              }).then(() => {
                router.push('/sign-in')
              });
        }
        return {
            email,
            password,
            register
        }
    },
    methods: {
        signIn () {
            this.$router.push('/sign-in')
        }
    },
   
})
</script>