    // Récupération des données des photopgraphes.
    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json.
        const result = await fetch("./data/photographers.json");
        const data = await result.json();
        const photographers = await data.photographers;
        // et bien retourner le tableau photographers seulement une fois.
            return { photographers };
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    