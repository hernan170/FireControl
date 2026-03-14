export const analizarIntencionalidad = (focos) => {

    if (!focos || focos.length === 0) {
        return{
            probabilidad: "0%",
            sospecha: false,
            patron: "Sin actividad", 
            dictamen: "No se detectaron focos térmicos."      }
        };
    
    const esMultifocal = focos.length > 3;
    const probabilidad = esMultifocal ? 85 : 20;

    return {
        probabilidad: `${probabilidad}%`,
        sospecha: probabilidad > 50,
        patron: esMultifocal ? "Multifocal" : "Puntual",
        dictamen: probabilidad > 50
        ? "ALERTA: Patrón de focos térmicos sospechoso. Se recomienda intervención inmediata."
        : "Actividad aislada detectada. Se recomienda monitoreo continuo."
    };
}
 