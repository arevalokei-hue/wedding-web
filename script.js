document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================
  // 1. TRANSICIONES AL HACER SCROLL (Fade-in)
  // =========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  // Configuramos el observador para que actúe cuando el 15% del elemento sea visible
  const observerOptions = {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Dejamos de observar para ahorrar recursos
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));


  // =========================================
  // 2. SISTEMA DE PARTÍCULAS: HOJAS DE OTOÑO
  // =========================================
  const leavesContainer = document.getElementById('leaves-container');
  
  // Colores extraídos de tu diseño otoñal
  const leafColors = ['#DE6B21', '#6D0F14', '#C89F73', '#8A3B22']; 

function createLeaf() {
    if (!leavesContainer) return;

    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    
    // Inyectamos el dibujo de la hoja de maple (SVG)
    leaf.innerHTML = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M495.8 226.7c-9-12.1-26.6-14-38.3-4.1l-47.5 40.2c-7-25-16.2-74-16.2-74-1.6-11.1-11.1-19.4-22.4-19.4-4.8 0-9.4 1.5-13.3 4.3l-45.6 33.1-23.7-111.4c-2.3-10.9-11.8-18.7-23-18.7-11.1 0-20.7 7.8-23 18.7L219 206.8l-45.6-33.1c-3.9-2.8-8.5-4.3-13.3-4.3-11.3 0-20.8 8.3-22.4 19.4 0 0-9.2 49-16.2 74l-47.5-40.2c-11.8-10-29.4-8-38.3 4.1-8.2 11.2-6.5 27.2 3.8 36.3l61.2 53.6c-20 8.3-51.5 19.1-51.5 19.1-10.5 3.9-16.5 15.3-13.6 26.2 2.6 9.8 11.6 16.3 21.6 16.3 2.9 0 5.8-.6 8.5-1.7l64.1-25.1c4.5 12.6 12 28.5 12 28.5 4.3 9.2 13.6 15 23.8 15 5.5 0 10.9-1.9 15.3-5.4L240 338.9v82.7c0 11.3 9.2 20.4 20.4 20.4s20.4-9.2 20.4-20.4v-82.7l39.1 34.5c4.4 3.5 9.8 5.4 15.3 5.4 10.2 0 19.5-5.8 23.8-15 0 0 7.5-15.9 12-28.5l64.1 25.1c2.7 1.1 5.6 1.7 8.5 1.7 10 0 19-6.5 21.6-16.3 2.9-10.9-3.1-22.3-13.6-26.2 0 0-31.5-10.8-51.5-19.1l61.2-53.6c10.3-9.1 12-25.1 3.8-36.3z"/></svg>`;

    // Posición inicial aleatoria
    leaf.style.left = Math.random() * 100 + 'vw';
    
    const scaleX = Math.random() * 0.5 + 0.8; // Entre 0.8 y 1.3
    const scaleY = Math.random() * 0.5 + 0.8; 
    const baseSize = Math.random() * 12 + 15; // Tamaño base más grande (15px a 27px)
    
    leaf.style.width = baseSize + 'px';
    leaf.style.height = baseSize + 'px';
    // ¡Ojo aquí! Ahora aplicamos el color directo al texto (color) para que pinte el SVG
    leaf.style.color = leafColors[Math.floor(Math.random() * leafColors.length)];
    
    // Duración y retraso
    leaf.style.animationDuration = Math.random() * 6 + 6 + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';

    leavesContainer.appendChild(leaf);

    setTimeout(() => {
      leaf.remove();
    }, 14000); 
  }
  // Crear una ráfaga inicial de hojas
  for (let i = 0; i < 15; i++) {
    createLeaf();
  }

  // Seguir creando hojas intermitentemente sin saturar el navegador
  setInterval(createLeaf, 1500);

});

