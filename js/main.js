// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================

const CONFIG = {
    JSON_PATH: 'data/cv.json',
    IMAGE_CACHE: new Map(),
    CURRENT_LIGHTBOX: null,
    LIGHTBOX_ZOOM: 1,
    PRELOAD_COUNT: 3,
};

// ========================================
// INTERSECTION OBSERVER PARA LAZY LOADING
// ========================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.src;
            
            if (src) {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                });
                img.addEventListener('error', () => {
                    console.error(`Error loading image: ${src}`);
                    imageObserver.unobserve(img);
                });
            }
        }
    });
}, {
    rootMargin: '50px',
});

const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
});

// ========================================
// FUNCIONES DE CARGA INICIAL
// ========================================

async function loadCVData() {
    try {
        const response = await fetch(CONFIG.JSON_PATH);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error loading CV data:', error);
        document.body.innerHTML = '<p style="text-align: center; padding: 50px;">Error al cargar los datos. Por favor, recargue la página.</p>';
        return null;
    }
}

async function initializeCV() {
    const cvData = await loadCVData();
    if (!cvData) return;

    setupSidebar(cvData);
    setupMainHeader(cvData);
    
    if (cvData.executive_summary) {
        setupSection('resumeSection', 'executiveSummary', cvData.executive_summary, 'summary');
    }
    
    if (cvData.timeline) {
        setupTimeline(cvData.timeline);
    }
    
    if (cvData.family_life) {
        setupCardSection('familyLifeCards', cvData.family_life, 'family');
    }
    
    if (cvData.professional_life) {
        setupCardSection('professionalLifeCards', cvData.professional_life, 'professional');
    }
    
    if (cvData.achievements) {
        setupAchievementsSection('achievementsCards', cvData.achievements);
    }
    
    if (cvData.constructions) {
        setupConstructionsSection('constructionCards', cvData.constructions);
    }
    
    if (cvData.other_moments) {
        setupOtherMomentsSection('otherMomentsCards', cvData.other_moments);
    }
    
    if (cvData.recognitions) {
        setupRecognitions(cvData.recognitions);
    }
    
    if (cvData.documents) {
        setupDocuments(cvData.documents);
    }

    setupLightbox();
    document.body.classList.add('cv-loaded');
}

// ========================================
// CONFIGURACIÓN SIDEBAR
// ========================================

function setupSidebar(cvData) {
    const profile = cvData.profile || {};
    
    const profileImg = document.getElementById('profileImg');
    if (profile.photo) {
        profileImg.src = profile.photo;
        profileImg.alt = profile.name || 'Foto de perfil';
    }
    
    const profileName = document.getElementById('profileName');
    if (profile.name) {
        profileName.textContent = profile.name;
    }
    
    const profileSubtitle = document.getElementById('profileSubtitle');
    if (profile.profession || profile.location) {
        const subtitle = [
            profile.age ? `${profile.age} años` : '',
            profile.location || ''
        ].filter(Boolean).join(' • ');
        profileSubtitle.textContent = subtitle;
    }
    
    const contactInfo = document.getElementById('contactInfo');
    if (profile.contact) {
        const contactHTML = Object.entries(profile.contact)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');
        contactInfo.innerHTML = contactHTML;
    }
    
    const personalData = document.getElementById('personalData');
    if (profile.personal) {
        const personalHTML = Object.entries(profile.personal)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');
        personalData.innerHTML = personalHTML;
    }
    
    const familyInfo = document.getElementById('familyInfo');
    if (profile.family) {
        const familyHTML = Object.entries(profile.family)
            .map(([relation, value]) => `<p><strong>${relation}:</strong> ${value}</p>`)
            .join('');
        familyInfo.innerHTML = familyHTML;
    }
    
    const skillsInfo = document.getElementById('skillsInfo');
    if (profile.skills) {
        const skillsHTML = Object.entries(profile.skills)
            .map(([category, items]) => {
                const itemsList = Array.isArray(items) ? items.join(', ') : items;
                return `<p><strong>${category}:</strong> ${itemsList}</p>`;
            })
            .join('');
        skillsInfo.innerHTML = skillsHTML;
    }
}

