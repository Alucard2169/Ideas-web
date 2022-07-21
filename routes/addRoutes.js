const { Router} = require('express');
const router = Router();

const addController = require('../controller/addController')

router.get('/idea', addController.idea_get);
router.get('/addNew', addController.addNew_get);
router.get('/idea/:id', addController.getIdea_id);
router.post('/', addController.addNew_post);

module.exports = router;