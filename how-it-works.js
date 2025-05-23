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
