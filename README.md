# MedheadFront

## Description
Ce projet fait partie de la suite Medhead et représente le front-office.
Il fournit les fonctionnalités de services de recherche des hôpitaux les plus proches avec des lits disponibles et la réservation.

## Fonctionnalités
- Connexion au système
- Recherche des hôpitaux les plus proches avec des lits disponibles pour une spécialité spécifique.
- Réservation d'un lit.

## Installation et Configuration

### 1. Clonez le projet

Clonez le dépôt Git sur votre machine locale

### 2. Lancer le service en local

Pour lancer l’application en local :

```console
ng serve
```

Se rendre à l'adresse suivante http://localhost:4200

## Tests

Les tests sont divisés en deux catégories :

    1. Tests d’Intégrations : Pour vérifier les interactions entre les différentes parties de l’application (karma).
    2. Tests e2e : Pour valider le fonctionnement de l'application (cypress).

Pour exécuter les tests d'intégrations :

```console
ng test
```
Pour exécuter les tests e2e :

```console
npx cypress open
```