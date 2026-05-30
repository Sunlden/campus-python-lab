<template>
  <div class="step-order bg-white rounded-xl border-2 p-5 transition-all duration-300" :class="borderClass">
    <div class="flex items-center gap-3 mb-4">
      <span class="text-lg">{{ allCorrect ? '✅' : '🧩' }}</span>
      <div>
        <p class="text-sm font-bold text-slate-800">{{ title }}</p>
        <p class="text-xs text-slate-500">{{ allCorrect ? successMsg : '拖拽排序，从上到下 = 从先到后' }}</p>
      </div>
      <button v-if="allCorrect" @click="shuffle" class="ml-auto text-xs text-slate-400 hover:text-slate-600 underline">再来一次</button>
    </div>

    <VueDraggable v-model="items" :sort="true" class="space-y-2" @change="onReorder">
      <div v-for="(item, idx) in items" :key="item.id"
           class="flex items-center gap-3 p-3 rounded-lg cursor-grab active:cursor-grabbing transition-all"
           :class="getItemClass(idx)">
        <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              :class="allCorrect ? (idx === item.correctPosition ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-200 text-slate-500'">
          {{ allCorrect ? (idx === item.correctPosition ? '✓' : idx + 1) : idx + 1 }}
        </span>
        <span class="text-sm font-medium" :class="allCorrect ? 'text-slate-700' : 'text-slate-700'">{{ item.text }}</span>
        <svg v-if="!allCorrect" class="w-4 h-4 text-slate-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>
      </div>
    </VueDraggable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

const props = defineProps({
  title: String,
  steps: Array, // [{id, text, correctPosition}]
  successMsg: { type: String, default: '排序正确！' }
});

const emit = defineEmits(['complete']);

const items = ref(props.steps.map((s, i) => ({ ...s })));
const allCorrect = ref(false);

const borderClass = computed(() => allCorrect.value ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200');

const getItemClass = (idx) => {
  if (!allCorrect.value) return 'bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-sm';
  const item = items.value[idx];
  return item.correctPosition === idx ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200';
};

const onReorder = () => {
  const correct = items.value.every((item, idx) => item.correctPosition === idx);
  if (correct) {
    allCorrect.value = true;
    emit('complete', { correct: true });
  }
};

const shuffle = () => {
  items.value = [...items.value].sort(() => Math.random() - 0.5);
  allCorrect.value = false;
};
</script>
