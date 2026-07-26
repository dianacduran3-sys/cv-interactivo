# 🚀 Guía Rápida de Inicio

## 5 Minutos para tener el CV funcionando

### Paso 1: Preparar el Proyecto (2 min)

```bash
# Asegúrate de tener la estructura:
cv-interactivo/
├── index.html
├── css/styles.css
├── js/main.js
├── data/cv.json
└── img/
    ├── perfil/
    ├── nestle/
    ├── cemex/
    └── ... (más carpetas)
```

### Paso 2: Agregar Foto de Perfil (1 min)

```bash
# Copia tu foto a:
img/perfil/carlos.jpg

# Optimiza primero con TinyPNG:
# 1. Ve a https://tinypng.com
# 2. Arrastra tu foto
# 3. Descarga comprimida
# 4. Renómbrala a carlos.jpg
```

### Paso 3: Abrir en Navegador (1 min)

**Opción A: Directamente**
```bash
# En Windows, Mac o Linux
# Haz doble click en: index.html
```

**Opción B: Servidor Local**
```bash
# En la carpeta del proyecto:
python -m http.server 8000

# Luego abre en navegador:
# http://localhost:8000
```

### Paso 4: Editar Información (1 min)

Abre `data/cv.json` en tu editor de texto y cambia:

```json
{
  "profile": {
    "name": "Tu Nombre",              ← CAMBIA AQUÍ
    "age": 70,                        ← CAMBIA AQUÍ
    "profession": "Tu Profesión",    ← CAMBIA AQUÍ
    "location": "Tu Ciudad",         ← CAMBIA AQUÍ
    "photo": "img/perfil/carlos.jpg" ← DEBE EXISTIR
  }
}
```

**¡Listo!** Recarga el navegador (F5) y verás los cambios.

---

## 📸 Agregar Fotos: Paso a Paso

### 1. Organizar Carpetas

```bash
mkdir -p img/nestle img/familia img/timeline
# Crea todas las carpetas que necesites
```

### 2. Comprimir Imágenes

**Opción A: TinyPNG (Fácil)**
1. Ve a https://tinypng.com
2. Arrastra todas tus fotos
3. Descarga el ZIP comprimido
4. Copia a las carpetas correspondientes

**Opción B: ImageMagick (Avanzado)**
```bash
# En terminal:
convert imagen-grande.jpg -quality 85 -resize 1200x800 img/nestle/nestle-1.jpg
```

### 3. Referir en JSON

```json
{
  "experience": [
    {
      "title": "Mi Cargo",
      "organization": "Mi Empresa",
      "start": "2000",
      "end": "2010",
      "images": [
        "img/nestle/nestle-1.jpg",    ← Ruta correcta
        "img/nestle/nestle-2.jpg",    ← Misma carpeta
        "img/nestle/nestle-3.jpg"
      ]
    }
  ]
}
```

**⚠️ IMPORTANTE:** La ruta en JSON DEBE coincidir exactamente con donde guardaste la foto.

---

## 🎨 Personalizar Colores (2 min)

Abre `css/styles.css` y busca:

```css
:root {
    --dark-navy: #1a2850;   ← Azul del sidebar
    --gold: #d4a574;        ← Dorado (acentos)
    --white: #ffffff;       ← Blanco (fondo)
}
```

Cambios populares:

**Tema azul oscuro + plata:**
```css
--dark-navy: #1a3a52;
--gold: #c0c0c0;  /* Plata */
```

**Tema profesional clásico:**
```css
--dark-navy: #2c3e50;
--gold: #34495e;
```

**Tema moderno (azul + turquesa):**
```css
--dark-navy: #0a1f3f;
--gold: #1abc9c;
```

Guarda y recarga (F5) para ver cambios inmediatos.

---

## ✅ Checklist de Configuración

Completa esto paso a paso:

- [ ] Carpeta proyecto creada
- [ ] `index.html` existe
- [ ] `css/styles.css` existe
- [ ] `js/main.js` existe
- [ ] `data/cv.json` existe
- [ ] Carpetas `img/` creadas
- [ ] Foto de perfil en `img/perfil/carlos.jpg`
- [ ] Nombre actualizado en JSON
- [ ] Profesión actualizada
- [ ] Contacto actualizado
- [ ] Primera experiencia editada
- [ ] Fotos agregadas a experiencias
- [ ] Familia configurada
- [ ] Abierto en navegador ✅

