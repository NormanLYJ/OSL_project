
var Address = require('../models/address')
, _ = require('lodash')
, writeResponse = require('../helpers/response').writeResponse
, writeError = require('../helpers/response').writeError
, loginRequired = require('../middlewares/loginRequired')
, dbUtils = require('../dbUtils');

/**
* @swagger
* definition:
*   Address:
*     type: object
*     properties:
*       id:
*         type: integer
*       name:
*         type: string
*       sourceID:
*         type: string
*       valid_until:
*         type: string
*       country:
*         type: string
*       country_code:
*         type: string
*       category:
*         type: string
*/

/**
* @swagger
* /api/v0/address:
*   get:
*     tags:
*     - address
*     description: Find all addresses
*     summary: Find all addresses
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A list of addresses
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Address'
*/
exports.list = function (req, res, next) {
Address.getAll(dbUtils.getSession(req))
  .then(response => writeResponse(res, response))
  .catch(next);
};

/**
* @swagger
* /api/v0/address/{id}:
*   get:
*     tags:
*     - address
*     description: Find address by ID
*     summary: Find address by ID
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: address id
*         in: path
*         required: true
*         type: integer
*       - name: Authorization
*         in: header
*         type: string
*         description: Token (token goes here)
*     responses:
*       200:
*         description: A address
*         schema:
*           $ref: '#/definitions/Address'
*       404:
*         description: address not found
*/
exports.findById = function (req, res, next) {
Address.getById(dbUtils.getSession(req), req.params.id)
  .then(response => writeResponse(res, response))
  .catch(next);
};
