# Du-Scales : Explorateur de gammes pour le Dualo du-touch.  

/!\ Projet en cours !

## Bonjour.

Je suis [musicien](https://soundcloud.com/dualo-joke)/[graphiste](http://joke-biloumaster.deviantart.com/gallery/)/[dev](https://github.com/RMEx) à mes heures perdues, et voici un petit projet potentiellement très cool.

J'ai décidé de créer une petite application permettant de visualiser facilement toutes les gammes pour le dualo du-touch, un instrument tout nouveau, inventé en France, que je pratique depuis près d'un an.

![Display](http://image.noelshack.com/fichiers/2015/46/1447023948-du-scales2.png)  

(layout non définitif)  

---

## Nouvel instrument = Nouveau domaine de recherche musicale !

Le [dualo du-touch](http://dualo.org/) est un instrument tout nouveau, suivant le tout nouveau [principe dualo](https://fr.wikipedia.org/wiki/Principe_dualo), du même inventeur.  
Ayant pratiqué la guitare, le piano et l'accordéon et quelques bricoles pendant quelques dizaines années avant de passer enfin à cet instrument, je ne peux que confirmer que : Oui. Cet instrument est cool.  

Mais ô loin de moi l'envie d'en faire la publicité (zut), si vous ne connaîssez pas déjà l'instrument... m'allez donc googler ça ! :)  

---

## Une problématique intéressante.

Le dualo du-touch, ainsi que le principe dualo, ont l'objectif particulier de simplifier la musique, la rendre visuelle, logique, instinctive, mémotechnique.  
  
La disposition particulière des touches, en hexagones, sur deux claviers, dans un rapport de tierces majeures et mineures, permet de simplifier radicalement la lecture d'une gamme ou d'un accord, grâce à la réunion des degrés paires et impaires.  
  
J'ai fait mon étude personnelle, et isolé le tronçon type du clavier sur lequel on peut représenter toutes les gammes, et j'ai commencé à en retranscrire quelques unes à tâton :  

![Quelques gammes](http://image.noelshack.com/fichiers/2015/46/1447025147-quelques-gammes2.gif)  

(Cliquez sur l'image pour voir le gif animé)  

Cependant, il est bien plus intéressant de générer le dessin de chaque gamme procéduralement, en tachant de découvrir les relations permettant de valider ou non le dessin d'une gamme.  
  
La tâche n'est pas évidente, puisque dans le tronçon type du dualo, chaque note se retrouve *deux fois* : une fois sur le *clavier gauche*, une fois sur le *clavier droit*.  

Le fait est qu'on peut jouer toutes les notes du mode chromatique sur chaque clavier, séparément, mais tout le principe repose sur le fait de combiner les deux claviers (l'un décalé d'un ton par rapport à l'autre) et jongler entre les deux (gauche-droite-gauche-droite) pour trouver le chemin le plus simple et logique.  

Pour une gamme de 7 notes, par exemple, il existe 64 dessins différents pour une même gamme. Parmis les 64 combinaisons possibles, en fait, seulement quelques unes sont intéressantes.  
  
L'objectif est donc de trouver un algorithme permettant de trouver pour chaque gamme qui existe, le dessin le plus simple à jouer, ainsi que ses variantes.

C'est donc en premier lieu une question de [recherche](https://github.com/Jauke/Du-Scales/tree/master/recherches) autour des différentes combinaisons possibles des dessins d'une gamme. :)

---

## Choix des langages :

* HTML5
* CSS3
* SVG
* JSON + JS + [D3.js](http://d3js.org/)

---

## Références :

* [Wikipedia - Le principe dualo](https://fr.wikipedia.org/wiki/Principe_dualo)
* [Site officiel dualo.org](http://dualo.org/)
* [Le principe dualo, expliqué sur dualo.org](http://dualo.org/le-principe-dualo/)

---

## Participer au projet.

Ce projet est libre et open-source, n'hésitez pas à consulter [mes recherches](https://github.com/Jauke/Du-Scales/tree/master/recherches) et apporter vos idées !  
Vous pouvez bien entendu [ouvrir une issue](https://github.com/Jauke/Du-Scales/issues) pour communiquer vos remarques.
