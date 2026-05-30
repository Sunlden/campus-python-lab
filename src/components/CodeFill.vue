<template>
  <div class="code-fill bg-slate-900 rounded-xl p-5 font-mono text-sm transition-all duration-300" :class="answered ? (isCorrect ? 'ring-2 ring-emerald-400' : 'ring-2 ring-red-400') : ''">
    <!-- Code with blanks rendered inline -->
    <div class="space-y-0.5 text-slate-300 leading-relaxed">
      <div v-for="(line, li) in lines" :key="li" class="flex">
        <span class="text-slate-500 w-8 flex-shrink-0 select-none text-right mr-3 text-xs leading-relaxed">{{ li + 1 }}</span>
        <span class="whitespace-pre-wrap">
          <template v-for="(seg, si) in line" :key="si">
            <span v-if="seg.type === 'text'">{{ seg.value }}</span>
            <span v-else-if="seg.type === 'blank'" class="relative inline-flex items-center">
              <input
                v-if="!answered"
                v-model="answers[seg.id]"
                class="bg-amber-900/30 border-b-2 border-amber-400 text-amber-300 px-1.5 py-0 outline-none w-[120px] font-mono text-sm focus:bg-amber-900/50 transition-colors"
                :class="answered ? 'bg-emerald-900/30 border-emerald-400' : ''"
                placeholder="______"
                spellcheck="false"
                @keydown.enter="check"
              />
              <span v-else class="px-1.5 py-0 font-bold rounded"
                    :class="answers[seg.id]?.trim().toLowerCase() === seg.answer.toLowerCase() ? 'bg-emerald-900/30 text-emerald-300' : 'bg-red-900/30 text-red-300 line-through'">
                {{ answers[seg.id] || '(空)' }}
              </span>
              <span v-if="answered && answers[seg.id]?.trim().toLowerCase() !== seg.answer.toLowerCase()" class="ml-1 text-emerald-400 font-bold">
                {{ seg.answer }}
              </span>
            </span>
          </template>
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
      <p class="text-xs text-slate-500">{{ hint }}</p>
      <div class="flex gap-2">
        <button v-if="!answered" @click="check" class="px-4 py-1.5 bg-emerald-600 text-white text-xs rounded-lg font-bold hover:bg-emerald-500 transition-colors">检查</button>
        <button v-if="answered" @click="retry" class="px-4 py-1.5 bg-slate-600 text-white text-xs rounded-lg font-bold hover:bg-slate-500 transition-colors">重试</button>
      </div>
    </div>

    <p v-if="answered" class="mt-2 text-xs" :class="isCorrect ? 'text-emerald-400' : 'text-red-400'">
      {{ isCorrect ? '✓ ' + successMsg : '✗ ' + failMsg }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  lines: Array, // Array of arrays of segments: [{type: 'text', value: '...'}, {type: 'blank', id: 0, answer: 'correct_value'}]
  hint: { type: String, default: '' },
  successMsg: { type: String, default: '完全正确！' },
  failMsg: { type: String, default: '有些地方不对，看看绿色标注的正确答案。' }
});

const emit = defineEmits(['complete']);

const answers = ref({});
const answered = ref(false);

// Initialize answers from blanks
onMounted(() => {
  props.lines.forEach(line => {
    line.forEach(seg => {
      if (seg.type === 'blank') {
        answers.value[seg.id] = '';
      }
    });
  });
});

const isCorrect = computed(() => {
  return props.lines.every(line =>
    line.every(seg => {
      if (seg.type !== 'blank') return true;
      return answers.value[seg.id]?.trim().toLowerCase() === seg.answer.toLowerCase();
    })
  );
});

const check = () => {
  // Check if any blanks are filled
  const hasInput = Object.values(answers.value).some(v => v.trim());
  if (!hasInput) return;
  answered.value = true;
  if (isCorrect.value) {
    emit('complete', { correct: true });
  }
};

const retry = () => {
  answered.value = false;
  Object.keys(answers.value).forEach(k => { answers.value[k] = ''; });
};
</script>
