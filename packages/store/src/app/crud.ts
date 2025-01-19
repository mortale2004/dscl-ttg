import { atom } from "recoil";

export type CrudDialogMode = "create" | "update" | "duplicate";

type crudFormDialogAtomType = {
  data: object | null;
  mode: CrudDialogMode;
};

export const crudFormDialogAtom = atom<crudFormDialogAtomType>({
  key: "crudFormDialogAtom",
  default: {
    data: null,
    mode: "create",
  },
});

export const crudDeleteItemAtom = atom<any | null>({
  key: "crudDeleteItemAtom",
  default: null,
});

export type crudDataAtomType = {
  count: number;
  data: any[];
};

export const crudDataAtom = atom<crudDataAtomType>({
  key: "crudDataAtom",
  default: {
    count: 0,
    data: [],
  },
});
