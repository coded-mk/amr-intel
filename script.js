document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// Navigation Logic
function handleLogin() {
    const landing = document.getElementById('landing-page');
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.classList.add('hidden');
        const app = document.getElementById('internal-app');
        app.classList.remove('hidden');
        router('dashboard');
    }, 300);
}

function handleLogout() {
    const app = document.getElementById('internal-app');
    app.classList.add('hidden');
    const landing = document.getElementById('landing-page');
    landing.classList.remove('hidden');
    landing.style.opacity = '1';
}

function router(view) {
    const content = document.getElementById('app-content');
    const title = document.getElementById('page-title');
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(view === 'dashboard' ? 'nav-dashboard' : view === 'beta' ? 'nav-beta' : 'nav-ai').classList.add('active');

    if (view === 'dashboard') {
        title.innerText = 'State Alpha Surveillance';
        content.innerHTML = getAlphaHTML();
        setTimeout(() => initAlphaChart(), 100);
        
    } else if (view === 'beta') {
        title.innerText = 'State Beta Surveillance';
        content.innerHTML = getBetaHTML();
        setTimeout(() => initBetaChart(), 100);

    } else if (view === 'ai') {
        title.innerText = 'ResistanceIQ Clinical Assistant';
        content.innerHTML = getAIHTML();
        setTimeout(() => {
            const chatWindow = document.getElementById('chat-window');
            if(chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 100);
    }
    
    setTimeout(() => lucide.createIcons(), 50);
}

// === STATE ALPHA VIEW ===
function getAlphaHTML() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                <p class="text-slate-500 font-medium text-sm">Sentinel Centres</p>
                <p class="text-2xl font-bold text-slate-800 mt-2">Harmony, Unity, Sunrise</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-600">
                <p class="text-slate-500 font-medium text-sm">Tests Processed</p>
                <p class="text-4xl font-bold text-slate-800 mt-2">1,200</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                <p class="text-slate-500 font-medium text-sm">Critical Action</p>
                <p class="text-lg font-bold text-red-600 mt-2">Review Empirical Therapy</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 class="font-bold text-slate-700 mb-6">Resistance Profile (State Alpha)</h3>
                <canvas id="alphaChart" height="250"></canvas>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 class="font-bold text-slate-700 mb-4">Recommendations</h3>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3 p-3 bg-red-50 rounded text-sm">
                        <i data-lucide="alert-octagon" class="text-red-500 w-5 h-5 shrink-0"></i>
                        <div>
                            <strong>Avoid Empirical Use:</strong> Ampicillin and Ciprofloxacin due to high resistance rates detected this quarter.
                        </div>
                    </li>
                    <li class="flex items-start gap-3 p-3 bg-green-50 rounded text-sm">
                        <i data-lucide="check-circle" class="text-emerald-500 w-5 h-5 shrink-0"></i>
                        <div>
                            <strong>Preferred Therapy:</strong> For UTIs, prefer Nitrofurantoin (Low Resistance).
                        </div>
                    </li>
                    <li class="flex items-start gap-3 p-3 bg-blue-50 rounded text-sm">
                        <i data-lucide="users" class="text-blue-500 w-5 h-5 shrink-0"></i>
                        <div>
                            <strong>Demographics:</strong> Monitor urine samples from older adults for increasing resistance.
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

// === STATE BETA VIEW ===
function getBetaHTML() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-600">
                <p class="text-slate-500 font-medium text-sm">Sentinel Centres</p>
                <p class="text-2xl font-bold text-slate-800 mt-2">Beacon, Evergreen, Riverside</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-600">
                <p class="text-slate-500 font-medium text-sm">Tests Processed</p>
                <p class="text-4xl font-bold text-slate-800 mt-2">950</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                <p class="text-slate-500 font-medium text-sm">Focus Area</p>
                <p class="text-lg font-bold text-orange-600 mt-2">Stewardship & Hygiene</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 class="font-bold text-slate-700 mb-6">Resistance Profile (State Beta)</h3>
                <canvas id="betaChart" height="250"></canvas>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 class="font-bold text-slate-700 mb-4">Recommendations</h3>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3 p-3 bg-red-50 rounded text-sm">
                        <i data-lucide="alert-triangle" class="text-red-500 w-5 h-5 shrink-0"></i>
                        <div>
                            <strong>High Resistance:</strong> Cephalosporins and Fluoroquinolones. Restrict use immediately.
                        </div>
                    </li>
                    <li class="flex items-start gap-3 p-3 bg-orange-50 rounded text-sm">
                        <i data-lucide="shield" class="text-orange-500 w-5 h-5 shrink-0"></i>
                        <div>
                            <strong>Stewardship:</strong> Reserve Carbapenems only for confirmed severe cases.
                        </div>
                    </li>
                    <li class="flex items-start gap-3 p-3 bg-blue-50 rounded text-sm">
                        <i data-lucide="baby" class="text-blue-500 w-5 h-5 shrink-0"></i>
                        <div>
                            <strong>Prevention:</strong> Reinforce wound care hygiene among younger age groups.
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

function getAIHTML() {
    return `
        <div class="flex flex-col h-[calc(100vh-180px)]">
            <div id="chat-window" class="flex-1 bg-white border border-slate-200 rounded-xl p-6 overflow-y-auto mb-4 shadow-inner bg-slate-50/50">
                <div class="message bot">
                    <p class="font-semibold text-purple-600 text-xs mb-1">ResistanceIQ</p>
                    I have access to facility-specific data for State Alpha and Beta. How can I assist with your empiric therapy decisions today?
                </div>
            </div>

            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div id="chips-container" class="mb-3 overflow-x-auto whitespace-nowrap pb-2">
                    <button onclick="askAI('alpha')" class="suggestion-chip">Therapy for State Alpha</button>
                    <button onclick="askAI('beta')" class="suggestion-chip">State Beta Trends</button>
                    <button onclick="askAI('impact')" class="suggestion-chip">Project Impact Stats</button>
                </div>
                
                <div class="flex gap-2">
                    <input type="text" placeholder="Ask ResistanceIQ..." class="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500">
                    <button class="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 transition">
                        <i data-lucide="send" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// === CHARTS & AI LOGIC ===

function initAlphaChart() {
    const ctx = document.getElementById('alphaChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ampicillin', 'Ciprofloxacin', 'Nitrofurantoin', 'Gentamicin'],
            datasets: [{
                label: 'Resistance %',
                data: [78, 65, 12, 25], // High Amp/Cipro, Low Nitro
                backgroundColor: ['#ef4444', '#f97316', '#10b981', '#3b82f6'],
                borderRadius: 4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

function initBetaChart() {
    const ctx = document.getElementById('betaChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cephalosporins', 'Fluoroquinolones', 'Carbapenems', 'Amikacin'],
            datasets: [{
                label: 'Resistance %',
                data: [82, 75, 15, 10], // High Ceph/Fluoro
                backgroundColor: ['#ef4444', '#f97316', '#eab308', '#10b981'],
                borderRadius: 4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

function askAI(topic) {
    const chatWindow = document.getElementById('chat-window');
    let userText = "", botText = "";

    if (topic === 'alpha') {
        userText = "Recommend empiric therapy for State Alpha.";
        botText = `<strong>State Alpha Guidance:</strong><br>Avoid Ampicillin and Ciprofloxacin due to high resistance. For UTIs, <strong>Nitrofurantoin</strong> is the preferred choice (low resistance rate).`;
    } else if (topic === 'beta') {
        userText = "What are the resistance trends in State Beta?";
        botText = `<strong>State Beta Alert:</strong><br>We are seeing high resistance to Cephalosporins and Fluoroquinolones. <strong>Carbapenems</strong> should be reserved for necessary cases only to promote stewardship.`;
    } else if (topic === 'impact') {
        userText = "What is the impact of this platform?";
        botText = `<strong>Success Metrics:</strong><br>• Data entry time reduced by <strong>64%</strong>.<br>• Error rates cut by <strong>87%</strong>.<br>• Physician satisfaction with empiric therapy increased by <strong>44%</strong>.`;
    }

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = userText;
    chatWindow.appendChild(userMsg);

    // Typing Indicator
    const typing = document.createElement('div');
    typing.className = 'typing-dots message bot';
    typing.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Reply
    setTimeout(() => {
        chatWindow.removeChild(typing);
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.innerHTML = `<p class="font-semibold text-purple-600 text-xs mb-1">ResistanceIQ</p>${botText}`;
        chatWindow.appendChild(botMsg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
}