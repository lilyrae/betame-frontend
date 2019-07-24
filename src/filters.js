import Vue from 'vue';
import { format } from 'date-fns'

Vue.filter('formatDate', date => {
  return format(date, 'Do MMMM YYYY');
});

Vue.filter('pluralise', (value, count) => {
  return count != 1 ? `${value}s` : `${value}`
})

Vue.filter('capitalise', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('fullStop', function (value) {
  if (!value) return ''
  value = value.toString()
  let lastChar = value.charAt(-1)
  let sentence = lastChar === '.' ? value : `${value}.`
  return sentence
})
