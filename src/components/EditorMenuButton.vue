<script setup lang="ts">
  import vTippy from "@/directives/tippy";
  withDefaults(
    defineProps<{
      isActive?: boolean;
      isDisabled?: boolean;
      tooltip?: string;
    }>(),
    {
      isActive: false,
      isDisabled: false,
      tooltip: undefined,
    }
  );

  defineEmits<{
    click: [event: MouseEvent];
  }>();
</script>

<template>
  <button
    v-tippy="tooltip"
    class="rounded border border-gray-400 p-1 disabled:bg-slate-200 disabled:text-slate-400"
    :class="{ 'bg-emerald-500 text-gray-100': isActive, 'bg-white': !isActive }"
    :disabled="isDisabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
