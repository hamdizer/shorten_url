import express from 'express';
import UrlController from '../controllers/url.controller';
import {validateUrl} from "../middlewares/validation.middleware";

const router = express.Router();

router.post('/shorten',UrlController.shortenUrl);

router.get('/:shortenedId', UrlController.redirectToUrl);

export default router;