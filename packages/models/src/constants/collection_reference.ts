import { collections } from "./collections";

export const collectionReference = {
  system: {
   
  },
  user: {
      userRegistration: [],
  }
};


export type CollectionReferenceType = {
  collection: string;
  field: string;
  isArray?: boolean;
};
