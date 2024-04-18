<template>
    <q-layout view="lHh Lpr lFf" class="justify-center items-center">
        <div class="row window-height justify-center items-center bg-deep-purple-1">
            <div class="col-sm-10 col-md-4 col-mx-4 ">
                <q-page-container>
                    <router-view />
                </q-page-container>
            </div>
        </div>
    </q-layout>
</template>
  
  
<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'AuthLayout'
})

</script>
  