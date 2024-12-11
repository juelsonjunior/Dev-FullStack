export const generateShortUrl = () => {
    const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < 5; i++) {
        const ramdomIndex = Math.floor(Math.random() * text.length);
        const randomText = text.charAt(ramdomIndex);
        result += randomText;
    }

    return result;
};
