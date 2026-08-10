/* ==========================================================================
   PPG PRAJABATAN E-PORTFOLIO APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavigation();
  initTimelines();
  initOverallJourney();
  initProjectsGrid();
  initDocumentRepository();
  initModals();
  initScrollReveal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   01. SCROLL PROGRESS INDICATOR & BACK TO TOP
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   02. NAVIGATION & ACTIVE SECTION OBSERVER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when link clicked
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   03. TIMELINE & REFLECTIONS (SEMESTER 1 & SEMESTER 2)
   -------------------------------------------------------------------------- */
function initTimelines() {
  renderSemesterTimeline('semester1Container', reflectionsData.semester1);
  renderSemesterTimeline('semester2Container', reflectionsData.semester2);
}

function renderSemesterTimeline(containerId, courses) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = courses.map((course, index) => `
    <div class="timeline-item reveal-on-scroll">
      <div class="timeline-marker"></div>
      <div class="reflection-card">
        <div class="reflection-card-header">
          <div>
            <div class="course-meta">
              <span class="course-code">${course.code}</span>
              <span class="badge badge-gold">Capaian Reflektif</span>
            </div>
            <h3 class="course-title">${course.title}</h3>
          </div>
        </div>

        <p class="lead-text" style="font-size: 0.95rem; margin-bottom: 1rem;">${course.summary}</p>

        <div class="framework-content-box" id="content-${course.id}">
          <p><strong>Artefak Bukti Belajar:</strong> ${course.framework.artefak}</p>
        </div>

        <div class="reflection-actions">
          <button class="btn btn-secondary btn-read-reflection" data-course-id="${course.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Read Full Reflection
          </button>
          <button class="btn btn-gold btn-view-artifact" data-course-id="${course.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            View Artifact
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Attach click events for modal triggers
  container.querySelectorAll('.btn-read-reflection').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.dataset.courseId;
      openReflectionModal(courseId);
    });
  });

  container.querySelectorAll('.btn-view-artifact').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.dataset.courseId;
      openArtifactModal(courseId);
    });
  });
}

/* --------------------------------------------------------------------------
   04. OVERALL JOURNEY STEPPER
   -------------------------------------------------------------------------- */
function initOverallJourney() {
  const steps = [
    { title: "Awal PPG", desc: "Komitmen Mengabdi" },
    { title: "Mengenal Diri", desc: "Refleksi Jatidiri" },
    { title: "Memahami Peserta Didik", desc: "Asesmen Diagnostik" },
    { title: "Memahami Pedagogi", desc: "UbD & Diferensiasi" },
    { title: "Praktik Mengajar", desc: "PPL Terbimbing & Mandiri" },
    { title: "Refleksi", desc: "Evaluasi Ketercapaian" },
    { title: "Inovasi", desc: "Desain Media & Action" },
    { title: "Guru Profesional", desc: "Pendidik Transformatif" }
  ];

  const stepperContainer = document.getElementById('journeyStepper');
  if (stepperContainer) {
    stepperContainer.innerHTML = steps.map((s, idx) => `
      <div class="journey-step">
        <div class="journey-node">${idx + 1}</div>
        <div class="journey-label">${s.title}<br><span style="font-size: 0.7rem; color: var(--color-text-secondary); font-weight: normal;">${s.desc}</span></div>
      </div>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   05. PROJECTS GRID & MODAL
   -------------------------------------------------------------------------- */
function initProjectsGrid() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  container.innerHTML = projectsData.map(proj => `
    <div class="project-card reveal-on-scroll">
      <div class="project-thumb-container">
        <div class="project-thumb-icon">💡</div>
        <span class="project-badge-tag">${proj.tag}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-title">${proj.title}</h3>
        <div class="project-detail-row">
          <strong>Permasalahan:</strong> ${proj.problem}
        </div>
        <div class="project-detail-row">
          <strong>Solusi Inovatif:</strong> ${proj.solution}
        </div>
        <div class="project-detail-row" style="margin-top: 0.5rem;">
          <span class="badge badge-primary">${proj.techUsed}</span>
        </div>
        <div class="project-card-footer">
          <button class="btn btn-primary btn-sm btn-view-project" data-proj-id="${proj.id}" style="width: 100%;">
            View Project Details
          </button>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      openProjectModal(btn.dataset.projId);
    });
  });
}

/* --------------------------------------------------------------------------
   06. DOCUMENT REPOSITORY & FILTERS
   -------------------------------------------------------------------------- */
function initDocumentRepository() {
  const container = document.getElementById('docGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  function renderDocs(category = 'ALL') {
    const filtered = category === 'ALL' 
      ? documentsData 
      : documentsData.filter(d => d.category === category);

    container.innerHTML = filtered.map(doc => `
      <div class="doc-card reveal-on-scroll">
        <div class="doc-icon-header">
          <div class="doc-icon">${doc.icon}</div>
          <span class="badge badge-gold">${doc.categoryLabel}</span>
        </div>
        <h4 class="doc-title">${doc.title}</h4>
        <p class="doc-desc">${doc.description}</p>
        <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
          📅 ${doc.date} &nbsp;•&nbsp; 📁 ${doc.fileType}
        </div>
        <div class="doc-actions">
          <button class="btn btn-secondary btn-sm btn-view-doc" data-doc-id="${doc.id}" style="flex: 1;">
            Preview
          </button>
          <button class="btn btn-primary btn-sm btn-download-doc" data-doc-id="${doc.id}">
            Download
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-view-doc').forEach(btn => {
      btn.addEventListener('click', () => openDocViewerModal(btn.dataset.docId));
    });

    container.querySelectorAll('.btn-download-doc').forEach(btn => {
      btn.addEventListener('click', () => triggerDownloadSimulation(btn.dataset.docId));
    });
  }

  renderDocs('ALL');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDocs(btn.dataset.filter);
    });
  });
}

