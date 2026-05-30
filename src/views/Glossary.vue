<template>
  <div class="max-w-5xl mx-auto px-4 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-slate-900 tracking-tight mb-4">术语速查表</h1>
      <p class="text-lg text-slate-600">三章课程涉及的所有关键概念，方便随时查阅复习。</p>
    </div>

    <!-- Chapter 1 -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span class="w-8 h-8 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-sm font-bold">1</span>
        数据处理与自动化分析
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="term in chapter1Terms" :key="term.name" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div class="flex items-start gap-3">
            <code class="text-sm font-bold text-lime-700 bg-lime-50 px-2 py-1 rounded-md whitespace-nowrap">{{ term.name }}</code>
            <div>
              <p class="text-sm text-slate-700 leading-relaxed">{{ term.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 2 -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span class="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">2</span>
        数据可视化与信息传递
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="term in chapter2Terms" :key="term.name" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div class="flex items-start gap-3">
            <code class="text-sm font-bold text-orange-700 bg-orange-50 px-2 py-1 rounded-md whitespace-nowrap">{{ term.name }}</code>
            <div>
              <p class="text-sm text-slate-700 leading-relaxed">{{ term.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 3 -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span class="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">3</span>
        GUI 与程序打包
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="term in chapter3Terms" :key="term.name" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div class="flex items-start gap-3">
            <code class="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap">{{ term.name }}</code>
            <div>
              <p class="text-sm text-slate-700 leading-relaxed">{{ term.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const chapter1Terms = [
  { name: 'Pandas', desc: '基于 Python 构建的高性能开源数据分析工具集，提供 Series 和 DataFrame 两种核心数据结构。' },
  { name: 'Series', desc: 'Pandas 中的一维数据结构，本质上是一个带有标签（索引）的一维数组，可看作 Excel 表格中的单独一行或一列。' },
  { name: 'DataFrame', desc: 'Pandas 中的二维表格结构，由多个共享行索引的 Series 拼装而成，相当于代码世界里的 Excel 电子表格。' },
  { name: 'Index', desc: 'Series 和 DataFrame 的行标签，与数据值一一对应，实现精准快速访问。支持整数、字符串等多种类型。' },
  { name: 'NaN', desc: '"Not a Number"的缩写，Pandas 在数据缺失时自动使用的占位标识，表示该位置没有有效数据。' },
  { name: 'isnull()', desc: 'Pandas 方法，用于排查数据表中哪些位置存在缺失数据，返回布尔型 DataFrame。' },
  { name: 'fillna()', desc: 'Pandas 方法，用于填充缺失数据，例如将 NaN 统一填充为指定值如"未填写"。' },
  { name: 'dropna()', desc: 'Pandas 方法，用于过滤含有 NaN 的行或列，移除缺失严重的无效记录。' },
  { name: 'drop_duplicates()', desc: 'Pandas 方法，全表扫描并移除完全重复的数据行，仅保留唯一记录。' },
  { name: 'query()', desc: 'Pandas 方法，使用字符串表达式界定正常范围来筛选数据，如 df.query("年龄 > 0 and 年龄 < 120")。' },
  { name: '脏数据', desc: '现实世界中因人为因素等导致的数据瑕疵，包括信息缺失、格式不规范、重复录入、异常值、特殊符号、逻辑错误等。' },
  { name: 'Jupyter Notebook', desc: '基于 Web 的交互式编程环境，以"Cell"为单位组织代码和文档，特别适合数据分析和教学演示。' }
];

const chapter2Terms = [
  { name: '数据可视化', desc: '利用图形、图像、颜色、位置、大小等视觉元素，将数据中的规律、关系和变化趋势表达出来的过程。' },
  { name: 'Matplotlib', desc: 'Python 最常用的数据可视化库之一，pyplot 模块提供了一组类似"画图工具"的函数接口。' },
  { name: 'plt.bar()', desc: 'Matplotlib 中绘制柱状图的函数，适合比较不同类别之间的数据大小差异。' },
  { name: 'plt.plot()', desc: 'Matplotlib 中绘制折线图的函数，适合展示数据随时间或顺序发生的变化趋势。' },
  { name: 'plt.pie()', desc: 'Matplotlib 中绘制饼图的函数，适合展示各部分在整体中所占的比例关系。' },
  { name: 'plt.scatter()', desc: 'Matplotlib 中绘制散点图的函数，适合观察两个变量之间是否存在关联关系。' },
  { name: 'plt.savefig()', desc: 'Matplotlib 中保存图表为图片文件的函数，支持设置 dpi（分辨率）和 bbox_inches（裁剪方式）。' },
  { name: 'plt.legend()', desc: 'Matplotlib 中添加图例的函数，当有多组数据时帮助读者区分各数据系列。' },
  { name: '柱状图', desc: '用矩形条的高度或长度表示数值大小，适合类别间的数值比较，如各班报名人数。' },
  { name: '折线图', desc: '用点与线段连接展示数据变化轨迹，适合表现趋势和变化过程，如心率随时间变化。' },
  { name: '饼图', desc: '用扇形面积表示比例，适合展示各组成部分在整体中的占比，如男女比例。' },
  { name: '散点图', desc: '用点的位置表示两个变量的值，适合探索两个变量之间是否存在关联，如身高与成绩关系。' }
];

const chapter3Terms = [
  { name: 'GUI', desc: 'Graphical User Interface（图形用户界面），通过窗口、按钮等视觉元素让用户通过鼠标点击进行交互。' },
  { name: 'CLI', desc: 'Command Line Interface（命令行界面），通过文本命令与程序交互，需要记忆命令且通常需要编程环境。' },
  { name: 'tkinter', desc: 'Python 的标准图形界面库，内置在 Python 安装包中，无需额外安装即可使用。' },
  { name: 'tk.Tk()', desc: 'tkinter 中创建主窗口对象的方法，是所有 GUI 组件的容器。' },
  { name: 'mainloop()', desc: '启动 tkinter 事件循环的方法，必须在程序最后调用，让窗口保持显示并等待用户操作。' },
  { name: 'Label', desc: 'tkinter 的标签组件，用于在窗口中显示文本内容。' },
  { name: 'Button', desc: 'tkinter 的按钮组件，用于触发某个动作，通过 command 参数绑定回调函数。' },
  { name: '回调函数', desc: '当用户操作（如点击按钮）时，系统自动调用来响应操作的函数。GUI 编程的核心机制。' },
  { name: '事件驱动', desc: 'GUI 程序的工作模式：程序启动后进入等待状态，当用户触发事件（点击、输入等）时执行相应代码。' },
  { name: 'PyInstaller', desc: '最常用的 Python 打包工具，将代码、解释器和依赖库捆绑成独立的 .exe 可执行文件。' },
  { name: '-F 参数', desc: 'PyInstaller 的 --onefile 参数，将所有内容打包成一个独立的 .exe 文件，便于分发。' },
  { name: '-w 参数', desc: 'PyInstaller 的 --windowed 参数，运行时不显示黑色命令行窗口，GUI 程序必须使用。' }
];
</script>
