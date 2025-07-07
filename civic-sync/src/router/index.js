// index.js file for router folder
import { createRouter, createWebHistory } from 'vue-router'

// import your views
import HomeView from '../views/HomeView.vue'
import JournalView from '../views/JournalView.vue'
import MindMapView from '../views/MindMapView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/journal',
    name: 'Journal',
    component: JournalView
  },
  {
    path: '/mindmap',
    name: 'MindMap',
    component: MindMapView
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
