// Keep project screenshots in one place so they are easy to update.
const projectDetails = {
    'Tails of Freedom': {
        description: 'A web-based animal adoption management system designed to organize pet records, adoption applications, donation records, and gallery content.',
        images: [
            'images/TOF/tails1.jpeg',
            'images/TOF/tails2.jpeg',
            'images/TOF/tails3.jpeg',
            'images/TOF/tails4.jpeg',
            'images/TOF/tails5.jpeg'
        ]
    },
    'Activity & Exercise Tracker': {
        description: 'A digital activity and exercise tracking system designed to help users organize daily activities and monitor their progress.',
        images: [
            'images/Activity%20and%20Exercise%20Tracker/1.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/2.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/3.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/4.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/5.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/6.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/7.jpeg',
            'images/Activity%20and%20Exercise%20Tracker/8.jpeg'
        ]
    }
};

const projectModal = document.getElementById('projectModal');
const certificateModal = document.getElementById('certificateModal');
const resumeModal = document.getElementById('resumeModal');

function setModal(modal, isOpen) {
    if (!modal) return;
    modal.style.display = isOpen ? 'flex' : 'none';
    modal.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
        modal.querySelector('.modal-close')?.focus();
    }
}

function showProject(projectName) {
    const project = projectDetails[projectName];
    const title = document.getElementById('modalTitle');
    const text = document.getElementById('modalText');
    const gallery = document.getElementById('modalGallery');
    if (!project || !title || !text || !gallery) return;

    title.textContent = projectName;
    text.textContent = project.description;
    gallery.replaceChildren();

    project.images.forEach((imagePath, index) => {
        const image = document.createElement('img');
        image.src = imagePath;
        image.alt = `${projectName} screenshot ${index + 1}`;
        gallery.appendChild(image);
    });

    setModal(projectModal, true);
}

function closeProjectModal() { setModal(projectModal, false); }
function openCertificateModal() { setModal(certificateModal, true); }
function closeCertificateModal() { setModal(certificateModal, false); }
function openResumeModal() { setModal(resumeModal, true); }
function closeResumeModal() { setModal(resumeModal, false); }

// The existing buttons use these named handlers to keep the HTML straightforward.
window.showProject = showProject;
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;
window.closeProjectModal = closeProjectModal;

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        menuButton?.setAttribute('aria-expanded', 'false');
        menuButton?.setAttribute('aria-label', 'Open navigation menu');
    });
});

document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) setModal(modal, false);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        [projectModal, certificateModal, resumeModal].forEach((modal) => setModal(modal, false));
    }
});

// Use the visitor's email app instead of pretending a static form sends messages.
document.getElementById('contactForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:alexav.ramz@yahoo.com?subject=${subject}&body=${body}`;
});

// Replace missing optional image files with a readable visual fallback.
document.querySelectorAll('img').forEach((image) => {
    image.addEventListener('error', () => {
        if (image.classList.contains('profile-photo')) {
            image.closest('.profile-placeholder')?.classList.add('image-missing');
        } else {
            image.hidden = true;
        }
    });
    image.addEventListener('load', () => {
        if (image.classList.contains('profile-photo')) {
            image.closest('.profile-placeholder')?.classList.add('has-image');
        }
    });

    if (image.complete) {
        image.dispatchEvent(new Event(image.naturalWidth ? 'load' : 'error'));
    }
});

// Reveal content as it enters view, while keeping reduced-motion users in mind.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}
