import { createRouter, createWebHistory } from 'vue-router';
import useCountriesStore from '@/stores/countriesStore';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/details/:country',
      name: 'details',
      component: DetailsView,
      beforeEnter: async (to) => { // Get data from api before render component
        const countriesStore = useCountriesStore();
        await countriesStore.loadNewCurrentCountry(to.params.country);
      },
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
