# P6_Developpez-une-interface-utilisateur-pour-une-application-web-Python

# Description :
L’association JustStreamIt, connue pour ses newsletters de classement de films, souhaite se doter d’une application web permettant à ses abonnés de visualiser en temps réel un classement de films intéressants.
L’interface doit comprendre les zones suivantes : 
* Meilleur film : Cette zone affiche la photo du film qui a la meilleur note Imdb toutes catégories confondues, ainsi que son titre, un bouton et le résumé du film sous le bouton.
* Films les mieux notés : Cette zone affiche les 7 autres films les mieux notés toutes catégories confondues. 
* Et 3 catégories de films affichant les 7 films les mieux notés des différentes catégories.

Les abonnés doivent pouvoir faire défiler les films à l’aide de flèches (gauche et droite) et accéder aux données des films via une fenêtre modale, au clic sur l’image d’un film ou sur un bouton pour le meilleur film.

La fenêtre modale doit comprendre les données suivantes :
* L’image de la pochette du film
* Le Titre du film
* Le genre complet du film
* Sa date de sortie
* Son Rated
* Son score Imdb
* Son réalisateur
* La liste des acteurs
* Sa durée
* Le pays d’origine
* Le résultat au Box Office
* Le résumé du film

Un bouton devra permettre la fermeture de la fenêtre modale.

La gestion des événements de la page web est réalisée avec l’utilisation de vanilla JavaScript et la récupération des données des films depuis l’API (OCMovies-API), mis à disposition par JustStreamIt, a été réalisée à l’aide de requêtes AJAX.

# Installation API :

Lien de l’API : https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git

Le fichier README explique ce qu’il y a à savoir pour l’installation des dépendances et pour le lancement du serveur.







