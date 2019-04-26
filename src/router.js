import VueRouter from 'vue-router'
import auth from './services/auth.js'

// open pages
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import LeaderBoard from './pages/LeaderBoard.vue'
import NotFound from './pages/NotFound.vue'

// auth pages
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import BetaSignup from './pages/BetaSignup.vue'

// story pages
import CreateStory from './pages/CreateStory.vue'
import Story from './pages/Story.vue'

// account pages
import Me from './pages/Account/Me.vue'
import ChangePassword from './pages/Account/ChangePassword.vue'
import MyCookies from './pages/Account/MyCookies.vue'
import EditStory from './pages/Account/EditStory.vue'

// admin pages
import AdminUsers from './pages/Admin/Users.vue'

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
        path: '/invite/:token',
        component: Signup,
        props: true,
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
        path: '/me/password',
        component: ChangePassword,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/me/cookies',
        component: MyCookies,
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
        path: '/story/edit/:id',
        component: EditStory,
        props: true,
        meta: {
            requiresAuth: false
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
        path: '/cookies',
        component: LeaderBoard,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/admin/users',
        component: AdminUsers,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
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
        }
    }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (auth.userId() != 1) {
            next({
                path: '/404',
                query: { redirect: to.fullPath }
            })
        }
    }

    next()
  
})

export default router