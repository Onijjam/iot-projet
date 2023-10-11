import axios from 'axios';

export const fetchFiles = async (Nom) => {
    try {
        const response = await axios.post('http://10.40.208.41:5000/listFiles', {
            Nom
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        return null;
    }
};