// ========================================
// CONFIGURACIÓN HEADER PRINCIPAL
// ========================================

function setupMainHeader(cvData) {
    const profile = cvData.profile || {};
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    
    if (profile.title) {
        mainTitle.textContent = profile.title;
    }
    
    if (profile.tagline) {
        mainSubtitle.textContent = profile.tagline;
    }
}

// ========================================
// SECCIONES DE TEXTO
// ========================================

function setupSection(sectionId, contentId, content, type) {
    const section = document.getElementById(sectionId);
    const container = document.getElementById(contentId);
    
    if (type === 'summary') {
        container.textContent = content;
    }
    
    if (!content) {
        section.style.display = 'none';
    }
}

// ========================================
// LÍNEA DE TIEMPO
// ========================================

function setupTimeline(timelineData) {
    const container = document.getElementById('timeline');
    
    if (!timelineData || timelineData.length === 0) {
        container.innerHTML = '<p>No hay información disponible.</p>';
        return;
    }
    
    container.innerHTML = timelineData.map(item => `
        <div class="timeline-badge">${item.year} - ${item.event}</div>
    `).join('');
}

// ========================================
// SECCIONES DE TARJETAS
// ========================================

function setupCardSection(containerId, items, type) {
    const container = document.getElementById(containerId);
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p>No hay información disponible.</p>';
        return;
    }
    
    container.innerHTML = items.map((item, index) => 
        createCard(item, type, index)
    ).join('');
    
    container.querySelectorAll('.card').forEach((card, index) => {
        const item = items[index];
        
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'IMG' && e.target.tagName !== 'BUTTON') {
                toggleCard(card, item, type);
            }
        });
        
        if (item.expand && item.images && item.images.length > 0) {
            setTimeout(() => {
                card.classList.add('expanded');
                const expandedContent = createExpandedContent(item);
                card.appendChild(expandedContent);
                
                expandedContent.querySelectorAll('img').forEach(img => {
                    imageObserver.observe(img);
                });
            }, 50);
        }
    });
}

// ========================================
// CREACIÓN DE TARJETAS
// ========================================

function createCard(item, type, index) {
    const years = item.start && item.end 
        ? `${item.start} - ${item.end}` 
        : (item.year || '');
    
    const cardType = item.type || 'labor';
    const iconMap = {
        'labor': '💼',
        'personal': item.icon || '📍',
        'education': '📚',
        'other': '📍',
        'family': item.icon || '👨‍👩‍👧'
    };
    const icon = iconMap[cardType] || '📍';
    
    const html = `
        <div class="card" data-type="${cardType}" data-icon="${icon}">
            <div class="card-header">
                <div>
                    <div class="card-title">${item.title || ''}</div>
                    ${item.organization ? `<div class="card-company">${item.organization}</div>` : ''}
                </div>
                ${years ? `<div class="card-period">${years}</div>` : ''}
            </div>
            ${item.description ? `<div class="card-description">${item.description}</div>` : ''}
            ${item.achievements ? createAchievementsList(item.achievements) : ''}
            ${item.images && item.images.length > 0 ? `<div style="margin-top: 10px; font-size: 12px; color: #999;">📸 ${item.images.length} foto(s)</div>` : ''}
        </div>
    `;
    
    return html;
}

function createAchievementsList(achievements) {
    if (!Array.isArray(achievements)) return '';
    
    const items = achievements
        .map(a => `<li>${a}</li>`)
        .join('');
    
    return `<ul class="card-achievements">${items}</ul>`;
}

// ========================================
// SECCIÓN LOGROS DESTACADOS
// ========================================

