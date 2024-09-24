# igf-triage-hospitales-tiempo-real

Aplicación en tiempo real para clasificar y priorizar pacientes en hospitales nacionales. Asigna un código numérico al ingresar al paciente y permite a los profesionales de la salud gestionar la atención en función de la urgencia. Las características incluyen reglas de prioridad configurables y monitoreo en tiempo real de las estadísticas de triaje.

## Instalación

1. Instala las dependencias con `npm install`
2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno `cp .env.example .env`.
3. Ejecutar el servidor:
	- En modo desarrollo: `npm run dev`
	- En modo producción: `npm run build` y luego `npm start`							
