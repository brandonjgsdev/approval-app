<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn label="Fixed size" color="primary" @click="fixed = true" />

        <q-dialog v-model="fixed" full-height backdrop-filter="blur(4px) saturate(150%)">
            <q-card class="column full-height" style="width: 700px; max-width: 100vw;">
                <q-card-section class="row items-center q-pb-none bg-deep-purple-6 text-white">
                    <div class="text-h6">Crear solicitud</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section class="col scroll text-center">
                    <q-form @submit="onSubmit" class="q-gutter-md">
                        <q-select outlined dense v-model="model" :options="options" label="Tipo de solicitud"
                            color="deep-purple-5" />
                        <q-date v-model="days" subtitle="Selección de días" color="deep-purple-5"
                            :landscape="$q.screen.gt.xs" multiple />
                        <q-select outlined dense v-model="modelMultiple" multiple :options="options" use-chips
                            label="Aprobadores" color="deep-purple-5" />
                        <q-input v-model="text" dense outlined type="textarea" label="Comentarios" color="deep-purple-5" />
                    </q-form>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Cancelar" color="grey-8" v-close-popup />
                    <q-btn flat label="Enviar" color="deep-purple-5" type="submit" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script>
import { ref } from 'vue'

export default {
    setup() {
        return {
            fixed: ref(false)
        }
    }
}
</script>
  