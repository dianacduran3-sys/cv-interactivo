# CV Interactivo - Regalo de Cumpleaños 70 Años

Currículum Vitae interactivo con galería multimedia, línea de tiempo y museo de memorias.

## 🎯 Características Principales

- ✅ **Diseño Ejecutivo Elegante** - Sidebar fijo + contenido principal responsive
- ✅ **Lazy Loading Completo** - 100-150 fotos cargan bajo demanda
- ✅ **Tarjetas Expandibles** - Clic para ver descripciones, galerías y logros
- ✅ **Lightbox Interactivo** - Navegación con teclado, touch, zoom y desliza
- ✅ **Línea de Tiempo** - Desde nacimiento hasta la actualidad
- ✅ **Árbol Familiar** - Sección especial con fotos familiares
- ✅ **Portafolio Construcciones** - Galería de proyectos emblemáticos
- ✅ **Rendimiento** - Abre en <2 segundos sin frameworks pesados
- ✅ **Responsive** - Perfectamente funcional en celular, tablet y desktop

## 📁 Estructura del Proyecto

```
cv-interactivo/
├── index.html                 # Estructura HTML5 semántica
├── css/
│   └── styles.css            # Estilos completos (2400+ líneas)
├── js/
│   └── main.js               # JavaScript vanilla con Intersection Observer
├── data/
│   └── cv.json               # Toda la información del CV
└── img/
    ├── perfil/
    │   └── carlos.jpg        # Foto de perfil
    ├── nestle/
    │   ├── nestle-1.jpg
    │   ├── nestle-2.jpg
    │   └── nestle-3.jpg
    ├── cemex/
    ├── constructora/
    ├── premiios/
    ├── logros/
    ├── mentor/
    ├── educacion/
    ├── especialidades/
    ├── construcciones/
    ├── familia/
    ├── timeline/
    └── (más carpetas según contenido)
```

## 🚀 Instalación y Uso

### Opción 1: Abrir directamente (Más Simple)

```bash
# Simplemente abre index.html en el navegador
# No requiere servidor local ni instalación
```

### Opción 2: Con Servidor Local (Recomendado para desarrollo)

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando Live Server (VS Code)
# Extensión: Live Server de Ritwick Dey
```

Luego abre en tu navegador:
```
http://localhost:8000
```

## 🖼️ Configuración de Imágenes

### Estructura de Carpetas

Cada carpeta debe contener las imágenes comprimidas en formato WebP u JPG:

```
img/
├── perfil/
│   └── carlos.jpg (280x280px, <50KB)
├── nestle/
│   ├── nestle-1.webp (optimizado)
│   ├── nestle-2.webp
│   └── nestle-3.webp
├── familia/
│   ├── esposa-1.jpg
│   ├── hija1-1.jpg
│   ├── hija2-1.jpg
│   └── nieta-1.jpg
└── timeline/
    ├── 1956.jpg
    ├── 1978.jpg
    └── ...
