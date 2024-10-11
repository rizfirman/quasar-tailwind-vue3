<template>
  <div
    class="rounded-[12px] shadow-lg bg-[#092C39] duration-300 hover:-translate-y-1"
    v-for="post in props.movies"
    :key="post.id"
    @click="() => emit('goToTheEditMoviePage', post)"
  >
    <!-- Clickable Area -->
    <div class="cursor-pointer">
      <figure>
        <!-- Image -->
        <img
          :src="post.image"
          class="h-72 w-full object-cover p-2 rounded-[12px]"
        />

        <figcaption class="p-4">
          <!-- Title -->
          <p class="text-lg mb-4 font-bold leading-relaxed text-white">
            {{ post.title }}
          </p>

          <!-- Description -->
          <small class="leading-5 text-gray-500 dark:text-gray-400">
            {{ post.year }}
          </small>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  movies: {
    id: number;
    title: string;
    year: number;
    image: string;
  }[];
}>();

const emit = defineEmits(["goToTheEditMoviePage"]);
</script>
