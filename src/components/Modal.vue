<template>
  <teleport to="body">
    <div v-if="open" class="animal-modal-overlay" @click="handleMaskClick">
      <div class="animal-modal-wrapper" :style="{ width: width + (typeof width === 'number' ? 'px' : '') }" @click.stop>
        <!-- Inline SVG clip-path -->
        <svg style="position: absolute; width: 0; height: 0" aria-hidden="true">
          <clipPath id="animal-modal-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.501,0.005 L0.501,0.005 L0.523,0.005 L0.549,0.006 C0.704,0.01,0.796,0.017,0.825,0.027 L0.827,0.028 C0.872,0.045,0.939,0.044,0.978,0.17 C1,0.254,1,0.365,0.99,0.505 L0.988,0.513 C0.979,0.558,0.971,0.598,0.965,0.633 C0.956,0.689,0.979,0.77,0.964,0.865 C0.953,0.928,0.921,0.966,0.869,0.979 C0.821,0.986,0.773,0.992,0.726,0.995 L0.712,0.996 L0.694,0.997 C0.648,1,0.586,1,0.507,1 L0.501,1 L0.464,1 C0.385,1,0.325,0.998,0.283,0.995 C0.234,0.992,0.184,0.987,0.133,0.979 C0.081,0.966,0.05,0.928,0.039,0.865 C0.023,0.77,0.047,0.689,0.037,0.633 C0.031,0.595,0.023,0.552,0.013,0.505 C-0.006,0.365,-0.002,0.254,0.024,0.17 C0.064,0.045,0.13,0.045,0.174,0.028 L0.175,0.028 C0.204,0.017,0.303,0.009,0.474,0.005 L0.501,0.005" />
          </clipPath>
        </svg>

        <div class="animal-modal-clipped">
          <div v-if="title" class="animal-modal-header">
            <div class="animal-modal-title">{{ title }}</div>
            <button class="animal-modal-close" @click="handleClose">×</button>
          </div>
          <div class="animal-modal-body">
            <slot></slot>
          </div>
          <div v-if="footer !== false" class="animal-modal-footer">
            <slot name="footer">
              <Button type="default" @click="handleClose">取消</Button>
              <Button type="primary" @click="handleOk">确定</Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: '' },
  width: { type: [Number, String], default: 520 },
  maskClosable: { type: Boolean, default: true },
  footer: { type: Boolean, default: true } // If false, hide footer
});

const emit = defineEmits(['close', 'ok', 'update:open']);

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose();
  }
};

const handleClose = () => {
  emit('update:open', false);
  emit('close');
};

const handleOk = () => {
  emit('ok');
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.open) {
    handleClose();
  }
};

watch(() => props.open, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  if (props.open) document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style>
.animal-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  animation: animal-fade-in 0.25s ease;
  padding: 20px;
}

.animal-modal-wrapper {
  position: relative;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  animation: animal-zoom-in 0.3s ease;
  filter: drop-shadow(0 12px 0 #e4dbc6) drop-shadow(var(--shadow-animal-lg));
}

.animal-modal-clipped {
  width: 100%;
  height: 100%;
  clip-path: url(#animal-modal-clip);
  padding: 48px 48px 32px 48px;
  background: rgb(247, 243, 223);
  color: rgb(128, 115, 89);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.animal-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
}

.animal-modal-title {
  font-size: 28px;
  font-weight: 700;
  color: rgba(114, 93, 66, 1);
}

.animal-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 22px;
  color: rgba(114, 93, 66, 0.6);
  border-radius: 50%;
  transition: all 0.2s;
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
}

.animal-modal-close:hover {
  background: rgba(114, 93, 66, 0.1);
  color: rgba(114, 93, 66, 1);
}

.animal-modal-body {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  color: #8a7b66;
}

.animal-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

@keyframes animal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes animal-zoom-in {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
</style>