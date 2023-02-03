<template>
    <div class='weather-wrap'>
        <div class='weather-box'>
            <div class='weather-wrapper'>
                <div class='weather-img' :class='items[index].main.temp < 16 ? "warm" : "sun"'></div>
                <div class='temp'>{{ Math.round(items[index].main.temp) }}°c</div>
            </div>
            <div class='weather'>{{ items[index].weather[0].description.toUpperCase()}}</div>
        </div>
        <div class='location-box'>
            <div class='location temp small'>
                Ощущается как : {{ items[index].main.feels_like }}
            </div>
        </div>
        <div class='location-box'>
            <div class='location temp small'>
                Влажность:{{ items[index].main.humidity }}%
            </div>
        </div>
        <div class='location-box'>
            <div class='location temp small'>
                {{ Math.round(items[index].wind.speed) }} м/с
            </div>
        </div>
        <div class='location-box'>
            <div class='location'>{{ items[index].name }}, {{ items[index].sys.country }}</div>
            <div class='date'>{{ dateBuilder() }}</div>
        </div>
</div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: ['index'],
  data () {
    return {
      items: this.$store.getters.ITEMS
    }
  },
  methods: {
    dateBuilder () {
      const d = new Date()
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
      const day = days[d.getDay()]
      const date = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${day} ${date} ${month} ${year}`
    }
  }
}
</script>

<style>
.weather-wrap {
  border: 1px solid #4eca54;
  border-radius: 20px;
  margin-bottom: 10px;
}
</style>
