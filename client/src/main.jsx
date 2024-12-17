import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MainAdmin from './pages/AdminPage/MainAdmin';
import BookingPage from './pages/BookingPage/BookingPage';
import PassengerDetailsPage from './pages/BookingPage/PassengerDetails';
import PaymentPage from './pages/BookingPage/Payment';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/homepage" element={<HomePage />} />
        <Route path="/admin/*" element={<MainAdmin/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route
          path="/booking/passenger-details"
          element={<PassengerDetailsPage />}
        />
        <Route path="/booking/payment" element={<PaymentPage />} />

        {/* Add more routes here */}
        <Route path="*" element={<h1 className="">404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
