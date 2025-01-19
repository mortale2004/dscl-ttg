import { utils, read } from "xlsx";

export const excelFileTypes = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

export const excelToJson = (uploadedFile: any) : Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (uploadedFile && excelFileTypes.includes(uploadedFile.type)) {
        // @ts-ignore
        let render = new FileReader();
        render.onload = (e:any) => {
          const workBook = read(e.target.result);
          const sheet = workBook.SheetNames;
          if (sheet.length) {
            const data = utils.sheet_to_json(workBook.Sheets[sheet[0]]);
            resolve(data);
          }
        };
        render.readAsArrayBuffer(uploadedFile);
      } else {
        reject('please upload only excel file');
      }
  });
};
