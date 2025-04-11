// Swiper initialization
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: {
            nextEl: '.promo-slider-next',
            prevEl: '.promo-slider-prev',
        },
        slidesPerView: 1,
        spaceBetween: 0,
    });
});

// Sticky elements initialization 111
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".sticky-element").forEach(el => {
        if (!el.hasAttribute("data-margin-top")) {
            el.setAttribute("data-margin-top", "150");
        }

        let parentContainer = el.closest("[data-sticky-container]") || el.parentElement;
        if (parentContainer && !parentContainer.hasAttribute("data-sticky-container")) {
            parentContainer.setAttribute("data-sticky-container", "");
        }
    });

    var sticky = new Sticky(".sticky-element");

    document.querySelectorAll("[data-sticky-container]").forEach(container => {
        new ResizeObserver(() => {
            sticky.update();
        }).observe(container);
    });
});

// Action button visibility
document.addEventListener('DOMContentLoaded', function () {
    const actionContainer = document.getElementById('actionContainer');

    function checkScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight / 2;

        if (scrollY >= viewportHeight) {
            actionContainer.classList.add('visible');
        } else {
            actionContainer.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// FAQ functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqTitle = document.getElementById('faqTitle');
    const faqDesc = document.getElementById('faqDesc');

    if (faqTitle) {
        const targetTitle = document.querySelector('.faq__title > .content > h2');
        if (targetTitle) {
            targetTitle.textContent = faqTitle.textContent.trim();
            faqTitle.remove();
        }
    }

    if (faqDesc) {
        const targetDesc = document.querySelector('.faq__title > .content > p');
        if (targetDesc) {
            targetDesc.textContent = faqDesc.textContent.trim();
            faqDesc.remove();
        }
    }

    const faqContent = document.getElementById('faqContent');
    const faqItemsContainer = document.querySelector('.faq__items');

    if (faqContent && faqItemsContainer) {
        faqItemsContainer.innerHTML = '';

        const faqElements = faqContent.querySelectorAll('.faqContent__el');

        faqElements.forEach(el => {
            const questionNumber = el.querySelector('.faqContent__n') ? el.querySelector('.faqContent__n').textContent.trim() + '. ' : '';
            const questionText = el.querySelector('.faqContent__q') ? el.querySelector('.faqContent__q').textContent.trim() : '';
            const answerText = el.querySelector('.faqContent__a') ? el.querySelector('.faqContent__a').innerHTML.trim() : '';

            if (questionText && answerText) {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');

                const faqButton = document.createElement('button');
                faqButton.classList.add('faq-item__btn', 'sm-head');
                faqButton.innerHTML = `${questionNumber}${questionText} <i></i>`;

                const faqHidden = document.createElement('div');
                faqHidden.classList.add('faq-item__hidden');

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('content');
                contentDiv.innerHTML = answerText;

                faqHidden.appendChild(contentDiv);
                faqItem.appendChild(faqButton);
                faqItem.appendChild(faqHidden);
                faqItemsContainer.appendChild(faqItem);
            }
        });

        faqContent.remove();
    }
});

// Statistics counter animation
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.statistic-item-title__num');

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function animateCounter(counter) {
        const targetValue = counter.dataset.target;

        if (isNaN(targetValue)) {
            return;
        }

        const target = +targetValue;
        const duration = 2000;
        const increment = Math.ceil(target / (duration / 16));
        let current = 0;

        function updateCounter() {
            current += increment;

            if (current >= target) {
                counter.textContent = formatNumber(target);
            } else {
                counter.textContent = formatNumber(current);
                requestAnimationFrame(updateCounter);
            }
        }

        counter.textContent = '0';
        updateCounter();
    }

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    };

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    counters.forEach(counter => {
        const targetValue = counter.dataset.target;

        if (!isNaN(targetValue)) {
            counter.textContent = '0';
        }

        observer.observe(counter);
    });
}); 