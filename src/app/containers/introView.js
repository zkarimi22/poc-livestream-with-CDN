import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";
import {Layout, Button, Card, Grid, GridColumn } from '@q4/nimbus-ui'; 
  
import './../../App.css';
 
class IntroView extends React.Component{
    state = {
      showTitleText:false
    }
  
  render(){ 
  
    const nextStep = (direction) => { 
  
     const currentValue = this.props.view.currentView;

           if(direction==="back"){

              this.props.viewAction("currentView",currentValue -1);
          }
          else {

              this.props.viewAction("currentView",currentValue +1);
          }
      }

      const editEvent = (index) => {  

          console.log(index);
        this.props.dataSet('selectedEvent',index);
  
        nextStep();
  
        }

        const newCopy = (copiedIndex) => {  

          let dateCreated = new Date().toISOString().substring(0, 10);
          
        
           const copiedObject = {
            ...this.props.data.eventlist[copiedIndex],
            title: "Copy of"+this.props.data.eventlist[copiedIndex].title,
            created_timestamp: dateCreated
          } 
 
          this.props.dataSet('eventlist',copiedObject);
 
          
          }

 

    

    if (this.props.view.dashboardActive === true) { 
      return (
        <Layout theme="light-grey"  flex={false} padding="none" height="full">
         
         <Grid className="custom-grid"> 

        {this.props.data.eventlist.map(
          (item, index)  => {
            console.log(item);
             return (
              <GridColumn key={index} width="1-of-4" smallWidth="1-of-12">
                      <Card
                      className="custom-card"
                      theme="dark"
                      title={item.title}
                      headerChildren={ 
                      <div> 
                      <i onClick={() => editEvent(index) } className="fa fa-pencil custom-card_card-icon" aria-hidden="true"></i>
                      <i onClick={() => newCopy(index) } className="fa fa-clone custom-card_card-icon" aria-hidden="true"></i>
                      </div>
                      }
                      children={true} 
                      > 
                      <p className="custom-card_description">Date Created: {item.created_timestamp}</p>
                      </Card>
                
              </GridColumn>
            );
          }
        )}
         <GridColumn   width="1-of-4" smallWidth="1-of-12">
                      <Card
                      classname="custom-card"
                      theme="dark"
                      title="CREATE A NEW EVENT"
                      headerChildren={ 
                      <div> 
                       
                      </div>
                      }
                      children={true} 
                      > 
                      <p className="custom-card_description" >Create a new event</p>
                      </Card>
                
              </GridColumn>
      </Grid>
      </Layout>
       
      );

  }
  
 
  if (this.props.view.dashboardActive === false) {

    return (
       <div className="intro-screen" > 
       
        
      
                                    <Button 
                                    theme="rain"
                                    label="Begin Broadcasting"
                                    size="default"
                                    onClick={()=> nextStep()} 

                                        /> 
        
         
      </div>
     
    );
 
      }
    }
  }
   

  const mapStateToProps = (state) => {
    return {
        view: state.viewReducer.view,
        data: state.dataReducer.data, 

      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewAction: (viewKey,viewValue) => {
          dispatch(viewAction(viewKey,viewValue));
        },
        dataSet: (dataKey,dataValue) => {
          dispatch(dataSet(dataKey,dataValue));
        }, 
      };
};
    
    export default connect(mapStateToProps,mapDispatchToProps)(IntroView);