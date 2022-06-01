const btn = document.querySelector('#btn');
let windowWidth = document.documentElement.clientWidth;
let windowHeight = document.documentElement.clientHeight;

btn.addEventListener("click", () => {
   // let windowWidth = document.documentElement.clientWidth;
   // let windowHeight = document.documentElement.clientHeight;
    alert(`Ширина экрана: ${windowWidth}px. 
Высота экрана: ${windowHeight}px.`);
})