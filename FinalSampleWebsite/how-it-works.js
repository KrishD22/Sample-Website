<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  const progressSteps = document.querySelectorAll('.progress-step-vertical');
  // Animate top text
  const pageTitle = document.querySelector('.page-title');
  const easySteps = document.querySelector('.easy-steps-message');

  // Remove animation classes so we can trigger them
  pageTitle.style.opacity = '0';
  easySteps.style.opacity = '0';

  setTimeout(() => {
    pageTitle.style.animationPlayState = 'running';
    easySteps.style.animationPlayState = 'running';
  }, 100);

  function revealSteps() {
    steps.forEach((step, idx) => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        // Only add .visible if not already present to avoid animation reset
        if (!step.classList.contains('visible')) {
          setTimeout(() => {
            step.classList.add('visible');
            step.style.animationDelay = `${idx * 0.15}s`;
          }, 50);
        }
        progressSteps[idx].classList.add('active');
        for (let i = 0; i < idx; i++) {
          progressSteps[i].classList.add('completed');
        }
      } else {
        step.classList.remove('visible');
        step.style.animationDelay = '0s';
        progressSteps[idx].classList.remove('active');
        for (let i = 0; i < idx; i++) {
          progressSteps[i].classList.remove('completed');
        }
      }
    });
  }

  revealSteps();

  window.addEventListener('scroll', () => {
    revealSteps();
  });

  steps.forEach(step => {
    step.setAttribute('tabindex', '0');
  });
});
=======
document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  const progressSteps = document.querySelectorAll('.progress-step-vertical');
  const parallaxImgs = document.querySelectorAll('.parallax-img');

  function revealSteps() {
    steps.forEach((step, idx) => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        step.classList.add('visible');
        progressSteps[idx].classList.add('active');
        for (let i = 0; i < idx; i++) {
          progressSteps[i].classList.add('completed');
        }
      } else {
        step.classList.remove('visible');
        progressSteps[idx].classList.remove('active');
        for (let i = 0; i < idx; i++) {
          progressSteps[i].classList.remove('completed');
        }
      }
    });
  }

  function parallax() {
    parallaxImgs.forEach(img => {
      const rect = img.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * 0.08;
      img.style.transform = `translateY(${offset}px) scale(1.05)`;
    });
  }

  revealSteps();
  parallax();

  window.addEventListener('scroll', () => {
    revealSteps();
    parallax();
  });

  steps.forEach(step => {
    step.setAttribute('tabindex', '0');
  });
});
>>>>>>> cbfb0d9 (Add files via upload)
