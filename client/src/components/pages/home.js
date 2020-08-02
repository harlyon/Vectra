import React, { useContext, useEffect } from 'react';
import bg from '../../images/image.jpg'
import { useHistory } from 'react-router-dom';
import userContext from '../../context/userContext';
import Nav from '../auth/nav';

const Home = () => {
  const { userData } = useContext(userContext)
  console.log(userData)
  const history = useHistory();

  useEffect(() => {
    if(!userData.user) history.push('/')
  });

  return (
    <>
    <div className="wrapper d-flex align-items-stretch">
      <Nav />
      <div id="content" className="p-4 p-md-5">
        <h2 className="mb-4">Task List</h2>
      <div className=' table-responsive container'>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Assignee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Mouse error</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">Screen Display</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">Read a book</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;