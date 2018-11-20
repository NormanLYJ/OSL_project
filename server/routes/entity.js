
var Entity = require('../models/entity')
, _ = require('lodash')
, writeResponse = require('../helpers/response').writeResponse
, writeError = require('../helpers/response').writeError
, loginRequired = require('../middlewares/loginRequired')
, dbUtils = require('../dbUtils');

/**
* @swagger
* definition:
*   Entity:
*     type: object
*     properties:
*       id:
*         type: integer
*       name:
*         type: string
*       note:
*         type: string
*       valid_until:
*         type: string
*       jurisdiction:
*         type: string
*       jurisdiction_description:
*         type: string
*       incorporation_date:
*         type: string
*       category:
*         type: string
*       sourceID:
*         type: string
*/

/**
* @swagger
* /api/v0/entity:
*   get:
*     tags:
*     - entity
*     description: Find all entities
*     summary: Find all entities
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A list of entities
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Entity'
*/
exports.list = function (req, res, next) {
Entity.getAll(dbUtils.getSession(req))
  .then(response => writeResponse(res, response))
  .catch(next);
};

/**
* @swagger
* /api/v0/entity/{id}:
*   get:
*     tags:
*     - entity
*     description: Find entity by ID
*     summary: Find entity by ID
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: entity id
*         in: path
*         required: true
*         type: integer
*       - name: Authorization
*         in: header
*         type: string
*         description: Token (token goes here)
*     responses:
*       200:
*         description: A entity
*         schema:
*           $ref: '#/definitions/Entity'
*       404:
*         description: entity not found
*/
exports.findById = function (req, res, next) {
Entity.getById(dbUtils.getSession(req), req.params.id)
  .then(response => writeResponse(res, response))
  .catch(next);
};
