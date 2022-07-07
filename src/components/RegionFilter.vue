<template>
  <!-- Region filter component -->
  <div class="w-[200px]">
    <!-- Selected item -->
    <div
      class="bg-white rounded-[5px] relative text-very-dark-blue-b
      text-[0.75em] shadow-[0_2px_9px_rgba(0,0,0,0.053)] mb-[4px] px-[24px] py-[14px]"
      @click="toggleItemsList()"
    >
      <FilterIcon
        class="absolute right-[19px] top-[50%] translate-y-[-50%]"
        :class="isItemsListOpen ? 'rotate-180' : ''"
      />

      {{ selectedItem === '' ? 'Filter by Region' : selectedItem }}
    </div>

    <!-- Filter items container -->
    <div
      v-if="isItemsListOpen"
      class="bg-white shadow-[0_2px_9px_rgba(0,0,0,0.053)] px-[24px] py-[16px] rounded-[5px]"
    >
      <div
        v-for="item in itemsList"
        :key="item"
        class="text-[0.75em] mb-[8px] last:mb-0"
        @click="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FilterIcon from '@/components/icons/FilterIcon.vue';

/* Props declaration */
defineProps({
  itemsList: {
    type: Array,
    default: () => ['itemA', 'itemB', 'itemC'],
  },
});

/* Emits declaration */
const emit = defineEmits(['region-filter']);

/* Selected item */
const selectedItem = ref('');

/* Items list active status */
const isItemsListOpen = ref(false);

/* Set new selected item */
const selectItem = (newSelectedItem) => {
  selectedItem.value = newSelectedItem;
  emit('region-filter', selectedItem.value);
};

/* Turn on or turn off items list */
const toggleItemsList = () => { isItemsListOpen.value = !isItemsListOpen.value; };
</script>
