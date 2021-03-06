var React = require('react');

var Delete = require('react-icons/lib/fa/trash');
var Edit = require('react-icons/lib/fa/pencil');
import {connect} from 'react-redux';

import {fetchRiderTypes,Deleteridertype,UpdateRiderType} from './actions/riderTypesAction'
import {Link} from 'react-router';
import LoginNavigation from './loinNavigation.js';
import ConfigSidebar from './layouts/configsidebar.js';
import Dialog from 'react-bootstrap-dialog';
import  {Modal,Button} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

  


class RiderTypes extends React.Component 
{
  constructor (props) {
    super(props);
   
      this.state={
        showModal:false,
    
      
      }
      
    }
componentWillMount(){
    console.log("mounted")
    this.props.fetchRiderTypes()

}
  
close(event) {
  this.setState({ showModal: false ,
                    showDeleteModal:false});
  }
deleteRider(event,user){
    this.setState({
      showDeleteModal:true,
      id:user.id
    })
  }
deleteRidertype(event){
  event.preventDefault();
    var self=this;
      var deleterow={
           "id":this.state.id
        }
      this.props.Deleteridertype(deleterow)
      this.setState({ showDeleteModal: false })
      
  }
edit(event,user){
  this.setState(
      { showModal: true,
        name:user.name,
        description:user.description,
        id:user.id
       }
    );
  }
updateRider(event){
  event.preventDefault();
     var self = this;
      var update={
        "name":this.state.name,
        "description":this.state.description,
        "id":this.state.id
        }
          // console.log(update);
          this.props.UpdateRiderType(update);
          this.setState({ showModal: false })
  }
editFormatter(cell, row) {
    return <Button bsStyle="info" className="listButton" onClick={(event)=>this.edit(event,row)} ><Edit size={20} /></Button>;
  }
  deleteFormatter(cell, row) {
    return <Button bsStyle="danger" className="listButton"  onClick={(event)=>this.deleteRider(event,row)}><Delete size={20} color={'white'} /><Dialog ref={(el) => { this.dialog = el }} /> </Button>;
  }
 
 createListItems(){
        return this.props.ridertypes.map((user)=>{
            return(
               <tr key={user.id}>
                 <td>{user.id}</td>
                 <td>{user.name}</td>
                 <td>{user.description}</td>
                 {/* <td>  <Link ><Edit size={25} color={'green'} onClick={(event)=>this.edit(event,user)}/></Link></td>
                  <td>
                     <Link >
                      <Delete size={25} color={'#ff6663'} onClick={(event)=>this.deleteRider(event,user)}/>
                       <Dialog ref={(el) => { this.dialog = el }} /> 
                      </Link> 
                  </td>  */}
               
                 
                 </tr>
            )
        })
    } 

render(){

     
    return(
      
      <div className="row">
        <LoginNavigation />
          <div className="col-lg-2">
            <ConfigSidebar />
          </div>
          <div className="col-lg-9">
            <div className="row">
              <h3>Rider Types</h3>
                <hr />
            </div>
            <div className="row">
              <div className="col-lg-2 pull-right">
                <Link  to="/config/ridertypes/newridertype"> New RiderType </Link>
              </div>
            </div>
            <div className="row">
               {/* <table className="table">
                 <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                 {this.createListItems()}
                </tbody>
              </table>  */}
               <BootstrapTable data={this.props.ridertypes}  bordered={true}  pagination={true} striped={true} hover={false} >
                <TableHeaderColumn  width="70" dataField="id" isKey={true} hidden={true}>ID</TableHeaderColumn> 
                <TableHeaderColumn dataField="name"  className="reactTableHeader groupListHeader" columnClassName=" groupListCell"  > Name</TableHeaderColumn>
                <TableHeaderColumn dataField="description" className="reactTableHeader groupListHeader" columnClassName="reactTableCell groupListCell" >Description</TableHeaderColumn>
                <TableHeaderColumn width="50" className="reactTableHeader groupListHeader" columnClassName="reactTableCell groupListCell"  dataFormat={this.editFormatter.bind(this)}>Update</TableHeaderColumn> 
                <TableHeaderColumn width="50" className="reactTableHeader groupListHeader" columnClassName="reactTableCell groupListCell"  dataFormat={this.deleteFormatter.bind(this)} >Delete</TableHeaderColumn> 
              </BootstrapTable> 
               
            </div> 
        
          </div>
          <Modal show={this.state.showModal} onHide={(event)=>this.close(event)}>
            <Modal.Header >
              <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                  <div className="panel panel-info" >
                      <div className="panel-body">
                          <form name="addridertypeform" >
                              <div className="row">
                                <div className="col-md-4">
                                  <label>Name:</label>
                                </div>
                                <div className="col-md-8">
                                  <input type="text" className="form-control form-input" name="addridertype"  placeholder="Rider Type*" onChange={(event) => this.setState({name:event.target.value}) } value={this.state.name} required/>
                                </div>
                              </div><br/>
                              <div className="row">
                                <div className="col-md-4">
                                  <label>Description:</label>
                                </div>
                                <div className="col-md-8">
                                  <textarea rows="3" cols="30" name="description" className="form-control form-input" placeholder="Description ......*" onChange={(event) => this.setState({description:event.target.value})} value={this.state.description} required></textarea>
                                </div>
                              </div>
                              <br/>
                              <div className="row">
                                <div className="col-lg-6 col-lg-offset-3 text-center">
                                  <button id="btn-reset" type="reset" className="btn btn-default">Cancel</button>
                                    <button id="btn-Register" type="submit" name="submit" className="btn btn-default" onClick={(event)=>this.updateRider(event)}>Update</button>
                                </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div> 
            </Modal.Body>
            <Modal.Footer>
             <Button onClick={(event)=>this.close(event)}>Close</Button> 
            </Modal.Footer>
          </Modal>
      <div>
        <Modal show={this.state.showDeleteModal} onHide={(event)=>this.close(event)}>
          <Modal.Header >
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you Sure you want to delete?</p>
            <Button onClick={(event)=>this.close(event)}>Cancel</Button>
            <Button onClick={(event)=>this.deleteRidertype(event)} > Ok</Button>
          </Modal.Body>
          <Modal.Footer>
             <Button onClick={(event)=>this.close(event)}>Close</Button> 
          </Modal.Footer>
        </Modal>
     </div>
    </div>  

  )
        
    }
}
function mapStateToProps(state){
  return{
      ridertypes:state.ridertypes,
    }
}
export default connect(mapStateToProps,{fetchRiderTypes,Deleteridertype,UpdateRiderType})(RiderTypes);