// =========================================
  // 3. EFECTO DE ESCRITURA (NUESTRA HISTORIA)
  // =========================================
  // Puedes cambiar este texto por su historia real
  const textToType = "Todo comenzó con una coincidencia y se convirtió en nuestra mejor certeza. Hoy, queremos que sean testigos del inicio de nuestro 'para siempre'.";
  const typewriterElement = document.getElementById('typewriter-text');
  let i = 0;
  let isTypingStarted = false;

  function typeWriter() {
    if (i < textToType.length) {
      typewriterElement.innerHTML += textToType.charAt(i);
      i++;
      // La velocidad varía ligeramente para simular escritura humana
      setTimeout(typeWriter, Math.random() * 40 + 40); 
    } else {
      // Ocultamos el cursor parpadeante al terminar
      document.querySelector('.cursor').style.opacity = '0'; 
    }
  }

  // Usamos un observador para que la animación empiece SOLO cuando el usuario baje a verla
  const storySection = document.querySelector('.historia');
  
  if (storySection) {
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTypingStarted) {
          isTypingStarted = true;
          setTimeout(typeWriter, 600); // Pequeño suspenso de medio segundo antes de escribir
        }
      });
    }, { threshold: 0.6 }); // Se activa cuando el 60% de la tarjeta es visible

    storyObserver.observe(storySection);
  }


const invitadosData = [
  { 'nombre': 'Diego Mayorga','mensaje': 'Diego y Familia','cantidadCupos': '3'},
  { 'nombre': 'Angela Ciendua','mensaje': 'Angela y Familia','cantidadCupos': '3'},
  { 'nombre': 'Ana Castro','mensaje': 'Ana y Carlos','cantidadCupos': '2'},
  { 'nombre': 'Zulma Ciendua','mensaje': 'Zulma y Familia','cantidadCupos': '3'},
  { 'nombre': 'Elver Ciendua','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Lina Alvarez','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Andrea Rodriguez','mensaje': 'Andrea e Italo','cantidadCupos': '2'},
  { 'nombre': 'David Eduardo Caicedo Rodriguez','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'David Alexander Rodriguez Alvarez','mensaje': 'Alexander y Gloria','cantidadCupos': '2'},
  { 'nombre': 'Amalie Henrichsen','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Abel Orlando Rodriguez Alvarez','mensaje': 'Orlando y Hector','cantidadCupos': '2'},
  { 'nombre': 'Paula Orjuela','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Sebastian Cortes','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Brayan Alfonso','mensaje': 'Brayan y Sofia','cantidadCupos': '2'},
  { 'nombre': 'Laura Tatiana Barrera','mensaje': 'Laura y Carlos','cantidadCupos': '2'},
  { 'nombre': 'Gabriela Muñoz','mensaje': 'Gabriela y Andres','cantidadCupos': '2'},
  { 'nombre': 'Tania Alejandra  Lopez','mensaje': 'Tania y Jorge','cantidadCupos': '2'},
  { 'nombre': 'Katalina Muñoz','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Catalina Nuñez','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Tiffany Zabaleta','mensaje': 'Tiffany y Sergio','cantidadCupos': '2'},
  { 'nombre': 'Giovanny Avellaneda','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Alejandro Avellaneda','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Luz Marina Rodriguez Alvarez','mensaje': 'Luz Marina y Carlos Andres','cantidadCupos': '2'},
  { 'nombre': 'Pablina Perez','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Maria Eugenia Rodriguez','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Juan Carlos Arevalo Joya','mensaje': 'Juan Carlos e Hijas','cantidadCupos': '3'},
  { 'nombre': 'Oscar Santiago Arevalo','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Luz Marina Rodriguez Perez','mensaje': 'Luz Marina y Luis Bello','cantidadCupos': '2'},
  { 'nombre': 'Jhon Jairo Bello Rodriguez','mensaje': 'Jhon y Nohorida','cantidadCupos': '2'},
  { 'nombre': 'Yeisson Bello Rodriguez','mensaje': 'Yeison y Familia','cantidadCupos': '5'},
  { 'nombre': 'Luz Ricaurte Rodriguez','mensaje': 'Luz Ricaurte Rodriguez','cantidadCupos': '1'},
  { 'nombre': 'Marta Rodriguez Perez','mensaje': 'Marta y Pascual','cantidadCupos': '2'},
  { 'nombre': 'Natalia Univio Rodriguez','mensaje': 'Natalia y Familia','cantidadCupos': '4'},
  { 'nombre': 'Angela Maria Vega','mensaje': 'Angela Maria y Familia','cantidadCupos': '4'},
  { 'nombre': 'Yanet Rodriguez Perez','mensaje': 'Yanet y Fredy','cantidadCupos': '2'},
  { 'nombre': 'Angie Rodriguez','mensaje': 'Angie y Mathias','cantidadCupos': '2'},
  { 'nombre': 'Fernanda Rodriguez','mensaje': 'Fernanda y Familia','cantidadCupos': '3'},
  { 'nombre': 'Laura Viviana Rodriguez','mensaje': 'Viviana e Hijos','cantidadCupos': '3'},
  { 'nombre': 'Jorge Alexander Sierra','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Catalina Galeano','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Ivan Andres Chaparro','mensaje': 'Andres','cantidadCupos': '1'},
  { 'nombre': 'Esteban Zamudio','mensaje': 'Esteban y Patricia','cantidadCupos': '2'},
  { 'nombre': 'Felipe Chaparro','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Fabian Castro','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Sebastian Barrera','mensaje': 'Sebastian y Paola','cantidadCupos': '2'},
  { 'nombre': 'Luis Patron Diaz','mensaje': 'El Patron','cantidadCupos': '1'},
  { 'nombre': 'Luis Miguel Morales','mensaje': 'Piggy(Poggy)','cantidadCupos': '1'},
  { 'nombre': 'Brayan Calderon','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Andres Colmenares','mensaje': '','cantidadCupos': '1'},
  { 'nombre': 'Juan Carlos Diaz','mensaje': 'Juan Carlos y Familia','cantidadCupos': '3'},
  { 'nombre': 'Camilo Andres Martinez Joya','mensaje': 'Camilo e Hijos','cantidadCupos': '4'},
  { 'nombre': 'Elby Carolina Rodriguez Joya','mensaje': 'Abuelo Oscar, Carolina y Familia','cantidadCupos': '4'},
];

const targetDate = new Date("2026-10-31T15:30:00-05:00");

const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

const form = document.getElementById("rsvpForm");
const guestNameInput = document.getElementById("guestName");
const guestHint = document.getElementById("guestHint");
const welcomeCard = document.getElementById("welcomeCard");
const welcomeCardText = document.getElementById("welcomeCardText");
const suggestions = document.getElementById("suggestions");
const attendanceStep = document.getElementById("attendanceStep");
const yesStep = document.getElementById("yesStep");
const declineMessage = document.getElementById("declineMessage");
const slotsInfo = document.getElementById("slotsInfo");
const principalGuestName = document.getElementById("principalGuestName");
const guestListContainer = document.getElementById("guestListContainer");
const addGuestBtn = document.getElementById("addGuestBtn");
const slotsCompleteMsg = document.getElementById("slotsCompleteMsg");

let selectedGuest = null;
let guestCounter = 0;

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEls.days.textContent = "00";
    countdownEls.hours.textContent = "00";
    countdownEls.minutes.textContent = "00";
    countdownEls.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function findGuestsByQuery(query) {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) {
    return [];
  }

  return invitadosData.filter((guest) =>
    normalizeText(guest.nombre).includes(cleanQuery)
  );
}

