<template>
  <!-- Region filter component -->
  <div class="w-[200px] cursor-pointer">
    <!-- Selected item -->
    <div
      class="bg-white rounded-[5px] md:h-[56px] flex items-center relative text-very-dark-blue-b
      md:text-[0.875rem] text-[0.75rem] shadow-[0_2px_9px_rgba(0,0,0,0.053)] mb-[4px]
      px-[24px] py-[14px] dark:bg-dark-blue dark:text-white"
      data-test="selected-region"
      @click="toggleItemsList()"
    >
      <FilterIcon
        class="absolute right-[19px] top-[50%] translate-y-[-50%] md:w-[12px]
        md:h-[12px] md:right-[22px]"
        :class="isItemsListOpen ? 'rotate-180' : ''"
      />

      {{ selectedItem === '' ? 'Filter by Region' : selectedItem }}
    </div>

    <!-- Filter items container -->
    <div
      v-if="isItemsListOpen"
      class="bg-white shadow-[0_2px_9px_rgba(0,0,0,0.053)] px-[24px] py-[16px] md:py-[18px]
      rounded-[5px] absolute w-[200px] dark:bg-dark-blue dark:text-white"
      data-test="filter-items-wrapper"
    >
      <div
        v-for="item in itemsList"
        :key="item"
        class="text-[0.75rem] mb-[8px] last:mb-0 md:text-[0.875rem]"
        data-test="filter-item"
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
  isItemsListOpen.value = false;
};

/* Turn on or turn off items list */
const toggleItemsList = () => { isItemsListOpen.value = !isItemsListOpen.value; };
</script>
