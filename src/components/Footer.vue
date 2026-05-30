<template>
  <div :class="['animal-footer', `animal-footer-${type}`]" v-bind="$attrs"></div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'tree',
    validator: (v) => ['sea', 'tree'].includes(v)
  }
});
</script>

<style scoped>
.animal-footer {
  width: 100%;
  height: 80px;
}

.animal-footer-sea {
  background: url('/animal-assets/footer/footer-sea.svg') center / contain no-repeat;
}

.animal-footer-tree {
  background-image: url('/animal-assets/footer/footer-tree.webp');
  background-size: cover;
  background-position: bottom center;
}
</style>