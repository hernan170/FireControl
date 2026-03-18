import axios from 'axios';

export const getActiveFires = async (req, res) => {
    try {
        const response = await axios.get('https://eonet.gsfc.nasa.gov/api/v3/events', {
            params: {
                category: 'wildfires',
                status: 'open',
                limit: 20,
                api_key: process.env.NASA_API_KEY
            }
        });

        console.log(`Luciernagas de la NASA detectadas: ${response.data.events.length}`);
        res.json(response.data.events);
    } catch (error) {
        console.log('Error al conectar con la NASA:', error.message);
        res.status(500).json({ message: "Error al obtener datos de la NASA"})
    }

};

export default { getActiveFires };

