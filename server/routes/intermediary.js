
var Intermediary = require('../models/intermediary')
, _ = require('lodash')
, writeResponse = require('../helpers/response').writeResponse
, writeError = require('../helpers/response').writeError
, loginRequired = require('../middlewares/loginRequired')
, dbUtils = require('../dbUtils');

/**
* @swagger
* definition:
*   Intermediary:
*     type: object
*     properties:
*       id:
*         type: integer
*       name:
*         type: string
*       country:
*         type: string
*       country_code:
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
* /api/v0/intermediary:
*   get:
*     tags:
*     - intermediary
*     description: Find all intermediaries
*     summary: Find all intermediaries
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A list of intermediaries
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Intermediary'
*/
exports.list = function (req, res, next) {
Intermediary.getAll(dbUtils.getSession(req))
  .then(response => writeResponse(res, response))
  .catch(next);
};

/**
* @swagger
* /api/v0/intermediary/{id}:
*   get:
*     tags:
*     - intermediary
*     description: Find intermediary by ID
*     summary: Find intermediary by ID
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: intermediary id
*         in: path
*         required: true
*         type: integer
*       - name: Authorization
*         in: header
*         type: string
*         description: Token (token goes here)
*     responses:
*       200:
*         description: A intermediary
*         schema:
*           $ref: '#/definitions/Intermediary'
*       404:
*         description: intermediary not found
*/
exports.findById = function (req, res, next) {
Intermediary.getById(dbUtils.getSession(req), req.params.id)
  .then(response => writeResponse(res, response))
  .catch(next);
};
