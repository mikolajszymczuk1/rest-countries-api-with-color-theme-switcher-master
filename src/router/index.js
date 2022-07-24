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
      beforeEnter: async (to, from, next) => { // Get data from api before render component
        const countriesStore = useCountriesStore();

        // If user enter to the path directly, load all countries
        if (countriesStore.allCountries.length === 0) {
          await countriesStore.loadAllCountries();
        }

        let canEnter = false;

        for (let i = 0; i < countriesStore.getAllCountriesNames.length; i += 1) {
          if (to.params.country === countriesStore.getAllCountriesNames[i]) {
            canEnter = true;
            break;
          }
        }

        if (canEnter) {
          await countriesStore.loadNewCurrentCountry(to.params.country);
          next();
        } else {
          next({ name: 'home' });
        }
      },
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
