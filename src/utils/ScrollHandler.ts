export const scrollHandle = (e: any) => {
    e.preventDefault();
    let id = e.target.id;
    let position = document.getElementById('registerSection'); //removing extra last - (dash)
    window.location.href = "#" + id.slice(0, id.length - 1); // changing the url
    position && position.scrollIntoView({ behavior: 'smooth', block: 'start' }) //scrolling the page
   }