function setupAchievementsSection(containerId, items) {
    const container = document.getElementById(containerId);
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p>No hay logros disponibles.</p>';
        return;
    }
    
    container.innerHTML = items.map((item, index) => `
        <div class="card" data-type="achievement">
            <div class="card-header">
                <div>
                    <div class="card-title">${item.title || ''}</div>
                </div>
                ${item.year ? `<div class="card-period">${item.year}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// ========================================
// SECCIÓN CONSTRUCCIONES
// ========================================

function setupConstructionsSection(containerId, items) {
    const container = document.getElementById(containerId);
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p>No hay proyectos disponibles.</p>';
        return;
    }
    
    container.innerHTML = items.map((item, index) => `
        <div class="construction-card">
            <div class="construction-title">${item.name || ''}</div>
            ${item.year ? `<div class="construction-year">${item.year}</div>` : ''}
            ${item.description ? `<div class="construction-description">${item.description}</div>` : ''}
        </div>
    `).join('');
}

// ========================================
// SECCIÓN OTROS MOMENTOS
// ========================================

function setupOtherMomentsSection(containerId, items) {
    const container = document.getElementById(containerId);
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p>No hay momentos disponibles.</p>';
        return;
    }
    
    const item = items[0];
    
    const html = `
        <div class="card" data-type="other">
            <div class="card-header">
                <div>
                    <div class="card-title">${item.title || 'Otros Momentos'}</div>
                </div>
                ${item.images ? `<div class="card-period">📸 ${item.images.length} foto(s)</div>` : ''}
            </div>
            ${item.description ? `<div class="card-description">${item.description}</div>` : ''}
        </div>
    `;
    
    container.innerHTML = html;
    
    if (item.expand && item.images && item.images.length > 0) {
        setTimeout(() => {
            const card = container.querySelector('.card');
            card.classList.add('expanded');
            const expandedContent = createExpandedContent(item);
            card.appendChild(expandedContent);
            
            expandedContent.querySelectorAll('img').forEach(img => {
                imageObserver.observe(img);
            });
        }, 50);
    }
}

// ========================================
// EXPANSIÓN DE TARJETAS
// ========================================

