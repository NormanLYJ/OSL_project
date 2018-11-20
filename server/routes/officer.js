
var Officer = require('../models/officer')
, _ = require('lodash')
, writeResponse = require('../helpers/response').writeResponse
, writeError = require('../helpers/response').writeError
, loginRequired = require('../middlewares/loginRequired')
, dbUtils = require('../dbUtils');

/**
* @swagger
* definition:
*   Officer:
*     type: object
*     properties:
*       id:
*         type: integer
*       name:
*         type: string
*       valid_until:
*         type: string
*       category:
*         type: string
*       sourceID:
*         type: string
*/

/**
* @swagger
* /api/v0/officer:
*   get:
*     tags:
*     - officer
*     description: Find all officers
*     summary: Find all officers
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A list of officers
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Officer'
*/
exports.list = function (req, res, next) {
Officer.getAll(dbUtils.getSession(req))
  .then(response => writeResponse(res, response))
  .catch(next);
};

/**
* @swagger
* /api/v0/officer/{id}:
*   get:
*     tags:
*     - officer
*     description: Find officer by ID
*     summary: Find officer by ID
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: officer id
*         in: path
*         required: true
*         type: integer
*       - name: Authorization
*         in: header
*         type: string
*         description: Token (token goes here)
*     responses:
*       200:
*         description: A officer
*         schema:
*           $ref: '#/definitions/Officer'
*       404:
*         description: officer not found
*/
exports.findById = function (req, res, next) {
Officer.getById(dbUtils.getSession(req), req.params.id)
  .then(response => writeResponse(res, response))
  .catch(next);
};
