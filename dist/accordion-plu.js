document.querySelectorAll(".toggle-btn").forEach(button => {
  button.addEventListener("click", function () {
    const parent = this.parentElement; // Obtener el elemento padre
    const content = this.nextElementSibling;
    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

    // Cerrar todos los acordeones antes de abrir el nuevo
    document.querySelectorAll(".accordion-content").forEach(item => {
      item.style.maxHeight = null;
      item.parentElement.classList.remove("accordion-selected");
      item.previousElementSibling.querySelector(".icon-open").classList.remove("hidden");
      item.previousElementSibling.querySelector(".icon-close").classList.add("hidden");
    });

    // Si el acordeón estaba cerrado, abrirlo
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      parent.classList.add("accordion-selected");
      this.querySelector(".icon-open").classList.add("hidden");
      this.querySelector(".icon-close").classList.remove("hidden");
    }
  });
});