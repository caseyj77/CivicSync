<!-- JournalEditor.vue -->
<script setup>
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Highlight from '@tiptap/extension-highlight'

  const editor = useEditor({
    content: "<p>Start your journal entry here...</p>",
    extensions: [StarterKit, Highlight],
  })
</script>

<template>
  <div class="editor-wrapper">
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
        :class="{ active: editor?.isActive('highlight')}"
      >
        Highlight
      </button>
    </div>

    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>



<style scoped>
.editor-wrapper {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
}

.toolbar {
  margin-bottom: 0.5rem;
}

.toolbar button {
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid #aaa;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 4px;
}

.toolbar button.active {
  background-color: #d0d0d0;
  font-weight: bold;
}

.editor-content {
  min-height: 200px;
}
</style>