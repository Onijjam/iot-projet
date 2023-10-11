import axios from 'axios';

export const plateauTemp = async (Temp) => {
    try {
        const response = await axios.post('http://10.40.208.41:5000/changeTempPlateau', {
            Temp
        });
        return response.data;
    } catch (error) {
        console.error('Il y a eu une erreur lors du changement de température du plateau !', error);
    }
}

export const buseTemp = async (Temp) => {
    try {
        const response = await axios.post('http://10.40.208.41:5000/changeTempBuse', {
            Temp
        });
        return response.data;
    } catch (error) {
        console.error('Il y a eu une erreur lors du changement de température de la buse !', error);
    }
}
