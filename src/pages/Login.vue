<template>
    <q-card class="q-pa-lg shadow-2">
        <q-card-section class="justify-center items-center">
            <div class="text-h4 text-center q-mb-xl text-grey-9 text-weight-bold">☑️ Approval App </div>
            <div class="text-h6 text-center q-mb-sm text-grey-9">👋🏻 Bienvenido a Approval App 👋🏻</div>
            <div class="text-body1 text-center text-grey-9">Por favor, inicia sesión en tu cuenta</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input outlined color="deep-purple-6" v-model="email" label="Correo electrónico" type="email"
                    lazy-rules :rules="[val => val && val.length > 0 || 'Escribe un correo electrónico válido']" />
                <q-input outlined color="deep-purple-6" type="password" v-model="password" label="Contraseña" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Escribe una contraseña válida']" />
                <div class="text-center">
                    <q-btn color="deep-purple-5" size="md" type="submit" label="Iniciar sesión" class="full-width" />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '../stores/userStore'

export default {
    name: 'LoginForm',
    setup() {
        const $q = useQuasar()
        const router = useRouter()

        const userStore = useUserStore()
        const email = ref('brandon-rh@gmail.com')
        const password = ref('qwerty123456789')

        return {
            email,
            password,

            onSubmit() {

                const loader = $q.notify({
                    spinner: true,
                    position: 'center',
                    message: 'Iniciando sesión...',
                    block: true
                })

                axios.post(`${import.meta.env.VITE_APP_URL}/login`, {
                    "email": email.value,
                    "password": password.value
                })
                    .then(response => {

                        axios.interceptors.request.use(
                            config => {
                                config.headers.Authorization = `Bearer ${response.data.auth.accessToken}`
                                return config
                            },
                            error => Promise.reject(error)
                        )

                        userStore.login(response.data)

                        loader()
                        $q.notify({
                            type: 'positive',
                            position: 'top',
                            message: response.data.message,
                        })

                        router.push('/approvals/sended')
                    })
                    .catch(error => {
                        console.log(error);

                        var message = ''

                        if (error.response) {
                            message = error.response.data.message
                        } else {
                            message = 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo'
                        }

                        loader()
                        $q.notify({
                            type: 'negative',
                            position: 'top',
                            message: message,
                        })
                    });
            },
        }
    }
}
</script>
