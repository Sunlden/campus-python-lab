<template>
  <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-8 py-12">
    <aside class="hidden lg:block w-40 flex-shrink-0 sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 border-r border-slate-200">
      <h3 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">目录</h3>
      <ul class="space-y-3 text-sm text-slate-600">
        <li><a href="#section-hero" class="hover:text-lime-600 transition-colors">开篇</a></li>
        <li><a href="#section-series" class="hover:text-lime-600 transition-colors">① 认识 Series</a></li>
        <li><a href="#section-dataframe" class="hover:text-lime-600 transition-colors">② 认识 DataFrame</a></li>
        <li><a href="#section-spot" class="hover:text-lime-600 transition-colors">③ 找出脏数据</a></li>
        <li><a href="#section-cleancode" class="hover:text-lime-600 transition-colors">④ 动手清洗</a></li>
        <li><a href="#section-game" class="hover:text-lime-600 font-bold transition-colors">🎮 数据净化防线</a></li>
        <li><a href="#section-quiz" class="hover:text-lime-600 transition-colors">📝 知识检测</a></li>
        <li><a href="#section-downloads" class="hover:text-lime-600 transition-colors">⬇️ 资源下载</a></li>
      </ul>
    </aside>

    <main class="flex-1 min-w-0 space-y-20 pb-24">
      <!-- Hero -->
      <section id="section-hero" class="space-y-4">
        <span class="inline-block bg-lime-100 text-lime-700 font-bold px-3 py-1 rounded-full text-sm">Chapter 1</span>
        <h1 class="text-4xl font-bold text-slate-900 tracking-tight">拯救混乱的校园数据</h1>
        <div class="bg-lime-50/50 border border-lime-100 p-5 rounded-2xl max-w-3xl">
          <p class="text-slate-700 leading-relaxed"><strong>你收到了一份运动会报名表。</strong>名字里夹杂着"@#"符号，手机号码漏填，同一个人出现了两次，年龄一栏有人填了999……在学会 Pandas 之前，你得花一个下午手动修正。学会之后，<strong>几行代码，一秒搞定。</strong></p>
        </div>
      </section>

      <!-- Video -->
      <VideoLazy src="//player.bilibili.com/player.html?bvid=BV1UJ411A7Fs&page=2&high_quality=1&danmaku=0" title="视频：Pandas 核心操作" />

      <!-- ① Series -->
      <section id="section-series" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-bold">①</span>
          Series：表格里的"一列"
        </h2>
        <p class="text-slate-600 mb-5">如果把 Excel 表格比作一面墙，<strong>Series 就是单排砖块</strong>——带标签的一维数组。每个值都有对应的索引，缺失的地方自动用 NaN 占位。</p>
        <CodeCell
          :initial-code="seriesCode"
          precomputed-key="chapter1_series"
          :precomputed-result="seriesResult"
        />
      </section>

      <!-- ② DataFrame -->
      <section id="section-dataframe" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-bold">②</span>
          DataFrame：代码世界里的 Excel
        </h2>
        <p class="text-slate-600 mb-5">多个 Series 并排拼在一起，就组成了 <strong>DataFrame</strong>——有行有列的二维表格。创建它就像写一个字典一样简单。</p>
        <CodeCell
          :initial-code="dataframeCode"
          precomputed-key="chapter1_dataframe"
          :precomputed-result="dataframeResult"
        />
      </section>

      <!-- Interactive: Pick the right data structure -->
      <MethodMatch
        problem="你需要存储一个班级运动会报名表，包含「姓名、班级、项目、手机号」等多列数据，还能按列名快速访问。应该用哪种数据结构？"
        :options="['Python 列表 (list)', 'Python 字典 (dict)', 'Pandas Series', 'Pandas DataFrame']"
        :correct-index="3"
        success-msg="没错！DataFrame 就是代码世界里的 Excel 表格，有行有列！"
        fail-msg="再想想：需要存储多列数据并支持列名访问，哪种结构支持二维表格？"
        @answer="onMethodAnswer"
      />

      <!-- ③ Spot dirty data -->
      <section id="section-spot" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-bold">③</span>
          找出"脏数据"
        </h2>
        <p class="text-slate-600 mb-5">下面是一份真实世界里的报名表（模拟）。<strong>点击你认为有问题的单元格</strong>，看看你能发现多少处问题。</p>

        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="text-left p-3 font-bold text-slate-700">姓名</th>
                <th class="text-left p-3 font-bold text-slate-700">班级</th>
                <th class="text-left p-3 font-bold text-slate-700">年龄</th>
                <th class="text-left p-3 font-bold text-slate-700">项目</th>
                <th class="text-left p-3 font-bold text-slate-700">手机号</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in dirtyTable" :key="ri" class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td v-for="(cell, ci) in row" :key="ci" class="p-3 cursor-pointer relative transition-all duration-200"
                    :class="[
                      spotted[ri] && spotted[ri][ci] ? (cellIssues[ri] && cellIssues[ri][ci] ? 'bg-red-100 text-red-700 font-bold' : 'bg-emerald-50 text-emerald-600') : '',
                      !spotted[ri] || !spotted[ri][ci] ? 'hover:bg-amber-50' : ''
                    ]"
                    @click="spotCell(ri, ci)">
                  {{ cell }}
                  <span v-if="spotted[ri] && spotted[ri][ci] && cellIssues[ri] && cellIssues[ri][ci]" class="absolute -top-1 -right-1 text-xs">⚠️</span>
                  <span v-if="spotted[ri] && spotted[ri][ci] && (!cellIssues[ri] || !cellIssues[ri][ci])" class="absolute -top-1 -right-1 text-xs">✅</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-slate-500">
            已发现 <strong class="text-red-500">{{ spotCount }}</strong> / {{ totalIssues }} 处问题
            <span v-if="spotCount === totalIssues" class="text-emerald-500 font-bold ml-2">🎉 全部找到！你有一双数据侦探的眼睛！</span>
          </p>
          <button @click="resetSpotting" class="text-xs text-slate-400 hover:text-slate-600 underline">重置</button>
        </div>

        <div v-if="spotCount === totalIssues" class="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800">
          <strong>你发现了 {{ totalIssues }} 类脏数据：</strong>
          <ul class="list-disc pl-4 mt-1 space-y-0.5">
            <li><strong>特殊符号：</strong>姓名中含 @#* 等字符 → 用 <code>str.replace()</code> 清除</li>
            <li><strong>缺失值：</strong>手机号为空 → 用 <code>fillna()</code> 填补</li>
            <li><strong>异常值：</strong>年龄 999 不合理 → 用 <code>query()</code> 过滤</li>
            <li><strong>重复行：</strong>李四出现了两次 → 用 <code>drop_duplicates()</code> 去重</li>
            <li><strong>格式错误：</strong>手机号长度不对 → 用正则 + <code>str.replace()</code> 清洗</li>
          </ul>
        </div>
      </section>

      <!-- ④ Code cleaning -->
      <section id="section-cleancode" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-bold">④</span>
          一行代码搞定清洗
        </h2>
        <p class="text-slate-600 mb-5">刚才那些问题，用 Pandas 几行代码就能全部解决。运行下面的代码看看效果。</p>
        <CodeCell
          :initial-code="cleaningCode"
          precomputed-key="chapter1_cleaning"
          :precomputed-result="cleaningResult"
        />
      </section>

      <!-- Interactive: Fill in the cleaning code blanks -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-bold">✍️</span>
          来，自己写写看
        </h2>
        <p class="text-slate-600 mb-5">填入正确的 Pandas 方法名，完成数据清洗代码。</p>
        <CodeFill
          :lines="ch1CodeFillLines"
          hint="提示：回顾四种清洗操作对应的方法名。"
          success-msg="你已经掌握了数据清洗的核心方法！"
          fail-msg="有些地方还需要调整，看看绿色标注的正确答案。"
          @complete="onCodeFillComplete"
        />
      </section>

      <!-- Interactive: Data cleaning workflow steps -->
      <StepOrder
        title="数据清洗的标准流程"
        :steps="ch1Steps"
        success-msg="流程完全正确！你已经掌握了专业的数据清洗工作流！"
        @complete="onStepOrderComplete"
      />

      <!-- GAME -->
      <section id="section-game" class="pt-8 border-t border-slate-200">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-2">🎮 数据净化防线</h2>
            <p class="text-slate-600">脏数据不断涌入！在 60 秒内拖拽正确的 Pandas 工具消除它们，达到 300 分即可通关。</p>
          </div>
        </div>

        <div class="bg-slate-100 p-6 rounded-2xl border border-slate-200 shadow-inner relative min-h-[500px]">
          <div v-if="gameState !== 'playing'" class="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
            <div class="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border-t-8" :class="gameState === 'victory' ? 'border-teal-500' : (gameState === 'gameover' ? 'border-red-500' : 'border-blue-500')">
              <h2 class="text-3xl font-black text-slate-900 mb-2" v-if="gameState === 'idle'">准备迎接数据洪流？</h2>
              <h2 class="text-3xl font-black text-teal-500 mb-2" v-else-if="gameState === 'victory'">🎉 挑战通关！</h2>
              <h2 class="text-3xl font-black text-red-500 mb-2" v-else-if="gameState === 'gameover'">⏰ 时间到！</h2>
              <div v-if="gameState !== 'idle'" class="my-6">
                <div class="text-sm text-slate-500 font-bold mb-1">最终得分</div>
                <div class="text-6xl font-black font-mono" :class="gameState === 'victory' ? 'text-teal-500' : 'text-slate-900'">{{ score }}</div>
                <div class="text-sm text-slate-400 mt-2">最高连击: {{ maxCombo }}x</div>
              </div>
              <div class="flex gap-4 justify-center">
                <Button type="primary" size="large" @click="startGame">{{ gameState === 'idle' ? '开始挑战' : '再玩一次' }}</Button>
                <Button v-if="gameState === 'victory'" type="default" size="large" @click="$router.push('/chapter2')">进入下一章</Button>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl mb-6 shadow-lg">
            <div class="flex items-center gap-8">
              <div class="text-2xl font-black font-mono flex items-baseline">
                <span class="text-slate-400 text-xs mr-2 uppercase tracking-widest">Score</span>
                <span class="text-teal-400 text-3xl">{{ score }}</span>
                <span class="text-slate-600 text-sm ml-2">/ 300</span>
              </div>
              <div class="text-xl font-black text-yellow-400 italic transition-all duration-300" :class="combo > 1 ? 'opacity-100 scale-110' : 'opacity-0 scale-50'">COMBO x{{ combo }} 🔥</div>
            </div>
            <div class="text-3xl font-black font-mono tracking-wider flex items-baseline" :class="timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'">{{ timeLeft }}<span class="text-xs text-slate-500 ml-1 uppercase">sec</span></div>
          </div>

          <div class="flex gap-8 flex-col lg:flex-row">
            <div class="flex-1 flex flex-col gap-4">
              <div v-for="(card, index) in cards" :key="card.uuid" :ref="el => setCardRef(el, index)" class="bg-white p-5 rounded-xl shadow-md border-l-4 relative overflow-hidden" :class="{'border-l-red-500': card.type === 'error', 'border-l-orange-500': card.type === 'warn', 'border-l-indigo-500': card.type === 'info'}">
                <div class="flex justify-between items-start mb-3 relative z-10">
                  <span class="font-mono text-sm font-bold text-slate-800">Incoming Data</span>
                  <span class="text-xs font-bold px-2 py-1 rounded-md" :class="{'bg-red-100 text-red-600': card.type === 'error', 'bg-orange-100 text-orange-600': card.type === 'warn', 'bg-indigo-100 text-indigo-600': card.type === 'info'}">⚠️ {{ card.label }}</span>
                </div>
                <div class="font-mono text-sm text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100 relative z-10">{{ card.text }}</div>
                <div class="relative min-h-[48px] border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 flex items-center justify-center transition-colors" :class="{'bg-blue-50 border-blue-300': dropZones[index].length > 0}">
                  <div v-if="dropZones[index].length === 0" class="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-400 pointer-events-none tracking-widest">拖拽工具至此</div>
                  <VueDraggable class="w-full h-full min-h-[48px] flex items-center justify-center" v-model="dropZones[index]" group="tools" @add="onDrop($event, index)">
                    <div v-for="element in dropZones[index]" :key="element.id" class="bg-emerald-600 text-white px-3 py-1 rounded-md shadow-md font-mono text-xs font-bold">{{ element.name }}</div>
                  </VueDraggable>
                </div>
              </div>
            </div>

            <div class="w-full lg:w-80 flex flex-col gap-4">
              <div class="bg-white p-5 rounded-xl shadow-md border border-slate-200">
                <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center uppercase tracking-wider">
                  <svg class="w-5 h-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Pandas 清洗工具包
                </h3>
                <VueDraggable class="space-y-2 min-h-[150px]" v-model="tools" :group="{ name: 'tools', pull: 'clone', put: false }" :clone="cloneTool" :sort="false">
                  <div v-for="element in tools" :key="element.id" class="bg-gradient-to-r from-emerald-50 to-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg cursor-grab active:cursor-grabbing transition-all p-3 rounded-lg flex items-center">
                    <code class="text-emerald-700 font-mono text-sm font-bold">{{ element.name }}</code>
                    <span class="ml-auto text-xs text-slate-400">{{ element.shortcut }}</span>
                  </div>
                </VueDraggable>
              </div>

              <div class="bg-slate-900 rounded-xl p-4 flex-1 min-h-[150px] flex flex-col shadow-inner">
                <div class="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                  <span class="text-slate-400 text-xs font-mono font-bold">控制台</span>
                </div>
                <div class="flex-1 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5" ref="consoleOutput">
                  <div v-for="(log, idx) in logs" :key="idx" :class="log.type === 'error' ? 'text-red-400 font-bold' : (log.type === 'success' ? 'text-teal-400 font-bold' : 'text-slate-400')">
                    <span class="text-slate-600 mr-2">></span>{{ log.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- QUIZ -->
      <section id="section-quiz" class="pt-8 border-t border-slate-200">
        <Quiz :questions="quizQuestions" @complete="onQuizComplete" />
      </section>

      <!-- Downloads -->
      <section id="section-downloads" class="pt-8 border-t border-slate-200">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">⬇️ 本章配套资源下载</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a v-for="file in downloadFiles" :key="file.name" :href="file.path" download class="flex items-start p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all group">
            <div class="p-2 rounded-lg mr-3" :class="file.isExcel ? 'bg-green-50' : 'bg-blue-50'">
              <svg class="w-6 h-6" :class="file.isExcel ? 'text-green-600' : 'text-blue-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div><h3 class="font-medium text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{{ file.name }}</h3><p class="text-xs text-slate-500">{{ file.desc }}</p></div>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { gsap } from 'gsap';
import { useCourseStore } from '../store/courseStore';
import Button from '../components/Button.vue';
import CodeCell from '../components/CodeCell.vue';
import Quiz from '../components/Quiz.vue';
import VideoLazy from '../components/VideoLazy.vue';
import MethodMatch from '../components/MethodMatch.vue';
import CodeFill from '../components/CodeFill.vue';
import StepOrder from '../components/StepOrder.vue';

const courseStore = useCourseStore();

// Code templates + precomputed results
const seriesCode = `import pandas as pd\n\nprojects = pd.Series([35, 28, 45, 22, 38], index=['100米', '跳远', '铅球', '接力', '跳高'], name='报名人数')\nprint(projects)\nprint()\nprint(f'报名人数最多的项目: {projects.idxmax()}')\nprint(f'总报名人数: {projects.sum()}')`;
const seriesResult = `报名人数\n100米    35\n跳远     28\n铅球     45\n接力     22\n跳高     38\nName: 报名人数, dtype: int64\n\n报名人数最多的项目: 铅球\n总报名人数: 168`;

const dataframeCode = `import pandas as pd\n\ndata = {\n    '姓名': ['张三', '李四', '王五', '赵六'],\n    '班级': ['高二(1)', '高二(2)', '高二(1)', '高二(3)'],\n    '项目': ['100米', '跳远', '铅球', '100米'],\n    '是否有体检报告': [True, False, True, True]\n}\ndf = pd.DataFrame(data)\nprint(df)\nprint()\nprint(f'表格形状: {df.shape[0]} 行 × {df.shape[1]} 列')\nprint()\nprint('各列数据类型:')\nprint(df.dtypes)`;
const dataframeResult = `   姓名      班级   项目  是否有体检报告\n0  张三  高二(1)  100米       True\n1  李四  高二(2)   跳远      False\n2  王五  高二(1)   铅球       True\n3  赵六  高二(3)  100米       True\n\n表格形状: 4 行 × 4 列\n\n各列数据类型:\n姓名        object\n班级        object\n项目        object\n是否有体检报告     bool\ndtype: object`;

const cleaningCode = `import pandas as pd\nimport numpy as np\n\ndirty_data = {\n    '姓名': ['张三@#', '李四', '王五*', '李四', '赵六'],\n    '班级': ['高二(1)', '高二(2)', None, '高二(2)', '高二(3)'],\n    '年龄': [16, 17, 999, 17, 16],\n    '项目': ['100米', '跳远', '铅球', '跳远', '100米']\n}\ndf = pd.DataFrame(dirty_data)\nprint("=== 原始脏数据 ===")\nprint(df)\nprint()\n\ndf['姓名'] = df['姓名'].str.replace(r'[@#*]+', '', regex=True)\ndf['班级'] = df['班级'].fillna('待确认')\ndf.loc[~df['年龄'].between(0, 120), '年龄'] = np.nan\ndf = df.drop_duplicates()\n\nprint("=== 清洗后的干净数据 ===")\nprint(df)`;
const cleaningResult = `=== 原始脏数据 ===\n    姓名      班级   年龄   项目\n0  张三@#  高二(1)   16  100米\n1   李四  高二(2)   17   跳远\n2  王五*    None  999   铅球\n3   李四  高二(2)   17   跳远\n4   赵六  高二(3)   16  100米\n\n=== 清洗后的干净数据 ===\n   姓名      班级    年龄   项目\n0  张三  高二(1)  16.0  100米\n1  李四  高二(2)  17.0   跳远\n2  王五    待确认   NaN   铅球\n3  赵六  高二(3)  16.0  100米`;

// Spot-the-dirty-data interactive
const dirtyTable = [
  ['张三@#', '高二(1)', '16', '100米', '13800138000'],
  ['李四', '高二(2)', '17', '跳远', ''],
  ['王五*', '高二(1)', '999', '铅球', '13900139000'],
  ['李四', '高二(2)', '17', '跳远', '13800138001'],
  ['赵六', '高二(3)', '16', '100米', '13800']
];

const cellIssues = {
  0: { 0: true, 1: false, 2: false, 3: false, 4: false },   // 张三@# - special chars
  1: { 0: false, 1: false, 2: false, 3: false, 4: true },    // empty phone
  2: { 0: true, 1: false, 2: true, 3: false, 4: false },     // 王五* + age 999
  3: { 0: true, 1: true, 2: true, 3: true, 4: true },        // entire duplicate row (all marked)
  4: { 0: false, 1: false, 2: false, 3: false, 4: true }     // phone too short
};

const totalIssues = 6; // row0:1, row1:1, row2:2, row3:5(showing as entire row issue but counted as 5), row4:1
// Actually let me simplify: row3 is a duplicate row, count as 1 issue total
const totalIssuesCount = 6;

const spotted = ref({});
const spotCount = ref(0);

const initSpotted = () => {
  const s = {};
  for (let r = 0; r < dirtyTable.length; r++) {
    s[r] = {};
    for (let c = 0; c < dirtyTable[r].length; c++) {
      s[r][c] = false;
    }
  }
  return s;
};
spotted.value = initSpotted();

// Special handling: row 3 is entirely duplicated from row 1, mark entire row as issues
const spotCell = (ri, ci) => {
  if (!spotted.value[ri]) spotted.value[ri] = {};

  if (ri === 3) {
    // Duplicate row - clicking any cell marks the whole row
    for (let c = 0; c < dirtyTable[ri].length; c++) {
      spotted.value[ri][c] = !spotted.value[ri][c];
    }
  } else {
    spotted.value[ri][ci] = !spotted.value[ri][ci];
  }

  // Recalculate
  let count = 0;
  for (let r = 0; r < dirtyTable.length; r++) {
    for (let c = 0; c < dirtyTable[r].length; c++) {
      if (spotted.value[r] && spotted.value[r][c] && cellIssues[r] && cellIssues[r][c]) {
        count++;
      }
    }
  }
  // For row 3, count as 1 issue if all cells are marked
  if (spotted.value[3] && Object.values(spotted.value[3]).every(v => v)) {
    count = count - 5 + 1; // replace 5 individual cell counts with 1 row issue
  } else if (spotted.value[3]) {
    // partially spotted row 3
    const row3spotted = Object.values(spotted.value[3]).filter(v => v).length;
    count = count - row3spotted; // don't count individual cells for row 3
  }
  spotCount.value = count;
};

const resetSpotting = () => {
  spotted.value = initSpotted();
  spotCount.value = 0;
};

// Quiz
const quizQuestions = [
  { question: 'Pandas 中的 Series 是几维数据结构？', options: ['零维', '一维（带索引的数组）', '二维（表格）', '三维'], correctIndex: 1, explanation: 'Series 是 Pandas 最基础的一维数据结构，本质上是一个带有标签索引的数组。' },
  { question: 'DataFrame 可以类比为现实中的什么？', options: ['一段文字', '一张 Excel 电子表格', '一张图片', '一段音频'], correctIndex: 1, explanation: 'DataFrame 是二维表格结构，相当于代码世界里的 Excel 电子表格。' },
  { question: '要去除表格中的重复行，使用哪个方法？', options: ['dropna()', 'query()', 'fillna()', 'drop_duplicates()'], correctIndex: 3, explanation: 'drop_duplicates() 全表扫描并移除完全重复的数据行。' }
];

const downloadFiles = [
  { name: 'series_demo.py', desc: 'Series 创建与操作示例', path: '/data_analysis/series_demo.py', isExcel: false },
  { name: 'dataframe_demo.py', desc: 'DataFrame 创建与结构示例', path: '/data_analysis/dataframe_demo.py', isExcel: false },
  { name: 'data_cleaning_demo.py', desc: '数据清洗核心操作示例', path: '/data_analysis/data_cleaning_demo.py', isExcel: false },
  { name: 'clean_registration.py', desc: '报名表清洗脚本', path: '/data_analysis/clean_registration.py', isExcel: false },
  { name: 'watch_hr.xlsx', desc: '模拟心率表数据', path: '/data_analysis/watch_hr.xlsx', isExcel: true },
  { name: 'shoes_spm.xlsx', desc: '模拟步频表数据', path: '/data_analysis/shoes_spm.xlsx', isExcel: true }
];

// Game
const gameState = ref('idle');
const score = ref(0);
const combo = ref(1);
const maxCombo = ref(0);
const timeLeft = ref(60);
const logs = ref([{ text: '系统待命中。点击"开始挑战"生成数据洪流...', type: 'info' }]);
const consoleOutput = ref(null);
let timer = null;
const tools = ref([
  { id: 't1', name: 'dropna()', shortcut: '去空' },
  { id: 't2', name: 'drop_duplicates()', shortcut: '去重' },
  { id: 't3', name: "fillna('暂无')", shortcut: '填充' },
  { id: 't4', name: 'str.replace()', shortcut: '正则' },
  { id: 't5', name: 'query()', shortcut: '筛选' },
  { id: 't6', name: 'astype()', shortcut: '转换' }
]);

const getRandomName = () => ['张三','李四','王五','赵六','陈七','周八','林九','钱十','孙十一','吴十二'][Math.floor(Math.random() * 10)];
const getRandomProject = () => ['100米','跳远','铅球','接力','跳高','800米'][Math.floor(Math.random() * 6)];
const getRandomClass = () => ['高一(1)','高一(2)','高二(1)','高二(3)','高三(1)'][Math.floor(Math.random() * 5)];

const dirtyTypes = [
  { tool: 'dropna()', label: 'NaN 空缺', type: 'error', text: () => `姓名: ${getRandomName()} | 电话: NaN | 班级: ${getRandomClass()}` },
  { tool: 'drop_duplicates()', label: '重复记录', type: 'warn', text: () => `姓名: ${getRandomName()} | 项目: ${getRandomProject()} | 班级: ${getRandomClass()} (重复)` },
  { tool: "fillna('暂无')", label: '字段待填补', type: 'info', text: () => `姓名: ${getRandomName()} | 社团: NaN | 备注: NaN` },
  { tool: 'str.replace()', label: '特殊符号', type: 'error', text: () => `姓名: ${getRandomName()}@#$ | 班级: ${getRandomClass()}*` },
  { tool: 'query()', label: '数值异常', type: 'warn', text: () => `姓名: ${getRandomName()} | 年龄: ${[0,150,999,-5][Math.floor(Math.random()*4)]} | 项目: ${getRandomProject()}` },
  { tool: 'astype()', label: '类型错误', type: 'info', text: () => `姓名: ${getRandomName()} | 学号(文本): 'N${Math.floor(Math.random()*9000)+1000}' | 应为整数` }
];

const generateCard = () => {
  const t = dirtyTypes[Math.floor(Math.random() * dirtyTypes.length)];
  return { uuid: `card-${Date.now()}-${Math.random()}`, correctTool: t.tool, label: t.label, type: t.type, text: t.text() };
};

const cards = ref([generateCard(), generateCard(), generateCard(), generateCard()]);
const dropZones = ref([[], [], [], []]);
const cardRefs = ref({});
const setCardRef = (el, i) => { if (el) cardRefs.value[i] = el; };
const addLog = (text, type = 'info') => {
  logs.value.push({ text, type });
  if (logs.value.length > 30) logs.value.shift();
  nextTick(() => { if (consoleOutput.value) consoleOutput.value.scrollTop = consoleOutput.value.scrollHeight; });
};

const startGame = () => {
  score.value = 0; combo.value = 1; maxCombo.value = 0; timeLeft.value = 60;
  cards.value = [generateCard(), generateCard(), generateCard(), generateCard()];
  dropZones.value = [[], [], [], []];
  logs.value = [{ text: '数据洪流已连接！开始清洗！', type: 'info' }];
  gameState.value = 'playing';
  if (timer) clearInterval(timer);
  timer = setInterval(() => { timeLeft.value--; if (timeLeft.value <= 0) endGame(); }, 1000);
};

const endGame = () => {
  clearInterval(timer);
  courseStore.saveGameScore(1, score.value);
  if (score.value >= 300) {
    gameState.value = 'victory';
    courseStore.passChapter1();
    addLog(`挑战成功！最终得分: ${score.value}`, 'success');
  } else {
    gameState.value = 'gameover';
    addLog(`时间到！最终得分: ${score.value}，未达300分。`, 'error');
  }
};

onUnmounted(() => { if (timer) clearInterval(timer); });
const cloneTool = (tool) => ({ ...tool, id: `cloned-${Date.now()}` });

const onDrop = (event, index) => {
  if (dropZones.value[index].length > 0) {
    const item = dropZones.value[index][0];
    const card = cards.value[index];
    setTimeout(() => { dropZones.value[index] = []; }, 10);
    if (item.name === card.correctTool) {
      const points = 10 * combo.value;
      score.value += points; combo.value++;
      if (combo.value > maxCombo.value) maxCombo.value = combo.value;
      addLog(`[OK] ${item.name} 消除成功！+${points}分`, 'success');
      const el = cardRefs.value[index];
      gsap.fromTo(el, { scale: 1 }, { scale: 1.05, opacity: 0, duration: 0.2, onComplete: () => {
        cards.value[index] = generateCard();
        gsap.fromTo(el, { scale: 0.9, opacity: 0, x: 50 }, { scale: 1, opacity: 1, x: 0, duration: 0.3, ease: 'back.out(1.5)' });
      }});
    } else {
      combo.value = 1;
      timeLeft.value = Math.max(0, timeLeft.value - 3);
      addLog(`[ERR] ${item.name} 无法清洗此数据！扣3秒，连击重置！`, 'error');
      const el = cardRefs.value[index];
      gsap.fromTo(el, { x: -10 }, { x: 10, duration: 0.05, yoyo: true, repeat: 5, onComplete: () => { gsap.set(el, { clearProps: 'all' }); } });
    }
  }
};

const onQuizComplete = ({ percent }) => { courseStore.saveQuizScore(1, percent); };

// CodeFill: Pandas cleaning code with blanks
const ch1CodeFillLines = [
  [{ type: 'text', value: '# 导入 Pandas' }],
  [{ type: 'text', value: 'import pandas as pd' }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 清洗姓名列：去除 @#* 等特殊符号' }],
  [{ type: 'text', value: "df['姓名'] = df['姓名'].str." }, { type: 'blank', id: 0, answer: 'replace' }, { type: 'text', value: "(r'[@#*]+', '', regex=True)" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 填补缺失的班级信息' }],
  [{ type: 'text', value: "df['班级'] = df['班级']." }, { type: 'blank', id: 1, answer: 'fillna' }, { type: 'text', value: "('待确认')" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 过滤掉异常年龄（只保留 0-120 岁）' }],
  [{ type: 'text', value: "df = df." }, { type: 'blank', id: 2, answer: 'query' }, { type: 'text', value: "(0 <= df['年龄'] <= 120)" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 去除重复行' }],
  [{ type: 'text', value: 'df = df.' }, { type: 'blank', id: 3, answer: 'drop_duplicates' }, { type: 'text', value: '()' }],
];

const ch1Steps = [
  { id: 's1', text: '观察数据，识别脏数据类型（特殊符号、缺失值、异常值、重复行）', correctPosition: 0 },
  { id: 's2', text: '用 str.replace() 清除文本中的特殊符号', correctPosition: 1 },
  { id: 's3', text: '用 fillna() 填补缺失值', correctPosition: 2 },
  { id: 's4', text: '用 query() 或条件筛选过滤异常值', correctPosition: 3 },
  { id: 's5', text: '用 drop_duplicates() 去除重复行', correctPosition: 4 },
  { id: 's6', text: '验证清洗结果，导出干净数据', correctPosition: 5 },
];

const onMethodAnswer = () => {};
const onCodeFillComplete = () => {};
const onStepOrderComplete = () => {};
</script>
<style scoped>.ghost { opacity: 0.4; } html { scroll-behavior: smooth; }</style>
