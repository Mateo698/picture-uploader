<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row justify-center">
            <q-card style="width: 400px; height: 400px;" >
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
                    />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                    color="secondary"
                    label="Sign In"
                    @click="signIn()"
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
import { defineComponent} from 'vue'
export default defineComponent({
    name: 'SignInPage',
    setup () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn () {
            this.$router.push('/')
        },
        signUp () {
            this.$router.push('/register')
        }
    }
})

</script>
