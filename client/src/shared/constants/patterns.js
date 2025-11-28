export const PATTERNS = [
  { id: 1, title: 'Горошек' },
  { id: 2, title: 'Полосы' },
  { id: 3, title: 'Авторский' },
  { id: 4, title: 'Салют' },
];

export function getPatternTitle(id) {
  const found = PATTERNS.find(p => p.id === id);
  return found ? found.title : '-';
}
