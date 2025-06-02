import React, { useState, Suspense } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { subDays } from 'date-fns';
import type { DateRange } from './types/dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { useThemeContext } from './context/ThemeContext';
import { routes } from './config/routes';
import LoadingFallback from './components/common/Loading/LoadingFallback';
import type { CommonPageProps } from './types/ui/routes';

const AppWithTheme: React.FC = () => {
  const { theme } = useThemeContext();
  
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date()
  });
  const [dateRangeType, setDateRangeType] = useState('30days');

  const handleDateRangeChange = (type: string, range?: DateRange) => {
    setDateRangeType(type);
    if (range) {
      setDateRange(range);
    }
  };

  const sharedProps: CommonPageProps = {
    dateRange,
    dateRangeType,
    onDateRangeChange: handleDateRangeChange
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Component {...sharedProps} />}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
};

export default App;