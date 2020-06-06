import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';



const routes = express.Router();
const upload = multer(multerConfig);


const pointsController = new PointsController();  
const itemsController = new ItemsController();

//Rota para pegar as imagens de items
routes.get('/items', itemsController.index);
/*Rota para cadastrar pontos - upload.single('image') é o campo para
passar a imagem como parâmetro na rota*/
routes.post('/points',upload.single('image'), pointsController.create);
//Rota para pegar todos os pontos filtrados
routes.get('/points/', pointsController.index);
//Rota para pegar um ponto especifico
routes.get('/points/:id', pointsController.show);
  
 
 export default routes;

