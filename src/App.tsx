import React, { useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { subDays } from 'date-fns';
import type { DateRange } from './types/dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { useThemeContext } from './context/ThemeContext';

// Componente que usa o contexto do tema
const AppWithTheme: React.FC = () => {
  const { theme } = useThemeContext(); // Agora usando o tema do contexto
  
  // Estado para controle de datas (mantido no App para compartilhar entre páginas)
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date()
  });
  const [dateRangeType, setDateRangeType] = useState('30days');

  // Handler para mudança de período
  const handleDateRangeChange = (type: string, range?: DateRange) => {
    setDateRangeType(type);
    if (range) {
      setDateRange(range);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  dateRange={dateRange}
                  dateRangeType={dateRangeType}
                  onDateRangeChange={handleDateRangeChange}
                />
              } 
            />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </MuiThemeProvider>
  );
};

// Componente App principal que fornece o contexto do tema
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
};

export default App;