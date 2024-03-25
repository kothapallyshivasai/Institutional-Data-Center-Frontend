import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Redirection from './components/default/Redirection';
import "./App.css"

const LazyLogin = React.lazy(() => import('./components/default/Login'));
const LazyStudentHome = React.lazy(() => import('./components/student/StudentHome'));
const LazyFacultyHome = React.lazy(() => import('./components/faculty/FacultyHome'));
const LazyAdminHome = React.lazy(() => import('./components/admin/AdminHome'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Redirection />} />
            <Route path="/login" element={<Suspense fallback={<div className="spinner-container">
                                                                <div className="spinner-border" role="status"></div>
                                                              </div>}><LazyLogin /></Suspense>} />
            <Route path="/student" element={<Suspense fallback={<div className="spinner-container">
                                                                <div className="spinner-border" role="status"></div>
                                                              </div>}><LazyStudentHome /></Suspense>} />
            <Route path="/faculty" element={<Suspense fallback={<div className="spinner-container">
                                                                <div className="spinner-border" role="status"></div>
                                                              </div>}><LazyFacultyHome /></Suspense>} />
            <Route path="/admin" element={<Suspense fallback={<div className="spinner-container">
                                                                <div className="spinner-border" role="status"></div>
                                                              </div>}><LazyAdminHome /></Suspense>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
