import Vue from 'vue'
import Router from 'vue-router'
import Student from './views/Student.vue'
import About from './views/About.vue'
import Founder from './views/Founder.vue'
import Profile from './views/Profile.vue'
import Gallery from './views/Gallery.vue'
import OurWork from './views/Ourwork.vue'
import Home from './views/Home.vue'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/student',
      name: 'student',
      component: Student
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/founder',
      name: 'founder',
      component: Founder
    },
    {
      path: '/student/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/student/profile/:id',
      name: 'profile-detail',
      component: Profile
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/ourwork',
      name: 'ourwork',
      component: OurWork
    }
  ]
})
