<template>
  <div class="aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group cursor-pointer" :class="loaded ? 'bg-black' : 'bg-slate-800'">
    <!-- Thumbnail / click to load -->
    <div v-if="!loaded" @click="loadVideo" class="absolute inset-0 flex flex-col items-center justify-center z-10">
      <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 mb-3">
        <svg class="w-8 h-8 text-red-500 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <p class="text-white/70 text-sm font-medium">{{ title }}</p>
      <p class="text-white/40 text-xs mt-1">点击加载视频</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-10 bg-slate-900/80">
      <div class="flex items-center gap-2 text-white/60">
        <span class="inline-block w-5 h-5 border-2 border-t-transparent border-white/60 rounded-full animate-spin"></span>
        <span class="text-sm">视频加载中...</span>
      </div>
    </div>

    <!-- iframe -->
    <iframe
      v-if="loaded"
      :src="src"
      class="absolute inset-0 w-full h-full"
      scrolling="no" border="0" frameborder="no" framespacing="0"
      allowfullscreen="true"
      @load="loading = false"
    ></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, default: '视频教程' }
});

const loaded = ref(false);
const loading = ref(false);

const loadVideo = () => {
  loading.value = true;
  loaded.value = true;
};
</script>
