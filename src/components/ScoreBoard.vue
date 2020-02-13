<template>
  <div id="scoreboard">
    <section>
      <h3>My Score History</h3>
      <div id="scores">
        <table>
          <tr>
            <td>Level 1</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Level 2</td>
            <td>120</td>
          </tr>
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

<script>
export default {
  name: "ScoreBoard"
};
</script>

<style>
#scoreboard {
  height: 100%;
}

#scoreboard section {
  height: 48.4%;
  background-color: black;
}

#scoreboard section:nth-child(1) {
  margin-bottom: 1em;
  border-bottom-left-radius: 5px;
}

#scoreboard section:nth-child(2) {
  border-top-left-radius: 5px;
}

#scoreboard section:nth-child(1) h3 {
  margin-top: 0;
}

#scoreboard section:nth-child(1) h3,
#scoreboard section:nth-child(2) h3 {
  padding-top: 0.8em;
}

/* #scoreboard section:nth-child(1) td,
#scoreboard section:nth-child(1) th {
  border: none;
} */

section div {
  padding: 0 1.5em;
}

table {
  border-collapse: collapse;
  width: 100%;
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
</style>
