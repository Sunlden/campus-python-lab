<template>
  <div :class="['animal-card', `animal-card-${type}`, color !== 'default' ? `animal-card-${color}` : '']" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'title', 'dashed'].includes(v)
  },
  color: {
    type: String,
    default: 'default',
    validator: (v) => [
      'default', 'app-pink', 'purple', 'app-blue', 'app-yellow', 'app-orange',
      'app-teal', 'app-green', 'app-red', 'lime-green', 'yellow-green', 'brown', 'warm-peach-pink'
    ].includes(v)
  }
});
</script>

<style>
/* Card Styles */
.animal-card {
  border-radius: 20px;
  background: rgb(247, 243, 223);
  padding: 16px 24px;
  color: #725d42;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 4px solid var(--color-animal-border-light);
  box-shadow: 0 8px 0 0 #e4dbc6, var(--shadow-animal-base);
}

.animal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 0 0 #e4dbc6, var(--shadow-animal-lg);
}

.animal-card-title {
  background: #fdfdf5;
  border-radius: 40px 35px 45px 38px / 38px 45px 35px 40px;
  padding: 12px 32px;
  font-weight: 600;
  border: 4px solid var(--color-animal-border-light);
  box-shadow: 0 8px 0 0 #e4dbc6;
}

.animal-card-dashed {
  background: rgb(250, 248, 242);
  border: 2px dashed #e8dcc8;
  box-shadow: none;
  border-radius: 20px;
}
.animal-card-dashed:hover {
  transform: none;
  border-color: #d4c4a8;
  box-shadow: none;
}

/* Colors */
.animal-card-app-pink { background: #f8a6b2; color: #fff; border-color: #f8a6b2; box-shadow: 0 8px 0 0 #e096a1; }
.animal-card-purple { background: #b77dee; color: #fff; border-color: #b77dee; box-shadow: 0 8px 0 0 #a571d6; }
.animal-card-app-blue { background: #889df0; color: #fff; border-color: #889df0; box-shadow: 0 8px 0 0 #7a8dd8; }
.animal-card-app-yellow { background: #f7cd67; color: #725d42; border-color: #f7cd67; box-shadow: 0 8px 0 0 #dfb95d; }
.animal-card-app-orange { background: #e59266; color: #fff; border-color: #e59266; box-shadow: 0 8px 0 0 #ce835c; }
.animal-card-app-teal { background: #82d5bb; color: #fff; border-color: #82d5bb; box-shadow: 0 8px 0 0 #75c0a8; }
.animal-card-app-green { background: #8ac68a; color: #fff; border-color: #8ac68a; box-shadow: 0 8px 0 0 #7cb27c; }
.animal-card-app-red { background: #fc736d; color: #fff; border-color: #fc736d; box-shadow: 0 8px 0 0 #e36762; }
.animal-card-lime-green { background: #d1da49; color: #3d5a1a; border-color: #d1da49; box-shadow: 0 8px 0 0 #bcc442; }
.animal-card-yellow-green { background: #ecdf52; color: #725d42; border-color: #ecdf52; box-shadow: 0 8px 0 0 #d4c84a; }
.animal-card-brown { background: #9a835a; color: #fff; border-color: #9a835a; box-shadow: 0 8px 0 0 #8a7651; }
.animal-card-warm-peach-pink { background: #e18c6f; color: #fff; border-color: #e18c6f; box-shadow: 0 8px 0 0 #cb7e64; }
</style>