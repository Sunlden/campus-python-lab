<script>
import { h, defineComponent, ref, watch, onMounted, onUnmounted, computed } from 'vue';

const countText = (vnodes) => {
  if (!vnodes) return 0;
  let total = 0;
  for (const node of vnodes) {
    if (typeof node === 'string' || typeof node === 'number') {
      total += String(node).length;
    } else if (node.children) {
      if (typeof node.children === 'string') {
        total += String(node.children).length;
      } else if (Array.isArray(node.children)) {
        total += countText(node.children);
      }
    } else if (Array.isArray(node)) {
      total += countText(node);
    }
  }
  return total;
};

const renderTruncated = (vnodes, state) => {
  if (state.stopped || !vnodes) return null;

  const result = [];
  for (const node of vnodes) {
    if (state.stopped) break;

    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node);
      if (state.remaining >= text.length) {
        state.remaining -= text.length;
        result.push(text);
      } else {
        const shown = text.slice(0, state.remaining);
        state.remaining = 0;
        state.stopped = true;
        result.push(shown);
      }
    } else {
      // It's a VNode
      const clonedNode = Object.assign({}, node);
      if (node.children) {
        if (typeof node.children === 'string') {
          const text = String(node.children);
          if (state.remaining >= text.length) {
            state.remaining -= text.length;
            clonedNode.children = text;
          } else {
            const shown = text.slice(0, state.remaining);
            state.remaining = 0;
            state.stopped = true;
            clonedNode.children = shown;
          }
        } else if (Array.isArray(node.children)) {
          clonedNode.children = renderTruncated(node.children, state);
        }
      }
      result.push(clonedNode);
    }
  }
  return result;
};

export default defineComponent({
  name: 'Typewriter',
  props: {
    speed: { type: Number, default: 90 },
    trigger: { type: [String, Number, Boolean] },
    autoPlay: { type: Boolean, default: true }
  },
  emits: ['done'],
  setup(props, { slots, emit }) {
    const count = ref(0);
    const total = ref(0);
    let timer = null;

    const startTyping = (nodes) => {
      if (timer) clearInterval(timer);
      const textLength = countText(nodes);
      total.value = textLength;

      if (!props.autoPlay) {
        count.value = textLength;
        return;
      }

      count.value = 0;
      if (textLength === 0) return;

      timer = setInterval(() => {
        if (count.value >= total.value) {
          clearInterval(timer);
          emit('done');
        } else {
          count.value++;
        }
      }, props.speed);
    };

    watch(() => props.trigger, () => {
      const nodes = slots.default ? slots.default() : [];
      startTyping(nodes);
    });

    onMounted(() => {
      const nodes = slots.default ? slots.default() : [];
      startTyping(nodes);
    });

    onUnmounted(() => {
      if (timer) clearInterval(timer);
    });

    return () => {
      const nodes = slots.default ? slots.default() : [];
      const state = { remaining: count.value, stopped: false };
      return h('span', renderTruncated(nodes, state));
    };
  }
});
</script>