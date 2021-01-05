function initialisation() {
    fetch("pays.json") // affichage des options select
        .then(rp => rp.json())
        .then(function(rep) {
            for (let i = 0; i < rep.pays.length; i++) {
                document.querySelector("select").innerHTML += "<option value=\"" + rep.pays[i].id + "\">" + rep.pays[i].nomPays + "</option>";
            }
        });
    document.querySelectorAll(".click").forEach(function(drapeau) {
        drapeau.addEventListener("click", function() {
            news(this.id);
        });
    });

    document.querySelector("input").addEventListener("click", function() {
        news(document.querySelector("select").value);
    });

    let today = new Date();
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();
    document.querySelector("#date").innerHTML = day + "/" + month + "/" + year;
}



function news(pays) {
    if (pays != "") {
        window.scrollTo(0, 0);

        document.querySelector("#news").removeAttribute("class", "off");
        document.querySelector("#back").removeAttribute("class", "off");

        /********************************/
        /*Affichage de l'entête des news*/
        /********************************/

        document.querySelector("#drapeauPays").setAttribute("src", "img/" + pays + ".png"); //affichage du drapeau correspondant au pays
        fetch("pays.json") // affichage du nom du pays
            .then(rp => rp.json())
            .then(function(rep) {
                var paysSelect = rep.pays.find(function(item, i) {
                    if (item.id === pays) {
                        index = i;
                        return i;
                    }
                });
                document.querySelector(".titre>h1").innerHTML = paysSelect.nomPays;
            })

        /****************************************/
        /*Recherche des news du pays + affichage*/
        /****************************************/
        var url = 'http://newsapi.org/v2/top-headlines?country=' + pays + '&apiKey=0ef80c99b34842728f309d5216323906';
        fetch(url)
            .then(response => response.json())
            .then(function(data) {
                var articles = document.querySelector("#articles");
                articles.innerHTML = '';

                /***********************/
                /*Création des articles*/
                /***********************/

                for (var index = 0; index < data.articles.length; index++) {
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h2');
                    var myPara = document.createElement('p');

                    myH2.innerHTML = data.articles[index].title;
                    myPara.innerHTML = data.articles[index].description;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara);
                    myArticle.innerHTML += "<a href=\"" + data.articles[index].url + "\"><button>See more</button></a>";

                    articles.appendChild(myArticle);
                }
            });

        document.querySelector("#back").addEventListener("click", fermer);
    }


}

function fermer() {
    document.querySelector("#news").setAttribute("class", "off");
    document.querySelector("#back").setAttribute("class", "off");
}