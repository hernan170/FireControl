import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fireRoutes from "./src/routes/fires.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", fireRoutes);

app.get("/api/monitoreo", (req, res) => {
    const mockData = {
        ubicacion: "Delta del Paraná, sector IV",
        ndvi: 0.24,
        focos: [
            { id: 1, lat: -34.162, lng: -58.520 },
            { id: 2, lat: -34.168, lng: -58.530 },
            {id: 3, lat: -34.168, lng: -58.530 }
        ]
    }; 
    res.json(mockData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor backend corriendo en el puerto ${PORT}`));