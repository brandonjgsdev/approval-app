<template>
    <div class="q-pa-md">
        <!-- <ModalStoreApproval v-if="showModal" @showModal="setModalShow" /> -->
        <ModalDetailApproval v-if="showModal" @showModal="setModalShow" :approvalData="approvalDataRow" />
        <q-table flat bordered title="Aprobaciones Recibidas" :rows="rows" :columns="columns" row-key="name">
            <template v-slot:top-right>
                <q-btn-group>
                    <q-btn color="green-7" icon="file_download" size="md" label="Exportar en CSV" @click="exportTable" />
                    <q-btn color="deep-purple-5" icon="add" size="md" @click="setModalShow(true)" label="Crear solicitud" />
                </q-btn-group>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props" @click="onRowClick(props.row)">
                    <q-td key="name" :props="props">
                        {{ props.row.name }}
                    </q-td>
                    <q-td key="calories" :props="props">
                        {{ props.row.calories }}
                    </q-td>
                    <q-td key="fat" :props="props">
                        <q-badge color="purple">
                            {{ props.row.fat }}
                        </q-badge>
                    </q-td>
                    <q-td key="carbs" :props="props">
                        {{ props.row.carbs }}
                    </q-td>
                    <q-td key="protein" :props="props">
                        <q-chip>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                            {{ props.row.protein }}
                        </q-chip>
                    </q-td>
                    <q-td key="sodium" :props="props">
                        <q-chip>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                            {{ props.row.sodium }}
                        </q-chip>
                    </q-td>
                    <q-td key="calcium" :props="props">
                        <q-badge color="accent">
                            {{ props.row.calcium }}
                        </q-badge>
                    </q-td>
                    <q-td key="iron" :props="props">
                        <q-badge color="amber">
                            {{ props.row.iron }}
                        </q-badge>
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
import { ref } from 'vue'

const columns = [
    {
        name: 'name',
        label: 'ID Solicitud',
        align: 'left',
        field: 'name',
        sortable: true
    },
    { name: 'calories', align: 'center', label: 'Tipo solicitud', field: 'calories', sortable: true },
    { name: 'fat', align: 'center', label: 'Estatus', field: 'fat', sortable: true },
    { name: 'carbs', align: 'center', label: 'Fecha solicitud', field: 'carbs' },
    { name: 'protein', align: 'center', label: 'Solicitado por', field: 'protein' },
    { name: 'sodium', align: 'center', label: 'Aprobadores', field: 'sodium' },
]

const rows = [
    {
        name: '1',
        calories: 'Vacaciones',
        fat: 'Aprobado',
        carbs: '04-16-2024 14:00 hrs',
        protein: 'Brandon Guevara Silva',
        sodium: 'Jelday Guevara Silva',
    },
    {
        name: '2',
        calories: 'Permiso',
        fat: 'Rechazado',
        carbs: '04-16-2024 14:00 hrs',
        protein: 'Brandon Guevara Silva',
        sodium: 'Jelday Guevara Silva',
    },
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

var showModal = ref(false)
var approvalDataRow = ref({})

const setModalShow = (valor) => {
    showModal.value = valor;
}

export default {
    components: {
        // ModalStoreApproval,
        ModalDetailApproval
    },
    data: function () {
        return {
            approvalDataRow
        }
    },
    setup() {
        return {
            setModalShow,
            onRowClick: (row) => {
                showModal.value = true
                approvalDataRow.value = row
            },
            showModal,
            columns,
            rows,
            exportTable() {
                // naive encoding to csv format
                const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                    rows.map(row => columns.map(col => wrapCsvValue(
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
  