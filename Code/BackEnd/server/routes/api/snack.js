import express from 'express';
const router = express.Router();
import { simpleSearch, localRender, usdaRender} from'../../controllers/snackController';

router.get('/search', simpleSearch);
router.get('/local', localRender);
router.get('/usda', usdaRender);

export default router;