function resetAttendance() {
  const checked = form.querySelector("input[name='attendance']:checked");
  if (checked) checked.checked = false;
  
  attendanceStep.classList.add("hidden");
  yesStep.classList.add("hidden");
  declineMessage.classList.add("hidden");
  welcomeCard.classList.add("hidden"); // Ocultar tarjeta
  guestHint.classList.remove("hidden"); // Mostrar pista original
  clearAdditionalGuestEntries();
  slotsCompleteMsg.classList.add("hidden");
}

function selectGuest(guest) {
  selectedGuest = guest;
  guestNameInput.value = guest.nombre;
  suggestions.innerHTML = "";
  // === ESTA LÍNEA SE USA PARA REINICIAR EL TÍTULO ===
  welcomeCard.querySelector("h3").textContent = "¡Estás Invitado!";
  // Mostrar el mensaje bonito en la nueva tarjeta
  if (guest.mensaje && guest.mensaje.trim() !== "") {
    welcomeCardText.textContent = `${guest.mensaje}`;
  } else {
    welcomeCardText.textContent = `${guest.nombre}`;
  }
  
  guestHint.classList.add("hidden");
  welcomeCard.classList.remove("hidden");
  
  attendanceStep.classList.remove("hidden");
  yesStep.classList.add("hidden");
  declineMessage.classList.add("hidden");
}

function clearAdditionalGuestEntries() {
  const entries = guestListContainer.querySelectorAll(".guest-entry");
  entries.forEach((entry) => entry.remove());
}

