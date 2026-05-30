<template>
  <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-8 py-12">
    <aside class="hidden lg:block w-40 flex-shrink-0 sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 border-r border-slate-200">
      <h3 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">目录</h3>
      <ul class="space-y-3 text-sm text-slate-600">
        <li><a href="#section-hero" class="hover:text-orange-600 transition-colors">开篇</a></li>
        <li><a href="#section-chart-types" class="hover:text-orange-600 transition-colors">① 认识四种图表</a></li>
        <li><a href="#section-live-chart" class="hover:text-orange-600 transition-colors">② 动手绘图</a></li>
        <li><a href="#section-beautify" class="hover:text-orange-600 transition-colors">③ 美化五原则</a></li>
        <li><a href="#section-game" class="hover:text-orange-600 font-bold transition-colors">🎮 图表匹配挑战</a></li>
        <li><a href="#section-quiz" class="hover:text-orange-600 transition-colors">📝 知识检测</a></li>
        <li><a href="#section-downloads" class="hover:text-orange-600 transition-colors">⬇️ 资源下载</a></li>
      </ul>
    </aside>

    <main class="flex-1 min-w-0 space-y-20 pb-24">
      <!-- Hero -->
      <section id="section-hero" class="space-y-4">
        <span class="inline-block bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-sm">Chapter 2</span>
        <h1 class="text-4xl font-bold text-slate-900 tracking-tight">让校园数据开口说话</h1>
        <div class="bg-orange-50/50 border border-orange-100 p-5 rounded-2xl max-w-3xl">
          <p class="text-slate-700 leading-relaxed"><strong>数据洗干净了，但老师还是看不懂。</strong>几千行表格，肉眼怎么找规律？数据可视化就是把表格变成图表——柱状图比大小，折线图看趋势，饼图看比例，散点图找关联。选对图表，数据会自己说话。</p>
        </div>
      </section>

      <!-- Video -->
      <VideoLazy src="//player.bilibili.com/player.html?bvid=BV1Jx411L7LU&high_quality=1&danmaku=0" title="视频：Matplotlib 可视化基础" />

      <!-- ① Chart Types -->
      <section id="section-chart-types" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">①</span>
          认识四种图表
        </h2>
        <p class="text-slate-600 mb-6">每种图表擅长回答不同类型的问题。把鼠标悬停在图表上看看它们各自适合什么场景。</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="chart in chartInfo" :key="chart.id" class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div :ref="el => setMiniChartRef(el, chart.id)" class="w-full h-36"></div>
            <div class="p-4">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">{{ chart.icon }}</span>
                <h3 class="font-bold text-slate-900">{{ chart.title }}</h3>
                <code class="text-xs px-1.5 py-0.5 rounded font-mono" :class="chart.codeClass">{{ chart.code }}</code>
              </div>
              <p class="text-sm text-slate-500">{{ chart.desc }}</p>
              <p class="text-xs text-slate-400 mt-1 italic">"{{ chart.useCase }}"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive: Pick the right chart for the job -->
      <MethodMatch
        problem="校医想展示学生体检中「身高与体重之间是否存在关联」，选哪种图表最合适？"
        :options="['柱状图 plt.bar()', '折线图 plt.plot()', '饼图 plt.pie()', '散点图 plt.scatter()']"
        :correct-index="3"
        success-msg="正确！散点图专门用来发现两个变量之间的相关性。"
        fail-msg="再想想：要看两个变量之间的「关联」，不是比较大小也不是看趋势。"
        @answer="onMethodAnswer"
      />

      <!-- ② Live Chart Practice -->
      <section id="section-live-chart" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">②</span>
          亲手画一张柱状图
        </h2>
        <p class="text-slate-600 mb-5">用 Matplotlib 画图就像搭积木：设置画布 → 选择图表类型 → 填入数据 → 加标题标签 → 展示。运行下面的代码试试。</p>
        <CodeCell
          :initial-code="plotCode"
          precomputed-key="chapter2_plot"
          :precomputed-result="plotResult"
        />

        <!-- ECharts live preview -->
        <div v-if="showLiveChart" class="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h4 class="text-sm font-bold text-slate-700 mb-3">📊 实时图表预览</h4>
          <div ref="liveChartRef" class="w-full h-72"></div>
          <div class="mt-3 flex gap-2 flex-wrap">
            <button v-for="c in ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b']" :key="c"
              class="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
              :style="{ background: c }"
              @click="updateChartColor(c)"
            ></button>
          </div>
        </div>
      </section>

      <!-- Interactive: Complete the Matplotlib code -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">✍️</span>
          补全 Matplotlib 代码
        </h2>
        <p class="text-slate-600 mb-5">填入正确的 Matplotlib 函数名，让图表完整运行。</p>
        <CodeFill
          :lines="ch2CodeFillLines"
          hint="提示：回顾 plt 模块的常用函数名。"
          success-msg="你已经掌握了 Matplotlib 的核心绘图函数！"
          fail-msg="有些地方还需要调整，看看绿色标注的正确答案。"
          @complete="onCodeFillComplete"
        />
      </section>

      <!-- ③ Beautify -->
      <section id="section-beautify" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">③</span>
          图表美化五原则
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div v-for="p in principles" :key="p.label" class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center group hover:border-amber-300 transition-all">
            <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{{ p.icon }}</div>
            <h4 class="font-bold text-slate-800 text-sm">{{ p.label }}</h4>
            <p class="text-xs text-slate-500 mt-1">{{ p.desc }}</p>
          </div>
        </div>
        <div class="mt-4 bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm text-amber-800">
          <strong>关键函数备忘：</strong>
          <code class="mx-1 bg-amber-100 px-1 rounded">plt.savefig('name.png', dpi=300)</code> 保存图表，
          <code class="mx-1 bg-amber-100 px-1 rounded">plt.legend()</code> 显示图例，
          <code class="mx-1 bg-amber-100 px-1 rounded">plt.grid(True, alpha=0.3)</code> 加网格线。
          注意 <strong>savefig 必须在 show 之前调用</strong>！
        </div>
      </section>

      <!-- Interactive: Chart creation workflow -->
      <StepOrder
        title="绘制一张完整图表的正确流程"
        :steps="ch2Steps"
        success-msg="流程正确！这就是专业数据可视化的标准工作流！"
        @complete="onStepOrderComplete"
      />

      <!-- GAME: Click-to-Match -->
      <section id="section-game" class="pt-8 border-t border-slate-200">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-2">🎮 图表匹配挑战</h2>
            <p class="text-slate-600">先<strong>点击</strong>左侧问题，再<strong>点击</strong>右侧最合适的图表。</p>
          </div>
          <button v-if="allMatched" @click="resetMatchGame" class="text-xs text-slate-400 hover:text-slate-600 underline">再来一次</button>
        </div>

        <div class="flex gap-6 flex-col lg:flex-row">
          <!-- Left: Questions -->
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">📋 数据问题</h3>
            <div v-for="q in questions" :key="q.id"
                 class="bg-white p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                 :class="q.matched ? 'border-teal-400 bg-teal-50/60' : (selectedQ === q.id ? 'border-blue-400 bg-blue-50 shadow-md ring-2 ring-blue-200' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm')"
                 @click="selectQ(q)">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all"
                      :class="q.matched ? 'bg-teal-500 text-white' : (selectedQ === q.id ? 'bg-blue-500 text-white scale-110' : 'bg-slate-100 text-slate-500')">
                  {{ q.matched ? '✓' : q.num }}
                </span>
                <div>
                  <p class="text-slate-700 font-medium text-sm">{{ q.text }}</p>
                  <p v-if="q.matched" class="text-xs text-teal-600 font-medium mt-0.5">→ {{ getChartName(q.matchId) }}</p>
                </div>
                <svg v-if="selectedQ === q.id" class="w-5 h-5 text-blue-400 ml-auto animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </div>
            </div>
          </div>

          <!-- Right: Chart Targets -->
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">📊 图表类型 <span v-if="!selectedQ" class="text-xs text-slate-400 normal-case">← 请先选择左侧问题</span></h3>
            <div v-for="c in charts" :key="c.id"
                 class="bg-white p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4"
                 :class="c.matched ? 'border-teal-400 bg-teal-50/60' : (selectedQ ? 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/60 hover:shadow-sm' : 'border-slate-200 opacity-60')"
                 @click="matchChart(c)">
              <div class="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                   :class="c.matched ? 'bg-teal-100' : 'bg-slate-50'">
                <div :ref="el => setSlotChartRef(el, c.id)" class="w-full h-full"></div>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-slate-800 text-base">{{ c.title }}</h4>
                <code class="text-xs text-slate-400 font-mono">{{ c.code }}</code>
                <p class="text-xs text-slate-500 mt-0.5">{{ c.desc }}</p>
              </div>
              <div v-if="c.matched" class="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">✓</div>
            </div>
          </div>
        </div>

        <div v-if="msg" class="mt-6 p-4 rounded-xl text-sm font-medium animate-slide-up" :class="msgType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-teal-50 text-teal-700 border border-teal-200'">
          {{ msg }}
        </div>
      </section>

      <!-- QUIZ -->
      <section id="section-quiz" class="pt-8 border-t border-slate-200">
        <Quiz :questions="quizQuestions" @complete="onQuizComplete" />
      </section>

      <!-- Downloads -->
      <section id="section-downloads" class="pt-8 border-t border-slate-200">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">⬇️ 本章配套资源下载</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a v-for="f in downloads" :key="f.name" :href="f.path" download class="flex items-start p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all group">
            <div class="bg-blue-50 p-2 rounded-lg mr-3"><svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
            <div><h3 class="font-medium text-slate-900 text-sm mb-1">{{ f.name }}</h3><p class="text-xs text-slate-500">{{ f.desc }}</p></div>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, nextTick } from 'vue';
