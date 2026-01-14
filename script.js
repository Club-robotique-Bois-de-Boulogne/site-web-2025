const dots = document.querySelectorAll('.dot');
const indicator = document.querySelector('.indicator');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const dotRect = dot.getBoundingClientRect();
        const containerRect = dot.parentElement.getBoundingClientRect();

        const x =
            dotRect.left -
            containerRect.left +
            dotRect.width / 2 -
            indicator.offsetWidth / 2;

        indicator.style.transform = `translate(${x}px, -50%)`;
    });
});
