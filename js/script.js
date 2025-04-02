/*////////////////////////////////////////////////////// PRELOADER /////////////////////////////////////////////////////////////////////*/
window.addEventListener("load", function() {
    var preloader = document.getElementById("onload");
    var contenido = document.getElementById("contenido");
    document.body.classList.remove("no-scroll"); // Habilita el scroll después de la carga

    preloader.classList.add("hidden"); // Oculta el preloader con animación
    setTimeout(() => {
        preloader.style.display = "none"; // Lo elimina después de la animación
        contenido.style.display = "block"; // Muestra el contenido
    }, 2000);
});

// Evitar el scroll cuando el preloader está activo
document.body.classList.add("no-scroll");





/*/////////////////////////////////////////////////////// NAV-DROP /////////////////////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const dropdownBtn = document.querySelector('.dropdown-btn');

    // Menú hamburguesa
    mobileMenu.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    // Submenú al hacer clic
    dropdownBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Evita que el enlace redirija
        const dropdown = this.closest('.dropdown');
        dropdown.classList.toggle('active'); // Alternar la clase 'active'
    });

    // Cerrar el submenú al hacer clic fuera de él
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove('active');
            });
        }
    });

        
});





/*/////////////////////////////////////////////////////// ANUNCIOS /////////////////////////////////////////////////////////////////////*/
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;
const carousel = document.querySelector('.carousel');

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Función para mover al siguiente anuncio
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

// Función para mover al anuncio anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// Cambio automático cada 5 segundos
setInterval(nextSlide, 5000);





/*//////////////////////////////////////////////////////// CARD ////////////////////////////////////////////////////////////////////////*/
function voltearCard(button) {
    const cardWrap = button.closest('.card-wrap');
    const allCards = document.querySelectorAll('.card-wrap');

    // Desvoltea todas las tarjetas excepto la actual
    allCards.forEach(c => {
        if (c !== cardWrap) {
            c.classList.remove('flipped');
        }
    });

    // Voltea la tarjeta actual
    cardWrap.classList.toggle('flipped');
}






/*/////////////////////////////////////////////////////////////// PAQUETES /////////////////////////////////////////////////////////////*/
function abrirPopupProductoCarrier() {
    document.getElementById("popup-producto-index").style.display = "flex";
    document.body.style.overflow = 'hidden'; // Bloquea el scroll
}

function cerrarPopupProductoCarrier() {
    document.getElementById("popup-producto-index").style.display = "none";
    document.body.style.overflow = 'auto'; // Restaura el scroll
    const allCards = document.querySelectorAll('.card-wrap');
    allCards.forEach(card => {
        card.classList.remove('flipped');
    });
}




/*///////////////////////////////////////////////////////// LLAMADA ////////////////////////////////////////////////////////////////////*/
function validateForm() {
    let nameInput = document.getElementById("name").value.trim();
    let phoneInput = document.getElementById("phone");
    let callButton = document.getElementById("callButton");

    // Eliminar caracteres no numéricos y limitar a 10 dígitos en teléfono
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);

    // Verificar si ambos campos están correctamente llenos
    let isValid = nameInput.length > 0 && phoneInput.value.length === 10;

    // Habilitar o deshabilitar el botón
    callButton.disabled = !isValid;
}

function submitForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    fetch("https://formspree.io/f/mldjwepq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, phone: phone })
    })
    .then(response => {
        if (response.ok) {
            showPopup();
            document.getElementById("name").value = ""; // Limpiar campo nombre
            document.getElementById("phone").value = ""; // Limpiar campo teléfono
            document.getElementById("callButton").disabled = true; // Deshabilitar botón
        } else {
            alert("Error al enviar los datos, intenta nuevamente.");
        }
    })
    .catch(error => console.error("Error:", error));
}

function showPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}





/*///////////////////////////////////////////////////////// CARRIER ////////////////////////////////////////////////////////////////////*/
function mostrarPopupCarrier() {
    document.getElementById('popup-overlay-carrier').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Bloquea el scroll
}

function cerrarPopupCarrier() {
    document.getElementById('popup-overlay-carrier').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura el scroll
}





/*///////////////////////////////////////////////////////////// PAQUETES ///////////////////////////////////////////////////////////////*/
function abrirPopupProducto() {
    document.getElementById("popup-producto").style.display = "flex";
    document.body.style.overflow = 'hidden'; // Bloquea el scroll
}

function cerrarPopupProducto() {
    document.getElementById("popup-producto").style.display = "none";
    document.body.style.overflow = 'auto'; // Restaura el scroll
}





/*//////////////////////////////////////////////////////////// COBERTURA ///////////////////////////////////////////////////////////////*/
function moveSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const cardWidth = slider.children[0].offsetWidth;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${-direction * cardWidth}px)`;
    setTimeout(() => {
        if (direction === 1) {
            slider.appendChild(slider.firstElementChild);
        } else {
            slider.prepend(slider.lastElementChild);
        }
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
    }, 500);
}
function autoSlide(sliderId) {
    setInterval(() => moveSlide(sliderId, 1), 3000);
}
autoSlide("slider1");
autoSlide("slider2");





/*////////////////////////////////////////////////////////// FOMRULARIO ///////////////////////////////////////////////////////////////*/
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los datos del formulario
    let formData = new FormData(this);

    // Obtener la ubicación y formatearla
    let ubicacion = formData.get("ubicacion"); // Asegúrate de que el input tenga name="ubicacion"

    if (ubicacion) {
        ubicacion = ubicacion
            .replace(/_/g, " ") // Reemplaza guiones bajos con espacios
            .toLowerCase() // Convierte todo a minúsculas
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra

        formData.set("ubicacion", ubicacion); // Actualiza el valor formateado en el FormData
    }

    // Enviar datos a Formspree usando Fetch API
    fetch("https://formspree.io/f/mqapdkyv", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("popup-form").style.display = "flex"; // Muestra el popup
            this.reset(); // Limpia el formulario
        } else {
            alert("Hubo un error al enviar el mensaje. Revisa tus datos e intenta de nuevo.");
        }
    })
    .catch(error => alert("Error al enviar el formulario"));
});

function cerrarPopup() {
    document.getElementById("popup-form").style.display = "none";
}