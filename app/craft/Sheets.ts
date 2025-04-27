import data from '~/data/sheets';

export type Sheets = {
    [sheetId: number]: string;
};

export default (data as Sheets);
