<template>
  <button
    :type="htmlType"
    :class="[
      'animal-btn',
      `animal-btn-${type}`,
      `animal-btn-${size}`,
      danger ? 'animal-btn-danger' : '',
      ghost ? 'animal-btn-ghost' : '',
      block ? 'animal-btn-block' : '',
      loading ? 'animal-btn-loading' : ''
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="icon && !loading" class="animal-btn-icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span v-if="$slots.default || loading">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['primary', 'default', 'dashed', 'text', 'link'].includes(v)
  },
  size: {
    type: String,
    default: 'middle',
    validator: (v) => ['small', 'middle', 'large'].includes(v)
  },
  danger: { type: Boolean, default: false },
  ghost: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  icon: { type: [Object, String], default: null },
  htmlType: { type: String, default: 'button' }
});
</script>