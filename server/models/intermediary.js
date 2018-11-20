var _ =require('lodash');
var Entity = require ('../models/DBModels/entity');
var Address = require ('../models/DBModels/address');
var Officer = require ('../models/DBModels/officer');
var Intermediary = require ('../models/DBModels/intermediary');
var Relationship = require ('../models/DBModels/relationship');

//get all intermediaries
var getAllIntermediary = function (session) {
    return session
      .run('MATCH (intermediary:Intermediary) RETURN intermediary')
      .then(result => _parseIntermediaryList(result));
  };

//get intermediary by id
var getIntermediaryById = function (session, intermediaryId) {
    var query = [
      'MATCH (i:Intermediary {id: {intermediaryId}})',
      'OPTIONAL MATCH (i)-[io:Intermediary_Of]->(e1:Entity)',
      'OPTIONAL MATCH (i)-[oo:Officer_Of]->(e2:Entity)',
      'OPTIONAL MATCH (i)-[ra:Registered_Address]->(a:Address)',
      'WITH DISTINCT i, e1, e2, a, io, oo, ra',
      'SET io.source={intermediaryId}, io.target=e1.id,',
      '   oo.source={intermediaryId}, oo.target=e2.id,',
      '   ra.source={intermediaryId}, ra.target=a.id',
      'RETURN DISTINCT i as intermediary,',
      'collect(DISTINCT e1) AS intermediating_entities,',
      'collect(DISTINCT e2) AS officing_entities,',
      'collect(DISTINCT a) AS registered_addresses,',
      'collect(DISTINCT io) AS intermediating_relation,',
      'collect(DISTINCT oo) AS officing_relation,',
      'collect(DISTINCT ra) AS registering_relation'
    ].join('\n');
    //make sure the result is unique

    return session.run(query, {
      intermediaryId: parseInt(intermediaryId)
    }).then(result => {
      if (!_.isEmpty(result.records)) {
        return _parseSingleIntermediary(result.records[0]);
      }
      else {
        throw {message: 'Intermediary not found', status: 404}
      }
    });
  };

  var _parseSingleIntermediary = function(record){
    if (record.length) {
        var output = {};
        _.extend(output, new Intermediary(record.get('intermediary')));

        output.intermediating_entities = _.map(record.get('intermediating_entities'), record => {
            return new Entity(record);
          });
        output.officing_entities = _.map(record.get('officing_entities'), record => {
          return new Entity(record);
        });
        output.registered_addresses = _.map(record.get('registered_addresses'), record => {
            return new Address(record);
        });
        var intermediating_relation = _.map(record.get('intermediating_relation'), record => {
          return new Relationship(record);
        });
        var officing_relation = _.map(record.get('officing_relation'), record => {
          return new Relationship(record);
        });
        var registering_relation = _.map(record.get('registering_relation'), record => {
          return new Relationship(record);
        });
        output.relations=[].concat(intermediating_relation, officing_relation, registering_relation);
        return output;
      } 
      else {
        return null;
      }
  }
  var _parseIntermediaryList = function(result){
    return result.records.map(r => new Intermediary(r.get('intermediary')))
  }

  module.exports = {
    getAll: getAllIntermediary,
    getById: getIntermediaryById,
  };