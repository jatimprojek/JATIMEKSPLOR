// Interaksi

// Fungsi helper untuk memilih elemen (tersedia global)
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return Array.from(document.querySelectorAll(selector)); }

document.addEventListener("DOMContentLoaded", function() {
    // Scroll dan interaksi navbar
    $$('.nav-link').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var id = a.getAttribute('href');
            var target = document.querySelector(id);
            if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});

            // Menutup navbar di mobile setelah klik
            var navlist = $('#Nav-list');
            if (navlist && navlist.style.display === 'flex') {
                navlist.style.display = 'none';
            }
        });
    });
});

// Toggle menu di mobile
var navToggle = $('.Nav-toggle');
var navlist = $('#Nav-list');
if (navToggle && navlist) {
    navToggle.addEventListener('click', function () {
var visible = navlist.style.display === 'flex';
              navlist.style.display = visible ? 'none' : 'flex';
              navlist.style.flexDirection = 'column';
            });
} 

// Tombol menampilkan toast sederhana 
$$('.Feature-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var Feature = btn.dataset.feature || 'fitur';
        showToast('membuka fitur ' + Feature + '!');
    });
});

// Cta mulai jelajah
var exploreBtn = $('#exploreBtn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
        var Features = document.querySelector ('#Features');
        if (Features) Features.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
}

    // --- Pencarian kota di halaman destinasi ---
    var searchInput = $('#searchCity');
    var searchBtn = $('#searchBtn');
    var clearBtn = $('#clearSearch');
    var featuresGrid = document.getElementById('featuresGrid');

    function performSearch() {
        if (!searchInput || !featuresGrid) return;
        var q = searchInput.value.trim().toLowerCase();
        if (!q) { showToast('Masukkan nama kota untuk mencari.'); return; }
        var articles = Array.from(featuresGrid.querySelectorAll('article.card'));
        var found = null;
        for (var i = 0; i < articles.length; i++) {
            var titleEl = articles[i].querySelector('.feature-title');
            var name = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
            if (name.indexOf(q) !== -1) { found = articles[i]; break; }
        }
        if (found) {
            // pindahkan ke atas dan beri highlight
            featuresGrid.prepend(found);
            $$('.highlight').forEach(function(e){ e.classList.remove('highlight'); });
            found.classList.add('highlight');
            found.scrollIntoView({behavior:'smooth', block:'start'});
        } else {
            showToast('Kota tidak ditemukan: ' + searchInput.value, true);
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) searchInput.addEventListener('keydown', function(e){ if (e.key === 'Enter') performSearch(); });
    if (clearBtn) clearBtn.addEventListener('click', function(){ if (searchInput) searchInput.value=''; $$('.highlight').forEach(function(e){ e.classList.remove('highlight'); }); });

//kontak validasi
var contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = $('#name').value.trim();
        var email = $('#email').value.trim();
        var message = $('#message').value.trim();
        if (!name) return showToast('Tolong masukkan nama Anda.');
        if (!message) return showToast('Tolong masukkan pesan Anda.');

        // Kirim via fetch ke Formspree (form action harus berisi endpoint Formspree Anda)
        var action = contactForm.getAttribute('action');
        if (!action || action.indexOf('REPLACE_WITH_FORMSPREE_ENDPOINT') !== -1) {
            showToast('Form belum dikonfigurasi. Ganti endpoint Formspree di HTML terlebih dahulu.', true);
            return;
        }

        var formData = new FormData(contactForm);
        fetch(action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(function(response){
            if (response.ok) {
                showToast('✓ Terima kasih, ' + name + '! Pesan Anda telah dikirim.');
                // Delay reset agar user melihat form kosong = sudah terkirim
                setTimeout(function() {
                    contactForm.reset();
                }, 500);
            } else {
                response.json().then(function(data){
                    showToast('Gagal mengirim: ' + (data.error || 'Coba lagi nanti.'), true);
                }).catch(function(){
                    showToast('Gagal mengirim. Coba lagi nanti.', true);
                });
            }
        }).catch(function(){
            showToast('Terjadi kesalahan jaringan. Coba lagi.', true);
        });
    });

    var resetBtn = $('#resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', function() {contactForm.reset();});
}

