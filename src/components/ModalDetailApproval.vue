<template>
    <q-dialog v-model="fixed" backdrop-filter="blur(4px) saturate(150%)" persistent>
        <q-card style="width: 700px; max-width: 100vw;">
            <q-card-section class="row items-center q-pb-none bg-deep-purple-5 text-white">
                <div class="text-h6">Detalle de solicitud</div>
                <q-space />
                <q-btn icon="close" @click="onCloseModal" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="row scroll">

                <div class="col-7">
                    <div class="q-pa-md" style="max-width: 350px">
                        <q-list bordered padding class="rounded-borders">
                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="tag" />
                                </q-item-section>

                                <q-item-section>ID Solicitud: {{ approvalRequestDetail.id }}</q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="summarize" />
                                </q-item-section>

                                <q-item-section>Tipo solicitud: {{ approvalRequestDetail.type }}</q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="task" />
                                </q-item-section>

                                <q-item-section>Estatus: {{ approvalRequestDetail.status }}</q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="event" />
                                </q-item-section>

                                <q-item-section>Fecha de creación: {{ approvalRequestDetail.created }}</q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="person" />
                                </q-item-section>

                                <q-item-section>Solicitante: {{ approvalRequestDetail.applicant }}</q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="date_range" />
                                </q-item-section>

                                <q-item-section>Fechas solicitadas: {{ approvalRequestDetail.days }}</q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="comment" />
                                </q-item-section>

                                <q-item-section>Comentarios: {{ approvalRequestDetail.remark }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                </div>

                <div class="col-5">
                    <q-timeline color="deep-purple-5">

                        <q-timeline-entry v-for="(approver) in approvalRequestDetail.approvers" :key="approver.id"
                            :title="approver.status.name" :subtitle="approver.approver_user.name"
                            :body="approver.remark" icon="person">
                        </q-timeline-entry>

                    </q-timeline>
                </div>

            </q-card-section>

            <q-separator />

            <q-card-actions
                v-if="approvalRequestDetail.currentApprover && approvalRequestDetail.currentApprover.approval_request_status_id == 1"
                align="center" class="bg-white text-teal">
                <div class="q-pa-md full-width">

                    <q-form @submit="onSubmit" class="q-gutter-sm">
                        <q-input v-model="remark" dense outlined type="textarea" label="Comentarios"
                            color="deep-purple-5" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Los comentarios son obligatorios']" />
                        <div align="right" class="bg-white text-teal">
                            <q-btn flat label="Cerrar" @click="onCloseModal" color="grey-8" v-close-popup />
                            <q-btn label="Declinar" @click="status = 3" type="submit" class="q-mx-sm" color="grey-8" />
                            <q-btn label="Aprobar" @click="status = 2" color="deep-purple-5" type="submit" />
                        </div>
                    </q-form>

                </div>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
import { useQuasar } from 'quasar'

import { useApprovalRequestStore } from '../stores/approvalRequestStore';

export default {
    methods: {
        onCloseModal() {
            this.$emit('showModal', false);
        }
    },
    props: ['approvalRequestDetail'],
    setup(props, { emit }) {

        const remark = ref(null)
        const status = ref(null)

        const approvalRequestStore = useApprovalRequestStore();
        const $q = useQuasar()

        return {
            remark,
            status,
            onSubmit() {

                const loader = $q.notify({
                    spinner: true,
                    position: 'center',
                    message: 'Enviando...',
                    block: true
                })

                axios.put(`${import.meta.env.VITE_APP_URL}/api/request-approver/${props.approvalRequestDetail.currentApprover.id}`, {
                    "approval_request_status_id": status.value,
                    "remark": remark.value,
                })
                    .then(response => {

                        // <|::: Approval Request :::|>
                        approvalRequestStore.getReceivedApprovalRequest();
                        // <|::: Approval Request :::|>

                        emit('showModal', false)

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
            },

            fixed: ref(true),
        }
    }
}
</script>