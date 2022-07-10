import React, { useEffect } from "react"
import Navigation from "../../Components/Navigation/Navigation";
import './Dashboard.scss'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function DashboardWithNavigation(Child) {

    const updatedDashboard = () => (
        <div className="creator-dashboard">
        <div className="creator-dashboard-navigation">
            <Navigation />
        </div>
       <div className="creator-dashboard-container">
           <div className="creator-dashboard-container-header">
               </div>        
               <div className="creator-dashboard-container-container">
           <Child />
               </div>
               <div className="creator-dashboard-container-footer">
               
               </div>
       </div>
    </div>)

    return updatedDashboard;
}


export default DashboardWithNavigation;