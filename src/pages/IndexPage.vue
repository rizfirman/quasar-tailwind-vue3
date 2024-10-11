<template>
  <q-page class="row items-center justify-evenly">
    <login-page />
  </q-page>
</template>

<script setup lang="ts">
import LoginPage from "src/components/LoginPage.vue";

defineOptions({
  name: "IndexPage",
});
</script>
