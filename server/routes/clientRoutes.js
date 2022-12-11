const express = require('express');
const router = express.Router();

const { getAllClients, createClient, updateClient, getClient, deleteClient } = require('../controllers/clientController');

// Get all clients and create client route


/**
 * @swagger
 * components:
 *   parameters:
 *     ClientParams:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *   schemas:
 *      Client:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of client
 *          name:
 *            type: string
 *            description: The client name
 *          email:
 *            type: string
 *            description: The client email
 *          phone:
 *            type: string
 *            description: The client phone
 *          providers:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: Provider auto generate id
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 */

/**
 * @swagger
 * /api/v1/clients:
 *    get:
 *      summary: Returns the list of all client
 *      tags: [Clients]
 *      responses:
 *        200:
 *          description: The list of the clients
 *          content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/Client'
 */

/**
 * @swagger
 * /api/v1/clients:
 *    post:
 *      summary: Create new clients
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/Client'
 *      responses:
 *         201:
 *           description: The client was successfully created
 *           content:
 *              application/json:
 *                $ref: '#/components/schemas/Client'
 *         400:
 *           description: We can't create the client
 */
router
  .route('/')
  .get(getAllClients)
  .post(createClient);



// Get, update and delete a client route

/**
 * @swagger
 * /api/v1/clients/{id}:
 *    get:
 *      summary: Get the client by id
 *      tags: [Clients]
 *      parameters:
 *        $ref: '#/components/parameters/ClientParams'
 * 
 *      responses:
 *          200:
 *            description: The client description by id
 *            contents:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Client'
 *          404:
 *            description: The client was not found
 */

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   patch:
 *      summary: Update the client by the id
 *      tags: [Clients]
 *      parameters:
 *        $ref: '#/components/parameters/ClientParams'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 * 
 *      responses:
 *         200:
 *           description: The client was updated
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Client'
 *         404:
 *            description: The client was not found
 *         500:
 *           description: Something went wrong
 */

/**
 * @swagger
 * /api/v1/clients/{id}:
 *    delete:
 *      summary: Delete the client by the id
 *      tags: [Clients]
 *      parameters:
 *        $ref: '#/components/parameters/ClientParams'
 *      responses:
 *        202:
 *          description: The client was deleted
 *        404:
 *          description: The client can't be found
 *        500:
 *          description: Something went wrong
 */
router
  .route('/:id')
  .get(getClient)
  .patch(updateClient)
  .delete(deleteClient);


// export client router
module.exports = router;