function updateSlotsCounter() {
  const totalCupos = Number(selectedGuest.cantidadCupos) || 0;
  const usadosCupos = 1 + guestCounter; // 1 (principal) + acompañantes
  const disponibles = Math.max(totalCupos - usadosCupos, 0);

  slotsInfo.innerHTML = `
    <strong>Cupos Totales:</strong> ${totalCupos} <br>
    <strong>Cupos Usados:</strong> ${usadosCupos}
  `;

  addGuestBtn.disabled = disponibles <= 0;
  slotsCompleteMsg.classList.toggle("hidden", disponibles <= 0);
}

function buildGuestInput() {
  const wrapper = document.createElement("div");
  wrapper.className = "guest-entry";
  
  guestCounter++;

  const input = document.createElement("input");
  input.type = "text";
  input.required = true;
  input.name = `acompanante_${guestCounter}`;
  input.placeholder = `Nombre del acompañante ${guestCounter}`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-guest-btn";
  removeBtn.textContent = "X";
  removeBtn.title = "Eliminar acompañante";
  
  removeBtn.addEventListener("click", () => {
    guestCounter--;
    wrapper.remove();
    updateSlotsCounter();
  });

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);
  guestListContainer.appendChild(wrapper);
}

function renderSuggestions(matches) {
  suggestions.innerHTML = "";
  matches.slice(0, 5).forEach((guest) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = guest.nombre;
    button.addEventListener("click", () => selectGuest(guest));
    item.appendChild(button);
    suggestions.appendChild(item);
  });
}

guestNameInput.addEventListener("input", (event) => {
  selectedGuest = null;
  resetAttendance();

  const query = event.target.value;
  const matches = findGuestsByQuery(query);

  if (!query.trim()) {
    guestHint.textContent = "Busca por nombre o apellido (ej. Diego).";
    suggestions.innerHTML = "";
    return;
  }

  if (matches.length === 0) {
    guestHint.textContent = "No encontramos ese nombre. Verifica e intenta de nuevo.";
    suggestions.innerHTML = "";
    return;
  }

  guestHint.textContent = "Selecciona tu nombre en la lista:";
  renderSuggestions(matches);
});

form.addEventListener("change", (event) => {
  if (event.target.name !== "attendance" || !selectedGuest) return;

  if (event.target.value === "si") {
    guestCounter = 0;
    clearAdditionalGuestEntries();
    principalGuestName.textContent = `${selectedGuest.nombre} (Principal)`;
    updateSlotsCounter();
    yesStep.classList.remove("hidden");
    declineMessage.classList.add("hidden");
  } else {
    yesStep.classList.add("hidden");
    declineMessage.classList.remove("hidden");
  }
});

