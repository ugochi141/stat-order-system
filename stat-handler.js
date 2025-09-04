class STATOrderHandler {
    constructor() {
        this.criticalTests = ['Troponin', 'Lactate', 'Blood Gas'];
        this.targetTAT = 30; // minutes
    }
    
    prioritizeOrder(order) {
        let priority = 0;
        if (order.stat) priority += 100;
        if (this.criticalTests.includes(order.testName)) priority += 50;
        if (order.location === 'ER') priority += 25;
        return priority;
    }
    
    escalateIfNeeded(order, currentTAT) {
        if (currentTAT > this.targetTAT * 0.8) {
            return {
                escalate: true,
                notify: ['supervisor', 'tech_lead'],
                message: `STAT order ${order.id} approaching TAT limit`
            };
        }
        return { escalate: false };
    }
}

module.exports = STATOrderHandler;
