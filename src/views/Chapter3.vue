<template>
  <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-8 py-12">
    <aside class="hidden lg:block w-40 flex-shrink-0 sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 border-r border-slate-200">
      <h3 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">目录</h3>
      <ul class="space-y-3 text-sm text-slate-600">
        <li><a href="#section-hero" class="hover:text-blue-600 transition-colors">开篇</a></li>
        <li><a href="#section-cli-gui" class="hover:text-blue-600 transition-colors">① CLI vs GUI</a></li>
        <li><a href="#section-tkinter" class="hover:text-blue-600 transition-colors">② tkinter 入门</a></li>
        <li><a href="#section-event" class="hover:text-blue-600 transition-colors">③ 事件驱动 + 回调</a></li>
        <li><a href="#section-build" class="hover:text-blue-600 transition-colors">④ PyInstaller 打包</a></li>
        <li><a href="#section-game" class="hover:text-blue-600 font-bold transition-colors">🎮 组装你的校园管家</a></li>
        <li><a href="#section-quiz" class="hover:text-blue-600 transition-colors">📝 知识检测</a></li>
        <li><a href="#section-downloads" class="hover:text-blue-600 transition-colors">⬇️ 资源下载</a></li>
      </ul>
    </aside>

    <main class="flex-1 min-w-0 space-y-20 pb-24">
      <!-- Hero -->
      <section id="section-hero" class="space-y-4">
        <span class="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">Chapter 3</span>
        <h1 class="text-4xl font-bold text-slate-900 tracking-tight">打造"校园管家"应用软件</h1>
        <div class="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl max-w-3xl">
          <p class="text-slate-700 leading-relaxed"><strong>你已经有了数据处理和可视化的能力。</strong>但你的同学不会用命令行。第三章教你把代码包装成带窗口、有按钮的桌面软件，最后用 PyInstaller 打包成 .exe，分享给任何人。</p>
        </div>
      </section>

      <!-- Video -->
      <VideoLazy src="//player.bilibili.com/player.html?bvid=BV19N411L75t&high_quality=1&danmaku=0" title="视频：PyInstaller 打包与发布" />

      <!-- ① CLI vs GUI -->
      <section id="section-cli-gui" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">①</span>
          命令行 vs 图形界面
        </h2>
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-slate-900 rounded-xl p-6 text-green-400 font-mono text-sm shadow-lg">
            <div class="text-slate-500 text-xs mb-3">Windows PowerShell</div>
            <p class="mb-1"><span class="text-white">PS C:\Users></span> python clean_data.py</p>
            <p class="text-slate-500 mb-3">Error: Python not found</p>
            <p class="mb-1"><span class="text-white">PS C:\Users></span> pip install pandas</p>
            <p class="text-red-400">'pip' is not recognized...</p>
            <p class="mt-4 text-yellow-400 text-xs">需要安装 Python、记忆命令、敲代码</p>
          </div>
          <div class="bg-white rounded-xl border-2 border-emerald-400 p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <div class="text-3xl mb-3">🖥️</div>
            <div class="bg-slate-100 rounded-lg w-full p-3 mb-3 text-sm font-bold text-slate-700">校园管家 v1.0</div>
            <div class="space-y-2 w-full">
              <div class="bg-emerald-500 text-white rounded-lg py-2 text-sm font-bold cursor-pointer hover:bg-emerald-600 transition-colors shadow-sm">一键数据清洗</div>
              <div class="bg-blue-500 text-white rounded-lg py-2 text-sm font-bold cursor-pointer hover:bg-blue-600 transition-colors shadow-sm">生成统计图表</div>
            </div>
            <p class="mt-4 text-emerald-600 text-xs font-bold">点击按钮就行，无需编程知识！</p>
          </div>
        </div>
      </section>

      <!-- Interactive: Choose GUI or CLI -->
      <MethodMatch
        problem="你写了一个数据分析脚本给班主任用，班主任不懂编程也不会用命令行。你应该把程序做成什么形式？"
        :options="['命令行脚本（双击 .py 文件）', '带窗口按钮的 GUI 程序（双击 .exe）', 'Jupyter Notebook', '直接发 Python 代码让老师自己运行']"
        :correct-index="1"
        success-msg="没错！给非技术用户用，打包成带界面的 .exe 是最好的选择！"
        fail-msg="想想：不懂编程的老师最需要什么？点一下按钮就能完成操作。"
        @answer="onMethodAnswer"
      />

      <!-- ② Tkinter -->
      <section id="section-tkinter" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">②</span>
          tkinter：Python 自带的 GUI 库
        </h2>
        <p class="text-slate-600 mb-5">tkinter 无需安装，Python 自带。创建窗口只需三步：建窗口 → 加组件 → 启动事件循环。</p>
        <CodeCell
          :initial-code="tkinterCode"
          precomputed-key="chapter3_gui"
          :precomputed-result="tkinterResult"
        />
      </section>

      <!-- ③ Event-driven -->
      <section id="section-event" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">③</span>
          事件驱动：点击按钮，触发动作
        </h2>
        <p class="text-slate-600 mb-4">GUI 程序的核心逻辑：<strong>用户操作（点击按钮）→ 系统调用你预先绑定的函数（回调函数）→ 执行相应代码</strong>。</p>
        <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-sm mb-4">
          <p><code class="text-blue-600">def</code> <code class="text-yellow-600">clean_and_show</code>():</p>
          <p class="pl-4 text-slate-500"># 执行数据清洗和可视化代码</p>
          <p class="pl-4"><code class="text-emerald-600">print</code>(<span class="text-orange-500">"清洗完成！"</span>)</p>
          <p class="mt-2">btn = tk.Button(root, text=<span class="text-orange-500">"一键清洗"</span>, <strong class="text-red-500">command=clean_and_show</strong>)</p>
          <p class="text-xs text-slate-400 mt-2"># ↑ 注意：函数名后面不要加括号！否则会在启动时立即执行</p>
        </div>
      </section>

      <!-- Interactive: Complete the tkinter callback code -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">✍️</span>
          补全 tkinter 代码
        </h2>
        <p class="text-slate-600 mb-5">填入正确的 tkinter 关键字和函数名。</p>
        <CodeFill
          :lines="ch3CodeFillLines"
          hint="提示：回顾创建窗口→按钮→绑定回调→启动循环这四个关键步骤。"
          success-msg="tkinter 的基本结构你已经完全掌握了！"
          fail-msg="有些地方还需要调整，看看绿色标注的正确答案。"
          @complete="onCodeFillComplete"
        />
      </section>

      <!-- ④ PyInstaller -->
      <section id="section-build" class="max-w-3xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">④</span>
          打包成 .exe，分享给所有人
        </h2>
        <div class="bg-slate-900 text-slate-300 p-5 rounded-xl font-mono text-sm">
          <p class="text-slate-500"># 第一步：安装打包工具</p>
          <p>pip install pyinstaller</p>
          <p class="text-slate-500 mt-3"># 第二步：进入代码所在文件夹</p>
          <p>cd campus_manager</p>
          <p class="text-slate-500 mt-3"># 第三步：一键打包</p>
          <p><span class="text-emerald-400">pyinstaller</span> <span class="text-yellow-400">-F</span> <span class="text-yellow-400">-w</span> campus_manager.py</p>
          <p class="text-slate-500 mt-3"># 第四步：在 dist/ 文件夹中找到 campus_manager.exe，双击运行！</p>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-3 text-sm">
          <div class="bg-slate-50 p-3 rounded-lg border border-slate-200"><code class="font-bold">-F</code><br><span class="text-slate-500">打包成单个 .exe</span></div>
          <div class="bg-slate-50 p-3 rounded-lg border border-slate-200"><code class="font-bold">-w</code><br><span class="text-slate-500">隐藏命令行窗口</span></div>
          <div class="bg-slate-50 p-3 rounded-lg border border-slate-200"><code class="font-bold">-i</code><br><span class="text-slate-500">自定义程序图标</span></div>
        </div>
      </section>

      <!-- Interactive: PyInstaller packaging workflow -->
      <StepOrder
        title="PyInstaller 打包成 .exe 的正确流程"
        :steps="ch3Steps"
        success-msg="打包流程完全正确！你已经可以从源码到 .exe 完成完整闭环了！"
        @complete="onStepOrderComplete"
      />

      <!-- GAME: Block Assembly + Live GUI Preview -->
      <section id="section-game" class="pt-8 border-t border-slate-200">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-2">🎮 组装你的校园管家</h2>
            <p class="text-slate-600">拖拽代码积木按正确顺序组装程序，然后一键虚拟打包！</p>
          </div>
          <span class="text-sm text-teal-600 font-medium bg-teal-50 px-4 py-2 rounded-full" v-if="isPackaged">🎉 恭喜结课！</span>
        </div>

        <div class="flex gap-6 flex-col lg:flex-row">
          <!-- Left: Blocks -->
          <div class="w-full lg:w-1/3 flex flex-col gap-4">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col">
              <h3 class="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                积木库
              </h3>
              <VueDraggable class="space-y-2 flex-1 overflow-y-auto pr-1" v-model="availableBlocks" :group="{ name: 'blocks', pull: 'clone', put: false }" :clone="cloneBlock" :sort="false">
                <div v-for="block in availableBlocks" :key="block.id" class="bg-slate-50 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md cursor-grab transition-all p-2.5 rounded-lg">
                  <div class="font-mono text-xs text-indigo-700 font-bold mb-1">{{ block.code }}</div>
                  <div class="text-xs text-slate-500">{{ block.desc }}</div>
                </div>
              </VueDraggable>
            </div>
          </div>

          <!-- Right: Workspace + Live Preview + Terminal -->
          <div class="flex-1 flex flex-col gap-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Workspace -->
              <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-bold text-slate-700">📝 主程序</h3>
                  <Button type="default" size="small" @click="verifyLogic">检查</Button>
                </div>
                <div class="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-3 relative min-h-[180px]">
                  <div v-if="workspaceBlocks.length === 0" class="absolute inset-0 flex items-center justify-center text-xs text-slate-400 pointer-events-none">拖拽积木至此处</div>
                  <VueDraggable class="w-full min-h-full space-y-1.5 pb-8" v-model="workspaceBlocks" group="blocks">
                    <div v-for="(block, index) in workspaceBlocks" :key="block.uuid" class="bg-white border-l-4 border-indigo-500 shadow-sm p-2.5 rounded-r-lg relative group">
                      <button @click="removeBlock(index)" class="absolute right-1.5 top-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <div class="font-mono text-xs text-slate-800">{{ block.code }}</div>
                    </div>
                  </VueDraggable>
                </div>
                <div v-if="logicFeedback" class="mt-3 p-2.5 rounded-lg text-xs" :class="logicFeedback.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-700'">{{ logicFeedback.message }}</div>
              </div>

              <!-- Live GUI Preview -->
              <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <h3 class="text-sm font-bold text-slate-700 mb-3">🖥️ 实时窗口预览</h3>
                <div class="flex-1 bg-slate-100 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px] border border-slate-200">
                  <!-- Simulated tkinter window -->
                  <div class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-[280px] border border-slate-300">
                    <div class="bg-blue-600 text-white text-xs px-3 py-1.5 flex items-center gap-2">
                      <span class="flex-1 truncate">{{ previewTitle || '校园管家' }}</span>
                      <span class="flex gap-1">
                        <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      </span>
                    </div>
                    <div class="p-4 space-y-3">
                      <div v-if="hasLabel" class="text-center text-sm text-slate-600 font-medium py-1 bg-slate-50 rounded">欢迎使用校园管家</div>
                      <div v-for="btn in previewButtons" :key="btn" class="w-full py-2 rounded-lg text-center text-sm font-bold text-white shadow-sm"
                           :class="btn === '选择文件' ? 'bg-slate-500' : btn === '数据清洗' ? 'bg-emerald-500' : 'bg-blue-500'">
                        {{ btn }}
                      </div>
                      <div v-if="previewButtons.length === 0" class="text-center text-xs text-slate-400 py-4">
                        拖入按钮积木来添加功能...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terminal -->
            <div class="bg-slate-900 rounded-xl p-4 shadow-inner flex flex-col h-52 relative overflow-hidden">
              <div class="flex items-center justify-between mb-2 relative z-10">
                <span class="text-slate-400 text-xs font-mono">虚拟终端 - PyInstaller</span>
                <button @click="startPackaging" :disabled="!isLogicCorrect || isPackaging" class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="isPackaging ? 'bg-slate-700 text-slate-300' : 'bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/30'">
                  {{ isPackaging ? '打包中...' : '开始虚拟打包' }}
                </button>
              </div>
              <div class="flex-1 overflow-y-auto font-mono text-xs text-slate-300 space-y-1 relative z-10" ref="consoleOutput">
                <div v-for="(log, idx) in packLogs" :key="idx" :class="log.type === 'error' ? 'text-red-400' : (log.type === 'success' ? 'text-teal-400' : 'text-slate-300')">
                  <span class="text-slate-500 mr-2">></span>{{ log.text }}
                </div>
                <div v-if="isPackaging" class="text-slate-500 animate-pulse">> 执行中...</div>
              </div>
              <div v-if="isPackaging || isPackaged" class="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
                <div class="h-full bg-teal-500 transition-all duration-300" :style="{ width: packProgress + '%' }"></div>
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
import { ref, computed, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import Button from '../components/Button.vue';
import CodeCell from '../components/CodeCell.vue';
import Quiz from '../components/Quiz.vue';
import VideoLazy from '../components/VideoLazy.vue';
import MethodMatch from '../components/MethodMatch.vue';
import CodeFill from '../components/CodeFill.vue';
import StepOrder from '../components/StepOrder.vue';
import { useCourseStore } from '../store/courseStore';

const courseStore = useCourseStore();

const tkinterCode = `import tkinter as tk\n\nroot = tk.Tk()\nroot.title("校园管家 v1.0")\nroot.geometry("500x400")\n\nlabel = tk.Label(root, text="欢迎使用校园管家！", font=("微软雅黑", 16))\nlabel.pack(pady=20)\n\ndef clean_data():\n    print("正在清洗数据...")\n    print("清洗完成！")\n\nbtn = tk.Button(root, text="一键数据清洗", command=clean_data, bg="#4CAF50", fg="white", width=20, height=2)\nbtn.pack(pady=10)\n\nprint("GUI 程序结构：")\nprint("1. 创建窗口 → 2. 添加组件 → 3. 定义回调 → 4. 绑定按钮 → 5. 启动循环")\n\n# root.mainloop()  # 在浏览器中跳过`;
const tkinterResult = `GUI 程序结构：\n1. 创建窗口 → 2. 添加组件 → 3. 定义回调 → 4. 绑定按钮 → 5. 启动循环`;

// Block assembly game
const availableBlocks = ref([
  { id: 'b1', code: 'root = tk.Tk()', desc: '创建主窗口 (必须第一行)', type: 'init' },
  { id: 'b2', code: 'root.title("校园管家")', desc: '设置窗口标题', type: 'setup' },
  { id: 'b3', code: 'root.geometry("600x450")', desc: '设置窗口尺寸', type: 'setup' },
  { id: 'b4', code: 'label = tk.Label(text="欢迎!")', desc: '添加文本标签', type: 'widget' },
  { id: 'b5', code: 'btn1 = tk.Button(text="选择文件")', desc: '添加"选择文件"按钮', type: 'widget' },
  { id: 'b6', code: 'btn2 = tk.Button(text="数据清洗")', desc: '添加"数据清洗"按钮', type: 'widget' },
  { id: 'b7', code: 'btn3 = tk.Button(text="生成图表")', desc: '添加"生成图表"按钮', type: 'widget' },
  { id: 'b8', code: 'root.mainloop()', desc: '启动事件循环 (必须在最后)', type: 'loop' }
]);

const workspaceBlocks = ref([]);
const logicFeedback = ref(null);
const isLogicCorrect = ref(false);
const isPackaging = ref(false);
const isPackaged = ref(false);
const packProgress = ref(0);
const packLogs = ref([{ text: '等待指令: pyinstaller -F -w campus_manager.py', type: 'info' }]);
const consoleOutput = ref(null);

// Live preview computed
const previewTitle = computed(() => {
  const titleBlock = workspaceBlocks.value.find(b => b.id === 'b2');
  return titleBlock ? '校园管家' : '未命名窗口';
});

const hasLabel = computed(() => workspaceBlocks.value.some(b => b.id === 'b4'));

const previewButtons = computed(() => {
  const btns = [];
  if (workspaceBlocks.value.some(b => b.id === 'b5')) btns.push('选择文件');
  if (workspaceBlocks.value.some(b => b.id === 'b6')) btns.push('数据清洗');
  if (workspaceBlocks.value.some(b => b.id === 'b7')) btns.push('生成图表');
  return btns;
});

const cloneBlock = (block) => ({ ...block, uuid: `${block.id}-${Date.now()}` });

const removeBlock = (i) => {
  workspaceBlocks.value.splice(i, 1);
  logicFeedback.value = null;
  isLogicCorrect.value = false;
};

const verifyLogic = () => {
  if (workspaceBlocks.value.length === 0) {
    logicFeedback.value = { type: 'error', message: '工作区为空，请拖入积木组装代码！' };
    isLogicCorrect.value = false;
    return;
  }
  const first = workspaceBlocks.value[0], last = workspaceBlocks.value[workspaceBlocks.value.length - 1];
  if (first.type !== 'init') { logicFeedback.value = { type: 'error', message: '错误：必须先创建主窗口 (root = tk.Tk())！' }; isLogicCorrect.value = false; return; }
  if (last.type !== 'loop') { logicFeedback.value = { type: 'error', message: '错误：程序末尾必须调用 mainloop() 启动事件循环！' }; isLogicCorrect.value = false; return; }
  if (!workspaceBlocks.value.some(b => b.type === 'widget')) { logicFeedback.value = { type: 'error', message: '窗口里还没有按钮/标签，界面是空的！' }; isLogicCorrect.value = false; return; }
  if (workspaceBlocks.value.filter(b => b.type === 'init').length > 1 || workspaceBlocks.value.filter(b => b.type === 'loop').length > 1) {
    logicFeedback.value = { type: 'error', message: '主窗口和事件循环分别只能有一个！' }; isLogicCorrect.value = false; return;
  }
  isLogicCorrect.value = true;
  logicFeedback.value = { type: 'success', message: '逻辑正确！窗口→标题→组件→循环，可以打包了！' };
};

const startPackaging = async () => {
  if (!isLogicCorrect.value || isPackaging.value) return;
  isPackaging.value = true; packProgress.value = 0; packLogs.value = [];
  const addLog = (text, type = 'info') => { packLogs.value.push({ text, type }); nextTick(() => { if (consoleOutput.value) consoleOutput.value.scrollTop = consoleOutput.value.scrollHeight; }); };
  addLog('pyinstaller -F -w campus_manager.py');
  for (const step of [
    { p:10, t:500, l:'67 INFO: PyInstaller: 6.3.0' },{ p:20, t:600, l:'124 INFO: Python: 3.10.0' },
    { p:35, t:700, l:'345 INFO: 分析依赖 (pandas, matplotlib, tkinter)...' },{ p:55, t:1000, l:'890 INFO: 构建 EXE 引导程序...' },
    { p:75, t:1100, l:'1205 INFO: 打包依赖进单文件 (-F)...' },{ p:88, t:800, l:'1560 INFO: 隐藏控制台 (-w)...' },
    { p:96, t:500, l:'1890 INFO: 写入 campus_manager.exe 成功' },{ p:100, t:400, l:'2000 INFO: Building EXE completed.', type:'success' }
  ]) {
    await new Promise(r => setTimeout(r, step.t));
    packProgress.value = step.p;
    addLog(step.l, step.type || 'info');
  }
  isPackaging.value = false; isPackaged.value = true;
  courseStore.passChapter3();
  setTimeout(() => addLog('🎉 恭喜！三章全部完成！校园管家.exe 已就绪！', 'success'), 500);
};

// Quiz
const quizQuestions = [
  { question: 'GUI 的英文全称是什么？', options: ['General User Internet', 'Graphical User Interface', 'General Utility Interface', 'Graphical Unit Integration'], correctIndex: 1, explanation: 'GUI = Graphical User Interface，即图形用户界面。' },
  { question: 'tkinter 中必须在程序最后调用的是什么？', options: ['tk.Tk()', 'root.geometry()', 'root.mainloop()', 'tk.Button()'], correctIndex: 2, explanation: 'mainloop() 启动事件循环，保持窗口显示并等待用户操作，必须在最后调用。' },
  { question: 'PyInstaller 的 -w 参数作用是什么？', options: ['加速打包', '压缩文件大小', '运行时隐藏命令行窗口', '添加自定义图标'], correctIndex: 2, explanation: '-w 让程序运行时隐藏黑色命令行窗口，是 GUI 程序的必备参数。' }
];

const downloads = [
  { name: 'tkinter_basics.py', desc: 'Tkinter 基础窗口与组件示例', path: '/data_analysis/tkinter_basics.py' },
  { name: 'event_driven_demo.py', desc: '事件驱动机制示例', path: '/data_analysis/event_driven_demo.py' },
  { name: 'campus_manager.py', desc: '完整的校园管家主程序代码', path: '/data_analysis/campus_manager.py' },
  { name: 'build_guide.txt', desc: '打包发布指南', path: '/project_docs/build_guide.txt' }
];

const onQuizComplete = ({ percent }) => { courseStore.saveQuizScore(3, percent); };

// CodeFill: tkinter code
const ch3CodeFillLines = [
  [{ type: 'text', value: 'import tkinter as tk' }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 创建主窗口' }],
  [{ type: 'text', value: 'root = tk.' }, { type: 'blank', id: 0, answer: 'Tk' }, { type: 'text', value: '()' }],
  [{ type: 'text', value: "root.title('校园管家')" }],
  [{ type: 'text', value: "root." }, { type: 'blank', id: 1, answer: 'geometry' }, { type: 'text', value: "('500x400')" }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 定义回调函数' }],
  [{ type: 'text', value: 'def clean_data():' }],
  [{ type: 'text', value: '    print("清洗完成！")' }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 创建按钮并绑定回调（注意：command= 后面不要加括号！）' }],
  [{ type: 'text', value: 'btn = tk.Button(root, text="一键清洗", ' }, { type: 'blank', id: 2, answer: 'command' }, { type: 'text', value: '=clean_data)' }],
  [{ type: 'text', value: 'btn.pack()' }],
  [{ type: 'text', value: '' }],
  [{ type: 'text', value: '# 启动事件循环（必须在最后一行）' }],
  [{ type: 'text', value: 'root.' }, { type: 'blank', id: 3, answer: 'mainloop' }, { type: 'text', value: '()' }],
];

const ch3Steps = [
  { id: 'p1', text: '安装 PyInstaller：pip install pyinstaller', correctPosition: 0 },
  { id: 'p2', text: '打开终端，cd 进入代码所在文件夹', correctPosition: 1 },
  { id: 'p3', text: '执行打包命令：pyinstaller -F -w main.py', correctPosition: 2 },
  { id: 'p4', text: '等待打包完成，在 dist/ 文件夹中找到 .exe 文件', correctPosition: 3 },
  { id: 'p5', text: '测试 .exe 能否正常运行', correctPosition: 4 },
  { id: 'p6', text: '将 .exe 和资源文件一起压缩，分享给用户', correctPosition: 5 },
];

const onMethodAnswer = () => {};
const onCodeFillComplete = () => {};
const onStepOrderComplete = () => {};
</script>

<style scoped>html{scroll-behavior:smooth;}</style>
