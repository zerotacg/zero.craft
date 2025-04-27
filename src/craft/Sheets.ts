export type Sheets = {
    [sheetId: number]: string;
}

export const SHEETS: Sheets = (window as any).Sheets;
