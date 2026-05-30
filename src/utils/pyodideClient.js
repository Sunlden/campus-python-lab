export default class PyodideClient {
  constructor() {
    this.worker = new Worker(new URL('../workers/pyodide.worker.js', import.meta.url));
    this.callbacks = {};
    this.statusCallbacks = [];
    this._status = 'loading'; // loading | ready | error
    this._progress = 0;
    this._message = 'Python 环境加载中...';

    this.worker.onmessage = (event) => {
      const { id, type, ...data } = event.data;

      // Status updates from worker
      if (type === 'status') {
        this._status = data.status;
        this._progress = data.progress || 0;
        this._message = data.message || '';
        this.statusCallbacks.forEach(cb => cb({
          status: this._status,
          progress: this._progress,
          message: this._message
        }));
        return;
      }

      // Code execution results
      const callback = this.callbacks[id];
      if (callback) {
        if (data.error) {
          callback.reject(new Error(data.error));
        } else {
          callback.resolve(data.results);
        }
        delete this.callbacks[id];
      }
    };
  }

  get status() { return this._status; }
  get progress() { return this._progress; }
  get message() { return this._message; }
  get isReady() { return this._status === 'ready'; }

  onStatus(callback) {
    this.statusCallbacks.push(callback);
    // Immediately notify with current status
    callback({ status: this._status, progress: this._progress, message: this._message });
    return () => {
      const idx = this.statusCallbacks.indexOf(callback);
      if (idx >= 0) this.statusCallbacks.splice(idx, 1);
    };
  }

  runPython(code, precomputedKey = null) {
    return new Promise((resolve, reject) => {
      const id = Date.now() + Math.random().toString();
      this.callbacks[id] = { resolve, reject };
      this.worker.postMessage({
        id,
        action: 'run',
        pythonCode: code,
        precomputedKey
      });
    });
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