import * as echarts from 'echarts';
import { useCourseStore } from '../store/courseStore';
import CodeCell from '../components/CodeCell.vue';
import Quiz from '../components/Quiz.vue';
import VideoLazy from '../components/VideoLazy.vue';
import MethodMatch from '../components/MethodMatch.vue';
import CodeFill from '../components/CodeFill.vue';
import StepOrder from '../components/StepOrder.vue';

const courseStore = useCourseStore();

// Code
const plotCode = `import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\n\nprojects = ['100米', '跳远', '铅球', '接力', '跳高']\ncounts = [35, 28, 45, 22, 38]\n\nfig, ax = plt.subplots(figsize=(10, 5))\nbars = ax.bar(projects, counts, color=['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b'], edgecolor='white', linewidth=2)\nfor bar, c in zip(bars, counts):\n    ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+1, str(c), ha='center', fontweight='bold')\nax.set_title('校园运动会各项目报名人数', fontsize=16, fontweight='bold')\nax.set_ylabel('报名人数')\nax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False)\n\nprint("图表已生成！")\nprint(f"最受欢迎: {projects[counts.index(max(counts))]} ({max(counts)}人)")\nprint(f"总人次: {sum(counts)}")`;
const plotResult = `图表已生成！\n最受欢迎: 铅球 (45人)\n总人次: 168`;

