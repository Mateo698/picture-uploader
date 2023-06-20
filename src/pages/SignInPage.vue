<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row justify-center">
            <q-card :style="{width: calculateWidth(), height: '400px', backgroundColor : '#fff4c3'}" >
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
                    data-cy="email-input"
                    />
                    <q-input
                    filled
                    v-model="password"
                    label="Password"
                    lazy-rules
                    :rules="[val => !!val || 'Please enter your password']"
                    type="password"
                    data-cy="password-input"
                    />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                    color="secondary"
                    label="Sign In"
                    @click="logIn()"
                    data-cy="sign-in-button"
                    />
                    <q-btn
                    color="primary"
                    label="Register"
                    @click="signUp()"
                    data-cy="register-button"
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
                console.log(userCredential)
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
                alert('Sign in fail, please check the information you entered')
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
        },
        calculateWidth () {
            return this.$q.screen.width < 450 ? '300px' : '400px'
        }
    }
})

</script>
