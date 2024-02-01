import { RouteRecordRaw } from 'vue-router';
import IndexPage from 'pages/IndexPage.vue';
import PlayersPage from 'pages/PlayersPage.vue';
import PaldexPage from 'pages/PaldexPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: IndexPage },
      { path: 'players', component: PlayersPage, },
      { path: 'paldex/:id', component: PaldexPage,   },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;