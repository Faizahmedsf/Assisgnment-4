import express , {Request , Response} from 'express';
const router = express.Router();
import mainController from "../Controller/Controller"

router.get('/getdata' , mainController.getdata)

router.get('/getsingleuser/:id' , mainController.getsingleuser)

router.post('/postdata' , mainController.postdata)

router.patch('/patchdata/:id' ,  mainController.patchdata)

router.delete('/deldata/:id' , mainController.deletedata)


export default router