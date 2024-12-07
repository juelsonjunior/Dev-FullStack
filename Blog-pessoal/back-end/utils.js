import fs from 'fs';

export const formatDate = () => {
    const date = new Date();
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.toLocaleTimeString();

    return `${month} ${day}, ${year} - ${hours}`;
};

const ensureFileExists = (path) => {
    if (!fs.existsSync(path)) {
        fs.readFileSync(path, JSON.stringify([]));
    }
};

export const listAllDate = (path) => {
    try {
        ensureFileExists(path);
        const data = fs.readFileSync(path);
        return JSON.parse(data);
    } catch (error) {
        console.log('Falha ao fazer a leitura dos dados', error);
    }
};

export const writeDataFile = (data, path) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

export const verifyDuplicateDate = (articles, data, path) => {
    const findDuplicate = articles.find(
        (article) => article.title == data.title
    );

    if (findDuplicate) {
        return false;
    }

    articles.push(data);
    writeDataFile(articles, path);
    return true;
};
