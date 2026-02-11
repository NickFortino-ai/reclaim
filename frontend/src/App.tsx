import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PreviewProvider, usePreview } from './context/PreviewContext';
import { Layout } from './components/Layout';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { RegisterSuccess } from './pages/RegisterSuccess';
import { RegisterCancel } from './pages/RegisterCancel';
import { Dashboard } from './pages/Dashboard';
import { Desensitize } from './pages/Desensitize';
import { Resources } from './pages/Resources';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { Celebration } from './pages/Celebration';
import { FAQ } from './pages/FAQ';
import { UrgeSurf } from './pages/UrgeSurf';
import { Journal } from './pages/Journal';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// Demo Pages
import { DemoDashboard } from './pages/demo/DemoDashboard';
import { DemoResources } from './pages/demo/DemoResources';
import { DemoCommunity } from './pages/demo/DemoCommunity';
import { DemoUrgeSurf } from './pages/demo/DemoUrgeSurf';
import { DemoJournal } from './pages/demo/DemoJournal';
import { DemoFAQ } from './pages/demo/DemoFAQ';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAffirmations } from './pages/admin/AdminAffirmations';
import { AdminImages } from './pages/admin/AdminImages';
import { AdminResources } from './pages/admin/AdminResources';
import { Bookmarks } from './pages/Bookmarks';
import { LifetimeSuccess } from './pages/LifetimeSuccess';
import { Patterns } from './pages/Patterns';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isAdmin } = useAuth();

  if (!token || isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { token, isAdmin } = useAuth();

  if (!token || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token, isAdmin } = useAuth();

  if (token && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (token && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

function DemoRoute({ children }: { children: React.ReactNode }) {
  const { isDemo } = usePreview();
  const { token } = useAuth();

  // If user is logged in, redirect to real dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not in demo mode, redirect to landing
  if (!isDemo) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/register/cancel" element={<RegisterCancel />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Demo routes */}
        <Route
          path="/demo/dashboard"
          element={
            <DemoRoute>
              <DemoDashboard />
            </DemoRoute>
          }
        />
        <Route
          path="/demo/resources"
          element={
            <DemoRoute>
              <DemoResources />
            </DemoRoute>
          }
        />
        <Route
          path="/demo/community"
          element={
            <DemoRoute>
              <DemoCommunity />
            </DemoRoute>
          }
        />
        <Route
          path="/demo/urge-surf"
          element={
            <DemoRoute>
              <DemoUrgeSurf />
            </DemoRoute>
          }
        />
        <Route
          path="/demo/journal"
          element={
            <DemoRoute>
              <DemoJournal />
            </DemoRoute>
          }
        />
        <Route
          path="/demo/faq"
          element={
            <DemoRoute>
              <DemoFAQ />
            </DemoRoute>
          }
        />

        {/* Protected user routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/desensitize"
          element={
            <ProtectedRoute>
              <Desensitize />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/urge-surf"
          element={
            <ProtectedRoute>
              <UrgeSurf />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patterns"
          element={
            <ProtectedRoute>
              <Patterns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/celebration"
          element={
            <ProtectedRoute>
              <Celebration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lifetime/success"
          element={
            <ProtectedRoute>
              <LifetimeSuccess />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/affirmations"
          element={
            <AdminRoute>
              <AdminAffirmations />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/images"
          element={
            <AdminRoute>
              <AdminImages />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/resources"
          element={
            <AdminRoute>
              <AdminResources />
            </AdminRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <PreviewProvider>
            <ThemeProvider>
              <AppRoutes />
            </ThemeProvider>
          </PreviewProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
