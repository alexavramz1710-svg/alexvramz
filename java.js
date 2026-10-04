// =========================================================
// MOBILE MENU
// =========================================================

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('active');
    }
}

document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
        const nav = document.querySelector('.nav-links');
        if (nav) {
            nav.classList.remove('active');
        }
    });
});

const projectImages = {
    'Tails of Freedom': [
        'images/TOF/tails1.jpeg',
        'images/TOF/tails2.jpeg',
        'images/TOF/tails3.jpeg',
        'images/TOF/tails4.jpeg',
        'images/TOF/tails5.jpeg'
    ],
    'Activity & Exercise Tracker': [
        'images/Activity%20and%20Exercise%20Tracker/1.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/2.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/3.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/4.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/5.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/6.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/7.jpeg',
        'images/Activity%20and%20Exercise%20Tracker/8.jpeg'
    ]
};

function showProject(project) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const text = document.getElementById('modalText');
    const gallery = document.getElementById('modalGallery');

    if (!modal || !title || !text || !gallery) {
        return;
    }

    title.textContent = project;

    if (project === 'Tails of Freedom') {
        text.textContent = 'Tails of Freedom is a web-based animal adoption management system designed to manage pet records, adoption applications, donation records, and gallery content. The project focuses on organizing information and creating a more convenient management process.';
    } else if (project === 'Activity & Exercise Tracker') {
        text.textContent = 'Activity & Exercise Tracker is a digital activity tracking concept designed to help users organize their daily physical activities and monitor personal progress through a simple and user-friendly interface.';
    } else {
        text.textContent = 'This project showcases my interest in software design, web development, and creating practical digital interfaces.';
    }

    gallery.innerHTML = '';

    const images = projectImages[project] || [];
    images.forEach(function (src) {
        const card = document.createElement('div');
        const img = document.createElement('img');
        img.src = src;
        img.alt = project + ' screenshot';
        card.appendChild(img);
        gallery.appendChild(card);
    });

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    if (!document.getElementById('certificateModal') || document.getElementById('certificateModal').style.display === 'none') {
        document.body.style.overflow = '';
    }
}

function openCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    if (!document.getElementById('projectModal') || document.getElementById('projectModal').style.display === 'none') {
        document.body.style.overflow = '';
    }
}

function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    if ((!document.getElementById('projectModal') || document.getElementById('projectModal').style.display === 'none') && (!document.getElementById('certificateModal') || document.getElementById('certificateModal').style.display === 'none')) {
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    closeProjectModal();
    closeCertificateModal();
    closeResumeModal();
    const anyOpen = document.getElementById('projectModal').style.display === 'flex' || document.getElementById('certificateModal').style.display === 'flex' || document.getElementById('resumeModal').style.display === 'flex';
    if (!anyOpen) document.body.style.overflow = '';
}

window.addEventListener('click', function (event) {
    const modals = [
        document.getElementById('projectModal'),
        document.getElementById('certificateModal'),
        document.getElementById('resumeModal')
    ];

    modals.forEach(function (modal) {
        if (modal && event.target === modal) {
            if (modal.id === 'projectModal') closeProjectModal();
            if (modal.id === 'certificateModal') closeCertificateModal();
            if (modal.id === 'resumeModal') closeResumeModal();
        }
    });
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeProjectModal();
        closeCertificateModal();
        closeResumeModal();
        document.body.style.overflow = '';
    }
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const name = nameInput ? nameInput.value.trim() : 'there';

        alert('Thank you, ' + name + '! Your message has been received.');
        contactForm.reset();
    });
}

const photoInput = document.getElementById('photoInput');
const profilePlaceholder = document.querySelector('.profile-placeholder');
const profileInitials = document.querySelector('.profile-initials');
const uploadHint = document.querySelector('.upload-hint');

function displayProfilePhoto(file) {
    if (!file || !profilePlaceholder) {
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        let image = profilePlaceholder.querySelector('.profile-photo');

        if (!image) {
            image = document.createElement('img');
            image.className = 'profile-photo';
            image.alt = 'Alexa Vileta Ramirez profile photo';
            profilePlaceholder.appendChild(image);
        }

        image.src = event.target.result;

        if (profileInitials) {
            profileInitials.classList.add('hidden');
        }

        if (uploadHint) {
            uploadHint.textContent = 'Change Photo';
        }
    };

    reader.readAsDataURL(file);
}

if (photoInput) {
    photoInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        displayProfilePhoto(file);
    });
}

if (profilePlaceholder) {
    profilePlaceholder.addEventListener('dragover', function (event) {
        event.preventDefault();
        profilePlaceholder.classList.add('dragging');
    });

    profilePlaceholder.addEventListener('dragleave', function () {
        profilePlaceholder.classList.remove('dragging');
    });

    profilePlaceholder.addEventListener('drop', function (event) {
        event.preventDefault();
        profilePlaceholder.classList.remove('dragging');

        const file = event.dataTransfer.files[0];
        displayProfilePhoto(file);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Alexa Vileta Ramirez portfolio loaded successfully.');
});