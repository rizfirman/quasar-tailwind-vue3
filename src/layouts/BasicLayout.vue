<template>
    <q-layout>
        <q-page-container>
      <router-view />
    </q-page-container>
    </q-layout>
  </template>
    
  <script setup>
  // Layout ini hanya menyertakan QLayout dan menampilkan konten halaman di dalamnya.
  defineOptions({
  name: 'BasicLayout'
});
  </script>