import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Insights from './pages/Insights';
import Reporting from './pages/Reporting';
import Settings from './pages/Settings';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/chat"
        element={
          <>
            <SignedIn>
              <DashboardLayout>
                <Chat />
              </DashboardLayout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/insights"
        element={
          <>
            <SignedIn>
              <DashboardLayout>
                <Insights />
              </DashboardLayout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/analytics"
        element={
          <>
            <SignedIn>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/reporting"
        element={
          <>
            <SignedIn>
              <DashboardLayout>
                <Reporting />
              </DashboardLayout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/settings"
        element={
          <>
            <SignedIn>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

