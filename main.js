window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");

    const linksLoja = document.querySelectorAll('a[href="loja/index.html"]');

    linksLoja.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            document.body.classList.remove("page-loaded");
            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = link.href;
            }, 350);
        });
    });
});
