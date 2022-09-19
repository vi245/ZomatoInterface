import './App.css';
import React from "react";
import { BrowserRouter,Route, Switch} from "react-router-dom";
 import Home from './Components/home/Home' ;
 
 import RestaurantDetail from './Components/details/Restaurantdetail';
 import Filter from "./Components/filters/Filter";
import Verification from './Components/home/VerificationPage';
import Success from './Components/details/success';
import Cancel from './Components/details/cancel';
import Order from './Components/orders/ViewOrder';
import NoPageFound from './Components/home/NoPage';

 function Router() {
     
    return(
        <BrowserRouter forceRefresh={true}>
        <Switch >
            <Route   exact path='/'  component={Home} />
            <Route   path='/details'  component={RestaurantDetail}/>
            <Route   path='/filter'  component={Filter}/>
            <Route  exact path='/verify/:token'  component={Verification}/>
            <Route   path='/viewOrders'  component={Order}/>
            <Route   path='/success'  component={Success}/>
            <Route   path='/cancel'  component={Cancel}/>
            <Route component={NoPageFound}/>
            </Switch> 
        </BrowserRouter>
    )
    
}
export default Router;