// Listener del nuevo botón unificado
addGuestBtn.addEventListener("click", () => {
  const totalCupos = Number(selectedGuest.cantidadCupos) || 0;
  if (1 + guestCounter >= totalCupos) return; 
  
  buildGuestInput();
  updateSlotsCounter();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedGuest) {
    // Intentamos adivinar el nombre más similar
    const query = guestNameInput.value;
    const bestMatch = findBestMatch(query);

    if (bestMatch) {
      // Le pedimos al usuario que confirme si es él mediante un popup nativo
      const confirmed = window.confirm(`¿Buscabas a ${bestMatch.nombre}? Haz clic en Aceptar para seleccionarlo.`);
      
      if (confirmed) {
        selectGuest(bestMatch);
        guestHint.textContent = "¡Nombre seleccionado! Por favor, continúa marcando si asistirás.";
        guestHint.classList.remove("hidden");
        return; // Detenemos el envío final para que puedan llenar la asistencia
      }
    }

    // Si no encontró coincidencias o si el usuario le dio "Cancelar" a la alerta
    guestHint.innerHTML = "Intente probando con uno de sus nombres nuevamente y seleccionando de la lista que aparece justo debajo del recuadro.";
    guestHint.style.color = "#6D0F14"; // Tono vino tinto de tu diseño para que resalte el error
    guestHint.style.fontWeight = "600";
    guestHint.classList.remove("hidden");
    return;
  }

  // --- EL RESTO DE TU CÓDIGO QUEDA IGUAL A PARTIR DE AQUÍ ---
  const attendance = form.querySelector("input[name='attendance']:checked");
  if (!attendance) return;

  if (attendance.value === "si") {
    const allCompanionInputs = [...guestListContainer.querySelectorAll(".guest-entry input")];
    const hasEmptyCompanionName = allCompanionInputs.some((input) => !input.value.trim());
    if (hasEmptyCompanionName) {
      alert("Completa o elimina los acompañantes agregados antes de confirmar.");
      return;
    }
  }

  const companionEntries = [...guestListContainer.querySelectorAll(".guest-entry")];
  const companions = companionEntries.map((entry) => entry.querySelector("input").value.trim());

  const totalConfirmados = attendance.value === "si" ? 1 + companions.length : 0;

const payload = {
    invitado: selectedGuest.nombre,
    asistira: attendance.value === "si",
    totalConfirmados: totalConfirmados,
    acompanantes: companions,
    restriccionesAlimentarias: document.getElementById("foodRestrictions").value.trim(),
    mensaje: document.getElementById("message").value.trim()
  };

  console.log("RSVP listo para enviar:", payload);

  // Cambiamos el texto del botón mientras envía
  const submitBtn = document.getElementById("submitBtn");
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  // REEMPLAZA ESTA URL POR LA QUE COPIASTE EN EL PASO 3
  const GOOGLE_APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyaFqWdN-Q0a45qiA0l9Frg4dJItHDemqEw4V6e6lK-DNoFlrtB0FsPuAudLV58kno-kg/exec";

  fetch(GOOGLE_APP_SCRIPT_URL, {
    method: "POST",
    // Esta configuración evita problemas de CORS en algunos navegadores
    mode: "no-cors", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    // Cambiamos el texto de la tarjeta bonita para dar las gracias
    welcomeCard.querySelector("h3").textContent = "¡Respuesta Registrada!";
    welcomeCardText.textContent = "¡Gracias por confirmar!";
    
    // Ocultamos el resto del formulario
    attendanceStep.classList.add("hidden");
    yesStep.classList.add("hidden");
    declineMessage.classList.add("hidden");
  })
  .catch((error) => {
    console.error("Error al enviar:", error);
    alert("Hubo un error al enviar tu respuesta. Por favor intenta de nuevo.");
  })
  .finally(() => {
    // Restauramos el botón
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  });
});

// =========================================
// 4. INICIALIZACIÓN DE LA GALERÍA (SWIPER)
// =========================================
const swiper = new Swiper('.story-gallery', {
  direction: 'horizontal',
  loop: true, 
  grabCursor: true, 

  autoplay: {
    // 1. AUMENTAMOS EL TIEMPO: Cambiamos 3000 por 5000 (5 segundos por foto)
    delay: 4000, 
    disableOnInteraction: false, 
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
  },
  speed: 800, 
});

// 2. DETENEMOS LA GALERÍA al cargar la página
swiper.autoplay.stop();

// 3. OBSERVADOR: Espera a que la galería sea visible en pantalla
const gallerySection = document.querySelector('.story-gallery');

if (gallerySection) {
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Cuando al menos la mitad de la galería se ve en pantalla, arranca
        swiper.autoplay.start();
      } else {
        // Opcional y muy optimizado: si el usuario sigue bajando y la galería desaparece, se pausa
        swiper.autoplay.stop();
      }
    });
  }, { threshold: 0.5 }); // 0.5 significa que debe verse el 50% de la foto para activar

  galleryObserver.observe(gallerySection);
}

// =========================================
// NUEVAS FUNCIONES: BÚSQUEDA DEL NOMBRE MÁS SIMILAR
// =========================================

// Algoritmo para medir cuántos "errores" o diferencias hay entre dos textos
function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function findBestMatch(query) {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return null;

  // 1. Intentar buscar coincidencia directa/parcial primero
  const directMatches = findGuestsByQuery(query);
  if (directMatches.length > 0) {
    return directMatches[0]; // Retorna la mejor coincidencia directa
  }

  // 2. Si no hay coincidencia directa, buscar el más similar
  let bestMatch = null;
  let minDistance = Infinity;

  invitadosData.forEach(guest => {
    const guestName = normalizeText(guest.nombre);
    const distance = levenshtein(cleanQuery, guestName);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = guest;
    }
  });

  // Si la diferencia es razonable (ej. máximo 5-6 errores de tipeo), lo sugerimos
  if (minDistance <= 6) {
    return bestMatch;
  }

  return null;
}

updateCountdown();
setInterval(updateCountdown, 1000);