// Chart info cards
const chartInfo = [
  { id: 'ci1', icon: '📈', title: '折线图', code: 'plt.plot()', codeClass: 'bg-orange-50 text-orange-600', desc: '展示数据随时间的变化趋势', useCase: '运动员比赛过程中心率变化' },
  { id: 'ci2', icon: '📊', title: '柱状图', code: 'plt.bar()', codeClass: 'bg-blue-50 text-blue-600', desc: '比较不同类别间的数值大小', useCase: '各班报名总人数对比' },
  { id: 'ci3', icon: '🥧', title: '饼图', code: 'plt.pie()', codeClass: 'bg-pink-50 text-pink-600', desc: '展示各部分在整体中的占比', useCase: '报名学生男女比例' },
  { id: 'ci4', icon: '✦', title: '散点图', code: 'plt.scatter()', codeClass: 'bg-purple-50 text-purple-600', desc: '观察两个变量间是否存在关联', useCase: '学生身高与跳远成绩的关系' }
];

const principles = [
  { icon: '🎯', label: '准确', desc: '忠实反映数据，不歪曲' },
  { icon: '👁️', label: '清晰', desc: '让读者快速抓住重点' },
  { icon: '🧹', label: '简洁', desc: '去掉无关装饰' },
  { icon: '🔧', label: '合适', desc: '选对图表类型' },
  { icon: '📝', label: '有说明', desc: '配上文字解释结论' }
];

