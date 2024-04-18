<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated class="bg-deep-purple-6">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>☑️ Approval App</q-toolbar-title>

        <q-btn flat round dense icon="notifications" class="q-ml-md q-mx-lg">
          <q-badge color="red" floating>4</q-badge>
        </q-btn>

        <div class="q-gutter-sm">
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            Brandon Jelday Guevara Silva - Gerente General
          </q-chip>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer reveal style="background-color: white;">
      <q-toolbar>
        <div class="text-body2 text-grey-9">Hecho con ❤️ por Brandonjgs</div>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true"
      mini-to-overlay :width="200" :breakpoint="500" bordered class="bg-deep-purple-1 text-grey-9" active-color="red">
      <q-scroll-area class=" fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>

          <q-item clickable :active="drawerItemActive === 'sended'" v-ripple @click="onClickDrawerItem('sended')">
            <q-item-section avatar>
              <q-icon name="send_and_archive" />
            </q-item-section>

            <q-item-section>
              Enviadas
            </q-item-section>
          </q-item>

          <q-item clickable :active="drawerItemActive === 'received'" v-ripple @click="onClickDrawerItem('received')">
            <q-item-section avatar>
              <q-icon name="all_inbox" />
            </q-item-section>

            <q-item-section>
              Recibidas
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple @click="onLogOut()">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              Cerrar sesión
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style scoped>
.q-item.q-router-link--active,
.q-item--active {
  color: #7e57c2
}
</style>
<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {

  setup() {

    const router = useRouter()
    const drawerItemActive = ref(router.currentRoute.value.name)

    watch(() => router.currentRoute.value,
      (newValue) => {
        drawerItemActive.value = newValue.name
      }
    )

    return {
      drawer: ref(false),
      miniState: ref(true),
      drawerItemActive,
      onClickDrawerItem(path) {
        router.push({ path: `/approvals/${path}` })
        drawerItemActive.value = path
      },
      onLogOut() {
        router.push('/')
      }
    }
  }
}
</script>
