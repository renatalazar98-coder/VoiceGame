import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home
  from '../components/Home.vue'

import SoundRise
  from '../games/SoundRise/SoundRise.vue'

import Settings
  from '../components/Settings.vue'

import About
  from '../components/About.vue'

import VoiceJump
  from '../games/VoiceJump/VoiceJump.vue'


const router = createRouter({

  history:
    createWebHistory(),

  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/soundrise',
      name: 'soundrise',
      component: SoundRise
    },

    {
      path: '/voicejump',
      name: 'voicejump',
      component: VoiceJump
    },

    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },

    {
      path: '/about',
      name: 'about',
      component: About
    }

  ]

})


export default router