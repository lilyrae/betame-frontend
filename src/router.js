import VueRouter from 'vue-router'
import auth from './services/auth.js'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import BetaSignup from './pages/BetaSignup.vue'
import Me from './pages/Me.vue'
import About from './pages/About.vue'
import CreateStory from './pages/CreateStory.vue'
import Story from './pages/Story.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
    { 
        path: '/',
        component: Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        component: BetaSignup,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/abc123',
        component: Signup,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/me',
        component: Me,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/story/new',
        component: CreateStory,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/story/:id',
        component: Story,
        props: true,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/404',
        component: NotFound,
        meta: {
            requiresAuth: false
        }
    },  
    {
        path: '*', redirect: '/404',
        meta: {
            requiresAuth: false
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
  document.title = 'Beta me.'

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.isLoggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
  
})

export default router