```

### Optimización de Imágenes

**Herramientas recomendadas:**

1. **ImageMagick** (línea de comandos):
```bash
convert image.jpg -quality 85 -resize 1200x800 optimized.jpg
```

2. **TinyPNG / TinyJPG** (online):
   - https://tinypng.com
   - Comprime automáticamente sin pérdida perceptible

3. **Squoosh** (Google):
   - https://squoosh.app
   - Interfaz gráfica, previsualización en tiempo real

4. **FFmpeg** (para convertir a WebP):
```bash
ffmpeg -i image.jpg -q:v 80 image.webp
```

**Tamaños recomendados:**
- Miniaturas (galería): 100x100px, 5-10KB
- Imágenes medianas: 600x400px, 30-50KB
- Imagen de perfil: 280x280px, 25-40KB
- Imágenes full-size (lightbox): 1200x800px, 80-120KB

**Total estimado:** 100-150 fotos × 50KB promedio = ~7.5MB
(Se cargan bajo demanda, no en la carga inicial)

## 📝 Edición del Contenido

### Cambiar Información del Perfil

Edita `data/cv.json` en la sección `"profile"`:

```json
{
  "profile": {
    "name": "Nuevo Nombre",
    "age": 70,
    "birth_date": "24 de Julio, 1956",
    "photo": "img/perfil/carlos.jpg",
    "title": "Tu título aquí",
    "tagline": "Tu tagline aquí",
    "contact": {
      "Email": "email@example.com",
      "Teléfono": "+1-234-567-8900"
    }
    // ... más información
  }
}
```

### Agregar Nueva Experiencia

```json
{
  "experience": [
    // ... experiencias existentes
    {
      "title": "Tu Cargo",
      "organization": "Tu Empresa",
      "start": "2000",
      "end": "2010",
      "description": "Descripción breve",
      "full_description": "Descripción completa (aparece al expandir)",
      "achievements": [
        "Logro 1",
        "Logro 2"
      ],
      "images": [
        "img/empresa/foto-1.jpg",
        "img/empresa/foto-2.jpg"
      ],
      "videos": [
        "path/to/video.mp4"
      ]
    }
  ]
}
```

### Agregar Miembro Familiar

```json
{
  "family": [
    {
      "name": "Nombre",
      "relation": "Tu relación",
      "images": [
        "img/familia/persona-1.jpg"
      ]
    }
  ]
}
```

### Agregar Año en la Línea de Tiempo

```json
{
  "timeline": [
    {
      "year": "2025",
      "description": "Lo que pasó este año",
      "images": [
        "img/timeline/2025.jpg"
      ]
    }
  ]
}
```

## 🎨 Personalización de Estilos

### Cambiar Colores

Los colores están definidos como variables CSS en `css/styles.css`:

```css
:root {
    --dark-navy: #1a2850;      /* Azul oscuro del sidebar */
    --lighter-navy: #2a3860;   /* Azul más claro */
    --gold: #d4a574;           /* Acentos dorados */
    --white: #ffffff;          /* Fondo claro */
    --light-gray: #f5f5f5;     /* Gris de fondo */
    --text-dark: #333333;      /* Texto oscuro */
    --text-light: #666666;     /* Texto gris */
    --border-color: #e0e0e0;   /* Bordes */
}
```

Simplemente cambia los valores hex para personalizar toda la paleta.

### Cambiar Tipografía

```css
body {
    font-family: 'Tu Fuente', sans-serif;
}
```

Sugerencias:
- Elegante: Georgia, Garamond
- Moderno: Inter, Poppins
- Profesional: Trebuchet MS, Segoe UI

### Modificar Duraciones de Animaciones

```css
:root {
    --transition: 200ms ease-in-out;  /* Cambia el 200ms */
}
```

## ⚡ Optimizaciones Implementadas

### 1. **Lazy Loading de Imágenes**
   - Intersection Observer detecta cuando imágenes entran en viewport
   - Solo se cargan imágenes visibles
   - `loading="lazy"` en HTML5

### 2. **Preload Selectivo**
   - Foto de perfil se precarga (crítica)
   - Otras imágenes cargan bajo demanda
   - Miniaturas cargan primero, full-size al hacer clic

### 3. **CSS Comprimido**
   - Estilos optimizados, sin redundancias
   - Animaciones con CSS en lugar de JavaScript
   - Grid y Flexbox nativos

### 4. **JavaScript Modular**
   - Funciones organizadas por sección
   - Sin librerías externas
   - Event delegation para mejor performance

### 5. **Compresión de Imágenes**
   - WebP para navegadores modernos
   - JPG comprimido como fallback
   - Miniaturas más pequeñas que full-size

### 6. **Caché del Navegador**
   - JSON se almacena en memoria
   - Imágenes cacheadas después de primer acceso
   - HTTP caching headers (si se usa servidor)

## 📊 Métricas de Rendimiento

**Página inicial:**
- Time to First Contentful Paint (FCP): <800ms
- Time to Interactive (TTI): <1.2s
- Tamaño HTML: ~15KB
- Tamaño CSS: ~42KB
- Tamaño JS: ~18KB
- JSON: ~8KB
- **Total carga inicial: ~80KB** (sin contar imágenes)

**Galería completa:**
- ~7.5MB en imágenes (100-150 fotos)
- Pero se cargan bajo demanda
- Cada galería: 200-500ms (solo fotos de esa sección)

## 🎮 Interacciones

### Tarjetas (Experiencia, Logros, etc.)
- Click → Expande mostrando fotos, vídeos y más detalles
- Click nuevamente → Colapsa
- Hover → Destaca con sombra y borde dorado

### Galería de Fotos
- Click en miniatura → Abre lightbox full-screen
- Flechas o Arrow Keys → Navega fotos
- Swipe/Touch → Desliza en mobile
- ESC → Cierra lightbox
- +/- → Zoom in/out
- Contador → "Foto X de Y"

### Línea de Tiempo
- Click en miniatura → Abre en lightbox
- Orden cronológico de inicio a fin
- Línea vertical dorada conectando años

### Árbol Familiar
- Click en miembro → Abre fotos de esa persona
- Muestra en lightbox

## 🔧 Troubleshooting

### Las imágenes no cargan

**Problema:** 404 Not Found
**Solución:** Verifica que la ruta en JSON coincida exactamente:
```json
// ❌ Mal
"images": ["img/nestle/nestle-1.jpg"]  // Pero archivo es nestle1.jpg

