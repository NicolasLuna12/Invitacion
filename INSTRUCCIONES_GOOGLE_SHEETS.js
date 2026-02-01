// INSTRUCCIONES PARA CONECTAR CON GOOGLE SHEETS
// =============================================

// 1. Abre Google Sheets y crea una nueva hoja de cálculo
// 2. Nómbrala "Confirmaciones Boda Lucre y Nico"
// 3. En la primera fila, crea estos encabezados:
//    A1: Timestamp | B1: Nombre | C1: Email | D1: Teléfono | E1: Asistencia | F1: Acompañantes | G1: Mensaje

// 4. Ve a Extensiones > Apps Script
// 5. Borra todo el código que aparece y pega este código:

function doPost(e) {
  try {
    // Obtener la hoja de cálculo activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Agregar una nueva fila con los datos
    sheet.appendRow([
      data.timestamp,
      data.nombre,
      data.email,
      data.telefono,
      data.asistencia,
      data.acompanantes,
      data.mensaje
    ]);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook funcionando!");
}

// 6. Guarda el proyecto con un nombre (ej: "Webhook Confirmaciones Boda")
// 7. Haz clic en "Implementar" > "Nueva implementación"
// 8. Selecciona "Aplicación web"
// 9. Configuración:
//    - Descripción: "Webhook para confirmaciones"
//    - Ejecutar como: "Yo"
//    - Quién tiene acceso: "Cualquier persona"
// 10. Haz clic en "Implementar"
// 11. Copia la URL que te dan (será algo como: https://script.google.com/macros/s/XXXXXX/exec)
// 12. Pega esa URL en el archivo formulario.html en la línea que dice:
//     const GOOGLE_SCRIPT_URL = 'TU_URL_DEL_SCRIPT_AQUI';

// ¡LISTO! Ahora cuando alguien llene el formulario, los datos se guardarán automáticamente en tu Google Sheet
