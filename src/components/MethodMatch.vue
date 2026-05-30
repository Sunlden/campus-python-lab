<template>
  <div class="method-match bg-white rounded-xl border-2 p-5 transition-all duration-300" :class="borderClass">
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg" :class="iconBgClass">
        {{ answered ? (isCorrect ? '✅' : '❌') : '❓' }}
      </div>
      <div class="flex-1">
        <p class="text-sm font-bold text-slate-800 mb-3">{{ problem }}</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(opt, i) in options"
            :key="i"
            @click="answer(i)"
            :disabled="answered"
            class="px-4 py-2 rounded-lg text-sm font-mono font-bold transition-all duration-200"
            :class="getBtnClass(i)"
          >
            {{ opt }}
          </button>
        </div>
        <p v-if="answered" class="mt-3 text-sm font-medium" :class="isCorrect ? 'text-emerald-600' : 'text-red-500'">
          {{ isCorrect ? '✓ ' + successMsg : '✗ ' + failMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  problem: String,
  options: Array,
  correctIndex: Number,
  successMsg: { type: String, default: '正确！' },
  failMsg: { type: String, default: '再想想？' }
});

const emit = defineEmits(['answer']);

const answered = ref(false);
const selectedIndex = ref(-1);
const isCorrect = computed(() => selectedIndex.value === props.correctIndex);

const borderClass = computed(() => {
  if (!answered.value) return 'border-slate-200 hover:border-blue-200';
  return isCorrect.value ? 'border-emerald-300 bg-emerald-50/30' : 'border-red-300 bg-red-50/30';
});
const iconBgClass = computed(() => {
  if (!answered.value) return 'bg-slate-100';
  return isCorrect.value ? 'bg-emerald-100' : 'bg-red-100';
});

const getBtnClass = (i) => {
  if (!answered.value) return 'bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700';
  if (i === props.correctIndex) return 'bg-emerald-500 text-white border border-emerald-500';
  if (i === selectedIndex.value) return 'bg-red-500 text-white border border-red-500';
  return 'bg-slate-50 border border-slate-200 text-slate-400 opacity-50';
};

const answer = (i) => {
  if (answered.value) return;
  answered.value = true;
  selectedIndex.value = i;
  emit('answer', { index: i, correct: i === props.correctIndex });
};
</script>
