# Du-Scales : Explorateur de gammes pour le Dualo du-touch.

## News du 21-11-2015

Nouvelle version de l'application du-scales, avec :
- Le nouveau design flat et sombre, plus fonctionnel
- Les dessins améliorés par le nouvel algo (qui peut encore et toujours être amélioré)  
  
http://open-dualo.github.io/du-scales/  
  
Et c'est tout pour le moment. ;) 
  
![](http://i.giphy.com/xTiTnE7sVnqaatVqlW.gif)  

Son utilisation :  
![](http://image.noelshack.com/fichiers/2015/47/1448137758-correspondance.png)  

Le nouvel algorithme est basé sur une découverte que j'ai faite récemment, après des recherches géométriques appliquées sur la disposition des touches du clavier du-touch, sur AutoCAD :

![](http://image.noelshack.com/fichiers/2015/47/1448136516-dualo-clavier-explication-codage7.png)  

Je ferais peut-être une démonstration plus tard, pour expliquer le raisonnement derrière, sans quoi l'image est indescriptible.  

Pour la suite, ce sera :
- Ajouter un bouton "play" pour écouter la gamme et voir comment elle se joue.
- Ajouter un panneau "Options", pour changer la notation des notes (anglaise, italienne, allemande, etc.) et activer/désactiver le mode "autoplay", ou encore switcher entre "transposer la gamme" et "jouer note" pour le clic sur les touches.
- Afficher un clavier piano en dessous du du-touch pour faire les correspondances.
- Ajouter une option "papier" pour basculer dans un affichage propice à l'impression (fond blanc, contours noirs), avec éventuellement un bouton pour une sortie PDF ou impression directe.
- Ajouter la notation en tétrades du fameux principe Dualo.
Des surprises, et peut-être... vos idées ?  
  
  
  
---
---
  
  
  
# Présentation

Je suis [musicien](https://soundcloud.com/dualo-joke)/[graphiste](http://joke-biloumaster.deviantart.com/gallery/)/[dev](https://github.com/RMEx) à mes heures perdues, et voici un petit projet potentiellement très cool.

J'ai décidé de créer une petite application permettant de visualiser facilement toutes les gammes pour le dualo du-touch, un instrument tout nouveau, inventé en France, que je pratique depuis près d'un an.

![Display](http://i.giphy.com/xTiTnJ3dZSBWDjsu8E.gif)

---

## Nouvel instrument = Nouveau domaine de recherche musicale

Le [dualo du-touch](http://dualo.org/) est un nouvel instrument, premier à présenter le [principe dualo](https://fr.wikipedia.org/wiki/Principe_dualo), du même inventeur.  
Ayant pratiqué la guitare, le piano et l'accordéon et quelques bricoles pendant quelques dizaines années avant de passer enfin à cet instrument, je ne peux que confirmer que : Oui, cet instrument est cool.  

Mais ô loin de moi l'envie d'en faire la publicité, si vous ne connaîssez pas déjà l'instrument... m'allez donc googler ça ! 

---

## Une problématique intéressante

Le dualo du-touch, ainsi que le principe dualo, ont l'objectif particulier de simplifier la musique, la rendre visuelle, logique, instinctive, mémotechnique.  
  
La disposition particulière des touches, en hexagones, sur deux claviers, dans un rapport de tierces majeures et mineures, permet de simplifier radicalement la lecture d'une gamme ou d'un accord, grâce à la réunion des degrés paires et impaires.  
  
J'ai isolé le tronçon type du clavier sur lequel on peut représenter toutes les gammes, et [commencé à en retranscrire quelques unes](recherches/gammes-retranscrites-manuellement.pdf) à tâton :  

![Quelques gammes](http://image.noelshack.com/fichiers/2015/46/1447025147-quelques-gammes2.gif)  

(Cliquez sur l'image pour voir le gif animé)  

Cependant, les gammes sont très nombreuses, et il serait fastidieux de répertorier chaque dessin manuellement, avec la forte probabilité de passer à côté d'un dessin meilleur.
C'est pourquoi je cherche à générer le dessin de chaque gamme procéduralement, à partir de la définition la plus basique de chacune (leurs intervalles), en tachant de découvrir les relations permettant de valider ou non le dessin.  
  
La tâche n'est pas évidente, puisque dans le tronçon type du dualo, chaque note se retrouve **deux fois** : une fois sur le *clavier gauche*, une fois sur le *clavier droit*.  

Le fait est qu'on peut jouer toutes les notes du mode chromatique sur chaque clavier, séparément, mais tout le principe repose sur le fait de combiner les deux claviers (l'un décalé d'un ton par rapport à l'autre) et jongler entre les deux (gauche-droite-gauche-droite) pour trouver le chemin le plus simple et logique.  

Pour une gamme de **7 notes**, par exemple, il existe *64 dessins différents*. Parmis les 64 combinaisons possibles, en fait, seulement quelques unes sont intéressantes.  
  
L'objectif est donc de trouver un algorithme permettant de trouver, pour chaque gamme qui existe, le dessin le plus simple à jouer, ainsi que ses variantes.

---

## Choix des langages :

* HTML5
* CSS3
* SVG
* JSON
* JS + [D3.js](http://d3js.org/)

---

## Références :

* [Wikipedia - Le principe dualo](https://fr.wikipedia.org/wiki/Principe_dualo)
* [Site officiel dualo.org](http://dualo.org/)
* [Le principe dualo, expliqué sur dualo.org](http://dualo.org/le-principe-dualo/)

---

## Participer au projet ?

Je ne suis ni un excellent programmeur, ni un mathématicien, et je n'ai pas fait le conservatoire... toute aide est la bienvenue !  
Ce projet est libre et open-source, n'hésitez pas à consulter [mes recherches](https://github.com/Jauke/Du-Scales/tree/master/recherches) et apporter vos idées !  
Vous pouvez bien entendu [ouvrir une issue](https://github.com/Jauke/Du-Scales/issues) pour communiquer vos remarques, bug ou fix.
