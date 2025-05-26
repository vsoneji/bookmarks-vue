// Utility function to determine best contrast color (black or white) for a given background color
export function getContrastYIQ(hexcolor: string): string {
  hexcolor = hexcolor.replace('#', '');
  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split('').map(x => x + x).join('');
  }
  const r = parseInt(hexcolor.substr(0,2),16);
  const g = parseInt(hexcolor.substr(2,2),16);
  const b = parseInt(hexcolor.substr(4,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return yiq >= 160 ? '#222' : '#fff';
}

export const panelColors = [
  { name: 'Blue', value: '#3a8eff' },
  { name: 'Amber', value: '#ffb300' },
  { name: 'Red', value: '#e57373' },
  { name: 'Green', value: '#81c784' },
  { name: 'Purple', value: '#ba68c8' },
  { name: 'Yellow', value: '#ffd54f' },
  { name: 'Cyan', value: '#4dd0e1' },
  { name: 'Pink', value: '#f06292' },
  { name: 'Brown', value: '#a1887f' },
  { name: 'Slate', value: '#90a4ae' },
  { name: 'Charcoal', value: '#181c20' },
  { name: 'Dark Gray', value: '#353535' },
  { name: 'Pastel Blue', value: '#b3c7f7' },
  { name: 'Pastel Green', value: '#b2f7c1' },
  { name: 'Pastel Pink', value: '#f7b3d4' },
  { name: 'Pastel Yellow', value: '#f7f3b3' },
  { name: 'Pastel Purple', value: '#d6b3f7' },
  { name: 'Pastel Orange', value: '#ffd6b3' },
  { name: 'Pastel Teal', value: '#b3f7f3' },
  { name: 'Pastel Red', value: '#f7b3b3' },
  { name: 'Pastel Gray', value: '#e0e0e0' },
];
