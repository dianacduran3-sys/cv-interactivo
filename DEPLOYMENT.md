# 📦 Guía de Deployment y Optimización

## ✅ Pre-Deployment Checklist

### Verificación de Archivos

- [ ] `index.html` - Existe y es válido (F12 → No errores HTML)
- [ ] `css/styles.css` - Cargado correctamente
- [ ] `js/main.js` - Cargado sin errores
- [ ] `data/cv.json` - Válido (https://jsonlint.com)
- [ ] `img/perfil/carlos.jpg` - Foto de perfil presente
- [ ] Todas las carpetas `img/` creadas

### Verificación de Contenido

- [ ] Nombre actualizado
- [ ] Foto de perfil correcta
- [ ] Contacto actualizado
- [ ] Al menos 1 experiencia editada
- [ ] Al menos 1 foto en galería
- [ ] Colores personalizados (opcional)

### Verificación de Performance

Abre el navegador y presiona F12:

**Console (Consola):**
- [ ] Sin errores rojos
- [ ] Sin warnings sobre imágenes

**Network (Red):**
- [ ] Tiempo total <2s
- [ ] Tamaño total <10MB inicial

**Lighthouse (Auditoría):**
1. Abre DevTools (F12)
2. Tab "Lighthouse"
3. Click "Generate report"
4. Score mínimo: 80/100

### Verificación de Interactividad

Prueba cada feature en navegador:

- [ ] Click en tarjeta → Expande correctamente
- [ ] Foto en galería → Abre lightbox
- [ ] Flechas en lightbox → Navegan
- [ ] ESC → Cierra lightbox
- [ ] Mobile: Respira correctamente
- [ ] Mobile: Swipe funciona en lightbox

---

## 🖼️ Optimización de Imágenes - Guía Completa

### Paso 1: Dimensiones Correctas

```
Miniaturas:        100x100px    (5-10 KB)
Medianas:          600x400px    (30-50 KB)
Full-size:        1200x800px    (80-120 KB)
Perfil:            280x280px    (25-40 KB)
```

**Script para redimensionar en lote (ImageMagick):**

```bash
# Instala ImageMagick:
# Windows: https://imagemagick.org
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Redimensiona todas las fotos de una carpeta:
cd img/nestle
mogrify -resize 1200x800 -quality 85 *.jpg

# Crea miniaturas:
for f in *.jpg; do 
  convert "$f" -resize 100x100 -quality 80 "thumb-$f"
done
```

### Paso 2: Comprimir

**Herramientas Online (Más Fácil):**

1. TinyPNG: https://tinypng.com
   - Sube 20 imágenes a la vez
   - Descarga ZIP comprimido
   - Lossy + Lossless automático

2. Squoosh: https://squoosh.app
   - Comparar antes/después
   - Ajustar calidad manualmente
   - Convertir a WebP

**Herramientas de Línea de Comandos:**

```bash
# Usar ImageMagick (velocidad)
convert original.jpg -quality 85 optimized.jpg

# Usar mozjpeg (mejor calidad)
brew install mozjpeg
mozjpeg -quality 85 original.jpg > optimized.jpg

# Convertir a WebP
cwebp -q 80 original.jpg -o optimized.webp
```

### Paso 3: Convertir a WebP

WebP es 25-35% más pequeño que JPG.

```bash
# Instala cwebp:
# Windows/Mac/Linux: https://developers.google.com/speed/webp

# Convierte JPG a WebP:
for f in *.jpg; do 
  cwebp -q 80 "$f" -o "${f%.jpg}.webp"
done

# Resultado: foto.jpg (100 KB) → foto.webp (70 KB)
```

En JSON, usa WebP preferentemente:

```json
"images": [
  "img/nestle/nestle-1.webp",
  "img/nestle/nestle-2.webp"
]
```

### Paso 4: Verificar Compresión

```bash
# Comparar tamaños:
ls -lh img/nestle/
# antes: 450 KB total
# después: 180 KB total (60% reducción)
```

### Targets de Optimización

**Para ~100 fotos:**
- Antes: ~10 MB
- Después: ~3-4 MB (60% menos)
- Tiempo carga: 8s → 2-3s

---

## 🚀 Métodos de Deployment

### Opción 1: GitHub Pages (RECOMENDADO)

**Ventajas:**
- Gratis forever
- URL permanente
- SSL automático
- Fácil de actualizar

**Pasos:**

1. **Crear GitHub cuenta** (si no tienes)
   - https://github.com/join

2. **Crear repositorio**
   - Click "+" → "New repository"
   - Nombre: `cv-interactivo`
   - Descripción: "CV Interactivo 70 años"
   - Public: Sí
   - Click "Create repository"

3. **Subir archivos - Opción A (GUI)**
   - Click "Add file" → "Upload files"
   - Arrastra carpetas: css/, js/, data/, img/
   - Upload index.html
   - Commit changes

4. **Subir archivos - Opción B (Git CLI)**
   ```bash
   cd cv-interactivo
   git init
   git add .
   git commit -m "CV Interactivo versión 1.0"
   git branch -M main
   git remote add origin https://github.com/tuusuario/cv-interactivo.git
   git push -u origin main
   ```

5. **Habilitar Pages**
   - Ve a Settings → Pages
   - Source: main branch
   - Click Save
   - Espera 1-2 minutos

6. **Tu CV está en:**
   ```
   https://tuusuario.github.io/cv-interactivo
   ```

**Actualizar después:**
```bash
# Haz cambios localmente
# Luego:
git add .
git commit -m "Descripción de cambios"
git push
# Listo, cambios en vivo en 30 segundos
```

### Opción 2: Netlify (ALTERNATIVA FÁCIL)

**Ventajas:**
- Más fácil que GitHub
- Build automático
- Previsualización de cambios

**Pasos:**

1. Ve a https://netlify.com
2. Click "Log in" → "Sign up" (GitHub)
3. Conecta tu GitHub
4. Click "New site from Git"
5. Select repository: cv-interactivo
6. Configuración:
   - Build command: (dejar vacío)
   - Publish directory: .
   - Click "Deploy"

7. Tu CV estará en:
   ```
   https://[random-name].netlify.app
   ```

**Custom domain:**
1. Settings → Domain management
2. Add custom domain
3. Configura DNS en tu proveedor

### Opción 3: Vercel

**Similar a Netlify:**
```bash
npm install -g vercel
vercel
# Sigue el wizard y listo
```

### Opción 4: Tu propio servidor

Si tienes hosting:

```bash
# Via FTP (usa Filezilla o similar)
# O via SSH:

scp -r * usuario@tuservidor.com:/public_html/cv/

# O via línea de comandos directo en servidor:
cd /public_html
wget https://github.com/tu-repo/archive/main.zip
unzip main.zip
mv main/* .
```

---

## 📊 Verificar Performance

### En el Navegador

1. Abre DevTools (F12)
2. Pestaña "Network"
3. Recarga página (Ctrl+R)
4. Verifica:
   - HTML: <1s
   - JSON: <100ms
   - CSS: <50ms
   - JS: <100ms
   - Primer imagen: <200ms

### Con Lighthouse

1. DevTools → Lighthouse
2. Mobile / Desktop
3. Click "Generate report"
4. Verifica score (objetivo: >85)

**Si score < 80:**
- Comprime imágenes más
- Reduce tamaño JS si es posible
- Verifica no hay imágenes sin lazy load

### Con Google PageSpeed

1. https://pagespeed.web.dev
2. Ingresa tu URL
3. Analiza resultados
4. Implementa recomendaciones

---

## 🔐 Seguridad y Privacidad

### Antes de publicar públicamente:

- [ ] ¿Contiene números de teléfono privados? → Usa formato oculto
- [ ] ¿Contiene direcciones precisas? → Usa ciudad/provincia solo
- [ ] ¿Contiene fotos de menores? → Pide consentimiento
- [ ] ¿Contiene datos sensibles? → Revisa JSON

### Versión privada:

Si quieres compartir solo con familia, opción:

```html
<!-- Agrega al inicio de index.html -->
<script>
  // Contraseña simple (no es segura, solo disuasiva)
  if (prompt("Ingresa código de acceso:") !== "70AÑOS") {
    document.body.innerHTML = "<h1>Acceso no autorizado</h1>";
  }
</script>
```

---

## 📈 Monitoreo Post-Deployment

### Google Analytics

Agrega tracking (opcional):

```html
<!-- Agrega antes de </body> en index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Sustituye `GA_ID` por tu ID de Google Analytics.

### Monitoreo de Errores

Mantén DevTools abierto en navegadores diferentes:
- Chrome
- Firefox
- Safari (en Mac)
- Edge

---

## 🔄 Mantener Actualizado

### Cambios Frecuentes

```bash
# En tu editor local:
1. Edita data/cv.json
2. Prueba en navegador local
3. Commit: git add . && git commit -m "Actualizar contenido"
4. Push: git push
5. Listo, en vivo en 30 segundos
```

### Agregar fotos nuevas

```bash
1. Comprime fotos con TinyPNG
2. Copia a img/carpeta/
3. Actualiza referencias en JSON
4. Commit y push
```

---

## 🎯 Checklist Final

Antes de considerar "completado":

- [ ] CV carga en <2 segundos
- [ ] Lighthouse score >85
- [ ] Funciona en móvil
- [ ] Funciona en navegadores múltiples
- [ ] Lightbox es suave
- [ ] Imágenes están optimizadas
- [ ] Contenido está completo
- [ ] Colores son los deseados
- [ ] Está publicado online
- [ ] Enlace compartido con familia

---

**¡Listo para deployment!** 🎉

Si tienes dudas sobre cualquier paso, revisa README.md y QUICKSTART.md
