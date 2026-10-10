/**
 * Frontend Fetch Client for Express.js REST API
 */
const API_BASE_URL = 'http://localhost:5000/api/v1';

class ApiClient {
    // 🛠️ टर्मिनल में रिक्वेस्ट ऑटो-प्रिंट करने का हेल्पर फ़ंक्शन
    static logToTerminal(method, endpoint, status, reqBody, resBody) {
        const screen = document.getElementById('terminalScreen');
        if (!screen) return; // अगर यूजर टर्मिनल पेज पर नहीं है तो इग्नोर करे

        const timestamp = new Date().toLocaleTimeString();
        const logItem = document.createElement('div');
        logItem.className = "border-b border-slate-900 pb-2 mb-2 font-mono text-xs";
        logItem.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-slate-500">[${timestamp}]</span>
                <span class="${method === 'POST' ? 'text-amber-400' : 'text-cyan-400'} font-bold">${method}</span>
                <span class="text-white">${endpoint}</span>
                <span class="${status === 200 || status === 201 ? 'text-emerald-400' : 'text-rose-400'} font-bold">${status} OK</span>
            </div>
            ${reqBody ? `<div class="text-[11px] text-slate-400 pl-4">REQ Payload: ${JSON.stringify(reqBody)}</div>` : ''}
            <div class="text-[11px] text-teal-300/80 pl-4">RES Data: ${JSON.stringify(resBody)}</div>
        `;

        screen.appendChild(logItem);
        screen.scrollTop = screen.scrollHeight; // ऑटो स्क्रॉल
    }

    // 1. Calculate Carbon API
    static async calculateCarbon(payload) {
        try {
            const response = await fetch(`${API_BASE_URL}/carbon/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            
            // 🚀 टर्मिनल में प्रिंट करें
            this.logToTerminal('POST', '/api/v1/carbon/calculate', response.status, payload, data);
            return data;
        } catch (err) {
            console.warn('Backend server offline, executing fallback logic.');
            const fallbackData = this.localFallbackCompute(payload);
            this.logToTerminal('POST', '/api/v1/carbon/calculate (Fallback)', 200, payload, fallbackData);
            return fallbackData;
        }
    }

    // 2. Fetch Logs API
    static async fetchLogs() {
        try {
            const response = await fetch(`${API_BASE_URL}/carbon/logs`);
            const data = await response.json();
            
            // 🚀 टर्मिनल में प्रिंट करें
            this.logToTerminal('GET', '/api/v1/carbon/logs', response.status, null, data);
            return data;
        } catch (err) {
            const saved = localStorage.getItem('ecotrace_logs');
            const localData = { status: "success", data: saved ? JSON.parse(saved) : [] };
            this.logToTerminal('GET', '/api/v1/carbon/logs (Local)', 200, null, localData);
            return localData;
        }
    }

    // 3. Logout User API
    static async logoutUser() {
        try {
            const response = await fetch(`${API_BASE_URL}/users/logout`, { method: 'POST' });
            const data = await response.json();
            this.logToTerminal('POST', '/api/v1/users/logout', response.status, null, data);
            return data;
        } catch (err) {
            const resData = { status: "success", message: "Local Session Cleared" };
            this.logToTerminal('POST', '/api/v1/users/logout (Local)', 200, null, resData);
            return resData;
        }
    }

    static localFallbackCompute(payload) {
        const dietFactors = { "high-meat": 250, "medium-meat": 180, "vegetarian": 100, "vegan": 70 };
        const total = (payload.electricity * 0.85) + (payload.vehicle * 0.192) + (payload.flight * 90) + (dietFactors[payload.diet] || 180) + (payload.waste * 0.45);
        return { status: "success", data: { totalCO2: Number(total.toFixed(2)) } };
    }
}