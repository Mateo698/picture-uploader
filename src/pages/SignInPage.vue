<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row justify-center">
            <q-card style="width: 400px; height: 400px; background-color: #fff4c3;" >
                <q-card-section>
                    <h4 class="text-h4">Sign In</h4>
                </q-card-section>
                <q-card-section>
                    <q-input
                    filled
                    v-model="email"
                    label="Email"
                    lazy-rules
                    :rules="[val => !!val || 'Please enter your email']"
                    />
                    <q-input
                    filled
                    v-model="password"
                    label="Password"
                    lazy-rules
                    :rules="[val => !!val || 'Please enter your password']"
                    type="password"
                    />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                    color="secondary"
                    label="Sign In"
                    @click="logIn()"
                    />
                    <q-btn
                    color="primary"
                    label="Register"
                    @click="signUp()"
                    />
                </q-card-actions>
            </q-card>
        </div>

    </q-page>
    
</template>

<script>
import { defineComponent,ref} from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'SignInPage',
    setup () {
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const auth = getAuth()
        const logIn = () => {
            signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;
                console.log(auth.currentUser)
                alert('Sign in success')
                router.push('/')
                // ...
            })
            .catch((error) => {
                alert('Sign in fail')
                //const errorCode = error.code;
                //const errorMessage = error.message;
            });
        }

        return {
            email,
            password,
            logIn
        }
    },
    methods: {
        signUp () {
            this.$router.push('/register')
        }
    }
})

</script>
