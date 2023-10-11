import axios from 'axios';

export const stopPrinting = async () => {
    try {
        const response = await axios.get('http://10.40.208.41:5000/stopPrinting');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la demande de stop', error);
        return null;
    }
};

export const pausePrinting = async () => {
    try {
        const response = await axios.get('http://10.40.208.41:5000/pausePrinting');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la demande de pause', error);
        return null;
    }
};