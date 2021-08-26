<template>
  <div id="app">
    <div>
      <img
        alt="Vue logo"
        :src="imgUrl"
        @mousedown="onPopDown"
        @mouseup="onPopUp"
      />
      <div class="top-centered">{{ counter }}</div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "App",
  data() {
    return {
      i1: require("@/assets/popclose.jpeg"),
      i2: require("@/assets/popup.png"),
      imgUrl: require("@/assets/popclose.jpeg"),
      popSound: new Audio(require("@/assets/popSound.mp3")),
      counter: 0
    };
  },
  methods: {
    async onPopDown() {
      this.imgUrl = this.i2;
      this.popSound.play();
      this.counter += 1;
      await axios({
        method: "patch",
        baseURL: "http://localhost:5000/popcat",
        data: {
          country: "TW"
        }
      });
    },
    onPopUp() {
      this.imgUrl = this.i1;
    }
  },
  created() {
    window.addEventListener("keydown", e => {
      console.log(e);
      this.onPopDown();
    });

    window.addEventListener("keyup", e => {
      console.log(e);
      this.onPopUp();
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.top-centered {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
}
</style>
