var _ =require('lodash');
var Entity = require ('../models/DBModels/entity');
var Address = require ('../models/DBModels/address');
var Officer = require ('../models/DBModels/officer');
var Intermediary = require ('../models/DBModels/intermediary');
var Relationship = require ('../models/DBModels/relationship');

//get all entities
var getAllEntity = function (session) {
    return session
      .run('MATCH (entity:Entity) RETURN entity')
      .then(result => _parseEntityList(result));
  };

//get entity by id
var getEntityById = function (session, entityId) {
    var query = [
      'MATCH (e:Entity {id: {entityId}})',
      'OPTIONAL MATCH (e)-[oo1:Officer_Of]->(e1:Entity)',
      'OPTIONAL MATCH (e)<-[oo2:Officer_Of]-(e2:Entity)',
      'OPTIONAL MATCH (e)-[ct1:Connected_To]->(e3:Entity)',
      'OPTIONAL MATCH (e)<-[ct2:Connected_To]-(e4:Entity)',
      'OPTIONAL MATCH (e)-[io1:Intermediary_Of]->(e5:Entity)',
      'OPTIONAL MATCH (e)<-[io2:Intermediary_Of]-(e6:Entity)',
      'OPTIONAL MATCH (e)<-[io3:Intermediary_Of]-(i1:Intermediary)',
      'OPTIONAL MATCH (e)<-[oo3:Officer_Of]-(i2:Intermediary)',
      'OPTIONAL MATCH (e)-[ra:Registered_Address]->(a:Address)',
      'WITH DISTINCT e, e1, e2, e3, e4, e5, e6, i1, i2, a, oo1, oo2, oo3, ct1, ct2, io1, io2, io3, ra',
      'SET oo1.source={entityId}, oo1.target=e1.id,',
      '    oo2.source=e2.id, oo2.target={entityId},',
      '    oo3.source=i2.id, oo3.target={entityId},',
      '    ct1.source={entityId}, ct1.target=e3.id,',
      '    ct2.source=e4.id, ct2.target={entityId},',
      '    io1.source={entityId}, io1.target=e5.id,',
      '    io2.source=e6.id, io2.target={entityId},',
      '    io3.source=i1.id, io3.target={entityId},',
      '    ra.source={entityId}, ra.target=a.id',
      'RETURN DISTINCT e as entity,',
      'collect(DISTINCT e1) AS officing_entities,',
      'collect(DISTINCT e2) AS officed_entities,',
      'collect(DISTINCT e3) AS connecting_entities,',
      'collect(DISTINCT e4) AS connected_entities,',
      'collect(DISTINCT e5) AS intermediating_entities,',
      'collect(DISTINCT e6) AS intermediated_entities,',
      'collect(DISTINCT a) AS registered_addresses,',
      'collect(DISTINCT i1) AS intermediated_intermediary,',
      'collect(DISTINCT i2) AS officed_intermediary,',
      'collect(DISTINCT oo1) as officing_entity_relation,',
      'collect(DISTINCT oo2) as officed_by_entity_relation,',
      'collect(DISTINCT oo3) as officed_by_intermediary_relation,',
      'collect(DISTINCT ct1) as connecting_relation,',
      'collect(DISTINCT ct2) as connected_relation,',
      'collect(DISTINCT io1) as intermediating_entity_relation,',
      'collect(DISTINCT io2) as intermediated_by_entity_relation,',
      'collect(DISTINCT io3) as intermediated_by_intermediary_relation,',
      'collect(DISTINCT ra) as registering_relation'
      
    ].join('\n');
    //make sure the result is unique

    return session.run(query, {
      entityId: parseInt(entityId)
    }).then(result => {
      if (!_.isEmpty(result.records)) {
        return _parseSingleEntity(result.records[0]);
      }
      else {
        throw {message: 'Entity not found', status: 404}
      }
    });
  };

  // //get entity by officer
  // var getEntityByOfficer = function (session, officerId) {
  //   var query = [
  //       'MATCH (entity:Entity)<-[:Officer_Of]-(officer)',
  //       'WHERE officer.id = {officerId}',
  //       'WITH DISTINCT entity, officer',
  //       'RETURN DISTINCT officer',
  //       'collect(DISTINCT entity) as officing_entities'
  //     ].join('\n');
    
  //     return session.run(query, {
  //       officerId: parseInt(officerId)
  //     }).then(result => _parseEntityList(result));
  // };

  // //get entity by address
  // var getEntityByAddress = function (session, addressId) {
  //   var query = [
  //       'MATCH (entity:Entity)-[:Officer_Of]->(address)',
  //       'WHERE address.id = {addressId}',
  //       'RETURN entity'
  //     ].join('\n');
    
  //     return session.run(query, {
  //       addressId: parseInt(addressId)
  //     }).then(result => _parseEntityList(result));
  // };

  var _parseSingleEntity = function(record){
    if (record.length) {
        var output = {};
        _.extend(output, new Entity(record.get('entity')));
          
        //related nodes
        output.officing_entities = _.map(record.get('officing_entities'), record => {
          return new Entity(record);
        });
        output.officed_entities = _.map(record.get('officed_entities'), record => {
            return new Entity(record);
        });
        output.connecting_entities = _.map(record.get('connecting_entities'), record => {
            return new Entity(record);
        });

        output.connected_entities = _.map(record.get('connected_entities'), record => {
            return new Entity(record);
        });
        output.intermediating_entities = _.map(record.get('intermediating_entities'), record => {
            return new Entity(record);
        });
        output.intermediated_entities = _.map(record.get('intermediated_entities'), record => {
            return new Entity(record);
        });
        output.registered_addresses = _.map(record.get('registered_addresses'), record => {
            return new Address(record);
        });
        output.intermediated_intermediary = _.map(record.get('intermediated_intermediary'), record => {
          return new Intermediary(record);
        });
        output.officed_intermediary = _.map(record.get('officed_intermediary'), record => {
          return new Intermediary(record);
        });

        //relationship
        var officing_entity_relation = _.map(record.get('officing_entity_relation'), record => {
          return new Relationship(record);
        });
        var officed_by_entity_relation = _.map(record.get('officed_by_entity_relation'), record => {
          return new Relationship(record);
        });
        var connecting_relation = _.map(record.get('connecting_relation'), record => {
          return new Relationship(record);
        });
        var connected_relation = _.map(record.get('connected_relation'), record => {
          return new Relationship(record);
        });
        var intermediating_entity_relation = _.map(record.get('intermediating_entity_relation'), record => {
          return new Relationship(record);
        });
        var intermediated_by_entity_relation = _.map(record.get('intermediated_by_entity_relation'), record => {
          return new Relationship(record);
        });
        var registering_relation = _.map(record.get('registering_relation'), record => {
          return new Relationship(record);
        });
        var officed_by_intermediary_relation = _.map(record.get('officed_by_intermediary_relation'), record => {
          return new Relationship(record);
        });
        var intermediated_by_intermediary_relation = _.map(record.get('intermediated_by_intermediary_relation'), record => {
          return new Relationship(record);
        });
        output.relations = [].concat(officing_entity_relation, officed_by_entity_relation, connecting_relation, connected_relation, 
          intermediating_entity_relation, intermediated_by_entity_relation, registering_relation, officed_by_intermediary_relation, intermediated_by_intermediary_relation );
        return output;
      } 
      else {
        return null;
      }
  }
  var _parseEntityList = function(result){
    return result.records.map(r => new Entity(r.get('entity')))
  }

  module.exports = {
    getAll: getAllEntity,
    getById: getEntityById,
  };