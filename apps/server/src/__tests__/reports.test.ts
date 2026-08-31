import { reportService } from '../modules/report/report.service';

describe('Suite 7: Business Reports & Analytics Calculations', () => {
  it('should retrieve dashboard KPIs', async () => {
    const kpis = await reportService.getDashboardKPIs();
    expect(kpis).toHaveProperty('totalRevenue');
    expect(kpis).toHaveProperty('totalExpenses');
    expect(kpis).toHaveProperty('netProfit');
    expect(kpis).toHaveProperty('totalCustomers');
  });

  it('should generate revenue chart data points', async () => {
    const chart = await reportService.getRevenueChart(6);
    expect(Array.isArray(chart)).toBe(true);
    expect(chart.length).toBe(6);
    expect(chart[0]).toHaveProperty('period');
  });
});