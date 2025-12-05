import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/Projects.vue')
    },
    {
      path: '/projects/:slug',
      name: 'ProjectDetail',
      component: () => import('@/views/ProjectDetail.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('@/views/Privacy.vue')
    },
    {
      path: '/terms-condition',
      name: 'TermsCondition',
      component: () => import('@/views/TermsCondition.vue')
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('@/views/Payment.vue')
    },
    {
      path: '/payment/success',
      name: 'PaymentSuccess',
      component: () => import('@/views/PaymentSuccess.vue')
    },
    {
      path: '/payment/failure',
      name: 'PaymentFailure',
      component: () => import('@/views/PaymentFailure.vue')
    },
    {
      path: '/payment/cancel',
      name: 'PaymentCancel',
      component: () => import('@/views/PaymentFailure.vue')
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

