export interface Metrage {
    id?: number;
    designation?: string;
    blSuppression?: boolean;
    dateSuppression?: string; // Format ISO (OffsetDateTime)
    dateCreation?: string;
    dateModification?: string;
  }
  