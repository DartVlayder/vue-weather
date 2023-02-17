<template>
    <div id='app'>
      <main>
        <div class="wheel-wrapper">
          <div class="wheel">
          <router-link to="settingPage">
            <button class="btn wheel">
              <img src="../img/wheel.png" alt="Меню" class="wheel-img">
            </button>
          </router-link>
        </div>
        </div>
        <div class="weather__list" v-if="items.length === 0">
          Добавьте первый город
        </div>
        <ul v-else class="weather__list">
          <li class="weather__item" v-for="(item, index) in items" :key="index">
            <card-component :index="index"></card-component>
          </li>
        </ul>
      </main>
    </div>
  </template>

<script>
import CardComponent from '@/components/CardComponent.vue'
export default {
  name: 'weatherCard',
  components: { CardComponent },
  data () {
    return {
      items: this.$store.getters.ITEMS,
      api_key: '641b299b8ec36d7484d0b7d48846c8c7',
      url_base: 'https://api.openweathermap.org/data/2.5/'
    }
  },
  methods: {
    setResults (results) {
      let val = true
      const arr = this.items.findIndex(el => el.name.toLowerCase() === results.name.toLowerCase())
      if (arr >= 0) {
        val = false
      }
      if (val === true) {
        this.items.push(results)
        localStorage.setItem('items', JSON.stringify(this.items))
      }
    }
  },
  mounted () {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      fetch(`${this.url_base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${this.api_key}&lang=ru`)
        .then((response) => {
          return response.json()
        })
        .then(this.setResults)
    })
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
}
#app {
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  display: flex;
  justify-content: space-around;
}
main {
  margin: 2px;
  width: 310px;
  padding: 15px;
  border: 2px solid #000;
  border-radius: 20px;
  height: 500px;
  max-height: 500px;
  overflow: auto;
}
*::-webkit-scrollbar {
  height: 12px;
  width: 12px;
}
*::-webkit-scrollbar-track {
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
    border-radius: 10px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(180deg, #7cb96b, #74ad65);
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #2e2c2c;
  font-size: 40px;
  font-weight: 900;
  text-shadow: 1px 2px rgb(0 0 0 / 25%);
  background-color: rgb(155 141 141 / 25%);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgb(0 0 0 / 25%);
}
.weather-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.weather-box .weather {
  color: #2e2c2c;
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 1px 2px rgb(0 0 0 / 25%);
}
.weather-img{
  width: 80px;
  background-size: no-repeat;
  background-position: center;
  background-size: cover;
  height: 80px;
}
.weather-img.warm {
  background-image: url('../img/warm.png');
}.weather-img.sun {
  background-image: url('../img/sun.png');
}
.btn {
  border: none;
  cursor: pointer;
}
.wheel-wrapper {
  display: flex;
  justify-content: flex-end;
}
.wheel-img {
  width: 20px;
}
.weather__list {
  list-style: none;
}
</style>
