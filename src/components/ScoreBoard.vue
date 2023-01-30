<script lang="ts">
// TODO: Update "Known Latent Criminals" (leaderboard of sorts)

import { defineComponent, ref } from "vue";
import { mapState } from "pinia";
import { usePlayerStore } from "../stores/player";

import TableRow from "./TableRow.vue";

export default defineComponent({
  components: {
    TableRow,
  },
  data() {
    return {
      initialLevelScore: "N/A" as string | number,
    };
  },
  computed: {
    ...mapState(usePlayerStore, ["level", "sessionScores"]),
  },
  watch: {
    level(_, oldValue) {
      const self = this;

      (function setPreviousLevelScore() {
        const key = `level${oldValue}` as keyof typeof self.sessionScores;
        const scoreTableCell = (ref(self.$refs[key]).value as Array<any>)[0].$el
          .children[1];
        const scoresArray: Array<number> = self.sessionScores[key].scores;
        const averageScore =
          scoresArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          ) / scoresArray.length;

        scoreTableCell.textContent = `${averageScore.toFixed(2)}`;
      })();
    },
  },
});
</script>

<template>
  <div id="scoreboard">
    <section>
      <h3>My Score History</h3>
      <div id="scores">
        <table>
          <tbody>
            <TableRow
              v-for="(_, key, index) in sessionScores"
              :key="key"
              :ref="key"
              :level="index + 1"
              :level-score="initialLevelScore"
            />
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3>Known Latent Criminals</h3>
      <div id="latent-criminals">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Criminal Coefficient</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Haru</td>
              <td>200</td>
            </tr>
            <tr>
              <td>Jessica</td>
              <td>150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style>
#scoreboard section {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  padding: 2em 0;
  border-radius: 10px;
  box-shadow: 0px 20px 24px 0 #276873;
}

#scoreboard section:nth-child(1) {
  margin-bottom: 1em;
}

#scoreboard section:nth-child(2) {
  margin-bottom: 5em;
}

#scoreboard section h3 {
  margin-top: 0;
}

section div {
  padding: 0 1.5em;
}

table {
  border-collapse: collapse;
  width: 90%;
  margin: auto;
}

thead {
  color: black;
  text-align: left;
  padding-bottom: 1.2em;
  background-color: paleturquoise;
}

td,
th {
  border: 1px solid #dddddd;
  padding: 0.4em;
}

@media screen and (min-width: 814px) {
  #scoreboard {
    height: 100%;
  }

  #scoreboard section {
    height: 48.4%;
    width: 100%;
    padding: 0;
  }

  #scoreboard section:nth-child(1) {
    margin-bottom: 1em;
    border-radius: 0 0 0 5px;
  }

  #scoreboard section:nth-child(2) {
    border-radius: 5px 0 0 0;
  }

  table {
    width: 100%;
  }
}

@media screen and (max-width: 560px) {
  #scoreboard section {
    width: 80%;
  }
}
</style>
