/**
 * main.js - Lógica de negocio, renderizado dinámico, validación en tiempo real
 * y componentes interactivos (menú hamburguesa, buscador/filtro, modales)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initMobileMenu();
  initModalSystem();

  // 1. Dashboard (index.html)
  const coursesContainer = document.getElementById('courses-container');
  if (coursesContainer) {
    renderCourses(getCourses());
    setupSearchAndFilters();
  }

  // 2. Detalle del Curso (detalle.html)
  const detailContainer = document.getElementById('course-detail-container');
  if (detailContainer) {
    renderCourseDetail();
  }

  // 3. Validación Avanzada de Formularios (sin tooltips nativos)
  setupFormValidation('login-form', handleLoginSubmit);
  setupFormValidation('register-form', handleRegisterSubmit);
  setupFormValidation('create-course-form', handleCreateCourseSubmit);
});

/* ==========================================================================
   Gestión de Datos Simulados (mockData.js + localStorage)
   ========================================================================== */
function initStorage() {
  if (!localStorage.getItem('aprendeya_courses') && typeof mockCourses !== 'undefined') {
    localStorage.setItem('aprendeya_courses', JSON.stringify(mockCourses));
  }
}

function getCourses() {
  return JSON.parse(localStorage.getItem('aprendeya_courses')) || [];
}

function saveCourses(courses) {
  localStorage.setItem('aprendeya_courses', JSON.stringify(courses));
}

/* ==========================================================================
   Componente Interactivo 1: Menú Hamburguesa Responsive
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   Componente Interactivo 2: Sistema de Modales Personalizados
   ========================================================================== */
function initModalSystem() {
  if (document.getElementById('custom-modal')) return;

  const modalHTML = `
    <div id="custom-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-box">
        <div class="modal-header">
          <div id="modal-icon" class="modal-icon info">
            <i class="fa-solid fa-circle-info"></i>
          </div>
          <h3 id="modal-title" class="modal-title">Aviso</h3>
        </div>
        <div id="modal-body" class="modal-body"></div>
        <div id="modal-actions" class="modal-actions"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const overlay = document.getElementById('custom-modal');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function showModal({ title, message, type = 'info', confirmText = 'Aceptar', cancelText = null, onConfirm = null }) {
  const overlay = document.getElementById('custom-modal');
  const iconEl = document.getElementById('modal-icon');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const actionsEl = document.getElementById('modal-actions');

  const icons = {
    info: '<i class="fa-solid fa-circle-info"></i>',
    success: '<i class="fa-solid fa-circle-check"></i>',
    danger: '<i class="fa-solid fa-triangle-exclamation"></i>'
  };

  iconEl.className = `modal-icon ${type}`;
  iconEl.innerHTML = icons[type] || icons.info;
  titleEl.textContent = title;
  bodyEl.textContent = message;

  actionsEl.innerHTML = '';

  if (cancelText) {
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn-secondary';
    cancelBtn.textContent = cancelText;
    cancelBtn.addEventListener('click', closeModal);
    actionsEl.appendChild(cancelBtn);
  }

  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = type === 'danger' ? 'btn-danger' : 'btn-primary';
  confirmBtn.textContent = confirmText;
  confirmBtn.addEventListener('click', () => {
    closeModal();
    if (typeof onConfirm === 'function') onConfirm();
  });
  actionsEl.appendChild(confirmBtn);

  overlay.classList.add('active');
}

function closeModal() {
  const overlay = document.getElementById('custom-modal');
  if (overlay) overlay.classList.remove('active');
}

/* ==========================================================================
   Renderizado Dinámico desde Datos Simulados (DOM createElement)
   ========================================================================== */
function renderCourses(courses) {
  const container = document.getElementById('courses-container');
  const countBadge = document.getElementById('results-count');
  if (!container) return;

  container.innerHTML = '';

  if (countBadge) {
    countBadge.textContent = `${courses.length} ${courses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}`;
  }

  if (courses.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.style.cssText = 'grid-column: 1/-1; text-align: center; color: var(--slate-500); padding: 2rem;';
    emptyMsg.textContent = 'No se encontraron formaciones que coincidan con tu búsqueda.';
    container.appendChild(emptyMsg);
    return;
  }

  courses.forEach(course => {
    const article = document.createElement('article');
    article.className = 'card-uniform';

    const priceText = Number(course.price) === 0
      ? 'Gratis'
      : `${Number(course.price).toFixed(2)}€`;

    article.innerHTML = `
      <img src="${course.image}" alt="${course.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md) var(--radius-md) 0 0;">
      <div class="card-body-flex" style="padding-top: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--brand-600); background: var(--brand-50); padding: 0.25rem 0.5rem; border-radius: 4px;">
            ${course.category}
          </span>
          <span style="font-size: 0.75rem; color: var(--slate-500);">
            <i class="fa-regular fa-calendar"></i> ${course.startDate || '2026-12-01'}
          </span>
        </div>
        <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;">${course.title}</h3>
        <p style="font-size: 0.875rem; color: var(--slate-500); margin-bottom: 1rem;">${course.description}</p>
        <div class="card-footer-mt" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--slate-100); padding-top: 1rem; gap: 0.5rem;">
          <span style="font-weight: 700; font-size: 1.125rem;">${priceText}</span>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn-danger delete-course-btn" data-id="${course.id}" title="Eliminar curso">
              <i class="fa-solid fa-trash"></i>
            </button>
            <a href="detalle.html?id=${course.id}" class="btn-primary">Ver Curso</a>
          </div>
        </div>
      </div>
    `;

    const deleteBtn = article.querySelector('.delete-course-btn');
    deleteBtn.addEventListener('click', () => {
      showModal({
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar el curso "${course.title}" del catálogo?`,
        type: 'danger',
        confirmText: 'Sí, eliminar',
        cancelText: 'Cancelar',
        onConfirm: () => {
          const updated = getCourses().filter(item => item.id !== course.id);
          saveCourses(updated);
          renderCourses(updated);
        }
      });
    });

    container.appendChild(article);
  });
}

