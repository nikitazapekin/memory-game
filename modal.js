const modal = document.querySelector(".modal")
const modalBtn = document.querySelector(".modal__btn")
const modalInner = document.querySelector(".modal__inner")
const modalOverlay = document.querySelector(".modal__overlay")
modalBtn.addEventListener("click", ()=>{
modalInner.style.transform = "translateX(200%)"
modalOverlay.style.opacity = "0"
modal.style.zIndex = "-1"
})