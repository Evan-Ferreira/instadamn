import fs from 'fs';

export const readJsonFile = (filePath: string) => {
    const file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
};

export const writeJsonFile = (filePath: string, data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
