<template>
  <q-page class="px-[100px] pt-[80px] flex flex-col h-screen">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <p class="font-montserrat text-white md:text-[48px] font-semibold">
          My Movies
        </p>
        <q-icon
          name="add_circle_outline"
          class="text-white md:text-[32px] ml-2 cursor-pointer"
          @click="goToTheAddMoviePage"
        />
      </div>
      <div class="flex items-center cursor-pointer" @click="logout">
        <p class="font-bold font-montserrat md:text-[16px] text-white">
          Logout
        </p>
        <q-icon name="logout" class="text-white md:text-[32px] ml-2" />
      </div>
    </div>

    <div class="mt-10 flex-1 overflow-y-auto">
      <div
        class="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <!-- Card Item -->
        <MovieCard
          :movies="paginatedMovies"
          @go-to-the-edit-movie-page="goToTheEditMoviePage"
        />
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex gap-2 items-center justify-center my-10">
      <p
        class="text-white font-montserrat font-bold text-[16px] cursor-pointer"
        @click="prevPage"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        Prev
      </p>

      <div
        v-for="page in totalPages"
        :key="page"
        class="w-[32px] h-[32px] rounded-md flex justify-center items-center cursor-pointer"
        @click="goToPage(page)"
        :class="{
          'bg-[#2BD17E]': page === currentPage,
          'bg-[#092C39]': page !== currentPage,
        }"
      >
        <p class="font-montserrat font-bold text-[16px] text-white">
          {{ page }}
        </p>
      </div>

      <p
        class="text-white font-montserrat font-bold text-[16px] cursor-pointer"
        @click="nextPage"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        Next
      </p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MovieCard from "src/components/MovieCard.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDetailData } from "src/stores/edit-movie";

interface Movie {
  id: number;
  title: string;
  year: number;
  image: string;
}

const router = useRouter();

const detailStore = useDetailData();

// Data film
const movies = ref([
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    image: "https://loremflickr.com/200/200?random=1",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    image: "https://loremflickr.com/200/200?random=2",
  },
  {
    id: 3,
    title: "The Godfather: Part II",
    year: 1974,
    image: "https://loremflickr.com/200/200?random=3",
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    image: "https://loremflickr.com/200/200?random=4",
  },
  {
    id: 5,
    title: "The Dark Knight 2",
    year: 2010,
    image: "https://loremflickr.com/200/200?random=5",
  },
  {
    id: 6,
    title: "The Shawshank Redemption 2",
    year: 2000,
    image: "https://loremflickr.com/200/200?random=6",
  },
  {
    id: 7,
    title: "The Godfather: Part III",
    year: 2001,
    image: "https://loremflickr.com/200/200?random=7",
  },
  {
    id: 8,
    title: "The Godfather: Part IV",
    year: 2003,
    image: "https://loremflickr.com/200/200?random=8",
  },
  {
    id: 9,
    title: "The Dark Knight 3",
    year: 2011,
    image: "https://loremflickr.com/200/200?random=9",
  },
  {
    id: 10,
    title: "The Dark Knight 4",
    year: 2019,
    image: "https://loremflickr.com/200/200?random=10",
  },
]);

// Pagination state
const itemsPerPage = 8;
const currentPage = ref(1);

// Total halaman
const totalPages = computed(() =>
  Math.ceil(movies.value.length / itemsPerPage)
);

// Movie yang ditampilkan berdasarkan halaman aktif
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return movies.value.slice(start, end);
});

// Fungsi untuk navigasi halaman
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

const goToTheAddMoviePage = () => {
  // Redirect ke halaman add movie
  router.push("/add-movie");
};

const goToTheEditMoviePage = (data: Movie) => {
  // Redirect ke halaman edit movie
  detailStore.setDetailData(data);
  router.push(`/movie-list/${data.id}`);
};

const logout = () => {
  // Logout
  router.push("/");
};
</script>
