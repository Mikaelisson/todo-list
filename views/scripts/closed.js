document.addEventListener("DOMContentLoaded", () => {

  let infoDiv = document.querySelector('.info-div');
  let footerAct = document.querySelector('.footer-act');
  let btn = document.querySelector(".closed-btn");

  btn.addEventListener("click", closedActive);
  footerAct.addEventListener("click", closedActive);
  
  function closedActive () {
    infoDiv.classList.toggle('desative');
    infoDiv.classList.toggle('act');
    console.log('click')
  }
});