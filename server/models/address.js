var _ =require('lodash');
var Entity = require ('../models/DBModels/entity');
var Officer = require ('../models/DBModels/officer');
var Address = require ('../models/DBModels/address');
var Intermediary = require ('../models/DBModels/intermediary');
var Relationship = require ('../models/DBModels/relationship');

//get all addresses
var getAllAddress = function (session) {
    return session
      .run('MATCH (address:Address) RETURN address')
      .then(result => _parseAddressList(result));
  };

//get address by id
var getAddressById = function (session, addressId) {
    var query = [
      'MATCH (a:Address {id: {addressId}})',
      'OPTIONAL MATCH (a)<-[ra1:Registered_Address]-(e:Entity)',
      'OPTIONAL MATCH (a)<-[ra2:Registered_Address]-(o:Officer)',
      'OPTIONAL MATCH (a)<-[ra3:Registered_Address]-(i:Intermediary)',
      'WITH DISTINCT a, e, o, i, ra1, ra2, ra3',
      'SET ra1.source=e.id, ra1.target={addressId},',
      '   ra2.source=o.id, ra2.target={addressId},',
      '   ra3.source=i.id, ra3.target={addressId}',
      'RETURN DISTINCT a as address,',
      'collect(DISTINCT e) AS registered_entities,',
      'collect(DISTINCT o) AS registered_officers,',
      'collect(DISTINCT i) AS registered_intermediaries,',
      'collect(DISTINCT ra1) AS entity_registering,',
      'collect(DISTINCT ra2) AS officer_registering,',
      'collect(DISTINCT ra3) AS intermediary_registering'
    ].join('\n');
    //make sure the result is unique

    return session.run(query, {
      addressId: parseInt(addressId)
    }).then(result => {
      if (!_.isEmpty(result.records)) {
        return _parseSingleAddress(result.records[0]);
      }
      else {
        throw {message: 'Address not found', status: 404}
      }
    });
  };

  var _parseSingleAddress = function(record){
    if (record.length) {
        var output = {};
        _.extend(output, new Address(record.get('address')));
    
        output.registered_entities = _.map(record.get('registered_entities'), record => {
          return new Entity(record);
        });
        output.registered_officers = _.map(record.get('registered_officers'), record => {
            return new Officer(record);
        });
        output.registered_intermediaries = _.map(record.get('registered_intermediaries'), record => {
            return new Intermediary(record);
        });
        var entity_registering = _.map(record.get('entity_registering'), record => {
            return new Relationship(record);
        });
        var officer_registering = _.map(record.get('officer_registering'), record => {
            return new Relationship(record);
        });
        var intermediary_registering = _.map(record.get('intermediary_registering'), record => {
            return new Relationship(record);
        });
        output.relations = [].concat(entity_registering, officer_registering, intermediary_registering);
        return output;
      } 
      else {
        return null;
      }
  }
  var _parseAddressList = function(result){
    return result.records.map(r => new Address(r.get('address')))
  }

  module.exports = {
    getAll: getAllAddress,
    getById: getAddressById,
  };