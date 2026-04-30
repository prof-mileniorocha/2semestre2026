const imagemPrincipal = document.getElementById("imagemPrincipal");
const lupa = document.getElementById("lupa");
const container = document.getElementById("magnifierContainer");
const zoom = 2.5;
const lupaSize = 140;

function trocarImagem(src) {
    imagemPrincipal.src = src;
    lupa.style.backgroundImage = `url(${src})`;
}

container.addEventListener("mousemove", function (e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    if (x < 0 || y < 0 || x > w || y > h) {
        lupa.classList.remove('ativa');
        return;
    }

    lupa.classList.add('ativa');
    const half = lupaSize / 2;
    const clampedX = Math.max(half, Math.min(w - half, x));
    const clampedY = Math.max(half, Math.min(h - half, y));
    lupa.style.left = (clampedX - half) + 'px';
    lupa.style.top = (clampedY - half) + 'px';

    const bgX = (x / w) * 100;
    const bgY = (y / h) * 100;

    lupa.style.backgroundImage = `url('${imagemPrincipal.src}')`;
    lupa.style.backgroundSize = `${w * zoom}px ${h * zoom}px`;
    lupa.style.backgroundPosition = `${bgX}% ${bgY}%`;
});

container.addEventListener('mouseleave', function () {
    lupa.classList.remove('ativa');
});