import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await axios.get('http://10.40.208.41:5000/getInfo');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        return null;
    }
};