/* ==========================================================================
   Componente Interactivo 3: Buscador y Filtro en Tiempo Real
   ========================================================================== */
function setupSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const resetBtn = document.getElementById('reset-filters-btn');

  function filterData() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    const filtered = getCourses().filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === '' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    renderCourses(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterData);
  if (categoryFilter) categoryFilter.addEventListener('change', filterData);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (categoryFilter) categoryFilter.value = '';
      renderCourses(getCourses());
    });
  }
}

/* ==========================================================================
   Renderizado Dinámico de Detalle del Curso (detalle.html)
   ========================================================================== */
function renderCourseDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id')) || 1;
  const course = getCourses().find(c => c.id === id) || getCourses()[0];

  if (!course) return;

  document.getElementById('detail-image').src = course.image;
  document.getElementById('detail-title').textContent = course.title;
  document.getElementById('detail-description').textContent = course.description;
  document.getElementById('detail-meta').textContent =
    `Categoría: ${course.category} · Inicio: ${course.startDate || '2026-12-01'} · Instructor: ${course.instructor || 'Equipo DAW'}`;

  const priceText = Number(course.price) === 0 ? 'Gratis' : `${Number(course.price).toFixed(2)}€`;
  document.getElementById('detail-price').textContent = priceText;

  const modulesList = document.getElementById('detail-modules');
  const modules = course.modules || [
    'Módulo 1: Introducción y fundamentos teóricos',
    'Módulo 2: Desarrollo práctico paso a paso',
    'Módulo 3: Proyecto final y evaluación'
  ];
  modulesList.innerHTML = modules
    .map(m => `<li style="background: white; border: 1px solid var(--slate-200); padding: 1rem; border-radius: var(--radius-md);">${m}</li>`)
    .join('');

  const enrollBtn = document.getElementById('enroll-btn');
  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      showModal({
        title: 'Confirmar Inscripción',
        message: `Vas a matricularte en "${course.title}" (${priceText}). ¿Deseas continuar?`,
        type: 'info',
        confirmText: 'Confirmar matrícula',
        cancelText: 'Cancelar',
        onConfirm: () => {
          showModal({
            title: '¡Inscripción Completada!',
            message: `Te has inscrito correctamente en "${course.title}". Ya tienes acceso al temario.`,
            type: 'success',
            confirmText: 'Genial'
          });
        }
      });
    });
  }
}

/* ==========================================================================
   Validación Avanzada de Formularios en Tiempo Real (input / blur)
   ========================================================================== */
