import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var VueRouter = require('vue-router')

var Projects = require('./views/Projects.vue')
var Project = require('./views/Project.vue')
var Info = require('./views/Info.vue')
var Tasks = require('./views/Tasks.vue')
var Task = require('./views/Task.vue')
var Users = require('./views/Users.vue')



var Test = require('./views/Test.vue')




Vue.use(VueAxios, axios)
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/projects', component: Projects },
    { path: '/project/:id', name: 'project', component: Project },
    { path: '/project/:id/info', name: 'info', component: Info },
    { path: '/users', component: Users },
    { path: '/project/:id/:task', name: 'task', component: Task },
    { path: '/test', name: 'test', component: Test }
  ]
})

new Vue({
  el: '#app',
  router: router

  // console.log(project)
  // render: h => h(App)
})
