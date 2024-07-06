import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/img/uploads'); // Directorio donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Nombre del archivo en el servidor
    }
});


// Middleware de Multer para la carga de archivos
const upload = multer({ storage: storage });

export default upload;

