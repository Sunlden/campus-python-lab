<template>
  <div class="quiz-section space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
        <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        本章知识检测
      </h3>
      <span class="text-sm text-slate-500 font-mono">{{ currentIndex + 1 }} / {{ questions.length }}</span>
    </div>

    <!-- Progress Bar -->
    <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
      <div class="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
           :style="{ width: progressPercent + '%' }"></div>
    </div>

    <!-- Quiz State: Not Started -->
    <div v-if="!started" class="text-center py-12">
      <div class="text-5xl mb-4">📝</div>
      <p class="text-slate-600 mb-6">共 {{ questions.length }} 道题，检测一下你对本章知识的掌握程度吧！</p>
      <button @click="startQuiz" class="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95">
        开始答题
      </button>
    </div>

    <!-- Quiz State: In Progress -->
    <div v-else-if="!finished" class="space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p class="text-lg font-medium text-slate-800 mb-6">{{ questions[currentIndex].question }}</p>
        <div class="space-y-3">
          <button
            v-for="(option, oi) in questions[currentIndex].options"
            :key="oi"
            @click="selectAnswer(oi)"
            class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium"
            :class="getOptionClass(oi)"
            :disabled="answered"
          >
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 text-sm font-bold"
                  :class="getOptionBadgeClass(oi)">
              {{ ['A', 'B', 'C', 'D'][oi] }}
            </span>
            {{ option }}
          </button>
        </div>
      </div>

      <div v-if="answered" class="flex justify-between items-center">
        <p class="text-sm" :class="isCorrect ? 'text-emerald-600' : 'text-red-500'">
          {{ isCorrect ? '✓ 回答正确！' : '✗ ' + (questions[currentIndex].explanation || '回答错误') }}
        </p>
        <button @click="nextQuestion" class="px-6 py-2.5 rounded-xl font-bold text-white transition-all shadow-sm"
                :class="currentIndex < questions.length - 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-emerald-500 hover:bg-emerald-600'">
          {{ currentIndex < questions.length - 1 ? '下一题' : '查看结果' }}
        </button>
      </div>
    </div>

    <!-- Quiz State: Finished -->
    <div v-else class="text-center py-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div class="text-6xl mb-4">
        {{ scorePercent >= 80 ? '🎉' : scorePercent >= 60 ? '👍' : '📚' }}
      </div>
      <h4 class="text-2xl font-bold text-slate-900 mb-2">
        {{ scorePercent >= 80 ? '太棒了！' : scorePercent >= 60 ? '还不错！' : '继续加油！' }}
      </h4>
      <div class="flex justify-center items-center gap-2 my-6">
        <span v-for="s in 5" :key="s" class="text-3xl transition-all duration-300" :class="s <= stars ? 'scale-110' : 'opacity-30 grayscale'">
          ⭐
        </span>
      </div>
      <p class="text-slate-600 mb-2">得分：<span class="text-3xl font-black" :class="scoreColor">{{ score }}</span> / {{ questions.length }}</p>
      <p class="text-sm text-slate-400 mb-6">正确率 {{ scorePercent }}%</p>
      <div class="flex gap-3 justify-center">
        <button @click="retryQuiz" class="px-6 py-2.5 rounded-xl font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
          重新答题
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  questions: {
    type: Array,
    required: true
    // Each: { question, options: [], correctIndex, explanation }
  }
});

const emit = defineEmits(['complete']);

const started = ref(false);
const finished = ref(false);
const currentIndex = ref(0);
const selectedIndex = ref(null);
const answered = ref(false);
const score = ref(0);
const answers = ref([]);

const progressPercent = computed(() => ((currentIndex.value + (answered.value ? 1 : 0)) / props.questions.length) * 100);
const isCorrect = computed(() => selectedIndex.value === props.questions[currentIndex.value]?.correctIndex);
const scorePercent = computed(() => Math.round((score.value / props.questions.length) * 100));
const stars = computed(() => {
  if (scorePercent.value >= 90) return 5;
  if (scorePercent.value >= 70) return 4;
  if (scorePercent.value >= 50) return 3;
  if (scorePercent.value >= 30) return 2;
  return 1;
});
const scoreColor = computed(() => {
  if (scorePercent.value >= 80) return 'text-emerald-500';
  if (scorePercent.value >= 60) return 'text-amber-500';
  return 'text-red-500';
});

const startQuiz = () => {
  started.value = true;
  currentIndex.value = 0;
  score.value = 0;
  answers.value = [];
  answered.value = false;
  selectedIndex.value = null;
};

const selectAnswer = (index) => {
  if (answered.value) return;
  selectedIndex.value = index;
  answered.value = true;
  if (index === props.questions[currentIndex.value].correctIndex) {
    score.value++;
  }
  answers.value.push({ questionIndex: currentIndex.value, selected: index, correct: index === props.questions[currentIndex.value].correctIndex });
};

const nextQuestion = () => {
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value++;
    answered.value = false;
    selectedIndex.value = null;
  } else {
    finished.value = true;
    emit('complete', { score: score.value, total: props.questions.length, percent: scorePercent.value });
  }
};

const retryQuiz = () => {
  started.value = false;
  finished.value = false;
  currentIndex.value = 0;
  selectedIndex.value = null;
  answered.value = false;
  score.value = 0;
  answers.value = [];
};

const getOptionClass = (oi) => {
  if (!answered.value) return 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer';
  if (oi === props.questions[currentIndex.value].correctIndex) return 'border-emerald-400 bg-emerald-50 text-emerald-700';
  if (oi === selectedIndex.value && !isCorrect.value) return 'border-red-400 bg-red-50 text-red-700';
  return 'border-slate-200 opacity-50';
};

const getOptionBadgeClass = (oi) => {
  if (!answered.value) return 'bg-slate-100 text-slate-500';
  if (oi === props.questions[currentIndex.value].correctIndex) return 'bg-emerald-500 text-white';
  if (oi === selectedIndex.value && !isCorrect.value) return 'bg-red-500 text-white';
  return 'bg-slate-100 text-slate-400';
};
</script>
