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

                                <q-item-section>ID Solicitud: 1</q-item-section>
                            </q-item>

                            <q-separator />

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="person" />
                                </q-item-section>

                                <q-item-section>Solicitante: Brandon Jelday</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="summarize" />
                                </q-item-section>

                                <q-item-section>Tipo solicitud: test</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="task" />
                                </q-item-section>

                                <q-item-section>Estatus: Aprobado</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="event" />
                                </q-item-section>

                                <q-item-section>Fecha: 2024-01-01</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="date_range" />
                                </q-item-section>

                                <q-item-section>Fechas solicitadas: 2024-01-01</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="deep-purple-5" name="comment" />
                                </q-item-section>

                                <q-item-section>Comentarios: 2024-01-01</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                </div>

                <div class="col-5">
                    <q-timeline color="deep-purple-5">

                        <q-timeline-entry title="Aprobado" subtitle="Brandon Jelday Guevara Silva"
                            body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint alias odio, dolor tenetur ipsa iste fugit adipisci quae a maxime placeat sunt eaque nesciunt nemo neque natus. Placeat, incidunt voluptatibus."
                            avatar="https://cdn.quasar.dev/img/avatar5.jpg">
                        </q-timeline-entry>

                        <q-timeline-entry title="Denegado" subtitle="Brandon Guevara Silva"
                            avatar="https://cdn.quasar.dev/img/avatar5.jpg">
                        </q-timeline-entry>

                        <q-timeline-entry title="Pendiente" subtitle="Brandon Guevara Silva"
                            avatar="https://cdn.quasar.dev/img/avatar5.jpg">
                        </q-timeline-entry>

                    </q-timeline>
                </div>

            </q-card-section>

            <q-card-actions align="center" class="bg-white text-teal">
                <div class="q-pa-md full-width">
                    <q-btn-group spread>
                        <q-btn label="Declinar" @click="onCloseModal" color="red-6" v-close-popup class="full-width" />
                        <q-btn label="Aprobar" color="green-6" type="submit" v-close-popup class="full-width" />
                    </q-btn-group>
                </div>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script>
import { ref } from 'vue'

export default {
    methods: {
        onCloseModal() {
            this.$emit('showModal', false);
        }
    },
    props: ['approvalData'],
    created: function () {
        console.warn(this.approvalData)
    },
    setup() {
        return {
            fixed: ref(true)
        }
    }
}
</script>
  