var Vue = require('vue')
var VueRouter = require('vue-router')

// /* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })

Vue.use(VueRouter)

var Composer = require('./components/Composer.vue')

// create App instance
var App = Vue.extend({})

//create Router instance
var router = new VueRouter({
	hashbang: false,
	history: true
})

//add your routes and their components
router.map({
    '/': {
        component: Composer
    },
    '/p/:id': {
        component: Composer
    }
})

router.start(App, '#app')