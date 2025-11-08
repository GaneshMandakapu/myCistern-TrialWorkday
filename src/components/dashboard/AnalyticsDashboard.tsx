import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Zap, 
  Thermometer,
  Droplets,
  Gauge,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
  RefreshCw
} from 'lucide-react';

// Mock data generators
const generateTimeSeriesData = (timeRange: '24h' | '7d' | '30d' = '24h') => {
  const data = [];
  const now = new Date();
  
  let dataPoints: number;
  let timeInterval: number; // in milliseconds
  let formatType: 'time' | 'date' | 'datetime';
  
  switch (timeRange) {
    case '24h':
      dataPoints = 24; // 24 hours
      timeInterval = 60 * 60 * 1000; // 1 hour
      formatType = 'time';
      break;
    case '7d':
      dataPoints = 14; // 7 days, every 12 hours
      timeInterval = 12 * 60 * 60 * 1000; // 12 hours
      formatType = 'datetime';
      break;
    case '30d':
      dataPoints = 30; // 30 days
      timeInterval = 24 * 60 * 60 * 1000; // 1 day
      formatType = 'date';
      break;
    default:
      dataPoints = 24;
      timeInterval = 60 * 60 * 1000;
      formatType = 'time';
  }
  
  for (let i = dataPoints - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * timeInterval);
    
    let timeLabel: string;
    switch (formatType) {
      case 'time':
        timeLabel = time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        break;
      case 'date':
        timeLabel = time.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        break;
      case 'datetime':
        timeLabel = time.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }) + '\n' + time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          hour12: false 
        });
        break;
      default:
        timeLabel = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    
    data.push({
      time: timeLabel,
      timestamp: time.getTime(),
      temperature: Math.round((22 + Math.sin(i / 4) * 5 + Math.random() * 2) * 10) / 10,
      humidity: Math.round((50 + Math.sin(i / 6) * 15 + Math.random() * 5) * 10) / 10,
      pressure: Math.round((1013 + Math.sin(i / 8) * 20 + Math.random() * 5) * 10) / 10,
      energy: Math.round((800 + Math.sin(i / 3) * 200 + Math.random() * 100) * 10) / 10,
      deviceCount: Math.floor(12 + Math.sin(i / 12) * 3 + Math.random() * 2),
      alerts: Math.floor(Math.random() * 5)
    });
  }
  
  return data;
};

const generateDeviceTypeData = () => [
  { name: 'Water Level Sensors', value: 5, color: '#3182CE' },
  { name: 'Pump Controllers', value: 2, color: '#38A169' },
  { name: 'Flow Meters', value: 2, color: '#D69E2E' },
  { name: 'Temperature Sensors', value: 1, color: '#E53E3E' },
  { name: 'Pressure Sensors', value: 1, color: '#805AD5' },
  { name: 'Valve Controllers', value: 1, color: '#DD6B20' },
  { name: 'Quality Sensors', value: 1, color: '#319795' },
  { name: 'Other', value: 2, color: '#718096' }
];

const generatePerformanceData = () => [
  { category: 'Uptime', value: 98.5, target: 99.0, color: '#38A169' },
  { category: 'Response Time', value: 45, target: 50, color: '#3182CE' },
  { category: 'Data Quality', value: 96.8, target: 95.0, color: '#805AD5' },
  { category: 'Energy Efficiency', value: 92.3, target: 90.0, color: '#D69E2E' }
];

