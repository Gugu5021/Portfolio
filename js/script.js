document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const header = document.querySelector('header');
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const contactForm = document.getElementById('contact-form');

    // Fonction pour gérer le scroll et l'en-tête sticky
    function handleScroll() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    }

    // Écouteur d'événement pour le scroll
    window.addEventListener('scroll', handleScroll);

    // Fonction pour le menu burger
    burgerMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animation du burger menu
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate-down');
        bars[1].classList.toggle('fade-out');
        bars[2].classList.toggle('rotate-up');
    });

    // Fermer le menu mobile quand un lien est cliqué
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Système de filtrage des projets
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active des autres boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            // Obtenir la catégorie à filtrer
            const filterValue = btn.getAttribute('data-filter');
            
            // Filtrer les projets
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gestion du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Valider les données (exemple simple)
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simulation d'envoi d'email (à remplacer par votre propre logique d'envoi)
            alert(`Merci pour votre message, ${name}! Nous vous répondrons prochainement.`);
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }

    // Animation au scroll - éléments qui apparaissent lors du défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15
    });

    // Sélectionner tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.section > .container > *:not(.section-title)');
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Mise à jour active de navigation lors du défilement
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typographie animée pour le texte d'accueil
    function initTypeWriter() {
        const profession = document.querySelector('.profession');
        if (!profession) return;
        
        const professions = ['Développeur', 'Freelance', 'Créateur Numérique'];
        let currentProfIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const current = professions[currentProfIndex];
            
            if (isDeleting) {
                profession.textContent = current.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                profession.textContent = current.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === current.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause avant suppression
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentProfIndex = (currentProfIndex + 1) % professions.length;
                typingSpeed = 500; // Pause avant prochain mot
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
    
    // Initialiser l'effet de typographie
    initTypeWriter();
    
    // Fonction pour gérer le téléchargement du CV
    function setupCVDownload() {
        const cvButton = document.querySelector('a[href="cv.pdf"]');
        if (!cvButton) return;
        
        cvButton.addEventListener('click', function(e) {
            // Détecter si le navigateur peut télécharger directement
            const isDownloadSupported = 'download' in document.createElement('a');
            
            if (!isDownloadSupported) {
                // Si le téléchargement n'est pas supporté directement, ouvrir dans un nouvel onglet
                e.preventDefault();
                window.open(this.href, '_blank');
            }
            
            // Ajouter un suivi d'événement si nécessaire
            console.log('CV téléchargé');
            
            // Animation feedback visuel
            this.classList.add('download-started');
            setTimeout(() => {
                this.classList.remove('download-started');
            }, 1500);
        });
    }
    
    // Initialiser le téléchargement du CV
    setupCVDownload();
});