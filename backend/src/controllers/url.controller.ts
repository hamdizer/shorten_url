import { Request, Response, NextFunction } from "express";
import UrlService from "../services/url.service";
/**
 * @swagger
 * tags:
 *   name: URL Shortener
 *   description: Operations related to URL shortening and redirection
 */
class UrlController {
  /**
   * @swagger
   * /urls:
   *   post:
   *     summary: Create a shortened URL
   *     tags: [URL Shortener]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - originalUrl
   *             properties:
   *               originalUrl:
   *                 type: string
   *                 description: The original URL to be shortened
   *                 example: "https://example.com"
   *     responses:
   *       200:
   *         description: Successfully created shortened URL
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 shortenedUrl:
   *                   type: string
   *                   description: The shortened URL
   *                   example: "https://short.ly/abc123"
   *       400:
   *         description: Shortened URL not found
   */
  async createUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { originalUrl } = req.body;
      const shortenedUrl = await UrlService.createShortenedUrl(originalUrl);
      res.json({ shortenedUrl });
    } catch (error) {
      res.status(400).json({ message: "Shortened URL not found" });

      next(error);
    }
  }
  /**
   * @swagger
   * /urls/shorten:
   *   post:
   *     summary: Shorten a URL
   *     tags: [URL Shortener]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - originalUrl
   *             properties:
   *               originalUrl:
   *                 type: string
   *                 description: The original URL to be shortened
   *                 example: "https://another-example.com"
   *     responses:
   *       200:
   *         description: Successfully shortened URL
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 shortenedUrl:
   *                   type: string
   *                   description: The shortened URL
   *                   example: "https://short.ly/xyz456"
   *       400:
   *         description: Shortened URL not found
   */
  async shortenUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { originalUrl } = req.body;
      const shortenedUrl = await UrlService.createShortenedUrl(originalUrl);
      res.json({ shortenedUrl });
    } catch (error) {
      res.status(400).json({ message: "Shortened URL not found" });

      next(error);
    }
  }

  /**
   * @swagger
   * /urls/{shortenedId}:
   *   get:
   *     summary: Redirect to the original URL using shortened ID
   *     tags: [URL Shortener]
   *     parameters:
   *       - name: shortenedId
   *         in: path
   *         required: true
   *         description: The shortened ID to redirect to the original URL
   *         schema:
   *           type: string
   *           example: "abc123"
   *     responses:
   *       302:
   *         description: Redirect to the original URL
   *       404:
   *         description: Shortened URL not found
   */
  async redirectToUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { shortenedId } = req.params;
      const url = await UrlService.getUrlByShortenedId(shortenedId);
      if (!url) {
        res.status(404).json({ message: "Shortened URL not found" });
        return;
      }
      res.redirect(url.originalUrl);
    } catch (error) {
      next(error);
    }
  }
}

export default new UrlController();
