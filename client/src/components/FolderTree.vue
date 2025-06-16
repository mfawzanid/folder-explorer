<template>
  <ul class="item-list">
    <li v-for="item in items.filter(i => i.type === 'folder')" :key="item.id">
      <div
        class="item"
        @click.stop="toggleItem(item)"
        :class="{ selected: item.id === selectedId }"
      >
        <span v-if="item.type === 'folder'">📁</span>
        <span v-else>📄</span>
        {{ item.name }}
      </div>

      <FolderTree
        v-if="item.type === 'folder' && isOpen(item.id)"
        :items="item.children ?? []"
        :open-items="openItems"
        :selected-id="selectedId"
        @item-click="$emit('item-click', $event)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Item } from '../types/item'
import { getItemById } from '../api/itemService'

const props = defineProps<{
  items: Item[]
  openItems?: Set<string>
  selectedId?: string
}>()

const emit = defineEmits<{
  (e: 'item-click', item: Item): void
}>()

const openItems = props.openItems || new Set<string>()

async function toggleItem(item: Item) {
  if (item.type === 'file') {
    emit('item-click', item)
    return
  }

  if (openItems.has(item.id)) {
    openItems.delete(item.id)
  } else {
    openItems.add(item.id)

    if (!item.children || item.children.length === 0) {
      const result = await getItemById(item.id)
      item.children = result.children || []
    }
  }

  emit('item-click', item)
}

function isOpen(id: string) {
  return openItems.has(id)
}
</script>

<style scoped>
.folder-list {
  list-style: none;
  padding-left: 16px;
  margin: 0;
}

.folder-item {
  cursor: pointer;
  padding: 4px 0;
}

.selected {
  font-weight: bold;
  color: white;
  background: #4EABED;
}

ul {
  list-style: none;
  padding-left: 16px;
  margin: 0;
}
</style>