import express from 'express';
import UrlController from '../controllers/url_controller.js';

const urlRouter = express.Router();
const urlController = new UrlController();

urlRouter.route('/').post(urlController.generateNewShortUrl);
urlRouter.route('/').get(urlController.getAllUrls);
urlRouter.route('/user-short-ids').get(urlController.getUserUrls);
urlRouter.route('/:short_id').get(urlController.getUrlByShortId);
urlRouter.route('/analytics/:short_id').get(urlController.getAnalytics);

export default urlRouter;