/* --------------------------------------------------------------------------
   07. MODAL DIALOGS
   -------------------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalCloseBtn');

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }
}

function openModal(title, bodyHTML, footerHTML = '') {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  if (modalTitle) modalTitle.textContent = title;
  if (modalBody) modalBody.innerHTML = bodyHTML;
  if (modalFooter) modalFooter.innerHTML = footerHTML;

  if (modalOverlay) {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }
}

/* Modal Content Generators */
function openReflectionModal(courseId) {
  const allCourses = [...reflectionsData.semester1, ...reflectionsData.semester2];
  const course = allCourses.find(c => c.id === courseId);
  if (!course) return;

  const html = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-primary">${course.code}</span>
      <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${course.title}</h3>
      <p class="lead-text">${course.summary}</p>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="background: var(--color-gold-light); padding: 1.25rem; border: 1px solid var(--color-gold); border-radius: 6px;">
        <h4 style="color: var(--color-dark); margin-bottom: 0.4rem;">📎 Artefak Bukti Belajar</h4>
        <p><strong>${course.artifactTitle}</strong> (${course.artifactType})</p>
        <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-top: 0.5rem; line-height: 1.6;">${course.framework.artefak}</p>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-gold" onclick="openArtifactModal('${course.id}')">View Related Artifact</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal(`Analisis Reflektif — ${course.title}`, html, footer);
}

