import axios from 'axios';

export const startPrinting = async (selectedOption, Nom) => {
    try {
        const response = await axios.post('http://10.40.208.41:5000/printing', {
            selectedOption,
            Nom
        });
        return response.data;
    } catch (error) {
        console.error('There was an error starting the printing!', error);
    }
}