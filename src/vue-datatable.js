// add ys-datatable component to existing application

import Vue from 'vue';
import YsDatatable from './components/ys-datatable';


require('./css/ys-datatables.css');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


Vue.component('ys-datatable', YsDatatable);

const datatable = new Vue({
  el: '#vue-datatable',
});