function toggleCard(cardElement, itemData, type) {
    const isExpanded = cardElement.classList.contains('expanded');
    
    document.querySelectorAll('.card.expanded').forEach(card => {
        if (card !== cardElement) {
            card.classList.remove('expanded');
            const expandedContent = card.querySelector('.card-expanded-content');
            if (expandedContent) {
                expandedContent.remove();
            }
        }
    });
    
    if (isExpanded) {
        cardElement.classList.remove('expanded');
        const expandedContent = cardElement.querySelector('.card-expanded-content');
        if (expandedContent) {
            expandedContent.remove();
        }
    } else {
        cardElement.classList.add('expanded');
        const expandedContent = createExpandedContent(itemData);
        cardElement.appendChild(expandedContent);
        
        expandedContent.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function createExpandedContent(itemData) {
    const container = document.createElement('div');
    container.className = 'card-expanded-content';
    
    let html = '';
    
    if (itemData.images && itemData.images.length > 0) {
        const galleryId = 'gallery-' + Math.random().toString(36).substr(2, 9);
        html += `
            <div class="gallery-section">
                <div class="gallery-title">📸 GALERÍA (${itemData.images.length} foto/s)</div>
                <div class="gallery-grid" data-gallery-id="${galleryId}">
                    ${itemData.images.map((img, idx) => `
                        <div class="gallery-thumbnail" onclick="openLightbox(event)">
                            <img 
                                src="${img}"
                                data-full-src="${img}"
                                data-gallery-id="${galleryId}"
                                data-index="${idx}"
                                alt="Fotografía"
                            >
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    return container;
}

// ========================================
// SECCIÓN RECONOCIMIENTOS
// ========================================

function setupRecognitions(recognitionsData) {
    const container = document.getElementById('recognitionsContent');
    
    if (!recognitionsData || !recognitionsData.content) {
        container.innerHTML = '<p>No hay reconocimientos disponibles.</p>';
        return;
    }
    
    container.textContent = recognitionsData.content;
}

// ========================================
// SECCIÓN DOCUMENTOS
// ========================================

function setupDocuments(documentsData) {
    const container = document.getElementById('documentsCards');
    
    if (!documentsData) return;
    
    if (documentsData.files && documentsData.files.length > 0) {
        container.innerHTML = documentsData.files.map((doc, index) => `
            <div class="document-card">
                <div class="document-icon">📄</div>
                <div class="document-name">${doc.name || ''}</div>
                <a href="${doc.path}" class="document-link" download>Descargar</a>
            </div>
        `).join('');
    }
    
    if (documentsData.images && documentsData.images.length > 0) {
        const galleryId = 'gallery-docs-' + Math.random().toString(36).substr(2, 9);
        const html = `
            <div style="margin-top: 40px;">
                <div class="section-header" style="margin-bottom: 20px;">
                    <h3>📸 GALERÍA DE DOCUMENTOS (${documentsData.images.length})</h3>
                </div>
                <div class="gallery-grid" data-gallery-id="${galleryId}">
                    ${documentsData.images.map((img, idx) => `
                        <div class="gallery-thumbnail" onclick="openLightbox(event)">
                            <img 
                                src="${img}"
                                data-full-src="${img}"
                                data-gallery-id="${galleryId}"
                                data-index="${idx}"
                                alt="Documento"
                            >
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('afterend', html);
    }
}

// ========================================
// LIGHTBOX - FUNCIONES PRINCIPALES
// ========================================

const lightboxState = {
    images: [],
    currentIndex: 0,
    galleryId: null,
};

function openLightbox(event) {
    event.stopPropagation();
    
    const img = event.target.closest('img');
    if (!img) return;
    
    const galleryId = img.dataset.galleryId;
    const gallery = document.querySelector(`[data-gallery-id="${galleryId}"]`);
    
    if (!gallery) return;
    
    const allImages = Array.from(gallery.querySelectorAll('img[data-full-src]'));
    lightboxState.images = allImages.map(i => i.dataset.fullSrc || i.src);
    lightboxState.currentIndex = parseInt(img.dataset.index) || 0;
    lightboxState.galleryId = galleryId;
    
    showLightbox();
}

function showLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (lightboxState.images.length === 0) return;
    
    const imageSrc = lightboxState.images[lightboxState.currentIndex];
    lightboxImage.src = imageSrc;
    
    updateLightboxCounter();
    
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
    
    CONFIG.LIGHTBOX_ZOOM = 1;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
    CONFIG.LIGHTBOX_ZOOM = 1;
}

function updateLightboxCounter() {
    document.getElementById('currentIndex').textContent = lightboxState.currentIndex + 1;
    document.getElementById('totalImages').textContent = lightboxState.images.length;
}

function nextImage() {
    lightboxState.currentIndex = (lightboxState.currentIndex + 1) % lightboxState.images.length;
    const img = document.getElementById('lightboxImage');
    img.src = lightboxState.images[lightboxState.currentIndex];
    updateLightboxCounter();
}

function prevImage() {
    lightboxState.currentIndex = (lightboxState.currentIndex - 1 + lightboxState.images.length) % lightboxState.images.length;
    const img = document.getElementById('lightboxImage');
    img.src = lightboxState.images[lightboxState.currentIndex];
    updateLightboxCounter();
}

function zoomImage(factor) {
    const img = document.getElementById('lightboxImage');
    CONFIG.LIGHTBOX_ZOOM = Math.max(1, Math.min(3, CONFIG.LIGHTBOX_ZOOM + factor));
    img.style.transform = `scale(${CONFIG.LIGHTBOX_ZOOM})`;
}

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    
    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', prevImage);
    nextBtn?.addEventListener('click', nextImage);
    zoomInBtn?.addEventListener('click', () => zoomImage(0.2));
    zoomOutBtn?.addEventListener('click', () => zoomImage(-0.2));
    
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
    
    let touchStart = 0;
    lightbox?.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
    });
    
    lightbox?.addEventListener('touchend', (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) nextImage();
        if (touchEnd - touchStart > 50) prevImage();
    });
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCV();
    
    document.querySelectorAll('.card, .construction-card').forEach(el => {
        contentObserver.observe(el);
    });
});

window.addEventListener('load', () => {
    const profileImg = document.getElementById('profileImg');
    if (profileImg?.src) {
        const img = new Image();
        img.src = profileImg.src;
    }
});