<template>
  <q-page class="px-[100px] pt-[80px] h-screen">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <p
          class="font-montserrat text-white md:text-[48px] md:font-semibold font-bold"
        >
          {{ pageTitles || "Create a new movie" }}
        </p>
      </div>
      <div
        class="flex items-center cursor-pointer mt-2 md:mt-0"
        @click="logout"
      >
        <p class="font-bold font-montserrat md:text-[16px] text-white">
          Logout
        </p>
        <q-icon
          name="logout"
          class="text-white md:text-[32px] ml-2 cursor-pointer"
        />
      </div>
    </div>

    <div class="xl:grid xl:grid-cols-12 mt-10">
      <div class="col-span-6">
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer md:w-[473px] h-[504px]"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="openFileDialog"
        >
          <!-- Menampilkan preview gambar jika sudah ada file yang di-upload -->
          <div v-if="previewUrl" class="flex justify-center items-center">
            <img
              :src="previewUrl"
              alt="Preview"
              class="max-w-full max-h-full object-cover"
            />
          </div>

          <div v-else class="text-center">
            <q-icon
              name="file_download"
              class="text-white text-[16px] cursor-pointer"
            />
            <p class="text-white text-sm font-normal font-montserrat">
              Drop an image here
            </p>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          />
        </div>
      </div>
      <div class="col-span-6 mt-10 xl:mt-0 flex justify-center md:block">
        <div class="mb-5">
          <input
            v-model="title"
            class="bg-[#224957] rounded-[10px] md:w-[362px] py-2 px-4 h-[45px] text-white placeholder:text-white placeholder:font-montserrat"
            type="text"
            placeholder="Title"
          />
        </div>

        <div>
          <input
            v-model="year"
            class="bg-[#224957] rounded-[10px] md:w-[216px] py-2 px-4 h-[45px] text-white placeholder:text-white placeholder:font-montserrat"
            type="number"
            placeholder="Publishing year"
          />
        </div>

        <div class="flex gap-2 mt-5">
          <button
            class="shadow bg-transparent border-2 text-white font-bold py-2 px-4 md:w-[179px] md:h-[54px] rounded-[10px] hover:bg-green-600 font-montserrat"
            type="button"
            @click="backToThePreviousPage"
          >
            Cancel
          </button>
          <button
            class="shadow bg-[#2BD17E] text-white font-bold py-2 px-4 md:w-[179px] md:h-[54px] rounded-[10px] hover:bg-green-600 font-montserrat"
            type="button"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDetailData } from "src/stores/edit-movie";
interface Movie {
  id: number;
  title: string;
  year: number;
  image: string;
}

const router = useRouter();
const route = useRoute();
const detailStore = useDetailData();

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const title = ref<string>("");
const year = ref<number>();
const pageTitles = ref<string>("");

// Fungsi untuk membuka dialog file ketika area di-klik
const openFileDialog = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Fungsi yang dijalankan ketika file dipilih melalui input atau drop
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    previewImage(files[0]);
  }
};

// Fungsi untuk menangani event drop file
const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    previewImage(files[0]);
  }
};

// Fungsi untuk membuat preview gambar setelah dipilih
const previewImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    previewUrl.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const handleSubmit = () => {
  console.log(title.value, year.value, previewUrl.value);
  router.push("/movie-list");
};

const backToThePreviousPage = () => {
  router.push("/movie-list");
};

const logout = () => {
  // Logout
  router.push("/");
};

onMounted(() => {
  detailStore.loadDetailData();

  watch(
    () => detailStore.detailData as Movie,
    (newData: Movie) => {
      if (route.params.id && newData) {
        const state = newData as Movie;
        title.value = state.title;
        pageTitles.value = state.title;
        year.value = state.year;
        previewUrl.value = state.image;
      }
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  detailStore.clearDetailData(); // Ini akan menghapus data di state dan juga cookie
});
</script>
