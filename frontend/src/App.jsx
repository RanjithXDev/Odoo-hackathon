import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Main Pages
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/trips/CreateTrip';
import MyTrips from './pages/trips/MyTrips';
import TripDetails from './pages/trips/TripDetails';
import ItineraryBuilder from './pages/itinerary/ItineraryBuilder';
import ItineraryView from './pages/itinerary/ItineraryView';
import CitySearch from './pages/search/CitySearch';
import ActivitySearch from './pages/search/ActivitySearch';
import BudgetBreakdown from './pages/budget/BudgetBreakdown';
import TripTimeline from './pages/timeline/TripTimeline';
import PublicItinerary from './pages/share/PublicItinerary';
import UserProfile from './pages/profile/UserProfile';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shared/:tripId" element={<PublicItinerary />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trips">
              <Route index element={<MyTrips />} />
              <Route path="create" element={<CreateTrip />} />
              <Route path=":tripId" element={<TripDetails />} />
              <Route path=":tripId/itinerary" element={<ItineraryBuilder />} />
              <Route path=":tripId/view" element={<ItineraryView />} />
              <Route path=":tripId/budget" element={<BudgetBreakdown />} />
              <Route path=":tripId/timeline" element={<TripTimeline />} />
            </Route>
            <Route path="search">
              <Route path="cities" element={<CitySearch />} />
              <Route path="activities" element={<ActivitySearch />} />
            </Route>
            <Route path="profile" element={<UserProfile />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
