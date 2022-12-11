const express = require('express');
const {
  createProvider,
  getAllProvider,
  getProvider,
  updateProvider,
  deleteProvider } = require('../controllers/providerController');

// create express router
const router = express.Router();

// Get providers and create provider route
/**
 * @swagger
 * components:
 *   parameters:
 *     Default:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The provider id
 * 
 *   schemas:
 *      Provider:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of provider
 *          name:
 *            type: string
 *            description: The provider name
 */

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: The clients managing API
 */

/**
 * @swagger
 * /api/v1/providers:
 *    get:
 *      summary: Returns the list of all client
 *      tags: [Providers]
 *      responses:
 *        200:
 *          description: The list of the clients
 *          content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/Provider'
 */

/**
 * @swagger
 * /api/v1/providers:
 *    post:
 *      summary: Create new provider
 *      tags: [Providers]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/Provider'
 *      responses:
 *         201:
 *           description: The provider was successfully created
 *           content:
 *              application/json:
 *                $ref: '#/components/schemas/Provider'
 *         400:
 *           description: We can't create the provider
 */
router
  .route('/')
  .get(getAllProvider)
  .post(createProvider);



// Get, update, delete provider route
/**
 * @swagger
 * /api/v1/providers/{id}:
 *    get:
 *      summary: Get the provider by id
 *      tags: [Providers]
 *      parameters:
 *        $ref: '#/components/parameters/Default'
 *
 *      responses:
 *          200:
 *            description: The provider description by id
 *            contents:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Provider'
 *          404:
 *            description: The provider was not found
 */

/**
 * @swagger
 * /api/v1/providers/{id}:
 *   patch:
 *      summary: Update the provider by the id
 *      tags: [Providers]
 *      parameters:
 *        $ref: '#/components/parameters/Default'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *
 *      responses:
 *         200:
 *           description: The provider was updated
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Provider'
 *         404:
 *            description: The provider was not found
 *         500:
 *           description: Something went wrong
 */

/**
 * @swagger
 * /api/v1/providers/{id}:
 *    delete:
 *      summary: Delete the provider by the id
 *      tags: [Providers]
 *      parameters:
 *        $ref: '#/components/parameters/Default'
 *      responses:
 *        202:
 *          description: The provider was deleted
 *        404:
 *          description: The provider can't be found
 *        500:
 *          description: Something went wrong
 */
router
  .route('/:id')
  .get(getProvider)
  .patch(updateProvider)
  .delete(deleteProvider);

// export provider router
module.exports = router;
