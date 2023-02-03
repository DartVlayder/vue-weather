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
      items: this.$store.getters.ITEMS
    }
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
}
.search-box {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgb(62 92 177 / 50%);
  border-radius: 7px 16px 7px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 7px 16px 7px;
}
.location-box .location {
  color: #2e2c2c;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
}
.location-box .small {
  font-size: 18px;
}
.location-box .date {
  color: #2e2c2c;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
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
