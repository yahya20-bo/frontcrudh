export interface BonMouvement {
    id?: number;
    date?: Date;
    description?: string;
    numero?: string;
    responsable?: string;
    type?: string;
    valeur?: number;
    etat?: string;
    raisonMouvementId?: number;
    partieInteresseeId?: number;
    ofId?: number;
    numBRSortie?: string;
    methode?: string;
    daeFacture?: string;
    fournisseurId?: number;
    spl?: string;
    sortie?: boolean;
    produitId?: number;
    origine?: string;
    resultatEmplacement?: number;
    resultatQte?: number;
    nbrErrEmplacement?: number;
    nbrErrQte?: number;
    categorie?: string;
    resultatQteTotale?: number;
    nbrErrQteTotale?: number;
    resultatNbrRlx?: number;
    nbrErrRlx?: number;
    qteTotaleCalculer?: number;
    qteTotalePhysique?: number;
    resultatGlobale?: string;
    magasinId?: number;
    reservationId?: number;
    statusAtelier?: string;
    qteTotaleMouvement?: number;
    dateFinProduction?: Date;
    typeArticle?: number;
    sortieRereservation?: boolean;
    couleurId?: number;
    couleurDesignation?: string;
    manquant?: boolean;
    codeConception?: string;
    client?: string;
    refProduit?: string;
    produitDesignation?: string;
    numOF?: string;
    raisonMouvementDesignation?: string;
    fournisseurAbreviation?: string;
    dateBonReservation?: Date;
    nature?: string;
    interne?: boolean;
    idService?: number;
    idSite?: number;
    idSociete?: number;
    validation?: boolean;
    blSuppression?: boolean;
    dateCreation?: Date;
    dateModification?: Date;
    dateSuppression?: Date;

     // ✅ Ajoute ces champs manquants pour corriger les erreurs :
  reference?: string;               // ← Ajouté pour éviter l'erreur ligne 116
  quantite?: number;               // ← Ajouté pour éviter l'erreur ligne 118
  entiteStock?: string; 
  }
  