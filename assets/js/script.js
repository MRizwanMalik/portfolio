'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Scroll reveal: add .revealed when .reveal elements enter viewport
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealElements.forEach((el) => revealObserver.observe(el));

// Skill bars: animate width when resume/skills section is in view (Kamran-style)
const skillsSection = document.querySelector(".skill");
const skillFills = document.querySelectorAll("[data-skill-fill]");
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skills-item").forEach((item) => {
          const fill = item.querySelector("[data-skill-fill]");
          const valueEl = item.querySelector(".title-wrapper data");
          if (fill && valueEl) {
            const value = valueEl.getAttribute("value") || 0;
            fill.style.width = value + "%";
          }
        });
      }
    });
  },
  { threshold: 0.2 }
);
if (skillsSection) skillBarObserver.observe(skillsSection);



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.querySelectorAll(".reveal").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("revealed");
        });
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Video fullscreen modal: click video -> open modal with skip/seek and fullscreen
const videoModal = document.querySelector("[data-video-overlay]");
const videoPlayer = document.querySelector("[data-video-player]");
const videoClose = document.querySelector("[data-video-close]");
const videoSkipBack = document.querySelector("[data-video-skip-back]");
const videoSkipFwd = document.querySelector("[data-video-skip-fwd]");
const videoFullscreen = document.querySelector("[data-video-fullscreen]");

function openVideoModal(src) {
  if (!videoModal || !videoPlayer) return;
  videoPlayer.src = src;
  videoPlayer.muted = false;
  videoModal.classList.add("active");
  videoPlayer.play().catch(() => {});
}

function closeVideoModal() {
  if (!videoModal || !videoPlayer) return;
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoModal.classList.remove("active");
}

document.querySelectorAll("[data-project-video]").forEach((v) => {
  v.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const src = this.currentSrc || (this.querySelector("source") && this.querySelector("source").src);
    if (src) openVideoModal(src);
  });
});

if (videoClose) videoClose.addEventListener("click", closeVideoModal);
if (videoModal) {
  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoModal.classList.contains("active")) closeVideoModal();
  });
}

if (videoSkipBack) videoSkipBack.addEventListener("click", function () {
  if (videoPlayer) { videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 10); }
});
if (videoSkipFwd) videoSkipFwd.addEventListener("click", function () {
  if (videoPlayer) { videoPlayer.currentTime = Math.min(videoPlayer.duration || 0, videoPlayer.currentTime + 10); }
});

if (videoFullscreen) videoFullscreen.addEventListener("click", function () {
  if (!videoPlayer) return;
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen ? videoPlayer.requestFullscreen() : videoPlayer.webkitRequestFullScreen?.();
  } else {
    document.exitFullscreen?.();
  }
});