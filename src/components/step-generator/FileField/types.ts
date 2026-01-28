export type FileContent = {
  id: number;
  upload: number;
  download: number;
  code: string; // DEFECT_ACT
  readonly: boolean;
  state: string; // GENERATED
  file: {
    name: string;
    type: string; // application/pdf
  };
  docTypeName: string; // pdf
  createAt: Date | string;
  orderId: number;
  url: null;
  metadata: null;
  signedFileId: null;
  orderFileId: number;
};
