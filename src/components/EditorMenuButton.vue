<script setup lang="ts">
  withDefaults(
    defineProps<{
      isActive?: boolean;
      isDisabled?: boolean;
    }>(),
    {
      isActive: false,
      isDisabled: false,
    }
  );

  defineEmits<{
    click: [event: MouseEvent];
  }>();
</script>

<template>
  <button
    class="rounded border border-gray-400 p-1 disabled:bg-slate-200 disabled:text-slate-400"
    :class="{ 'bg-emerald-500 text-gray-100': isActive, 'bg-white': !isActive }"
    :disabled="isDisabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