// Animasi masuk kartu
var cards = $$('.card');
if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {threshold: 0.15});
    cards.forEach(function(c) { 
        c.style.opacity = 0;
        c.style.transform = 'translateY(18px)';
        c.style.transition = 'all 480ms ease-out';
        observer.observe(c);
    });
} else {
    cards.forEach(function(c) {
        c.style.opacity = 1;});
    }

    // helper toast
    function showToast(message, isError) {
        var toast = $('.toast');
        if (!toast) { alert(message); return; }
        toast.textContent = message;
        toast.classList.remove('hidden');
        toast.style.backgroundColor = isError ? '#e74c3c' : '#1500ffff';
        setTimeout(function() {
            toast.classList.add('hidden');
        }, 3500);
    }

        // Create and append button + modal container
        { 
        var settingsBtn = document.createElement('button');
        settingsBtn.className = 'settings-btn';
        settingsBtn.setAttribute('title','Pengaturan');
        settingsBtn.innerHTML = '⚙';
        document.body.appendChild(settingsBtn);

        var modalWrap = document.createElement('div');
        modalWrap.className = 'settings-modal hidden';
        modalWrap.innerHTML = modalHTML;
        document.body.appendChild(modalWrap);

        var themeSwitch = modalWrap.querySelector('#themeSwitch');
        var langButtons = modalWrap.querySelectorAll('.lang-option');
        var closeBtn = modalWrap.querySelector('.modal-close');
        }
                
        { function applyLang(lang){
                var t = translations[lang] || translations['id'];
                // nav links (if present)
                var navLinks = document.querySelectorAll('.nav-link');
                if (navLinks.length >= 1) {
                        if (navLinks[0]) navLinks[0].textContent = t.home;
                        if (navLinks[1]) navLinks[1].textContent = t.features;
                        if (navLinks[2]) navLinks[2].textContent = t.contact;
                }
                var heroTitle = document.querySelector('.hero-title'); if (heroTitle) heroTitle.textContent = t.heroTitle;
                var heroSub = document.querySelector('.hero-subtitle'); if (heroSub) heroSub.textContent = t.heroSubtitle;
                var features = document.querySelectorAll('.feature-title');
                if (features[0]) features[0].textContent = t.feature1;
                if (features[1]) features[1].textContent = t.feature2;
                if (features[2]) features[2].textContent = t.feature3;
                // quiz titles
                var quizTitles = document.querySelectorAll('#quiz .feature-title');
                // contact labels
                var nameLabel = document.querySelector('label[for="name"]'); if (nameLabel) nameLabel.textContent = t.labelName;
                var emailLabel = document.querySelector('label[for="email"]'); if (emailLabel) emailLabel.textContent = t.labelEmail;
                var msgLabel = document.querySelector('label[for="message"]'); if (msgLabel) msgLabel.textContent = t.labelMessage;
                var submitBtn = document.querySelector('form button[type="submit"]'); if (submitBtn) submitBtn.textContent = t.send;
                var resetBtn = document.querySelector('#ResetBtn') || document.querySelector('#resetBtn'); if (resetBtn) resetBtn.textContent = t.reset;
                // about text in modal
                var aboutTextEl = document.getElementById('aboutText'); if (aboutTextEl) aboutTextEl.textContent = t.aboutText;

                // persist
                localStorage.setItem('lang', lang);
                // mark active button
                langButtons.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-lang')===lang); });
        }

        function applyTheme(theme){
                if (theme === 'dark'){
                        document.documentElement.classList.add('dark-theme');
                        if (themeSwitch) themeSwitch.classList.add('on');
                        if (themeSwitch) themeSwitch.setAttribute('aria-checked','true');
                } else {
                        document.documentElement.classList.remove('dark-theme');
                        if (themeSwitch) themeSwitch.classList.remove('on');
                        if (themeSwitch) themeSwitch.setAttribute('aria-checked','false');
                }
                localStorage.setItem('theme', theme);
        }

        // Load saved preferences
        var savedTheme = localStorage.getItem('theme') || 'light';
        var savedLang = localStorage.getItem('lang') || 'id';
        applyTheme(savedTheme);
        applyLang(savedLang);

        // Events
        settingsBtn.addEventListener('click', function(){ modalWrap.classList.remove('hidden'); });
        closeBtn.addEventListener('click', function(){ modalWrap.classList.add('hidden'); });
        modalWrap.addEventListener('click', function(e){ if (e.target === modalWrap) modalWrap.classList.add('hidden'); });

        langButtons.forEach(function(b){ b.addEventListener('click', function(){ var lang = b.getAttribute('data-lang'); applyLang(lang); showToast('Bahasa diubah: ' + (lang || 'id')); }); });

        if (themeSwitch) {
                themeSwitch.addEventListener('click', function(){ var on = themeSwitch.classList.toggle('on'); applyTheme(on ? 'dark' : 'light'); showToast('Tema ' + (on ? 'gelap' : 'terang')); });
        }

        // Expose small API for other scripts if needed
        window.JATIMEKSPLOR = window.JATIMEKSPLOR || {};
        window.JATIMEKSPLOR.applyLang = applyLang;
        window.JATIMEKSPLOR.applyTheme = applyTheme;

}