---

## 🎯 Ediciones Comunes

### Cambiar solo el nombre

```json
"profile": {
  "name": "Juan Pérez"  ← Solo esto
}
```

### Agregar una experiencia nueva

Copia esta estructura en el array `experience`:

```json
{
  "title": "Mi Nuevo Cargo",
  "organization": "Mi Empresa",
  "start": "2015",
  "end": "2020",
  "description": "Breve descripción",
  "achievements": [
    "Logro 1",
    "Logro 2"
  ],
  "images": [
    "img/empresa/foto-1.jpg"
  ]
}
```

### Cambiar foto de perfil

1. Copia tu foto nueva a `img/perfil/nueva-foto.jpg`
2. En JSON, cambia:
```json
"photo": "img/perfil/nueva-foto.jpg"
```

### Agregar un miembro a la familia

```json
{
  "family": [
    // ... existentes ...
    {
      "name": "Nuevo Miembro",
      "relation": "Su relación",
      "images": [
        "img/familia/persona-1.jpg"
      ]
    }
  ]
}
```

---

## 🐛 Si algo no funciona

### Las fotos no aparecen

**Problema típico:** Ruta incorrecta

```json
// ❌ Mal - archivo no existe
"images": ["img/nestle/foto-1.jpg"]

// ✅ Bien - verifica que el archivo existe:
// img/nestle/foto-1.jpg  ← ¿Existe este archivo?

// ✅ Alternativa - escribe la ruta exacta:
"images": ["img/nestle/nestle-1.jpg"]  ← Mismo nombre del archivo
```

### El sitio abre blanco/vacío

**Problema:** El JSON tiene error de sintaxis

1. Copia tu JSON
2. Ve a https://jsonlint.com
3. Pega el contenido
4. Si hay rojo, arréglalo
5. Vuelve a salvar

**Errors comunes:**
- Coma faltante después de `}`
- Comillas simples `'` en lugar de `"`
- Punto y coma `;` dentro de JSON

### Las animaciones no se ven suave

Es normal. Esto depende del navegador. Los estilos CSS están optimizados.

### ¿Necesito un servidor?

**No**, pero es recomendado. 

**Sin servidor:** Algunos navegadores pueden bloquear JSON.
**Con servidor:** Funciona perfecto.

Usa: `python -m http.server 8000`

---

## 📱 Probar en Celular

1. En la computadora, abre terminal:
```bash
python -m http.server 8000
```

2. Obtén tu IP local:
   - **Windows:** `ipconfig` (busca IPv4)
   - **Mac/Linux:** `ifconfig` (busca inet)

3. En celular abre:
```
http://tu-ip:8000
```

Ejemplo: `http://192.168.1.100:8000`

---

## 🎁 Tips para Impactar

1. **Fotos grandes y claras** - 1200x800px mínimo
2. **Fotos de calidad** - Buena iluminación
3. **Organización** - Carpetas limpias, nombres claros
4. **Descripción emotiva** - Cuenta las historias
5. **Logros específicos** - Números y impacto
6. **Línea de tiempo** - Fotos de cada época
7. **Familia** - Fotos actuales y del pasado
8. **Construcciones** - Before & After

---

## 🚀 Deploy (Subir Online)

### Opción 1: GitHub Pages (Gratis, 3 min)

1. Crea cuenta en https://github.com
2. Click "+" → New repository
3. Nombre: `cv-interactivo`
4. Check "Add README"
5. Click "Create"
6. Carga los archivos (HTML, CSS, JS, JSON, IMG)
7. Ve a Settings → Pages → Select main branch
8. **Listo**, tu CV está en: `https://tuusuario.github.io/cv-interactivo`

### Opción 2: Netlify (Gratis, 2 min)

1. Ve a https://netlify.com
2. Drag & drop la carpeta `cv-interactivo`
3. **Listo**, tendrás URL pública automática

### Opción 3: Tu propio hosting

Carga los archivos vía FTP a tu servidor web.

---

## 📞 Soporte

Si te quedas atascado:

1. Revisa la consola (F12 en navegador)
2. Copia el error
3. Busca en Google
4. Valida JSON en jsonlint.com
5. Verifica rutas de archivos

**¡Ya está! A disfrutar tu CV extraordinario.** 🎉
