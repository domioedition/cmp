import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var VueRouter = require('vue-router')
var About = require('./views/About.vue')
var Projects = require('./views/Projects.vue')
var Project = require('./views/Project.vue')
var Tasks = require('./views/Tasks.vue')
var Task = require('./views/Task.vue')
var Users = require('./views/Users.vue')
var Blog = require('./views/Blog.vue')
var Post = require('./views/Post.vue')




Vue.use(VueAxios, axios)
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/about', component: About },
    { path: '/projects', component: Projects },
    { path: '/project/:id', name: 'project', component: Project },
    { path: '/project/:id/edit', name: 'pedit', component: Project },
    { path: '/users', component: Users },
    { path: '/blog', component: Blog },
    { path: '/post/:id', name: 'post', component: Post },
    { path: '/project/:id/tasks', name: 'tasks', component: Tasks },
    { path: '/project/:id/tasks/:task', name: 'task', component: Task }
  ]
})

new Vue({
  el: '#app',
  router: router

  // console.log(project)
  // render: h => h(App)
})