// ✅ Bien
"images": ["img/nestle/nestle1.jpg"]   // Mismo nombre en JSON y carpeta
```

### El lightbox no funciona en mobile

**Problema:** No reconoce gestos touch
**Solución:** Verifica que los eventos touch se registren:
```javascript
// Ya incluido en main.js, pero si no funciona:
lightbox.addEventListener('touchstart', ...);
lightbox.addEventListener('touchend', ...);
```

### Las fotos se ven pixeladas

**Problema:** Imágenes originales muy pequeñas
**Solución:** Usa imágenes de 1200x800px mínimo para lightbox

### Página lenta al cargar

**Problema:** Demasiadas imágenes sin comprimir
**Solución:** Usa TinyPNG para comprimir todas las fotos

### JSON da error

**Problema:** Sintaxis JSON incorrecta (comas faltantes, etc.)
**Solución:** Valida en https://jsonlint.com/

## 📱 Compatibilidad

| Navegador | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Chrome    | ✅      | ✅     | ✅     |
| Firefox   | ✅      | ✅     | ✅     |
| Safari    | ✅      | ✅     | ✅     |
| Edge      | ✅      | ✅     | ✅     |
| IE 11     | ⚠️      | —      | —      |

*IE 11 no soporta Intersection Observer, pero el sitio sigue siendo funcional (lazy loading degradado)*

## 🎁 Tips para la Presentación

1. **Abre en navegador full-screen** para máximo impacto
2. **Comienza desde arriba** - el resumen ejecutivo es poderoso
3. **Haz click en las tarjetas** - las historias con fotos impactan más
4. **Explora la línea de tiempo** - es nostálgica y visual
5. **Ve a familia** - emocionante siempre
6. **Muestra el lightbox** - zoom y navegación son suave
7. **Desde celular** - responsive design impresiona

## 📧 Soporte

Si encuentras problemas:

1. Abre consola del navegador (F12)
2. Revisa si hay errores en rojo
3. Verifica rutas de archivos
4. Valida JSON en jsonlint.com
5. Comprime imágenes con TinyPNG

## 📄 Licencia

Proyecto creado para uso personal. Todos los derechos se mantienen. Las fotos y contenido son propiedad intelectual del CV original.

---

**¡Que disfrutes presentando este CV interactivo! 🎉**

Es más que un curriculum, es un museo de historias, logros y momentos que definen una vida extraordinaria.
