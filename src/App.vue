<template>
  <Cursor class="flex h-screen w-full font-sans overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-sm flex flex-col border-r z-10" style="background-color: var(--color-animal-bg); border-color: var(--color-animal-border-light);">
      <div class="p-6 pb-2">
        <h1 class="text-xl font-semibold tracking-tight" style="color: var(--color-animal-text);">校园管家</h1>
        <p class="text-xs mt-1" style="color: var(--color-animal-text-secondary);">数据自动化与分析微课</p>
      </div>
      <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <router-link to="/" class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animal-nav-link" active-class="animal-nav-active" exact-active-class="animal-nav-active">首页导航</router-link>
        <router-link to="/chapter1" class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animal-nav-link" active-class="animal-nav-active">第一章：数据清洗</router-link>
        <router-link to="/chapter2" class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animal-nav-link" active-class="animal-nav-active">第二章：可视化</router-link>
        <router-link to="/chapter3" class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animal-nav-link" active-class="animal-nav-active">第三章：GUI打包</router-link>
        <div class="border-t my-2" style="border-color: var(--color-animal-border-light);"></div>
        <router-link to="/glossary" class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animal-nav-link" active-class="animal-nav-active">术语速查表</router-link>
      </nav>
      <!-- Pyodide Status -->
      <div class="px-4 py-3 border-t mt-3" style="border-color: var(--color-animal-border-light);">
        <div class="flex items-center gap-2 text-xs" :title="pyodideMessage">
          <span class="w-2 h-2 rounded-full flex-shrink-0" :class="statusDotClass"></span>
          <span style="color: var(--color-animal-text-secondary);">{{ pyodideStatusText }}</span>
        </div>
        <div v-if="pyodideStatus === 'loading'" class="mt-1.5 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
          <div class="h-full bg-teal-400 rounded-full transition-all duration-500" :style="{ width: pyodideProgress + '%' }"></div>
        </div>
      </div>
      <Footer type="tree" class="mt-auto" />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 relative overflow-y-auto overflow-x-hidden" style="background-color: #fffdf5; scroll-behavior: smooth; scroll-padding-top: 2rem;">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </Cursor>
</template>

<script setup>
import { computed } from 'vue';
import Cursor from './components/Cursor.vue';
import Footer from './components/Footer.vue';
import { useCourseStore } from './store/courseStore';

const courseStore = useCourseStore();
const pyodideStatus = computed(() => courseStore.pyodideStatus);
const pyodideProgress = computed(() => courseStore.pyodideProgress);
const pyodideMessage = computed(() => courseStore.pyodideMessage);

const statusDotClass = computed(() => ({
  'bg-red-400 animate-pulse': pyodideStatus.value === 'error',
  'bg-yellow-400 animate-pulse': pyodideStatus.value === 'loading',
  'bg-teal-400': pyodideStatus.value === 'ready'
}));

const pyodideStatusText = computed(() => ({
  'loading': 'Python 环境加载中...',
  'ready': 'Python 环境就绪',
  'error': 'Python 环境加载失败'
}[pyodideStatus.value] || ''));
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.animal-nav-link {
  color: var(--color-animal-text-secondary);
}
.animal-nav-link:hover {
  background-color: var(--color-animal-bg-secondary);
  color: var(--color-animal-text);
}
.animal-nav-active {
  background-color: var(--color-animal-primary-bg) !important;
  color: var(--color-animal-primary) !important;
}
</style>
