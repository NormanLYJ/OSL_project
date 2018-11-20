import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import avatar from '../../assets/avatar.jpeg'
import style from './index.scss';
import {Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Graph from '../react-sigma-graph/src/index.js';
import InfoTable from '../InfoTable';
import deepEqual from 'deep-equal';
import {
  getEntity,getEntityById,
  getOfficer,getOfficerById,
  getIntermediary,getIntermediaryById,
  getAddress,getAddressById,
   } from '../../actions/graph'

var _categoryColors = {
  'Entity': '#1f77b4',
  'Officer': '#ff7f0e',
  'Intermediary': '#45a262',
  'Address':'#be33e0'
};

@withRouter
class RelationGraph extends React.Component {
  constructor(){
    super();
    this.visualGraph={
        nodes:[],
        edges:[]
    };
    this.selectedNode=null;
    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.listAllEntity = this.listAllEntity.bind(this)
    this.listAllOfficer = this.listAllOfficer.bind(this)
    this.listAllIntermediary = this.listAllIntermediary.bind(this)
    this.listAllAddress = this.listAllAddress.bind(this)
  }
  clickAvatar(){
  }
  componentDidMount(){
    this.props.dispatch(getEntity());
  }

  handleNodeClick(e){
    //displaying all node of the same type, and related nodes
    let node = e.data.node;
    let payload ={
      id: parseInt(node.id)
    }
    switch(node.category){
      case 'Entity':{
        this.props.dispatch(getEntityById(payload));
        return
      }
      case 'Officer':{
        this.props.dispatch(getOfficerById(payload));
        return
      }
      case 'Intermediary':{
        this.props.dispatch(getIntermediaryById(payload));
        return
      }
      case 'Address':{
        this.props.dispatch(getAddressById(payload));
        return
      }
      default: return

    }
  }
  listAllEntity(){
    this.props.dispatch(getEntity());
  }
  listAllOfficer(){
    this.props.dispatch(getOfficer());
  }
  listAllIntermediary(){
    this.props.dispatch(getIntermediary());
  }
  listAllAddress(){
    this.props.dispatch(getAddress());
  }

  render() {
    let {graphData} = this.props;
    if (graphData){
      if (Array.isArray(graphData)){
        //an array of nodes, all nodes of same type
       this.visualGraph = {
            nodes: graphData,
            edges: []
        }
  
      }
      else {
        //an object of the selecting node -- then change graph to show all related nodes
        this.selectedNode =graphData;
        //extract related nodes from graphData
        for (let key in graphData){
          if (graphData[key] && key!=='relations'){
              if (Array.isArray(graphData[key])){
                graphData[key].forEach(item=>{
  
                  let nodeId = item.id;
                  //add the new node into the graph data if it is not present
                  if (this.visualGraph.nodes.filter(x=>x.id==nodeId).length==0){
                    this.visualGraph.nodes.push(item);
                  }
                });
              }
           }
          }
          //extract relations from graphData
          this.visualGraph.edges=[];
          if (graphData['relations']){
              graphData['relations'].forEach(r=>{
                  this.visualGraph.edges.push(r)
              });
          }
      }
    }
    const topbarContent =          
      <div className={classnames(style.topbarWrapper)}>
        <div className={classnames('col-md-2')}>
            OffshoreLeaks
        </div>
        <div className={classnames('col-md-6')}>
          <button className="btn btn-secondary" onClick={this.listAllEntity}>All Entity</button>
          <button className="btn btn-secondary" onClick={this.listAllOfficer}>All Officer</button>
          <button className="btn btn-secondary" onClick={this.listAllIntermediary}>All Intermediary</button>
          <button className="btn btn-secondary" onClick={this.listAllAddress}>All Address</button>
        </div>
        <div className={classnames('col-md-2')}></div>
        <div className={classnames('col-md-1')}>
          <div className={classnames('pull-right', style.userCtrl)}>
            <img src={avatar} onClick={this.clickAvatar} />
          </div>
        </div>
      </div>
    if (this.visualGraph && this.visualGraph.nodes && this.visualGraph.nodes.length>0){
      return (
        <div>
          {topbarContent}
          <div className='row'>
            <div className='col-sm-8'>
              <div className={style.graphWrapper}>
                  <Graph data={this.visualGraph}  categoryColors={_categoryColors} handleNodeClick={this.handleNodeClick}/>
                </div>
              </div>
              {
              this.selectedNode && 
              <div className= 'col-sm-4'>
                <div className={style.informationWrapper}>
                <InfoTable tableData={this.selectedNode}/>
                </div>
              </div>
              }
          </div>
        </div>
      );
    }

    return (topbarContent)

    }
}
function mapStateToProps(state, ownProps = {}) {
  return {
    graphData: state.graph.graphData
  }
};

export default connect(mapStateToProps)(RelationGraph);

