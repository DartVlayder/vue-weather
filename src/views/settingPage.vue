<template>
    <div id='app'>
      <main>
        <div class="header">
          <div class="header__title">
            <h2>Настройки</h2>
          </div>
          <div class="wheel-wrapper">
            <div class="wheel">
              <router-link to="/">
                <button class="btn wheel">
                  <img src="../img/cross.png" alt="Меню" class="wheel-img">
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <hr class="hr">

        <div class="list__cities--wrapper">

          <draggable class='cities__list' :items="items">
            <div class='cities__item'
              v-for='(item, index) in items'
              :key='item.id'
            >
              <div class="cities__item--wrapper">
                <div class="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="cities__item--coord">
                  {{ item.name }}, {{ item.sys.country }}
                </div>
                </div>
              <button class="btn basket" @click='deleteItem(index)'>
                <img src="../img/basket.png" alt="корзина">
              </button>
            </div>
          </draggable >
        </div>

        <div class="search">
          <div class="search__title">
            <h4>Добавить локацию &darr;</h4>
          </div>
          <div class='search-box'>
              <input
                type='text'
                class='search-bar'
                :placeholder='placeholder'
                v-model='query'
                @keypress='fetchWeather'
              />
            <button class="btn btn-search" @click='fetchWeather'>
              <img class="btn-img" src="../img/search.png" alt="поиск">
            </button>
         </div>
        </div>
      </main>
    </div>
  </template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  name: 'settingPage',
  components: {
    draggable: VueDraggableNext
  },
  data () {
    return {
      api_key: '641b299b8ec36d7484d0b7d48846c8c7',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      query: '',
      enabled: true,
      dragging: false,
      items: this.$store.getters.ITEMS,
      placeholder: 'Поиск'
    }
  },
  methods: {
    validate () {
      let val = true
      const arr = this.items.findIndex(el => el.name.toLowerCase() === this.query.toLowerCase())
      if (arr >= 0) {
        val = false
        this.query = ''
        this.placeholder = 'Этот город уже добавлен'
      }
      console.log(val)
      return val
    },
    fetchWeather (e) {
      if (e.key === 'Enter' || e.button === 0) {
        if (this.validate() === true) {
          fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}&lang=ru`)
            .then(res => {
              this.query = ''
              return res.json()
            })
            .then(this.setResults)
        }
      }
    },
    setResults (results) {
      if (results.cod === '400') {
        this.placeholder = 'Введите название города'
      } else if (results.cod === '404') {
        this.placeholder = 'Такого города нет'
      } else {
        this.weather = results
        // console.log(results)
        this.items.push(results)
        localStorage.setItem('items', JSON.stringify(this.items))
      }
    },
    deleteItem (index) {
      this.items.splice(index, 1)
      const mySities = JSON.parse(localStorage.getItem('items'))
      mySities.splice(index, 1)
      localStorage.setItem('items', JSON.stringify(mySities))
    }
  }
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hr {
  width: 100%;
  height: 3px;
  background-color: #000;
  margin: 10px auto;
}
.search-box {
  display: flex;
}
.btn-img {
  width: 20px;
}
.btn-search {
  position: absolute;
  right: 4px;
  top: 15px;
}
.cities__item {
  background-color: rgb(219 218 218);
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.cities__item--wrapper {
  display: flex;
}
.hamburger {
  height: 19px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}
.hamburger span {
  display: block;
  width: 23px;
  height: 2px;
  background: #151812;
}
.basket img {
  width: 15px;
  height: 15px;
}
input::placeholder {
  font-size: 18px;
}
</style>
