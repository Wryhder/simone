import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "../views/HomeScreen.vue";
import GameScreen from "../views/GameScreen.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeScreen,
    },
    {
      path: "/game-screen",
      name: "Game Screen",
      component: GameScreen,
    },
  ],
});

export default router;
