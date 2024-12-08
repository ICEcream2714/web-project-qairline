import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';

import EditFlights from './EditFlights';
import PostInfor from './PostInfor';
import ViewStatistics from './ViewStatistics';
import AddFlights from './AddFlights';
import AddAirplanes from './AddAirplanes'

function MainAdmin() {
  return  (
    <DefaultLayout>
      <Routes>
        
        <Route
          path="post-information"
          element={
            <>
              <PostInfor />
            </>
          }
        />
        <Route
          path="/add-airplanes"
          element={
            <>

              <AddAirplanes />
            </>
          }
        />
        <Route
          path="/add-flights"
          element={
            <>

              <AddFlights />
            </>
          }
        />
        <Route
          path="/view-statistics"
          element={
            <>

              <ViewStatistics/>
            </>
          }
        />
        <Route
          path="/edit-flights"
          element={
            <>

              <EditFlights />
            </>
          }
        />
        
      </Routes>
    </DefaultLayout>
  );
}

export default MainAdmin;