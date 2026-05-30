// Pyodide Web Worker - 在后台加载 Python 环境
// 启动时自动加载，加载过程中向主线程报告进度

let pyodide = null;
let isLoading = false;
let isReady = false;

// 预计算的代码结果（Pyodide 未就绪时的"秒出"方案）
const precomputedResults = {
  chapter1_series: `报名人数
100米    35
跳远     28
铅球     45
接力     22
跳高     38
Name: 报名人数, dtype: int64

报名人数最多的项目: 铅球
总报名人数: 168`,
  chapter1_dataframe: `   姓名      班级   项目  是否有体检报告
0  张三  高二(1)  100米       True
1  李四  高二(2)   跳远      False
2  王五  高二(1)   铅球       True
3  赵六  高二(3)  100米       True

表格形状: 4 行 × 4 列

各列数据类型:
姓名        object
班级        object
项目        object
是否有体检报告     bool
dtype: object`,
  chapter1_cleaning: `=== 原始脏数据 ===
    姓名      班级   年龄   项目
0  张三@#  高二(1)   16  100米
1   李四  高二(2)   17   跳远
2  王五*    None  999   铅球
3   李四  高二(2)   17   跳远
4   赵六  高二(3)   16  100米

=== 清洗后的干净数据 ===
   姓名      班级    年龄   项目
0  张三  高二(1)  16.0  100米
1  李四  高二(2)  17.0   跳远
2  王五    待确认   NaN   铅球
3  赵六  高二(3)  16.0  100米`,
  chapter2_plot: `图表已生成！在 Matplotlib 中运行此代码将显示柱状图。
最受欢迎的项目: 铅球 (45人)
总参与人次: 168`,
  chapter3_gui: `GUI 程序结构：
1. 创建窗口 → 2. 添加组件 → 3. 定义回调 → 4. 绑定按钮 → 5. 启动循环
run mainloop() 后会打开窗口并等待用户操作...`
};

let pyodideReadyPromise = null;

async function loadPyodide() {
  if (isReady) return;
  if (isLoading) {
    await pyodideReadyPromise;
    return;
  }
  isLoading = true;

  try {
    self.postMessage({ type: 'status', status: 'loading', progress: 5, message: '正在连接 Pyodide CDN...' });

    importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

    self.postMessage({ type: 'status', status: 'loading', progress: 20, message: 'Pyodide 核心加载完成，初始化解释器...' });

    pyodide = await loadPyodide();

    self.postMessage({ type: 'status', status: 'loading', progress: 50, message: '解释器就绪，加载 Pandas...' });

    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('pandas');

    self.postMessage({ type: 'status', status: 'loading', progress: 90, message: 'Pandas 加载完成，最终初始化...' });

    // 预加载常用库
    await pyodide.runPythonAsync(`
import pandas as pd
import numpy as np
import json
`);

    isReady = true;
    self.postMessage({ type: 'status', status: 'ready', progress: 100, message: 'Python 环境就绪' });
  } catch (error) {
    isLoading = false;
    isReady = false;
    self.postMessage({ type: 'status', status: 'error', progress: 0, message: error.message });
    throw error;
  }
}

// 启动时立即开始加载
pyodideReadyPromise = loadPyodide();

self.onmessage = async (event) => {
  const { id, pythonCode, action } = event.data;

  if (action === 'status') {
    self.postMessage({
      id,
      type: 'status',
      status: isReady ? 'ready' : (isLoading ? 'loading' : 'error'),
      progress: isReady ? 100 : 0
    });
    return;
  }

  if (action === 'run') {
    if (!isReady) {
      try {
        await pyodideReadyPromise;
      } catch (e) {
        self.postMessage({ id, error: 'Python 环境加载失败: ' + e.message, success: false });
        return;
      }
    }

    try {
      // 检查是否为预计算的示例代码
      const precomputedKey = event.data.precomputedKey;
      if (precomputedKey && precomputedResults[precomputedKey]) {
        const code = pythonCode.trim();
        const knownCode = {
          chapter1_series: `import pandas as pd\n\nprojects = pd.Series([35, 28, 45, 22, 38], index=['100米', '跳远', '铅球', '接力', '跳高'], name='报名人数')\nprint(projects)\nprint()\nprint(f'报名人数最多的项目: {projects.idxmax()}')\nprint(f'总报名人数: {projects.sum()}')`,
        };

        // 如果代码和预计算的一致，直接返回预计算结果
        if (knownCode[precomputedKey] && code === knownCode[precomputedKey]) {
          self.postMessage({ id, results: precomputedResults[precomputedKey], success: true, precomputed: true });
          return;
        }
      }

      const result = await pyodide.runPythonAsync(pythonCode);
      const output = result !== undefined && result !== null ? String(result) : '(执行成功，无返回值)';
      self.postMessage({ id, results: output, success: true });
    } catch (error) {
      self.postMessage({ id, error: error.message, success: false });
    }
  }
};
