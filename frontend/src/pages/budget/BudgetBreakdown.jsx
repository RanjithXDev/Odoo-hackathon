import { useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './BudgetBreakdown.css';

const BudgetBreakdown = () => {
    const { tripId } = useParams();

    const budgetData = [
        { name: 'Transport', value: 66000, color: '#06b6d4' },
        { name: 'Accommodation', value: 99000, color: '#8b5cf6' },
        { name: 'Activities', value: 74000, color: '#f59e0b' },
        { name: 'Food', value: 50000, color: '#10b981' }
    ];

    const total = budgetData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="budget-container">
            <div className="page-header animate-fadeInDown">
                <h1 className="page-title">Budget Breakdown</h1>
                <p className="page-subtitle">Track your trip expenses</p>
            </div>

            <div className="budget-grid animate-fadeInUp">
                <Card className="budget-chart-card">
                    <h3>Expense Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={budgetData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {budgetData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="budget-summary-card">
                    <h3>Summary</h3>
                    <div className="budget-total">
                        <span>Total Budget</span>
                        <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="budget-items">
                        {budgetData.map((item, index) => (
                            <div key={index} className="budget-item">
                                <div className="item-info">
                                    <div className="item-color" style={{ background: item.color }}></div>
                                    <span>{item.name}</span>
                                </div>
                                <span className="item-amount">₹{item.value.toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BudgetBreakdown;
