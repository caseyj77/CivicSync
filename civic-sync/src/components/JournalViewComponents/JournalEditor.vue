<!-- JournalEditor.vue -->
<script setup>
import { ref } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { createJournalEntry } from '@/models/journalEntry'
import { useJournalStore } from '@/stores/journalStore'
import BaseButton from '../UI/BaseButton.vue'
import Placeholder from '@tiptap/extension-placeholder'

// ✅ Define the refs used in the template
const titleInput = ref('')
const selectedTags = ref('')

const editor = useEditor({
  extensions: [
    StarterKit,
    Highlight,
    Placeholder.configure({
      placeholder: 'Start your journal entries here',
    }),
  ],
  content: '',
})

const journalStore = useJournalStore()

function handleSubmit(event) {
  event?.preventDefault()

  if (!editor.value) return

  const newEntry = createJournalEntry({
    title: titleInput.value,
    tags: selectedTags.value.split(',').map((tag) => tag.trim()),
    content: editor.value.getJSON(),
  })

  journalStore.addEntry(newEntry)
}

function handleClearSubmit() {
  titleInput.value = ''
  selectedTags.value = ''
  editor.value.commands.clearContent()
}
</script>

<template>
  <div class="editor-wrapper">
    <!-- Toolbar -->
    <div class="toolbar">
      <button
        @click="editor?.chain().focus().toggleBold().run()"
        :class="{ active: editor?.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor?.chain().focus().toggleItalic().run()"
        :class="{ active: editor?.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ active: editor?.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor?.chain().focus().toggleHighlight().run()"
        :class="{ active: editor?.isActive('highlight') }"
      >
        Highlight
      </button>
    </div>
    <!-- Entry Title -->
    <input
      id="journal-title"
      type="text"
      v-model="titleInput"
      placeholder="Title your journal entry..."
      class="entry-title"
    />

    <!-- Tags Input -->
    <input
      id="journal-tags"
      type="text"
      v-model="selectedTags"
      placeholder="Add tags (e.g. freedom, economics)"
      class="entry-tags"
    />

    <!-- Tiptap Editor -->
    <editor-content :editor="editor" class="editor-content" />

    <div class="editor-footer">
      <!-- Submit Button -->
      <BaseButton variant="primary" @click="handleSubmit"> Save Entry </BaseButton>
      <BaseButton variant="secondary" @click="handleClearSubmit"> Clear Entry </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.editor-wrapper {
  border: 1px solid var(--color-muted);
  border-radius: var(--radius-base);
  padding: var(--space-md);
  background-color: #f5f1ed; /* soft neutral tone */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  color: var(--color-text);
  font-size: var(--font-base);
}

.toolbar {
  margin-bottom: var(--space-sm);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.toolbar button {
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-muted);
  background-color: var(--color-basic);
  color: var(--color-text);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toolbar button:hover {
  background-color: var(--color-secondary);
  color: var(--color-basic);
}

.toolbar button.active {
  background-color: var(--color-accent);
  color: var(--color-basic);
  font-weight: bold;
}

.editor-content {
  min-height: 200px;
  padding: var(--space-sm);
  background-color: var(--color-basic);
  border-top: 1px solid var(--color-muted);
  border-radius: var(--radius-sm);
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-top: var(--space-md);
}

:deep(.ProseMirror p.is-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-muted);
  pointer-events: none;
  height: 0;
  font-style: italic;
  opacity: 0.6;
}
</style>
