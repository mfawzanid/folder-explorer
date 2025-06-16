<template>
  <ul class="folder-list">
    <li v-for="folder in folders" :key="folder.id">
      <div
        class="folder-item"
        @click.stop="toggleFolder(folder)"
        :class="{ selected: folder.id === selectedId }"
      >
        📁 {{ folder.name }}
      </div>

      <FolderTree
        v-if="isOpen(folder.id)"
        :folders="folder.subfolders"
        :open-folders="openFolders"
        :selected-id="selectedId"
        @folder-click="$emit('folder-click', $event)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Folder {
  id: string
  name: string
  subfolders?: Folder[]
}

const props = defineProps<{
  folders: Folder[]
  openFolders?: Set<string>
  selectedId?: string
}>()

const emit = defineEmits<{
  (e: 'folder-click', folder: Folder): void
}>()

const openFolders = props.openFolders || ref(new Set<string>())

function toggleFolder(folder: Folder) {
  if (openFolders.has(folder.id)) {
    openFolders.delete(folder.id)
  } else {
    openFolders.add(folder.id)
  }

  emit('folder-click', folder)
}

function isOpen(id: string) {
  return openFolders.has(id)
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
</style>