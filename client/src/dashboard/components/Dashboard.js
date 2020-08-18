import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
const Dashboard = () => {
    const auth = useContext(AuthContext);

     return (
         <div>
             <div>Dashboard</div>
         <div>{auth.userId}</div>
         </div>

     );
};
export default Dashboard;