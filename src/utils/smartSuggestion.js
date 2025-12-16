export function estimateTimeFromTitle(title = '') {
  title = (title || '').toLowerCase();
  if (!title) return null;
  if (title.includes('read') || title.includes('study') || title.includes('learn')) return '45 min';
  if (title.includes('bug') || title.includes('fix') || title.includes('debug')) return '30 min';
  if (title.includes('refactor') || title.includes('clean')) return '60 min';
  if (title.includes('deploy') || title.includes('setup') || title.includes('install')) return '40 min';
  if (title.includes('write') || title.includes('document')) return '25 min';
  return '30–45 min';
}
