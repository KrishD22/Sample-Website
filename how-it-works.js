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
