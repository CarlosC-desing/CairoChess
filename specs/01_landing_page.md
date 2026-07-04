# Spec 01: Landing Page - CairoChess (Academia de Ajedrez)

## 1. Objetivo General
Recrear una interfaz moderna, minimalista y temática para la academia "Cairo". El enfoque de diseño es **Mobile-First** con escalabilidad a escritorio, manteniendo un esquema de color institucional oscuro y un fondo con un patrón geométrico de tablero de ajedrez.

## 2. Identidad Visual y Paleta de Colores (Tailwind v4 @theme)
El agente debe configurar las variables CSS globales dentro de `src/app/globals.css` utilizando la directiva `@theme`. Los colores oficiales son:

- `bg-primary`: `#081528` (Azul muy oscuro profundo para el fondo principal).
- `bg-secondary`: `#0a234c` (Azul corporativo para contenedores, tarjetas y elementos destacados).
- `text-muted`: `#68696b` (Gris para textos secundarios y bordes sutiles).
- `text-light`: `#fafafa` (Blanco para textos principales).
- `accent`: `#f59e0b` (Amber/Dorado para elementos interactivos o destacados como el emoji o estados).

### Detalles del Fondo (Ajedrezado)
- El fondo de la página debe emular un patrón de tablero de ajedrez difuminado o sutil (pistas: un patrón repetitivo de opacidad muy baja usando CSS Grid o un gradiente lineal repetitivo que alterne cuadraditos oscuros).

## 3. Estructura de la Interfaz (Mobile-First)

### A. Navbar Superior
- Enlaces de navegación: `Inicio`, `Sobre Nosotros`, `Contáctanos`.
- Debe estar alineado horizontalmente con un diseño limpio y un logotipo temporal (o icono de pieza de ajedrez blanca) a la izquierda.

### B. Sección Hero: "Ejercicio del Día" (Lichess API Integration) 🧩

#### 1. Comportamiento en Pantalla (Responsive Estricto)
- **Mobile First (Crítico)**: El contenedor del tablero debe romper los paddings laterales de la página en mobile. Debe ocupar exactamente el **`w-full` (100% del ancho de la pantalla)**, asegurando un cuadrado perfecto sin márgenes a los lados.
- **Desktop / Tablet (`md:`)**: El tablero deja de ocupar todo el ancho y se limita a un tamaño máximo controlable (ej. `max-w-[500px]` o `max-w-[600px]`) perfectamente centrado en su columna.

#### 2. Lógica del Juego e Integración con la API de Lichess
- El componente debe conectarse a la API pública de Lichess para obtener el puzzle diario (`https://lichess.org/api/puzzle/daily`).
- Utilizar `chess.js` para cargar el estado inicial del tablero usando el FEN proveído por la API de Lichess.
- **Marcador de Turno Activo**: Mostrar de forma clara y visual quién tiene el turno de jugar ("Juegan: Blancas" o "Juegan: Negras"). El marcador debe actualizarse automáticamente tras cada movimiento válido.

#### 3. Jugabilidad y Fluidez Estilo Lichess/Chess.com (Mobile & Desktop)
- Habilitar `arePiecesDraggable={true}` en `react-chessboard`.
- **Experiencia Táctil Mobile**: Configurar las propiedades de `react-chessboard` para asegurar que el arrastre en móviles sea suave y preciso. Se debe prevenir que el scroll vertical del navegador interfiera con el arrastre de las piezas (usar clases de Tailwind como `touch-none` en los contenedores necesarios).
- Validar cada jugada con `chess.js`. Si el movimiento no es legal o no corresponde a la solución del puzzle, la pieza debe regresar fluidamente a su casilla de origen.

#### 4. Efecto de Victoria Deslumbrante (Sorpresa de Éxito)
- Cuando el usuario complete correctamente todas las jugadas del ejercicio del día, el sistema debe disparar una recompensa visual asombrosa:
  - Generar una lluvia/explosión de confeti en toda la pantalla (puedes sugerir al agente instalar e importar temporalmente una librería liviana como `canvas-confetti`).
  - Mostrar un modal o banner flotante minimalista con diseño "glassmorphism" que diga "¡Ejercicio Completado!" con estadísticas del puzzle o un mensaje de felicitación personalizado, bloqueando interacciones posteriores del tablero.

### C. Sección: "Sobre Nosotros" (Equipo)
Una cuadrícula responsiva (`grid-cols-1` en mobile, `md:grid-cols-3` en escritorio) que simule los miembros clave de la academia con un avatar minimalista, su nombre y su rol:
1. **Fundador**: Breve descripción de su visión de la academia.
2. **Profesor**: Breve descripción sobre la metodología de enseñanza del ajedrez.
3. **Administración**: Breve descripción sobre el soporte y gestión del club.

### D. Footer (Pie de Página)
- Debe incluir un diseño de barra inferior con dos elementos en los extremos:
  - Izquierda: Un logo o marca secundaria (ej. "ChessFlow" o similar).
  - Derecha: El texto exacto de autoría: **"Desarrollado por: Carlos Canelón"** (resaltando el nombre en un color contrastante).

## 4. Restricciones Técnicas de Código
- **Indentación**: Obligatoriamente **2 espacios** en todos los archivos generados.
- **Biome**: Formato limpio según las directivas estrictas de `biome.json`.
- **Estructura**: Separar la vista principal en `src/app/page.tsx` y modularizar el tablero o las secciones en `src/components/`.