import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateNoteView from '@/views/CreateNoteView.vue'
import NoteView from '@/views/NoteView.vue'
import LogoutView from '@/views/LogoutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/createnote',
    name: 'createnote',
    component: CreateNoteView,
    meta: { requiresAuth: true } // Require authentication for this route
  },
  {
    path: '/note',
    name: 'note',
    component: NoteView,
    meta: { requiresAuth: true } // Require authentication for this route
  
  },
  
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
