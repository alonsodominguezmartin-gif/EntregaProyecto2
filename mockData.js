/**
 * mockData.js - Simulación de la base de datos del Proyecto 1 (EduAcademia)
 * Contiene la colección inicial de cursos y módulos formativos.
 */
const mockCourses = [
  {
    id: 1,
    title: "Desarrollo Web Full Stack con Next.js",
    category: "Desarrollo Web",
    instructor: "Carlos Mendoza",
    duration: "45 horas",
    level: "Intermedio",
    startDate: "2026-12-01",
    description: "Aprende a construir aplicaciones modernas usando Next.js, React y Tailwind CSS con arquitectura profesional.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    modules: [
      "Módulo 1: Fundamentos de React, JSX y Componentes",
      "Módulo 2: Enrutamiento y Server Components en Next.js",
      "Módulo 3: Integración con API Routes y Servidores Node.js"
    ]
  },
  {
    id: 2,
    title: "Bases de Datos Relacionales con MySQL",
    category: "Bases de Datos",
    instructor: "Elena Navarro",
    duration: "30 horas",
    level: "Básico",
    startDate: "2026-12-05",
    description: "Domina el diseño conceptual, relacional, consultas SQL avanzadas y normalización hasta 3FN.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
    modules: [
      "Módulo 1: Modelo Entidad-Relación y Paso a Tablas",
      "Módulo 2: Normalización (1FN, 2FN, 3FN) e Integridad Referencial",
      "Módulo 3: Consultas Multitabla, Subconsultas y Procedimientos"
    ]
  },
  {
    id: 3,
    title: "Despliegue e Infraestructura en AWS",
    category: "Cloud",
    instructor: "Javier Ruiz",
    duration: "40 horas",
    level: "Avanzado",
    startDate: "2026-12-10",
    description: "Aprende a desplegar instancias EC2, gestionar buckets S3, configurar Docker y redes VPC.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    modules: [
      "Módulo 1: Computación en la Nube con AWS EC2 e IAM",
      "Módulo 2: Almacenamiento S3 y Bases de Datos RDS",
      "Módulo 3: Contenedores Docker y Despliegue Continuo"
    ]
  },
  {
    id: 4,
    title: "JavaScript Vanilla Moderno (ES6+) y DOM",
    category: "Desarrollo Web",
    instructor: "Laura Gómez",
    duration: "35 horas",
    level: "Intermedio",
    startDate: "2026-12-15",
    description: "Domina la manipulación del DOM, asincronía con Fetch/Async-Await, eventos y arquitectura sin frameworks.",
    price: 0,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
    modules: [
      "Módulo 1: ES6+, Closures, Promesas y Async/Await",
      "Módulo 2: Manipulación Avanzada del DOM y Delegación de Eventos",
      "Módulo 3: Validación de Formularios y Almacenamiento Local"
    ]
  }
];