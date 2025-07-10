// journalEntry.js
// factory function to create all journal entries
export function createJournalEntry({
  title = '',
  tags = [],
  date = Date.now(),
  content = '',
} = {}) {
  return {
    id: `entry-${Date.now()}`,
    title: title.trim(),
    tags: Array.isArray(tags) ? tags : [],
    date,
    content: typeof content?.toJSON === 'function' ? content.toJSON() : content,
  }
}
