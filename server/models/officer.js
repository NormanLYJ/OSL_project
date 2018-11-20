var _ =require('lodash');
var Entity = require ('../models/DBModels/entity');
var Address = require ('../models/DBModels/address');
var Officer = require ('../models/DBModels/officer');
var Intermediary = require ('../models/DBModels/intermediary');
var Relationship = require ('../models/DBModels/relationship');

//get all officers
var getAllOfficer = function (session) {
    return session
      .run('MATCH (officer:Officer) RETURN officer')
      .then(result => _parseOfficerList(result));
  };

//get officer by id
var getOfficerById = function (session, officerId) {
    var query = [
      'MATCH (o:Officer {id: {officerId}})',
      'OPTIONAL MATCH (o)-[oo:Officer_Of]->(e:Entity)',
      'OPTIONAL MATCH (o)-[ra:Registered_Address]->(a:Address)',
      'OPTIONAL MATCH (o)-[sn:Same_Name_As]->(o1:Officer)',
      'WITH DISTINCT o, e, a, o1, oo, ra, sn',
      'SET oo.source={officerId}, oo.target=e.id,',
      '  ra.source={officerId}, ra.target=a.id,',
      '  sn.source={officerId}, sn.target=o1.id',
      'RETURN DISTINCT o as officer,',
      'collect(DISTINCT e) AS officing_entities, ',
      'collect(DISTINCT a) AS registered_addresses,',
      'collect(DISTINCT o1) AS same_named_officers,',
      'collect(DISTINCT oo) AS officing_relation,',
      'collect(DISTINCT ra) AS registering_relation,',
      'collect(DISTINCT sn) AS same_name_relation'
    ].join('\n');
    //make sure the result is unique

    return session.run(query, {
      officerId: parseInt(officerId)
    }).then(result => {
      if (!_.isEmpty(result.records)) {
        return _parseSingleOfficer(result.records[0]);
      }
      else {
        throw {message: 'Officer not found', status: 404}
      }
    });
  };

  var _parseSingleOfficer = function(record){
    if (record.length) {
        var output = {};
        _.extend(output, new Officer(record.get('officer')));
    
        output.officing_entities = _.map(record.get('officing_entities'), record => {
          return new Entity(record);
        });
        output.registered_addresses = _.map(record.get('registered_addresses'), record => {
            return new Address(record);
        });
        output.same_named_officers = _.map(record.get('same_named_officers'), record => {
          return new Officer(record);
        });
        var officing_relation = _.map(record.get('officing_relation'), record => {
            return new Relationship(record);
        });
        var registering_relation = _.map(record.get('registering_relation'), record => {
            return new Relationship(record);
        });
        var same_name_relation = _.map(record.get('same_name_relation'), record => {
          return new Relationship(record);
        });
        output.relations=[].concat(officing_relation, registering_relation, same_name_relation);
        return output;
      } 
      else {
        return null;
      }
  }
  var _parseOfficerList = function(result){
    return result.records.map(r => new Officer(r.get('officer')))
  }

  module.exports = {
    getAll: getAllOfficer,
    getById: getOfficerById,
  };