export default function AnalyticsDashboard() {
  const { canView } = useRole();
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data state
  const [timeSeriesData, setTimeSeriesData] = useState(() => generateTimeSeriesData(timeRange));
  const [deviceTypeData] = useState(generateDeviceTypeData());
  const [performanceData] = useState(generatePerformanceData());

  // Update data when timeRange changes
  useEffect(() => {
    setTimeSeriesData(generateTimeSeriesData(timeRange));
    setLastUpdated(new Date());
  }, [timeRange]);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(generateTimeSeriesData(timeRange));
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTimeSeriesData(generateTimeSeriesData(timeRange));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const handleExport = () => {
    // Simulate data export
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Time,Temperature,Humidity,Pressure,Energy\n"
      + timeSeriesData.map(row => 
          `${row.time},${row.temperature},${row.humidity},${row.pressure},${row.energy}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_${timeRange}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!canView) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="mx-auto h-12 w-12 mb-4" />
              <p>{t('analytics.noPermission')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const COLORS = ['#3182CE', '#38A169', '#D69E2E', '#E53E3E', '#805AD5', '#DD6B20', '#319795', '#718096'];

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 pb-20 sm:pb-6">
      {/* Mobile-optimized Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('analytics.title')}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('analytics.subtitle')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t('analytics.lastUpdated')}: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          {/* Time Range Selector - Mobile optimized */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="text-xs sm:text-sm"
              >
                {range === '24h' ? t('analytics.timeRange.24h') : range === '7d' ? t('analytics.timeRange.7d') : t('analytics.timeRange.30d')}
              </Button>
            ))}
          </div>
          
          {/* Action Buttons - Mobile layout */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="ml-2 hidden sm:inline">{t('analytics.actions.refresh')}</span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">{t('analytics.actions.export')}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile-optimized Key Metrics Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('analytics.metrics.avgTemperature')}</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {(timeSeriesData.reduce((acc, d) => acc + d.temperature, 0) / timeSeriesData.length).toFixed(1)}°C
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics.metrics.temperatureRange')}: {Math.min(...timeSeriesData.map(d => d.temperature)).toFixed(1)}° - {Math.max(...timeSeriesData.map(d => d.temperature)).toFixed(1)}°
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('analytics.metrics.avgHumidity')}</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {(timeSeriesData.reduce((acc, d) => acc + d.humidity, 0) / timeSeriesData.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics.metrics.optimalRange')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('analytics.metrics.avgPressure')}</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {(timeSeriesData.reduce((acc, d) => acc + d.pressure, 0) / timeSeriesData.length).toFixed(0)} hPa
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics.metrics.stableConditions')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('analytics.metrics.energyUsage')}</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {(timeSeriesData.reduce((acc, d) => acc + d.energy, 0) / timeSeriesData.length).toFixed(0)}W
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics.metrics.energyEfficient')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-optimized Charts Section */}
      <div className="space-y-4 lg:space-y-6">
        {/* Temperature & Humidity Trends - Mobile optimized */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <LineChartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              {t('analytics.charts.environmentalTrends')}
            </CardTitle>
            <CardDescription className="text-sm">
              {t('analytics.charts.environmentalDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ left: 10, right: 10, top: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" className="opacity-20" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    interval={Math.max(Math.floor(timeSeriesData.length / (timeRange === '24h' ? 6 : timeRange === '7d' ? 4 : 6)), 0)}
                    angle={timeRange === '24h' ? 0 : -45}
                    textAnchor={timeRange === '24h' ? "middle" : "end"}
                    height={timeRange === '24h' ? 40 : 60}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs" 
                    width={45}
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => {
                      if (value >= 1000) return `${(value/1000).toFixed(1)}k`;
                      return Math.round(value).toString();
                    }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: 'hsl(var(--card-foreground))',
                      padding: '8px 12px'
                    }}
                    labelStyle={{
                      color: 'hsl(var(--card-foreground))',
                      fontWeight: '500'
                    }}
                    itemStyle={{
                      color: 'hsl(var(--card-foreground))'
                    }}
                    formatter={(value, name) => {
                      const unit = String(name).includes('Temperature') ? '°C' : '%';
                      return [`${value}${unit}`, name];
                    }}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temperature" 
                    stackId="1"
                    stroke="#3182CE" 
                    fill="#3182CE" 
                    fillOpacity={0.6}
                    name="Temperature"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="humidity" 
                    stackId="2"
                    stroke="#38A169" 
                    fill="#38A169" 
                    fillOpacity={0.6}
                    name="Humidity"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Distribution and Performance - Mobile layout */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Device Type Distribution - Mobile optimized */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                {t('analytics.charts.deviceDistribution')}
              </CardTitle>
              <CardDescription className="text-sm">
                {t('analytics.charts.deviceDistributionDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <Pie
                      data={deviceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percent, value }: any) => 
                        value > 0 ? `${(percent * 100).toFixed(0)}%` : ''
                      }
                      outerRadius="75%"
                      fill="#8884d8"
                      dataKey="value"
                      className="text-xs [&_text]:fill-foreground [&_text]:font-medium"
                    >
                      {deviceTypeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} devices`, name]}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        fontSize: '12px',
                        maxWidth: '200px',
                        color: 'hsl(var(--card-foreground))',
                        padding: '8px 12px',
                        boxShadow: 'hsl(var(--shadow)) 0px 4px 12px'
                      }}
                      labelStyle={{
                        color: 'hsl(var(--card-foreground))',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}
                      itemStyle={{
                        color: 'hsl(var(--card-foreground))',
                        padding: '2px 0'
                      }}
                      wrapperStyle={{
                        outline: 'none',
                        zIndex: 1000
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend for mobile */}
              <div className="mt-2 grid grid-cols-2 gap-1 text-xs sm:hidden">
                {deviceTypeData.slice(0, 6).map((item, index) => (
                  <div key={item.name} className="flex items-center space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate text-xs">{item.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics - Mobile optimized */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                {t('analytics.charts.systemPerformance')}
              </CardTitle>
              <CardDescription className="text-sm">
                {t('analytics.charts.systemPerformanceDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ left: 5, right: 5, top: 5, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" className="opacity-20" />
                    <XAxis 
                      dataKey="category" 
                      className="text-xs" 
                      angle={-35}
                      textAnchor="end"
                      height={50}
                      interval={0}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs" 
                      width={40}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: 'hsl(var(--card-foreground))',
                        padding: '8px 12px'
                      }}
                      labelStyle={{
                        color: 'hsl(var(--card-foreground))',
                        fontWeight: '500'
                      }}
                      itemStyle={{
                        color: 'hsl(var(--card-foreground))'
                      }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <Bar dataKey="value" fill="#3182CE" name="Current" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="target" fill="#E2E8F0" name="Target" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {t('analytics.charts.performanceSummary')}
          </CardTitle>
          <CardDescription>
            {t('analytics.charts.performanceSummaryDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((metric) => (
              <div key={metric.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }}></div>
                  <span className="font-medium">{metric.category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {metric.value}% / {metric.target}%
                  </span>
                  <Badge variant={metric.value >= metric.target ? 'default' : 'secondary'}>
                    {metric.value >= metric.target ? 'On Target' : 'Below Target'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
