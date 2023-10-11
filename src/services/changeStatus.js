import axios from 'axios';

export const stopPrinting = async (Nom) => {
    try {
        const response = await axios.post('http://10.40.208.41:5000/stopPrinting', {
            Nom
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la demande de stop', error);
        return null;
    }
};

export const pausePrinting = async (Nom) => {
    try {
        const response = await axios.post('http://10.40.208.41:5000/pausePrinting', {
            Nom
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la demande de pause', error);
        return null;
    }
};