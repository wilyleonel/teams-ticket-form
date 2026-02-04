// form.js - EN RAÍZ
document.addEventListener("DOMContentLoaded", function () {
  microsoftTeams.initialize();

  document
    .getElementById("ticketForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        prioridad: document.getElementById("prioridad").value,
        action: "createTicket",
      };

      microsoftTeams.tasks.submitTask(formData);
    });
});
