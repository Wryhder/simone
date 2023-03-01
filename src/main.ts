import { createApp } from "vue";
import { createPinia } from "pinia";
import { usePlayerStore } from "./stores/player";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();
const playerStore = usePlayerStore(pinia);

const getSavedUserData = () => {
  try {
    const simonePlayerState = JSON.parse(
      localStorage.getItem("simonePlayerState") as string
    );
    console.log("Loading saved game...\n", simonePlayerState);
    playerStore.$state = simonePlayerState;
    playerStore.$state.savedGame = playerStore.savedGameOptions.Loaded;
  } catch (error) {
    console.error("No saved game.", error);
  }
};
getSavedUserData();

app.use(pinia).use(router);

app.mount("#app");
