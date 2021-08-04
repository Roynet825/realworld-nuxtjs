import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('date', (value, format = 'yyyy-MM-dd HH:mm:ss') => {
  return dayjs(value).format(format);
})