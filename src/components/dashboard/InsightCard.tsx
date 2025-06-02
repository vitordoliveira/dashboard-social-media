import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip } from '@mui/material';
import { TrendingUp, TrendingDown, Info } from '@mui/icons-material';

interface InsightCardProps {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  percentage?: number;
  tooltip?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  trend, 
  percentage,
  tooltip
}) => {
  return (
    <Card sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip}>
              <Info fontSize="small" sx={{ color: 'text.secondary', ml: 1 }} />
            </Tooltip>
          )}
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend === 'up' && <TrendingUp sx={{ color: 'success.main', mr: 1 }} />}
          {trend === 'down' && <TrendingDown sx={{ color: 'error.main', mr: 1 }} />}
          {percentage && (
            <Typography
              variant="body2"
              color={trend === 'up' ? 'success.main' : 'error.main'}
            >
              {percentage}% em relação ao período anterior
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsightCard;