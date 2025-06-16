<template>
  <div class="app">
    <div class="left-panel">
      <FolderTree
        :items="rootItems"
        :open-items="openItems"
        :selected-id="selectedItem?.id"
        @item-click="onItemClick"
      />
    </div>
    <div class="right-panel">
      <ul>
        <li v-for="child in selectedItem?.children ?? []" :key="child.id">
          {{ child.type === 'folder' ? '📁' : '📄' }} {{ child.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FolderTree from './components/FolderTree.vue'
import type { Item } from './types/item'
import { getRootFolders } from './api/itemService'

const rootItems = ref<Item[]>([])
const selectedItem = ref<Item | null>(null)
const openItems = ref(new Set<string>())

onMounted(async () => {
  const result = await getRootFolders()
  rootItems.value = result ?? []
})

async function onItemClick(item: Item) {
  selectedItem.value = item
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}

.app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel {
  width: 300px;
  padding: 1rem;
  background-color: black;
  border-right: 1px solid white;
  text-align: left; 
  color: white;
}

.right-panel {
  flex: 1;
  padding: 1rem;
  background-color: black;
  color: white;

  ul {
    list-style: none;
    padding-left: 0;
    text-align: left; 
    margin: 0;
  }

  li {
    padding: 4px 0;
    cursor: default;
  }
}
</style>