export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-text-secondary font-body mt-1">Monitor business performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wider">Total Revenue</h3>
            <div className="text-2xl">📈</div>
          </div>
          <p className="text-3xl font-heading font-bold text-foreground mb-2">45,230 ETB</p>
          <p className="text-xs font-body text-success">↑ 12% from last month</p>
        </div>

        {/* Total Orders */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wider">Total Orders</h3>
            <div className="text-2xl">📋</div>
          </div>
          <p className="text-3xl font-heading font-bold text-foreground mb-2">1,234</p>
          <p className="text-xs font-body text-success">↑ 8% from last month</p>
        </div>

        {/* Avg Order Value */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wider">Avg Order Value</h3>
            <div className="text-2xl">💰</div>
          </div>
          <p className="text-3xl font-heading font-bold text-foreground mb-2">367 ETB</p>
          <p className="text-xs font-body text-success">↑ 4% from last month</p>
        </div>

        {/* Active Customers */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wider">Active Customers</h3>
            <div className="text-2xl">👥</div>
          </div>
          <p className="text-3xl font-heading font-bold text-foreground mb-2">523</p>
          <p className="text-xs font-body text-success">↑ 15% from last month</p>
        </div>
      </div>

      {/* Charts & Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Revenue Trend</h2>
          <div className="h-64 bg-primary/5 border border-border rounded-lg flex items-center justify-center">
            <p className="text-text-secondary font-body">Revenue chart placeholder</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Top Products</h2>
          <div className="space-y-3">
            {[
              { name: "Espresso", sales: 456, percent: 100 },
              { name: "Latte", sales: 398, percent: 87 },
              { name: "Cappuccino", sales: 342, percent: 75 },
              { name: "Croissant", sales: 289, percent: 63 },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-body text-foreground">{item.name}</p>
                  <p className="text-sm font-body font-semibold text-foreground">{item.sales} sales</p>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-accent h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Type */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Orders by Type</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 border border-border rounded-lg">
              <span className="font-body text-foreground">Dine In</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-border rounded-full">
                  <div className="w-12 h-2 bg-primary rounded-full" />
                </div>
                <span className="text-sm font-body font-semibold text-foreground">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/5 border border-border rounded-lg">
              <span className="font-body text-foreground">Takeaway</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-border rounded-full">
                  <div className="w-8 h-2 bg-accent rounded-full" />
                </div>
                <span className="text-sm font-body font-semibold text-foreground">35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { action: "New order", time: "2 minutes ago", icon: "📦" },
              { action: "Customer signup", time: "15 minutes ago", icon: "👤" },
              { action: "Payment received", time: "1 hour ago", icon: "✅" },
              { action: "Inventory updated", time: "2 hours ago", icon: "📊" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-primary/5 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-sm font-body text-foreground">{item.action}</p>
                </div>
                <p className="text-xs font-body text-text-secondary">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-success/5 border border-success/30 rounded-lg">
            <p className="text-sm font-body text-text-secondary mb-2">Customer Satisfaction</p>
            <p className="text-3xl font-heading font-bold text-success">4.8/5</p>
          </div>
          <div className="p-4 bg-accent/5 border border-accent/30 rounded-lg">
            <p className="text-sm font-body text-text-secondary mb-2">Avg Preparation Time</p>
            <p className="text-3xl font-heading font-bold text-accent">8 min</p>
          </div>
          <div className="p-4 bg-primary/5 border border-primary/30 rounded-lg">
            <p className="text-sm font-body text-text-secondary mb-2">Order Completion Rate</p>
            <p className="text-3xl font-heading font-bold text-primary">99.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