// Live ECharts preview
const showLiveChart = ref(true);
const liveChartRef = ref(null);
let liveChartInstance = null;
const liveColors = ref(['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b']);

onMounted(() => {
  if (liveChartRef.value) {
    liveChartInstance = echarts.init(liveChartRef.value);
    renderLiveChart();
  }
  initMiniCharts();
  initSlotCharts();
});

const renderLiveChart = () => {
  if (!liveChartInstance) return;
  liveChartInstance.setOption({
    grid: { top: 20, right: 20, bottom: 40, left: 50 },
    xAxis: { type: 'category', data: ['100米','跳远','铅球','接力','跳高'], axisLabel: { fontSize: 12 } },
    yAxis: { type: 'value', name: '报名人数' },
    series: [{ type: 'bar', data: [35, 28, 45, 22, 38], color: liveColors.value,
      label: { show: true, position: 'top', fontWeight: 'bold' },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
};

const updateChartColor = (color) => {
  const idx = liveColors.value.indexOf(color);
  if (idx >= 0) {
    // Cycle through some preset alternatives
    const alts = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#e056a0','#45b7d1','#f3a683'];
    const curAlt = alts.indexOf(color);
    liveColors.value[idx] = alts[(curAlt + 1) % alts.length];
    renderLiveChart();
  }
};

// Mini charts in info cards
const miniChartEls = ref({});
const miniChartInstances = {};
const setMiniChartRef = (el, id) => { if (el) miniChartEls.value[id] = el; };

const initMiniCharts = () => {
  nextTick(() => {
    const configs = {
      ci1: { x:['Mon','Tue','Wed','Thu','Fri','Sat'], y:[72,85,68,90,78,95], type:'line', color:'#f59e0b' },
      ci2: { x:['A','B','C'], y:[20,35,15], type:'bar', color:'#3b82f6' },
      ci3: { data:[{v:60,n:'男'},{v:40,n:'女'}], type:'pie', colors:['#60a5fa','#f472b6'] },
      ci4: { xy:[[162,2.8],[168,4.5],[155,3.1],[175,5.8],[180,3.6],[158,4.9],[170,2.5],[185,5.2],[165,4.0],[172,6.1],[160,3.3],[178,4.2]], type:'scatter', color:'#8b5cf6' }
    };
    Object.entries(configs).forEach(([id, cfg]) => {
      if (miniChartEls.value[id]) {
        const inst = echarts.init(miniChartEls.value[id]);
        if (cfg.type === 'pie') {
          inst.setOption({
            series: [{ type: 'pie', radius: ['40%','75%'], center: ['50%','50%'],
              data: cfg.data.map(d => ({ value: d.v, name: d.n })),
              color: cfg.colors, label: { show: false } }]
          });
        } else if (cfg.type === 'scatter') {
          inst.setOption({
            grid: { top: 8, bottom: 8, left: 24, right: 8 },
            xAxis: { type: 'value', show: false }, yAxis: { type: 'value', show: false },
            series: [{ type: 'scatter', data: cfg.xy, itemStyle: { color: cfg.color }, symbolSize: 6 }]
          });
        } else {
          inst.setOption({
            grid: { top: 8, bottom: 8, left: 24, right: 8 },
            xAxis: { type: 'category', data: cfg.x, show: false },
            yAxis: { type: 'value', show: false },
            series: [{ data: cfg.y, type: cfg.type, itemStyle: { color: cfg.color },
              lineStyle: cfg.type === 'line' ? { width: 2 } : undefined,
              ...(cfg.type === 'bar' ? { itemStyle: { color: cfg.color, borderRadius: [4,4,0,0] } } : {}) }]
          });
        }
        miniChartInstances[id] = inst;
      }
    });
  });
};

onBeforeUnmount(() => {
  if (liveChartInstance) liveChartInstance.dispose();
  Object.values(miniChartInstances).forEach(i => i.dispose());
  Object.values(slotChartInstances).forEach(i => i.dispose());
  if (errorTimer) clearTimeout(errorTimer);
});

// Click-to-match game
const selectedQ = ref(null);
const msg = ref('');
const msgType = ref('success');
let errorTimer = null;

const questions = ref([
  { id: 'q1', num: 1, text: '各班级报名运动会总人数的差异比较', matchId: 'c2', matched: false },
  { id: 'q2', num: 2, text: '运动员比赛过程中心率随时间的变化', matchId: 'c1', matched: false },
  { id: 'q3', num: 3, text: '男女生在报名总人数中的比例', matchId: 'c3', matched: false },
  { id: 'q4', num: 4, text: '学生身高与跳远成绩之间是否有关联', matchId: 'c4', matched: false }
]);

const charts = ref([
  { id: 'c1', icon: '📈', title: '折线图', code: 'plt.plot()', desc: '展示趋势变化', matched: false },
  { id: 'c2', icon: '📊', title: '柱状图', code: 'plt.bar()', desc: '比较数值大小', matched: false },
  { id: 'c3', icon: '🥧', title: '饼图', code: 'plt.pie()', desc: '展示占比构成', matched: false },
  { id: 'c4', icon: '✦', title: '散点图', code: 'plt.scatter()', desc: '发现变量关联', matched: false }
]);

const allMatched = computed(() => questions.value.every(q => q.matched));

// Mini ECharts in game slot cards
const slotChartEls = ref({});
const slotChartInstances = {};
const setSlotChartRef = (el, id) => { if (el) slotChartEls.value[id] = el; };

const initSlotCharts = () => {
  nextTick(() => {
    const cfgs = {
      c1: { x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], y: [72, 85, 68, 90, 78, 95], type: 'line', color: '#f59e0b' },
      c2: { x: ['A', 'B', 'C'], y: [20, 35, 15], type: 'bar', color: '#3b82f6' },
      c3: { type: 'pie', colors: ['#60a5fa', '#f472b6'] },
      c4: { xy: [[162, 2.8], [168, 4.5], [155, 3.1], [175, 5.8], [180, 3.6], [158, 4.9], [170, 2.5], [185, 5.2], [165, 4.0], [172, 6.1], [160, 3.3], [178, 4.2]], type: 'scatter', color: '#8b5cf6' }
    };
    Object.entries(cfgs).forEach(([id, c]) => {
      if (slotChartEls.value[id]) {
        const inst = echarts.init(slotChartEls.value[id]);
        if (c.type === 'pie') {
          inst.setOption({ series: [{ type: 'pie', radius: ['40%', '70%'], center: ['50%', '50%'], data: [{ value: 60, name: '男' }, { value: 40, name: '女' }], color: c.colors, label: { show: false } }] });
        } else if (c.type === 'scatter') {
          inst.setOption({ grid: { top: 4, bottom: 4, left: 16, right: 4 }, xAxis: { type: 'value', show: false }, yAxis: { type: 'value', show: false }, series: [{ type: 'scatter', data: c.xy, itemStyle: { color: c.color }, symbolSize: 5 }] });
        } else {
          inst.setOption({ grid: { top: 4, bottom: 4, left: 16, right: 4 }, xAxis: { type: 'category', data: c.x, show: false }, yAxis: { type: 'value', show: false }, series: [{ data: c.y, type: c.type, itemStyle: { color: c.color }, lineStyle: c.type === 'line' ? { width: 2 } : undefined, ...(c.type === 'bar' ? { itemStyle: { color: c.color, borderRadius: [3, 3, 0, 0] } } : {}) }] });
        }
        slotChartInstances[id] = inst;
      }
    });
  });
};

const selectQ = (q) => {
  if (q.matched) return;
  selectedQ.value = q.id;
  msg.value = `已选中问题 ${q.num}，现在点击右侧合适的图表类型`;
  msgType.value = 'success';
  if (errorTimer) clearTimeout(errorTimer);
};

const matchChart = (c) => {
  if (!selectedQ.value) return;
  if (c.matched) return;

  const q = questions.value.find(x => x.id === selectedQ.value);
  if (!q) return;

  if (q.matchId === c.id) {
    q.matched = true;
    c.matched = true;
    selectedQ.value = null;
    msg.value = `✓ 正确！"${q.text}" → ${c.title}`;
    msgType.value = 'success';

    if (allMatched.value) {
      courseStore.passChapter2();
      setTimeout(() => {
        msg.value = '🎉 恭喜通关！四种图表的适用场景你已完全掌握！';
      }, 600);
    }
  } else {
    msg.value = `✗ 不对，"${q.text}"不适合用${c.title}。再试试？`;
    msgType.value = 'error';
    selectedQ.value = null;
    if (errorTimer) clearTimeout(errorTimer);
    errorTimer = setTimeout(() => { msg.value = ''; }, 2500);
  }
};

const resetMatchGame = () => {
  questions.value.forEach(q => q.matched = false);
  charts.value.forEach(c => c.matched = false);
  selectedQ.value = null;
  msg.value = '';
};

const getChartName = (matchId) => {
  return charts.value.find(c => c.id === matchId)?.title || '';
};

// Quiz
const quizQuestions = [
  { question: '展示运动员心率随时间的变化趋势，选哪种图表？', options: ['柱状图', '折线图', '饼图', '散点图'], correctIndex: 1, explanation: '折线图擅长展示数据随时间的变化趋势。' },
  { question: '比较各班报名人数差异，选哪种图表？', options: ['折线图', '饼图', '柱状图', '散点图'], correctIndex: 2, explanation: '柱状图适合比较不同类别之间的数值大小。' },
  { question: '保存图表为图片文件使用哪个函数？', options: ['plt.show()', 'plt.savefig()', 'plt.plot()', 'plt.export()'], correctIndex: 1, explanation: 'savefig() 保存图片，注意要在 show() 之前调用。' }
];

const downloads = [
  { name: 'basic_plotting.py', desc: 'Matplotlib 基础绘图示例', path: '/data_analysis/basic_plotting.py' },
  { name: 'chart_beautify.py', desc: '图表美化进阶示例', path: '/data_analysis/chart_beautify.py' },
  { name: 'visualization_report.py', desc: '综合可视化报告生成示例', path: '/data_analysis/visualization_report.py' },
  { name: 'pandas_quick_plot.py', desc: 'Pandas 快捷绘图示例', path: '/data_analysis/pandas_quick_plot.py' }
];

const onQuizComplete = ({ percent }) => { courseStore.saveQuizScore(2, percent); };

// CodeFill: Matplotlib plotting code
const ch2CodeFillLines = [
  [{ type: 'text', value: 'import matplotlib.pyplot as plt' }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 创建图表' }],
  [{ type: 'text', value: 'fig, ax = plt.' }, { type: 'blank', id: 0, answer: 'subplots' }, { type: 'text', value: '(figsize=(10, 5))' }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 绘制柱状图' }],
  [{ type: 'text', value: "ax." }, { type: 'blank', id: 1, answer: 'bar' }, { type: 'text', value: "(projects, counts, color='steelblue')" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 设置标题和轴标签' }],
  [{ type: 'text', value: "ax." }, { type: 'blank', id: 2, answer: 'set_title' }, { type: 'text', value: "('运动会报名统计')" }],
  [{ type: 'text', value: "ax.set_ylabel('报名人数')" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 保存图片（注意：必须在 show 之前调用）' }],
  [{ type: 'text', value: 'plt.' }, { type: 'blank', id: 3, answer: 'savefig' }, { type: 'text', value: "('chart.png', dpi=300)" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 显示图表' }],
  [{ type: 'text', value: 'plt.show()' }],
];

const ch2Steps = [
  { id: 'c1', text: '准备数据（整理好要可视化的数据）', correctPosition: 0 },
  { id: 'c2', text: '创建画布：plt.subplots() 设置尺寸', correctPosition: 1 },
  { id: 'c3', text: '选择合适的图表类型（bar/plot/pie/scatter）绘图', correctPosition: 2 },
  { id: 'c4', text: '添加标题、轴标签、图例等说明元素', correctPosition: 3 },
  { id: 'c5', text: '美化：去多余边框、加网格、调颜色', correctPosition: 4 },
  { id: 'c6', text: '先 savefig() 保存图片，再 show() 显示', correctPosition: 5 },
];

const onMethodAnswer = () => {};
const onCodeFillComplete = () => {};
const onStepOrderComplete = () => {};
</script>

<style scoped>html{scroll-behavior:smooth;}.question-card[data-matched]{opacity:0.5;}</style>
