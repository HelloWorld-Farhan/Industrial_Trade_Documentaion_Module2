import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import DocGenPage from './pages/DocGenPage';
import TaxCalcPage from './pages/TaxCalcPage';
import ClearancePage from './pages/ClearancePage';
import InsurancePage from './pages/InsurancePage';
import CompliancePage from './pages/CompliancePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard/doc-gen" replace /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="doc-gen" replace />} />
        <Route path="doc-gen" element={<DocGenPage />} />
        <Route path="tax-calc" element={<TaxCalcPage />} />
        <Route path="clearance" element={<ClearancePage />} />
        <Route path="insurance" element={<InsurancePage />} />
        <Route path="compliance" element={<CompliancePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
