export const scrollHandle = (e: any) => {
  e.preventDefault();
  let id = e.target.id;
  let position = document.getElementById('registerSection'); //removing extra last - (dash)
  position && position.scrollIntoView({ behavior: 'smooth', block: 'start' }) //scrolling the page
};
