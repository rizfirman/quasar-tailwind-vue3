import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

interface Movie {
    id: number;
    title: string;
    year: number;
    image: string;
}

export const useDetailData = defineStore('detailData', {
  state: () => ({
    detailData: {} as Movie | {},
  }),

  actions: {
    setDetailData(data: Movie) {
      // Simpan data ke state
      this.detailData = data;

      // Simpan data ke cookie sebagai JSON
      Cookies.set('detailData', JSON.stringify(data), { expires: 7 }); // Cookie disimpan selama 7 hari
    },

    loadDetailData() {
      // Ambil data dari cookie
      const cookieData = Cookies.get('detailData');
      if (cookieData) {
        // Parse JSON dan set ke state
        this.detailData = JSON.parse(cookieData);
      }
    },

    clearDetailData() {
      // Hapus data dari state dan cookie
      this.detailData = {};
      Cookies.remove('detailData');
    },
  },
});
