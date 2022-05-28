export default function sortDate(a, b) {
  a = new Date(a.date).getTime() * 1000;
  b = new Date(b.date).getTime() * 1000;
  return a < b ? 1 : -1;
}
