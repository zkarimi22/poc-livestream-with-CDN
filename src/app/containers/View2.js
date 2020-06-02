import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";
import { Layout, Grid} from '@q4/nimbus-ui';  
import BroadcastCanvas from '../components/broadcastCanvas';


 import './../../App.css';
 
 
class View2 extends React.Component{
  constructor(props) {
    super(props); 
    this.state = { rotation: 0 };
    this.tick = this.tick.bind(this);
  }


 
  componentDidMount() {
    requestAnimationFrame(this.tick);


}
 
tick() {
  const rotation = this.state.rotation + 0.04;
  this.setState({ rotation });
  requestAnimationFrame(this.tick);
}
  
 render(){ 
 
   

      return (
      <div className="view2-screen"> 
 
              <Layout theme="light-grey" height="comfy" padding="none" >

                    <div className="view2-screen_container">

                     <Grid>
                       
                        
                    <BroadcastCanvas rotation={this.state.rotation} width={600} height={500} />
                     </Grid>

                      <div className="view2-screen_input"> 
                       
                      </div>
                      
                    </div>


              </Layout>

        </div>
            
       
      );
    }
  }
   

  const mapStateToProps = (state) => {
    return {
        view: state.viewReducer.view,
        data: state.dataReducer.data 

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
    
    export default connect(mapStateToProps,mapDispatchToProps)(View2);