function openArtifactModal(courseId) {
  const allCourses = [...reflectionsData.semester1, ...reflectionsData.semester2];
  const course = allCourses.find(c => c.id === courseId);
  if (!course) return;

  const html = `
    <div class="doc-viewer-sim">
      <div style="margin-bottom: 1rem;">
        <span class="badge badge-gold">Official PPG Artifact Evidence</span>
        <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${course.artifactTitle}</h3>
        <p class="caption-text">Mata Kuliah: ${course.title} (${course.code})</p>
      </div>

      <div class="doc-sheet-paper">
        <h4 style="border-bottom: 2px solid var(--color-gold); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--color-primary);">
          DOKUMEN BUKTI CAPAIAN PEMBELAJARAN
        </h4>
        <p><strong>Nama Mahasiswa:</strong> [NAMA LENGKAP]</p>
        <p><strong>NIM:</strong> [NIM]</p>
        <p><strong>Program Studi:</strong> [PROGRAM STUDI]</p>
        <p><strong>Jenis Artefak:</strong> ${course.artifactType}</p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px dashed #CBD5E1;">
        <p><strong>Deskripsi Singkat Artefak:</strong></p>
        <p style="background: #F8FAFC; padding: 1rem; border-radius: 6px; font-size: 0.9rem;">${course.framework.artefak}</p>
        <p style="margin-top: 1rem;"><strong>Dampak Pembelajaran:</strong> Memberikan bukti terukur atas kemampuan perancangan, pelaksanaan, dan refleksi pedagogis sesuai standar lulusan Guru Profesional PPG Prajabatan.</p>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-primary" onclick="triggerDownloadSimulation('${course.id}')">Download Artifact PDF</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal(`Artefak Pembelajaran — ${course.code}`, html, footer);
}

function openProjectModal(projId) {
  const proj = projectsData.find(p => p.id === projId);
  if (!proj) return;

  const html = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-gold">${proj.tag}</span>
      <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${proj.title}</h3>
      <p class="lead-text">${proj.details}</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="background: #FFF5F5; border-left: 4px solid #E53E3E; padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: #9B2C2C; margin-bottom: 0.4rem;">⚠️ Permasalahan Pembelajaran</h4>
        <p>${proj.problem}</p>
      </div>

      <div style="background: #F0FFF4; border-left: 4px solid var(--color-green); padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: var(--color-green); margin-bottom: 0.4rem;">💡 Solusi & Kebaharuan (Inovasi)</h4>
        <p>${proj.solution}</p>
        <p style="margin-top: 0.5rem; font-size: 0.9rem;"><strong>Elemen Inovatif:</strong> ${proj.innovation}</p>
      </div>

      <div style="background: var(--color-primary-light); padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: var(--color-primary); margin-bottom: 0.4rem;">🛠️ Teknologi & Tools Digunakan</h4>
        <p style="font-weight: 600;">${proj.techUsed}</p>
      </div>

      <div style="background: var(--color-gold-light); padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: var(--color-dark); margin-bottom: 0.4rem;">📈 Impact / Dampak Terukur</h4>
        <p>${proj.impact}</p>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-primary" onclick="alert('Membuka dokumentasi lengkap proyek inovasi...')">View Full Documentation</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal(`Karya Inovasi — ${proj.title}`, html, footer);
}

function openDocViewerModal(docId) {
  const doc = documentsData.find(d => d.id === docId);
  if (!doc) return;

  const html = `
    <div class="doc-viewer-sim">
      <span class="badge badge-gold">${doc.categoryLabel}</span>
      <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${doc.title}</h3>
      <p class="caption-text">Tanggal: ${doc.date} | Format: ${doc.fileType}</p>

      <div class="doc-sheet-paper" style="margin-top: 1.5rem;">
        <h4 style="border-bottom: 2px solid var(--color-gold); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--color-primary);">
          PREVIEW DOKUMEN REPOSITORI AKADEMIK
        </h4>
        <pre style="white-space: pre-wrap; font-family: var(--font-body); font-size: 0.9rem; color: var(--color-text-primary); line-height: 1.6;">${doc.contentSnippet}</pre>
        
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.8rem; color: var(--color-text-secondary);">
          * Dokumen ini terverifikasi secara legal sebagai hasil karya portofolio akademik PPG Prajabatan.
        </div>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-primary" onclick="triggerDownloadSimulation('${doc.id}')">Download File (${doc.fileType})</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal(`Document Viewer — ${doc.title}`, html, footer);
}

function triggerDownloadSimulation(id) {
  alert(`[SIMULASI DOWNLOAD] Mengunduh berkas portofolio resmi ID: ${id}. Berkas siap digunakan untuk keperluan asesmen LPTK.`);
}

window.openSummaryModal = function() {
  const html = `
    <div style="text-align: center; padding: 1rem 0;">
      <img src="asset/IMG_4645.JPG" alt="Foto Profil Mahasiswa" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; object-position: center top; margin: 0 auto 1rem auto; border: 2px solid var(--color-gold); display: block;">
      <h3 style="color: var(--color-dark);">PORTOFOLIO AKADEMIK PPG PRAJABATAN</h3>
      <p style="font-weight: 600; color: var(--color-primary);">[NAMA LENGKAP] | NIM: [NIM]</p>
      <p class="caption-text">Program Studi: [PROGRAM STUDI] | Lokasi PPL: [LOKASI PPL]</p>
    </div>

    <div style="background: var(--color-bg); padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
      <h4 style="color: var(--color-dark); margin-bottom: 0.75rem;">Ringkasan Capaian Portofolio:</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.925rem; line-height: 1.8;">
        <li><strong>Total Mata Kuliah Direfleksikan:</strong> 11 Mata Kuliah (Semester 1 & 2)</li>
        <li><strong>Kerangka Refleksi:</strong> Refleksi Akademik & Artefak Bukti Belajar</li>
        <li><strong>Karya Inovasi Utama:</strong> Media AR GeoNusantara, Modul UbD, App Asesmen</li>
        <li><strong>Projek Kepemimpinan:</strong> Pojok Baca & Literasi Inklusif Komunitas</li>
        <li><strong>Status Penilaian LPTK:</strong> Lengkap & Terverifikasi (2026)</li>
      </ul>
    </div>
  `;

  const footer = `
    <button class="btn btn-primary" onclick="alert('Mengunduh Ringkasan Cetak Portofolio PDF...')">Download Summary PDF</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal('Ringkasan Portofolio Akademik PPG', html, footer);
};

/* --------------------------------------------------------------------------
   08. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   09. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Pesan dan undangan kolaborasi Anda telah berhasil terkirim.');
      form.reset();
    });
  }
}
