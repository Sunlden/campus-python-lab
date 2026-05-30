<template>
  <teleport to="body">
    <transition name="celebrate">
      <div v-if="visible" class="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
        <div class="text-6xl animate-bounce">{{ icon }}</div>
        <div class="fixed top-4 right-4 bg-white rounded-2xl shadow-xl border border-emerald-200 px-5 py-3 pointer-events-auto flex items-center gap-3 animate-slide-up">
          <span class="text-2xl">{{ icon }}</span>
          <div>
            <p class="font-bold text-slate-800 text-sm">{{ title }}</p>
            <p class="text-xs text-slate-500">{{ subtitle }}</p>
          </div>
          <button @click="visible = false" class="ml-2 text-slate-300 hover:text-slate-500 text-lg leading-none">&times;</button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const icon = ref('✅');
const title = ref('');
const subtitle = ref('');
let timer = null;

const show = (opts = {}) => {
  icon.value = opts.icon || '✅';
  title.value = opts.title || '完成！';
  subtitle.value = opts.subtitle || '';
  visible.value = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { visible.value = false; }, 3000);
};

defineExpose({ show });
</script>

<style scoped>
.celebrate-enter-active { transition: all 0.3s ease-out; }
.celebrate-leave-active { transition: all 0.3s ease-in; }
.celebrate-enter-from, .celebrate-leave-to { opacity: 0; transform: scale(0.9); }
</style>
