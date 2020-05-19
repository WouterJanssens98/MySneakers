import React, { } from 'react';

const DashBoardPage = ({ children }) => {

  const data = JSON.parse(localStorage.getItem('mern:authUser'))
  

  return (
    <div>
     Welcome! Currently signed in as {data['email']}
    </div>
  )
};
export default DashBoardPage;