<template>
  <div class="p-8 lg:p-12 max-w-5xl mx-auto h-full flex flex-col justify-center">
    <div class="mb-10">
      <h1 class="text-4xl font-bold tracking-tight mb-4 text-slate-900">拯救混乱的校园数据</h1>
      <p class="text-lg leading-relaxed max-w-3xl text-slate-600">
        想象一下，学校即将举办校园运动会，你需要协助老师汇总全校同学的报名信息。然而，交上来的电子表格却让你大跌眼镜：名字里夹杂着"@#"等奇怪符号，手机号码漏填，整行数据重复录入……
      </p>
      <p class="text-lg leading-relaxed max-w-3xl mt-4 text-slate-600">
        今天，你将通过学习 Python 和 Pandas，化身数据工程师。不仅能体验程序处理海量数据的高效快捷，还将学会把枯燥数据转换为直观图表，最后把它们打包成你自己的『校园管家』软件！
      </p>
    </div>

    <!-- Progress Overview -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-slate-800">学习进度</h3>
        <span class="text-sm text-slate-500 font-mono">{{ completedChapters }} / 3 章完成</span>
      </div>
      <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-lime-400 via-orange-400 to-blue-500 rounded-full transition-all duration-700 ease-out"
             :style="{ width: totalProgress + '%' }"></div>
      </div>
      <div class="flex justify-between mt-3 text-xs text-slate-400 font-mono">
        <span :class="chapter1Passed ? 'text-lime-600 font-bold' : ''">第一章</span>
        <span :class="chapter2Passed ? 'text-orange-600 font-bold' : ''">第二章</span>
        <span :class="chapter3Passed ? 'text-blue-600 font-bold' : ''">第三章</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Chapter 1 -->
      <Card color="lime-green" @click="$router.push('/chapter1')">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
            <span class="font-bold text-xl opacity-80">1</span>
          </div>
          <span v-if="chapter1Passed" class="text-xs font-bold bg-white/30 px-2 py-1 rounded-full">已通关</span>
        </div>
        <h2 class="text-xl font-bold mb-2">数据处理与自动化分析</h2>
        <p class="text-sm leading-relaxed mb-2 opacity-80">数据清洗消消乐 —— 告别手工复制粘贴！</p>
        <div class="flex items-center gap-2 text-xs opacity-60 mb-6">
          <span>游戏最高分: {{ gameScores.ch1 }}</span>
          <span v-if="quizScores.ch1">| 测验: {{ quizScores.ch1 }}%</span>
        </div>
        <div class="text-sm font-bold flex items-center">
          {{ chapter1Passed ? '重新挑战' : '开始闯关' }}
          <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </Card>

      <!-- Chapter 2 -->
      <Card color="warm-peach-pink" @click="$router.push('/chapter2')">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
            <span class="font-bold text-xl opacity-80">2</span>
          </div>
          <span v-if="chapter2Passed" class="text-xs font-bold bg-white/30 px-2 py-1 rounded-full">已通关</span>
        </div>
        <h2 class="text-xl font-bold mb-2">数据可视化与信息传递</h2>
        <p class="text-sm leading-relaxed mb-2 opacity-80">可视化连连看 —— 让校园数据开口说话</p>
        <div class="flex items-center gap-2 text-xs opacity-60 mb-6">
          <span v-if="quizScores.ch2">测验: {{ quizScores.ch2 }}%</span>
        </div>
        <div class="text-sm font-bold flex items-center">
          {{ chapter2Passed ? '重新挑战' : '开始闯关' }}
          <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </Card>

      <!-- Chapter 3 -->
      <Card color="app-blue" @click="$router.push('/chapter3')">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
            <span class="font-bold text-xl opacity-80">3</span>
          </div>
          <span v-if="chapter3Passed" class="text-xs font-bold bg-white/30 px-2 py-1 rounded-full">已通关</span>
        </div>
        <h2 class="text-xl font-bold mb-2">GUI 与程序打包</h2>
        <p class="text-sm leading-relaxed mb-2 opacity-80">打造"校园管家" —— 把超能力分享给他人</p>
        <div class="flex items-center gap-2 text-xs opacity-60 mb-6">
          <span v-if="quizScores.ch3">测验: {{ quizScores.ch3 }}%</span>
        </div>
        <div class="text-sm font-bold flex items-center">
          {{ chapter3Passed ? '重新挑战' : '开始闯关' }}
          <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </Card>
    </div>

    <!-- Quick Links -->
    <div class="mt-8 flex gap-4 justify-center">
      <router-link to="/glossary" class="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-4 transition-colors">
        术语速查表
      </router-link>
      <span class="text-slate-300">|</span>
      <button @click="resetAll" class="text-sm text-slate-400 hover:text-red-500 underline underline-offset-4 transition-colors">
        重置进度
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Card from '../components/Card.vue';
import { useCourseStore } from '../store/courseStore';

const courseStore = useCourseStore();
const chapter1Passed = computed(() => courseStore.chapter1Passed);
const chapter2Passed = computed(() => courseStore.chapter2Passed);
const chapter3Passed = computed(() => courseStore.chapter3Passed);
const completedChapters = computed(() => courseStore.completedChapters);
const totalProgress = computed(() => courseStore.totalProgress);
const gameScores = computed(() => courseStore.gameScores);
const quizScores = computed(() => courseStore.quizScores);

const resetAll = () => {
  if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
    courseStore.resetProgress();
  }
};
</script>
