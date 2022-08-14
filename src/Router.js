import './App.css';
import React from "react";
import { BrowserRouter,Route,Switch} from "react-router-dom";
 import Home from './Components/home/Home' ;
 import RestaurantDetail from './Components/details/Restaurantdetail';
 import Filter from "./Components/filters/Filter";

function Router(){
    return(
        <BrowserRouter>
        <div>
           <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route  path="/details" component={RestaurantDetail}></Route>
            <Route  path="/filter" component={Filter }></Route>
            
            </Switch>
            </div>
        </BrowserRouter>
    )
}
export default Router;