function setupFormValidation(formId, onValidSubmit) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.setAttribute('novalidate', true);

  const inputs = form.querySelectorAll('input[data-validate], textarea[data-validate], select[data-validate]');

  inputs.forEach(field => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    inputs.forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid && typeof onValidSubmit === 'function') {
      onValidSubmit(form);
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  const rules = field.dataset.validate.split('|');
  let errorMsg = '';

  for (const rule of rules) {
    if (rule === 'required' && value === '') {
      errorMsg = 'Este campo es obligatorio.';
      break;
    }
    if (rule.startsWith('min:') && value !== '') {
      const min = parseInt(rule.split(':')[1], 10);
      if (value.length < min) {
        errorMsg = `Debe contener al menos ${min} caracteres.`;
        break;
      }
    }
    if (rule === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(value)) {
        errorMsg = 'Introduce un correo electrónico válido (ej: alumno@eduacademia.es).';
        break;
      }
    }
    if (rule === 'password' && value !== '') {
      const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passRegex.test(value)) {
        errorMsg = 'Mínimo 8 caracteres, al menos una letra mayúscula y un número.';
        break;
      }
    }
    if (rule === 'matchPassword' && value !== '') {
      const originalPass = document.getElementById('password')?.value || '';
      if (value !== originalPass) {
        errorMsg = 'Las contraseñas no coinciden.';
        break;
      }
    }
    if (rule === 'futureDate' && value !== '') {
      const selectedDate = new Date(value + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errorMsg = 'La fecha no puede ser anterior al día de hoy.';
        break;
      }
    }
    if (rule === 'positiveNumber' && value !== '') {
      if (isNaN(value) || Number(value) < 0) {
        errorMsg = 'Introduce un importe numérico igual o mayor que 0.';
        break;
      }
    }
    if (rule === 'url' && value !== '') {
      try {
        new URL(value);
      } catch {
        errorMsg = 'Introduce una URL válida que empiece por http:// o https://.';
        break;
      }
    }
  }

  renderFieldError(field, errorMsg);
  return errorMsg === '';
}

function renderFieldError(field, message) {
  const errorContainer = document.getElementById(`error-${field.id}`);
  if (message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    if (errorContainer) {
      errorContainer.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${message}</span>`;
      errorContainer.classList.add('visible');
    }
  } else {
    field.classList.remove('is-invalid');
    if (field.value.trim() !== '') {
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
    }
    if (errorContainer) {
      errorContainer.textContent = '';
      errorContainer.classList.remove('visible');
    }
  }
}

/* ==========================================================================
   Manejadores de Envío de Formularios Validados
   ========================================================================== */
function handleLoginSubmit(form) {
  const email = document.getElementById('email').value.trim();
  showModal({
    title: 'Sesión Iniciada',
    message: `Bienvenido de nuevo, ${email}. Redirigiendo al panel principal...`,
    type: 'success',
    confirmText: 'Ir al Dashboard',
    onConfirm: () => {
      form.reset();
      window.location.href = 'index.html';
    }
  });
}

function handleRegisterSubmit(form) {
  const nombre = document.getElementById('nombre').value.trim();
  showModal({
    title: 'Registro Completado',
    message: `Cuenta creada con éxito para ${nombre}. Ya puedes iniciar sesión.`,
    type: 'success',
    confirmText: 'Iniciar Sesión',
    onConfirm: () => {
      form.reset();
      window.location.href = 'login.html';
    }
  });
}

function handleCreateCourseSubmit(form) {
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value;
  const startDate = document.getElementById('startDate').value;
  const description = document.getElementById('description').value.trim();
  const priceInput = document.getElementById('price').value.trim();
  const imageInput = document.getElementById('image').value.trim();

  const newCourse = {
    id: Date.now(),
    title,
    category,
    instructor: 'Docente EduAcademia',
    startDate,
    description,
    price: priceInput !== '' ? parseFloat(priceInput) : 0,
    image: imageInput || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    modules: [
      'Módulo 1: Fundamentos y configuración inicial',
      'Módulo 2: Desarrollo práctico guiado',
      'Módulo 3: Proyecto integrador'
    ]
  };

  const courses = getCourses();
  courses.unshift(newCourse);
  saveCourses(courses);

  showModal({
    title: '¡Curso Publicado!',
    message: `La formación "${title}" se ha añadido correctamente al catálogo.`,
    type: 'success',
    confirmText: 'Ver en el Catálogo',
    onConfirm: () => {
      form.reset();
      window.location.href = 'index.html';
    }
  });
}