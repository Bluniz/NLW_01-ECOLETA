import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import {celebrate, Joi} from "celebrate";



const routes = express.Router();
const upload = multer(multerConfig);


const pointsController = new PointsController();  
const itemsController = new ItemsController();

//Rota para pegar as imagens de items
routes.get('/items', itemsController.index);
/*Rota para cadastrar pontos - upload.single('image') é o campo para
passar a imagem como parâmetro na rota*/
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  },{
    abortEarly: false
  }),

   pointsController.create
   );
//Rota para pegar todos os pontos filtrados
routes.get('/points/', pointsController.index);
//Rota para pegar um ponto especifico
routes.get('/points/:id', pointsController.show);
  
 
 export default routes;

