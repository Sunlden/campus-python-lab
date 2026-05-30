<template>
  <div class="code-cell rounded-xl border-2 overflow-hidden transition-all duration-200" :class="statusClass">
    <div class="flex items-center justify-between px-4 py-2.5 border-b" :class="headerClass">
      <div class="flex items-center gap-3">
        <span class="font-mono text-sm font-bold opacity-70">In [{{ runCount || ' ' }}]:</span>
        <span class="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-100 text-slate-500">Python 3</span>
        <span v-if="!pyodideReady && !hasPrecomputed" class="text-xs text-amber-500 flex items-center gap-1">
          <span class="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          环境加载中
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button @click="resetCode" class="text-xs px-2.5 py-1 rounded-md transition-colors text-slate-400 hover:bg-slate-100">重置</button>
        <button
          @click="runCode"
          :disabled="isRunning || (!pyodideReady && !hasPrecomputed)"
          class="run-btn flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200"
          :class="runBtnClass"
        >
          <span v-if="isRunning" class="inline-block w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin"></span>
          <svg v-else-if="!pyodideReady && !hasPrecomputed" class="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          {{ isRunning ? '运行中...' : (!pyodideReady && !hasPrecomputed) ? '等待环境...' : '运行' }}
        </button>
      </div>
    </div>

    <div class="relative">
      <textarea
        ref="editorRef"
        v-model="code"
        class="w-full font-mono text-sm p-4 outline-none resize-y min-h-[80px] transition-colors bg-white"
        :style="{ tabSize: 4 }"
        spellcheck="false"
        @keydown="handleKeydown"
        placeholder="# 在此输入 Python 代码..."
      ></textarea>
    </div>

    <div v-if="output !== null || errorMsg" class="border-t border-slate-100">
      <div class="flex items-center gap-2 px-4 py-2 border-b bg-slate-50/40 border-slate-100">
        <span class="text-xs font-mono font-bold opacity-60">Out [{{ runCount }}]:</span>
        <span v-if="execTime" class="text-xs opacity-40 font-mono ml-auto">{{ execTime }}ms</span>
        <span v-if="lastResultPrecomputed" class="text-xs text-amber-500 font-mono ml-1">(预计算)</span>
      </div>
      <div class="p-4 font-mono text-sm max-h-60 overflow-y-auto bg-slate-50/30">
        <pre v-if="output !== null && output !== undefined" class="whitespace-pre-wrap break-words">{{ output }}</pre>
        <pre v-if="errorMsg" class="whitespace-pre-wrap break-words text-red-600">{{ errorMsg }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCourseStore } from '../store/courseStore';

const props = defineProps({
  initialCode: { type: String, default: '' },
  precomputedResult: { type: String, default: '' },
  precomputedKey: { type: String, default: '' },
  readOnly: { type: Boolean, default: false }
});

const emit = defineEmits(['run', 'success', 'error']);

const courseStore = useCourseStore();
const code = ref(props.initialCode);
const output = ref(null);
const errorMsg = ref('');
const isRunning = ref(false);
const runCount = ref(0);
const execTime = ref(null);
const editorRef = ref(null);
const hasError = ref(false);
const lastResultPrecomputed = ref(false);

const pyodideReady = computed(() => courseStore.pyodideReady);
const hasPrecomputed = computed(() => !!props.precomputedResult);

const statusClass = computed(() => {
  if (isRunning.value) return 'border-blue-300';
  if (hasError.value) return 'border-red-300';
  if (output.value !== null && !hasError.value) return 'border-emerald-300';
  return 'border-slate-200 hover:border-slate-300';
});

const headerClass = computed(() => {
  if (hasError.value) return 'bg-red-50/60 border-red-100';
  if (output.value !== null && !hasError.value) return 'bg-emerald-50/60 border-emerald-100';
  return 'bg-slate-50 border-slate-100';
});

const runBtnClass = computed(() => {
  if (isRunning.value) return 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none';
  if (!pyodideReady.value && !hasPrecomputed.value) return 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none';
  if (hasError.value) return 'bg-red-500 text-white hover:bg-red-600 shadow-sm';
  return 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm';
});

const resetCode = () => {
  code.value = props.initialCode;
  output.value = null;
  errorMsg.value = '';
  hasError.value = false;
  execTime.value = null;
  lastResultPrecomputed.value = false;
};

const handleKeydown = (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    runCode();
  }
};

const runCode = async () => {
  if (isRunning.value || !code.value.trim()) return;
  isRunning.value = true;
  hasError.value = false;
  errorMsg.value = '';
  output.value = null;
  lastResultPrecomputed.value = false;

  const startTime = performance.now();

  try {
    // If user hasn't modified the code and we have a precomputed result, use it
    if (hasPrecomputed.value && code.value.trim() === props.initialCode.trim()) {
      await new Promise(r => setTimeout(r, 200)); // tiny delay for UX feel
      output.value = props.precomputedResult;
      lastResultPrecomputed.value = true;
      execTime.value = Math.round(performance.now() - startTime);
      runCount.value++;
      hasError.value = false;
      emit('run', { code: code.value, output: output.value });
      emit('success', { code: code.value, output: output.value });
      return;
    }

    const result = await courseStore.runCode(code.value, props.precomputedKey);
    const elapsed = Math.round(performance.now() - startTime);
    execTime.value = elapsed;
    runCount.value++;

    if (result !== undefined && result !== null) {
      output.value = String(result);
    } else {
      output.value = '(执行成功，无返回值)';
    }
    hasError.value = false;
    emit('run', { code: code.value, output: output.value, time: elapsed });
    emit('success', { code: code.value, output: output.value });
  } catch (err) {
    execTime.value = Math.round(performance.now() - startTime);
    errorMsg.value = err.message || String(err);
    hasError.value = true;
    runCount.value++;
    emit('error', { code: code.value, error: errorMsg.value });
  } finally {
    isRunning.value = false;
  }
};

watch(() => props.initialCode, (newVal) => {
  if (!code.value || runCount.value === 0) {
    code.value = newVal;
  }
});
</script>
