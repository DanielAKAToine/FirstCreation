const movie1 = {
    title: "Hacksaw Ridge",
    year: 2016,
    genre: "War",
    rating: 8,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Hacksaw_Ridge_poster.png/250px-Hacksaw_Ridge_poster.png",
}
const movie2 = {
    title: "Interstellar",
    year: 2014,
    genre: "SciFi",
    rating: 9,
    image: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png",
}
const movie3 = {
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: "Action",
    rating: 8,
    image: "https://upload.wikimedia.org/wikipedia/fi/archive/3/3a/20211217160215%21Spider-Man_No_Way_Home.png",
}
const movie4 = {
    title: "Shrek",
    year: 2001,
    genre: "Animation",
    rating: 7,
    image: "https://static.wikia.nocookie.net/shrek/images/8/85/Shrek_2001_poster.jpg/revision/latest?cb=20201020072731",
}
const movie5 = {
    title: "El Camino: A Breaking Bad Movie",
    year: 2019,
    genre: "Crime",
    rating: 7,
    image: "https://upload.wikimedia.org/wikipedia/pt/thumb/4/48/El_Camino_p%C3%B4ster.png/330px-El_Camino_p%C3%B4ster.png",
}

let movies = [movie1, movie2, movie3, movie4, movie5];
const ulFilmes = document.getElementById("filmes");


function renderizarListaCompleta(listaParaExibir = movies) {
    ulFilmes.innerHTML = "";
    ulFilmes.style.display = "block";

    listaParaExibir.forEach((movie) => {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        li.innerHTML = `
            <div class="movie-container">
        <img src="${movie.image}">
        <div class="movie-info">
            <strong>${movie.title}</strong> (${movie.year})<br>
            <em>${movie.genre}</em><br>
            Rating: <strong>${movie.rating}</strong>
            <div style="margin-top: 10px;">
                <button class="btn-rating" onclick="alterarRatingIndividual('${movie.title}', 1)">+</button>
                <button onclick="alterarRatingIndividual('${movie.title}', -1)">-</button>
            </div>
        </div>
    </div>
`;
        ulFilmes.appendChild(li);
    });
}

function buscarFilmes() {
    const inputGenero = document.getElementById("inputGenero").value.toLowerCase();
    const filmesFiltrados = movies.filter((movie) => movie.genre.toLowerCase() === inputGenero);

    if (filmesFiltrados.length > 0) {
        renderizarListaCompleta(filmesFiltrados);
    } else {
        ulFilmes.innerHTML = "<li>Nenhum filme encontrado para este género.</li>";
    }
    document.getElementById("inputGenero").value = "";
}

function buscarTitulo() {
    const tituloSelecionado = document.getElementById("selectFilmes").value;
    if (tituloSelecionado === "") return;

    const filmeEncontrado = movies.find(movie => movie.title === tituloSelecionado);

    if (filmeEncontrado) {
        renderizarListaCompleta([filmeEncontrado]);
    }
}

function alterarRatingIndividual(title, valor) {
    movies = movies.map(movie => {
        if (movie.title === title) {
            let novaNota = movie.rating + valor;
            if (novaNota < 1) novaNota = 1;
            if (novaNota > 10) novaNota = 10;
            return { ...movie, rating: novaNota };
        }
        return movie;
    });
    renderizarListaCompleta();
}

const inputBusca = document.getElementById("inputGenero");
inputBusca.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        buscarFilmes();
    }
});

const select = document.getElementById("selectFilmes");
movies.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie.title;
    option.innerText = movie.title;
    select.appendChild(option);
});

renderizarListaCompleta();

function adicionarFilme(novoTitulo, novoAno, novoGenero, novaImagem) {
    const novoFilme = {
        title: novoTitulo,
        year: novoAno,
        genre: novoGenero,
        rating: 5,
        image: novaImagem
    };

    movies = [...movies, novoFilme];

    renderizarListaCompleta();
    atualizarSelect();
    document.getElementById("novoNome").value = "";
    document.getElementById("novoGenero").value = "";
    document.getElementById("novoLink").value = "";

}

function removerFilme(tituloParaRemover) {
    movies = movies.filter(movie => movie.title !== tituloParaRemover);

    renderizarListaCompleta();
    atualizarSelect();
}

function atualizarSelect() {
    const select = document.getElementById("selectFilmes");
    select.innerHTML = '<option value="">-- Selecione um filme --</option>';
    movies.forEach(movie => {
        const option = document.createElement("option");
        option.value = movie.title;
        option.innerText = movie.title;
        select.appendChild(option);
    });
}