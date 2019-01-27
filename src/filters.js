import Vue from 'vue';
import { format } from 'date-fns'

Vue.filter('formatDate', date => {
  return format(date, 'Do MMMM YYYY');
});
