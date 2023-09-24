Est-ce que cette CLI est destinée à être utilisée par des développeurs, des administrateurs de base de données, ou d'autres utilisateurs techniques ?
> Principalement des développeurs

Fréquence des interactions :

 À quelle fréquence l'utilisateur interagira-t-il avec la base de données pendant une session typique ? Est-ce que ce sera un flot continu d'interactions, ou y aura-t-il des périodes d'inactivité ?
 
 > Plutôt continue, c'est un outil pour batir un backoffice de façon générative
 > Exemple d'utilisation :
 > Un dev souhaite mettre en place un backoffice pour une application web, il va utiliser cette CLI pour générer les modèles de données et les interfaces d'administration, puis il va les modifier à la main pour les adapter à ses besoins.
Par exemple: 
Il travaille pour un client qui souhaite gérer des produits, des catégories, des utilisateurs, des commandes, des factures, etc.
Il va donc générer les modèles de données et les interfaces d'administration pour ces entités (produits, catégories, utilisateurs, commandes, factures), puis il va les modifier à la main pour les adapter à ses besoins.

### TODO
- Ajouter une question pour demander si l'utilisateur veut ajouter une autre colonne avant, d'enregistrer.
  - Si oui, on relance les questions pour ajouter une colonne
  - Si non, on enregistre le fichier JSON avec les colonnes ajoutées
- Gérer la demande de langue. Au debut de la CLI, demander la langue de l'utilisateur, puis traduire les questions en fonction de la langue choisie.
- Gérer des cas simple de noms de colomnnes :
  - name: string
  - is_active: boolean
  - created_at: date
  - updated_at: date
  - deleted_at: date
  - created_by: relation
