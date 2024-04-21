<template>
    <div class="q-pa-md">
        <ModalStoreApproval v-if="showApprovalModal" @showModal="showApprovalModal = !showApprovalModal" />
        <ModalDetailApproval v-if="showApprovalDetail" @showModal="showApprovalDetail = !showApprovalDetail"
            :approvalRequestDetail="approvalRequestRow" />
        <q-table flat bordered title="Solicitudes de aprobación enviadas" :rows="approvalRequestStore.sended"
            :columns="columns" row-key="name">
            <template v-slot:top-right>
                <q-btn-group>
                    <q-btn color="green-7" icon="file_download" size="md" label="Exportar en CSV"
                        @click="exportTable" />
                    <q-btn color="deep-purple-5" icon="add" size="md" @click="showApprovalModal = !showApprovalModal"
                        label="Crear solicitud" />
                </q-btn-group>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props" @click="onRowClick(props.row)">
                    <q-td key="id" :props="props">
                        {{ props.row.id }}
                    </q-td>
                    <q-td key="type" :props="props">
                        {{ props.row.type }}
                    </q-td>
                    <q-td key="status" :props="props">
                        <q-badge color="deep-purple">
                            {{ props.row.status }}
                        </q-badge>
                    </q-td>
                    <q-td key="created" :props="props">
                        {{ props.row.created }}
                    </q-td>
                    <q-td key="applicant" :props="props">
                        <q-chip color="deep-purple-1">
                            <q-avatar square size="24px" color="deep-purple-3">{{
                                props.row.applicant.slice(0, 1) }}</q-avatar>
                            {{ props.row.applicant }}
                        </q-chip>
                    </q-td>
                    <q-td key="approvers" :props="props">
                        <template v-for="(approver, index) in props.row.approvers" :key="index">
                            <q-chip color="deep-purple-1">
                                <q-avatar square size="24px" color="deep-purple-3">{{
                                    approver.approver_user.name.slice(0, 1) }}</q-avatar>
                                {{ approver.approver_user.name }}
                            </q-chip>
                        </template>
                    </q-td>

                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

import { exportFile, useQuasar } from 'quasar'
import ModalStoreApproval from 'src/components/ModalStoreApproval.vue'
import ModalDetailApproval from 'src/components/ModalDetailApproval.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useApprovalTypeStore } from '../stores/approvalTypeStore';
import { useApprovalRequestStore } from '../stores/approvalRequestStore';
import { useUserStore } from '../stores/userStore';

const columns = [
    {
        name: 'id',
        label: 'ID Solicitud',
        align: 'left',
        field: 'id',
        sortable: true
    },
    { name: 'type', align: 'left', label: 'Tipo solicitud', field: 'type', sortable: true },
    { name: 'status', align: 'left', label: 'Estatus', field: 'status', sortable: true },
    { name: 'created', align: 'left', label: 'Fecha solicitud', field: 'created' },
    { name: 'applicant', align: 'left', label: 'Solicitado por', field: 'applicant' },
    { name: 'approvers', align: 'left', label: 'Aprobadores', field: 'approvers' },
]

function wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')

    return `"${formatted}"`
}

var showApprovalModal = ref(false)
var showApprovalDetail = ref(false)
var approvalRequestRow = ref({})

export default {
    components: {
        ModalStoreApproval,
        ModalDetailApproval
    },
    data: function () {
        return {
            approvalRequestRow
        }
    },
    setup() {

        const approvalTypeStore = useApprovalTypeStore();
        const approvalRequestStore = useApprovalRequestStore();
        const userStore = useUserStore();

        const fetchCatalogs = async () => {
            try {
                // <|::: Types :::|>
                if (approvalTypeStore.options.length === 0) {
                    const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/approval-request-types`);
                    const options = response.data.data.flat().map(item => ({ label: item.name, value: item.id }));

                    // Persistir los datos en el store
                    approvalTypeStore.setOptions(options);
                }
                // <|::: Types :::|>

                // <|::: Users :::|>
                if (userStore.allUsers.length === 0) {
                    const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/users`);
                    const options = response.data.data.flat().map(item => ({ label: item.name, value: item.id }));

                    // Persistir los datos en el store
                    userStore.setAllUsers(options);
                }
                // <|::: Users :::|>

                // <|::: Approval Request :::|>
                approvalRequestStore.getSendedApprovalRequest();
                // <|::: Approval Request :::|>
            } catch (error) {
                console.error('Error al obtener catálogos:', error);
            }
        }

        onMounted(fetchCatalogs);

        return {
            onRowClick: (row) => {
                showApprovalDetail.value = true
                approvalRequestRow.value = row
            },
            showApprovalModal,
            showApprovalDetail,
            columns,
            approvalRequestStore,
            exportTable() {
                // naive encoding to csv format
                const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                    approvalRequestStore.sended.map(row => columns.map(col => wrapCsvValue(
                        typeof col.field === 'function'
                            ? col.field(row)
                            : row[col.field === void 0 ? col.name : col.field],
                        col.format,
                        row
                    )).join(','))
                ).join('\r\n')

                const status = exportFile(
                    'table-export.csv',
                    content,
                    'text/csv'
                )

                if (status !== true) {
                    $q.notify({
                        message: 'Browser denied file download...',
                        color: 'negative',
                        icon: 'warning'
                    })
                }
            }
        }
    }
}
</script>