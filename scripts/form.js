// scripts/form.js
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar Microsoft Teams SDK
  microsoftTeams.initialize(() => {
    console.log("Teams SDK inicializado");
  });

  // Referencias a elementos
  const form = document.getElementById("ticketForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const errorMessage = document.getElementById("errorMessage");

  // Manejar cancelar
  cancelBtn.addEventListener("click", function () {
    microsoftTeams.tasks.submitTask(null);
  });

  // Manejar envío del formulario
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    // Mostrar estado de carga
    submitBtn.disabled = true;
    submitText.style.display = "none";
    loadingSpinner.style.display = "inline-block";
    errorMessage.style.display = "none";

    try {
      // Recoger datos del formulario
      const formData = {
        titulo: document.getElementById("titulo").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        prioridad: document.getElementById("prioridad").value,
        categoria: document.getElementById("categoria").value || null,
      };

      console.log("Enviando datos al bot:", formData);

      // Enviar datos al bot de Azure
      microsoftTeams.tasks.submitTask(formData, "https://tu-dominio.com");
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      showError("Error al enviar el formulario. Intente nuevamente.");

      // Restaurar botón
      submitBtn.disabled = false;
      submitText.style.display = "inline-block";
      loadingSpinner.style.display = "none";
    }
  });

  // Función de validación
  function validateForm() {
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const prioridad = document.getElementById("prioridad").value;

    errorMessage.style.display = "none";

    if (!titulo) {
      showError("El título es requerido");
      document.getElementById("titulo").focus();
      return false;
    }

    if (titulo.length < 5) {
      showError("El título debe tener al menos 5 caracteres");
      document.getElementById("titulo").focus();
      return false;
    }

    if (!descripcion) {
      showError("La descripción es requerida");
      document.getElementById("descripcion").focus();
      return false;
    }

    if (descripcion.length < 10) {
      showError("La descripción debe tener al menos 10 caracteres");
      document.getElementById("descripcion").focus();
      return false;
    }

    if (!prioridad) {
      showError("Debe seleccionar una prioridad");
      document.getElementById("prioridad").focus();
      return false;
    }

    return true;
  }

  // Mostrar error
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    errorMessage.scrollIntoView({ behavior: "smooth" });
  }

  // Autoajustar altura del textarea
  const textarea = document.getElementById("descripcion");
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});
