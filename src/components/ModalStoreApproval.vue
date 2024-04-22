<template>
    <q-dialog v-model="fixed" backdrop-filter="blur(4px) saturate(150%)" persistent class="q-pb-none">
        <q-card style="width: 700px; max-width: 100vw;">
            <q-card-section class="row items-center q-pb-none bg-deep-purple-5 text-white">
                <div class="text-h6">Crear solicitud</div>
                <q-space />
                <q-btn icon="close" @click="onCloseModal" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="col scroll text-center">
                <q-form @submit="onSubmit" class="q-gutter-sm">
                    <q-select outlined dense v-model="approvalType" :options="approvalTypeStore.options"
                        label="Tipo de solicitud" color="deep-purple-5" lazy-rules
                        :rules="[val => val || 'Selecciona un tipo de solicitud']" />

                    <q-field ref="fieldRef" color="deep-purple-5" outlined v-model="days" label="Selección de días"
                        stack-label :rules="[val => !!val || 'Selecciona al menos un día']">
                        <template v-slot:control>
                            <q-date class="q-mt-sm full-width" v-model="days" subtitle="Selección de días"
                                color="deep-purple-5" :landscape="$q.screen.gt.xs" multiple />
                        </template>
                    </q-field>

                    <q-select outlined dense v-model="approvers" multiple :options="userStore.allUsers" use-chips
                        label="Aprobadores" color="deep-purple-5" lazy-rules
                        :rules="[val => val || 'Selecciona un aprobador']" />
                    <q-input v-model="remark" dense outlined type="textarea" label="Comentarios"
                        color="deep-purple-5" />
                    <div align="right" class="bg-white text-teal">
                        <q-btn flat label="Cancelar" @click="onCloseModal" color="grey-8" v-close-popup />
                        <q-btn flat label="Enviar" color="deep-purple-5" type="submit" />
                    </div>
                </q-form>
            </q-card-section>

        </q-card>
    </q-dialog>
</template>
<style>
.q-dialog__inner--minimized {
    padding: 12px;
}
</style>
<script>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar'
import axios from 'axios';
import { useApprovalTypeStore } from '../stores/approvalTypeStore';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router'
import { useApprovalRequestStore } from '../stores/approvalRequestStore';

export default {
    methods: {
        onCloseModal() {
            this.$emit('showModal', false);
        }
    },
    setup(props, { emit }) {
        const approvalTypeStore = useApprovalTypeStore();
        const approvalRequestStore = useApprovalRequestStore();
        const userStore = useUserStore();
        const $q = useQuasar()
        const router = useRouter()

        const fixed = ref(true)
        const approvalType = ref(null)
        const approvers = ref(null)
        const days = ref(null)
        const remark = ref(null)

        const onSubmit = () => {

            const loader = $q.notify({
                spinner: true,
                position: 'center',
                message: 'Enviando...',
                block: true
            })

            axios.post(`${import.meta.env.VITE_APP_URL}/api/approval-request`, {
                "approval_request_type_id": approvalType.value.value,
                "applicant_user_id": userStore.user.id,
                "approvers": approvers.value,
                "days": days.value.join(', '),
                "remark": remark.value,
            })
                .then(response => {

                    // <|::: Approval Request :::|>
                    approvalRequestStore.getSendedApprovalRequest();
                    // <|::: Approval Request :::|>

                    emit('showModal', false)

                    router.push('/approvals/sended')

                    loader()
                    $q.notify({
                        type: 'positive',
                        position: 'top',
                        message: response.data.message,
                    })
                })
                .catch(error => {
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
        }

        return {
            approvalType,
            approvalTypeStore,
            approvers,
            userStore,
            days,
            remark,
            fixed,
            onSubmit
        }
    }
}
</script>