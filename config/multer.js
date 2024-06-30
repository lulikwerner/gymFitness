import multer from 'multer'
import path from 'path';


// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/img/uploads/'); 
    },
    filename: function (req, file, cb) {
        // Generar un nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

export default upload;