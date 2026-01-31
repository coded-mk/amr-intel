document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();
});


/* --- STATE ENGINE --- */
let state = { name: '', role: '', theme: 'dark', facility: 'Harmony Medical' };
const demo = { u: 'amrintel', p: 'amrintel123' };

setInterval(() => {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString();
    document.getElementById('live-date').innerText = now.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}, 1000);

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    icon.className = document.documentElement.classList.contains('dark') ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-slate-600';
}

function showModal(content) {
    const modal = document.getElementById('global-modal');
    document.getElementById('modal-content').innerHTML = content;
    modal.classList.add('modal-active');
}

function closeModal() {
    document.getElementById('global-modal').classList.remove('modal-active');
}

/* --- AUTH --- */
function handleLogin() {
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;
    state.name = document.getElementById('login-name').value || 'Authorized Member';
    
    // Get Checked Radio
    const roleEl = document.querySelector('input[name="login-role"]:checked');
    state.role = roleEl ? roleEl.value : 'patient';

    if(u === demo.u && p === demo.p) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('app-view').classList.remove('hidden');
        document.getElementById('app-view').classList.add('flex');
        document.getElementById('role-tag').innerText = state.role;
        document.getElementById('user-display-name').innerText = state.name;
        document.getElementById('user-pfp').src = `https://ui-avatars.com/api/?name=${state.name}&background=3b82f6&color=fff`;
        initRouter();
    } else { alert("Demo Credentials: amrintel / amrintel123"); }
}

function initRouter() {
    const nav = document.getElementById('sidebar-nav');
    if(state.role === 'clinician') renderClinicianNav(nav);
    else if(state.role === 'microbiologist') renderMicroNav(nav);
    else renderPatientNav(nav);
}

/* =========================================
   CLINICIAN DASHBOARD
========================================= */
function renderClinicianNav(nav) {
    nav.innerHTML = `
        <button onclick="renderSurv()" class="nav-btn active"><i class="fas fa-chart-area mr-3"></i>Surveillance</button>
        <button onclick="renderAI()" class="nav-btn"><i class="fas fa-robot mr-3"></i>ResistanceIQ™</button>
    `;
    renderSurv();
}

function renderSurv() {
    document.getElementById('main-stage').innerHTML = `
        <div class="fade-in">
            <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Facility Intelligence Node</h1>
                    <p class="text-slate-600 dark:text-slate-400 font-medium">Real-time surveillance across 2 States & 6 Sentinel Centres</p>
                </div>
                <div class="flex gap-2 p-1.5 bg-slate-200 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700">
                    <select id="facility-filter" onchange="updateCharts()" class="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl text-xs font-bold outline-none border border-slate-200 dark:border-slate-700 cursor-pointer text-slate-800 dark:text-white">
                        <optgroup label="State Alpha">
                            <option value="Harmony Medical">Harmony Medical Centre</option>
                            <option value="Unity Hospital">Unity Hospital</option>
                            <option value="Sunrise Clinic">Sunrise Clinic</option>
                        </optgroup>
                        <optgroup label="State Beta">
                            <option value="Beacon Health">Beacon Health Centre</option>
                            <option value="Evergreen Hospital">Evergreen Hospital</option>
                            <option value="Riverside Lab">Riverside Lab</option>
                        </optgroup>
                    </select>
                    <button class="bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Refresh Feed</button>
                </div>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div class="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 border-l-4 border-l-primary shadow-sm">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Facility Tests</p>
                    <h2 class="text-3xl font-extrabold mt-1 text-slate-900 dark:text-white" id="stat-tests">1,200</h2>
                </div>
                <div class="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 border-l-4 border-l-red-500 shadow-sm">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Resistance Index</p>
                    <h2 class="text-3xl font-extrabold mt-1 text-red-500" id="stat-res">42%</h2>
                </div>
                <div class="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 border-l-4 border-l-green-500 shadow-sm">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Empiric Success</p>
                    <h2 class="text-3xl font-extrabold mt-1 text-green-500">89.4%</h2>
                </div>
                <div class="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 border-l-4 border-l-purple-500 shadow-sm">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">EMR Bridge</p>
                    <h2 class="text-3xl font-extrabold mt-1 text-purple-400">Stable</h2>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative">
                    <h3 class="font-black text-xs uppercase text-slate-500 mb-6 tracking-widest">Complex Antibiogram Mapping</h3>
                    <canvas id="complexBarChart" height="220"></canvas>
                </div>
                <div class="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative">
                    <h3 class="font-black text-xs uppercase text-slate-500 mb-6 tracking-widest">Sentinel Trend Correlation</h3>
                    <canvas id="complexLineChart" height="220"></canvas>
                </div>
            </div>

            <div class="p-8 bg-red-500/5 border border-red-500/20 rounded-[2.5rem] flex items-center justify-between">
                <div class="flex items-center gap-6">
                    <div class="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-red-500/30">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-lg text-red-500">Facility Critical Alert</h4>
                        <p class="text-sm opacity-80 text-slate-700 dark:text-slate-300" id="alert-text">Harmony Medical Centre reporting 82% Ampicillin resistance in geriatric urine samples.</p>
                    </div>
                </div>
                <button onclick="openProtocol()" class="bg-red-500 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:scale-105 transition">Review Protocol</button>
            </div>
        </div>`;
    setTimeout(initComplexCharts, 100);
}

function openProtocol() {
    const fac = document.getElementById('facility-filter').value;
    let protocolContent = '';
    
    if (['Harmony Medical', 'Unity Hospital', 'Sunrise Clinic'].includes(fac)) {
        protocolContent = `
            <div class="space-y-6">
                <div class="border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 class="text-2xl font-black text-red-500 mb-1">State Alpha Protocol</h3>
                    <p class="text-sm text-slate-500 uppercase font-bold tracking-widest">Facility: ${fac}</p>
                </div>
                <div class="space-y-4">
                    <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p class="font-bold text-red-500 text-xs uppercase mb-1">Critical Restriction</p>
                        <p class="text-sm text-slate-600 dark:text-slate-300"><b>Avoid Ampicillin & Ciprofloxacin</b> immediately for empirical use. Local resistance exceeds 75%.</p>
                    </div>
                    <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                        <p class="font-bold text-blue-500 text-xs uppercase mb-1">Recommended Therapy</p>
                        <p class="text-sm text-slate-600 dark:text-slate-300">For uncomplicated UTIs, <b>Nitrofurantoin</b> is the first-line agent (12% resistance rate).</p>
                    </div>
                    <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <p class="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase mb-1">Surveillance Action</p>
                        <p class="text-sm text-slate-600 dark:text-slate-300">Enhance infection prevention controls. Screen all geriatric admissions for MRSA.</p>
                    </div>
                </div>
            </div>`;
    } else {
        protocolContent = `
            <div class="space-y-6">
                <div class="border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 class="text-2xl font-black text-green-500 mb-1">State Beta Protocol</h3>
                    <p class="text-sm text-slate-500 uppercase font-bold tracking-widest">Facility: ${fac}</p>
                </div>
                <div class="space-y-4">
                    <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p class="font-bold text-red-500 text-xs uppercase mb-1">Restriction</p>
                        <p class="text-sm text-slate-600 dark:text-slate-300">Avoid <b>Cephalosporins & Fluoroquinolones</b> due to rising ESBL rates.</p>
                    </div>
                    <div class="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                        <p class="font-bold text-purple-500 text-xs uppercase mb-1">Stewardship Focus</p>
                        <p class="text-sm text-slate-600 dark:text-slate-300">Carbapenems are restricted. Use only for culture-proven multi-drug resistant infections.</p>
                    </div>
                </div>
            </div>`;
    }
    showModal(protocolContent);
}

/* =========================================
   MICROBIOLOGIST LOGIC
========================================= */
function renderMicroNav(nav) {
    nav.innerHTML = `
        <button onclick="renderLabForm()" class="nav-btn active"><i class="fas fa-flask mr-3"></i>AST Entry</button>
        <button onclick="renderBatchLogs()" class="nav-btn"><i class="fas fa-database mr-3"></i>Batch Logs</button>
    `;
    renderLabForm();
}

function renderLabForm() {
    document.getElementById('main-stage').innerHTML = `
        <div class="fade-in max-w-5xl">
            <header class="mb-10">
                <h1 class="text-3xl font-extrabold mb-1 text-slate-900 dark:text-white">Welcome, ${state.name.split(' ')[0]}!</h1>
                <p class="text-slate-600 dark:text-slate-500 font-medium">Microbiology Department • Institutional ID: 2026-UDUS</p>
            </header>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <div class="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-3 bg-green-500 text-white font-black text-[9px] uppercase tracking-tighter">Ready</div>
                        <label class="text-[10px] font-black text-primary uppercase mb-4 block tracking-widest">Specimen Acquisition</label>
                        <div class="flex gap-2 mb-6">
                            <input type="text" id="bc-field" placeholder="Patient/Specimen Barcode..." class="flex-1 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 border border-slate-200 dark:border-slate-700 outline-none text-sm font-semibold text-slate-900 dark:text-white">
                            <button onclick="runScanner('barcode')" class="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition"><i class="fas fa-qrcode text-slate-600 dark:text-white"></i></button>
                        </div>
                        <div class="flex gap-2">
                            <input type="text" id="voice-field" placeholder="Voice-to-Text Pathogen ID..." class="flex-1 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 border border-slate-200 dark:border-slate-700 outline-none text-sm font-semibold text-slate-900 dark:text-white">
                            <button onclick="runVoiceSim()" class="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center"><i class="fas fa-microphone"></i></button>
                        </div>
                    </div>
                    <button onclick="alert('Record Synced to National Grid!')" class="w-full py-5 bg-primary text-white font-black text-sm rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.01] transition uppercase tracking-widest">Commit Data Entry</button>
                </div>
                <div class="bg-slate-950 rounded-[2.5rem] border-4 border-slate-800 relative overflow-hidden h-[400px] flex flex-col items-center justify-center shadow-2xl group">
                    <video id="webcam" class="hidden w-full h-full object-cover"></video>
                    <div id="cam-overlay" class="text-center p-8">
                        <i class="fas fa-camera-viewfinder text-5xl text-slate-800 mb-6 transition group-hover:text-primary"></i>
                        <h4 class="font-extrabold text-slate-400 text-lg">AI SMART SCANNER</h4>
                        <p class="text-xs text-slate-600 mt-2 max-w-[200px]">Barcode identification & Zone inhibition auto-measurement</p>
                        <button onclick="runCamera()" class="mt-8 px-10 py-4 bg-primary text-white rounded-full font-black text-xs shadow-xl shadow-primary/40 hover:scale-105 transition">ACTIVATE SCANNER</button>
                    </div>
                    <div id="scan-bar" class="hidden scan-anim"></div>
                </div>
            </div>
        </div>`;
}

function renderBatchLogs() {
    const logs = [
        {id: 'UD-9021', state: 'Alpha', drug: 'Ampicillin', status: 'Synced', color: 'green'},
        {id: 'UD-9022', state: 'Alpha', drug: 'Ciprofloxacin', status: 'Synced', color: 'green'},
        {id: 'UD-9023', state: 'Beta', drug: 'Meropenem', status: 'Synced', color: 'green'},
        {id: 'UD-9024', state: 'Beta', drug: 'Gentamicin', status: 'Synced', color: 'green'},
        {id: 'UD-9025', state: 'Alpha', drug: 'Amoxicillin', status: 'Offline Buffer', color: 'amber'},
        {id: 'UD-9026', state: 'Beta', drug: 'Nitrofurantoin', status: 'Synced', color: 'green'},
        {id: 'UD-9027', state: 'Alpha', drug: 'Penicillin', status: 'Offline Buffer', color: 'amber'},
        {id: 'UD-9028', state: 'Beta', drug: 'Ceftriaxone', status: 'Synced', color: 'green'},
        {id: 'UD-9029', state: 'Alpha', drug: 'Vancomycin', status: 'Synced', color: 'green'},
        {id: 'UD-9030', state: 'Beta', drug: 'Doxycycline', status: 'Synced', color: 'green'},
        {id: 'UD-9031', state: 'Alpha', drug: 'Erythromycin', status: 'Offline Buffer', color: 'amber'},
        {id: 'UD-9032', state: 'Beta', drug: 'Tetracycline', status: 'Synced', color: 'green'}
    ];

    document.getElementById('main-stage').innerHTML = `
        <div class="fade-in max-w-5xl">
            <h2 class="text-3xl font-extrabold mb-8 tracking-tight text-slate-900 dark:text-white">Sentinel Batch History</h2>
            <div class="grid gap-3">
                ${logs.map(log => `
                    <div onclick="openLogDetails('${log.id}', '${log.state}', '${log.drug}', '${log.status}')" class="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/80 transition cursor-pointer group shadow-sm">
                        <div class="flex items-center gap-5">
                            <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary border border-slate-200 dark:border-slate-700 group-hover:bg-primary group-hover:text-white transition">
                                <i class="fas fa-microscope text-lg"></i>
                            </div>
                            <div>
                                <p class="font-black text-sm text-slate-900 dark:text-white">Record ${log.id}</p>
                                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">State ${log.state} | ${log.drug}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase border border-${log.color}-500/20 bg-${log.color}-500/10 text-${log.color}-500 shadow-sm">${log.status}</span>
                            <i class="fas fa-chevron-right text-slate-400 dark:text-slate-700 text-xs"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
}

function openLogDetails(id, state, drug, status) {
    const content = `
        <div class="flex items-center gap-4 mb-6 text-primary">
            <div class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                <i class="fas fa-file-medical-alt text-2xl"></i>
            </div>
            <div>
                <h2 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Record ${id}</h2>
                <p class="text-xs font-bold uppercase text-slate-500 tracking-widest">Details & Metadata</p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p class="text-[10px] font-bold text-slate-500 uppercase">State Origin</p>
                <p class="text-lg font-bold text-slate-700 dark:text-slate-200">State ${state}</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p class="text-[10px] font-bold text-slate-500 uppercase">Isolate</p>
                <p class="text-lg font-bold text-primary">${drug}</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p class="text-[10px] font-bold text-slate-500 uppercase">Sync Status</p>
                <p class="text-lg font-bold ${status === 'Synced' ? 'text-green-500' : 'text-amber-500'}">${status}</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p class="text-[10px] font-bold text-slate-500 uppercase">Timestamp</p>
                <p class="text-lg font-bold text-slate-700 dark:text-slate-200">${new Date().toLocaleTimeString()}</p>
            </div>
        </div>
        <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p class="text-xs text-slate-600 dark:text-slate-400">Encrypted via <b>HL7-FHIR</b>. Verify with supervisor.</p>
        </div>
    `;
    showModal(content);
}

function renderAI() {
    const prompts = [
        "Which antibiotic should I prescribe for this infection in our hospital?",
        "Which pathogen is most prevalent among seniors?",
        "Are urine samples showing increasing resistance over the past quarter?",
        "What are the recommendations for State Alpha?",
        "Explain the tailoring of prevention efforts for State Beta."
    ];
    document.getElementById('main-stage').innerHTML = `
        <div class="fade-in max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col">
            <div class="mb-6">
                <h2 class="text-3xl font-extrabold flex items-center gap-3 text-slate-900 dark:text-white"><i class="fas fa-robot text-primary"></i> ResistanceIQ™ Intelligence</h2>
                <p class="text-slate-600 dark:text-slate-500 text-sm mt-1">AI trained on 2,150 facility records for evidence-based decisions.</p>
            </div>
            
            <div id="ai-chat-window" class="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 overflow-y-auto mb-6 custom-scrollbar space-y-6 shadow-inner">
                <div class="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-700 max-w-[80%] text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    Awaiting query. My database is updated with results from <b>State Alpha</b> and <b>State Beta</b>. I can simulate clinical outcomes and recommend stewardship protocols.
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-4 shadow-xl">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                    ${prompts.map((p, i) => `<button onclick="runAIQuest(${i})" class="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white rounded-xl text-[10px] font-extrabold transition text-slate-500 border border-transparent hover:border-primary">${p}</button>`).join('')}
                </div>
                <div class="flex gap-4 p-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input type="text" id="manual-ai-query" class="flex-1 bg-transparent px-4 outline-none font-medium text-sm text-slate-900 dark:text-white" placeholder="Ask ResistanceIQ anything about facility resistance data...">
                    <button onclick="runManualAI()" class="w-12 h-12 bg-primary text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-105 transition"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>`;
}

function runAIQuest(i) {
    const win = document.getElementById('ai-chat-window');
    const q = [
        "Which antibiotic should I prescribe for this infection in our hospital?",
        "Which pathogen is most prevalent among seniors?",
        "Are urine samples showing increasing resistance over the past quarter?",
        "What are the recommendations for State Alpha?",
        "Explain the tailoring of prevention efforts for State Beta."
    ];
    const a = [
        `Based on 2,150 facility records: Avoid <b>Ampicillin</b> (>80% resistance). <b>Nitrofurantoin</b> is 92% effective for UTIs.`,
        `<b>Demographic Analysis:</b> <i>E. coli</i> is prevalent in 64% of seniors in State Beta. Resistance is climbing in this sector.`,
        `Yes. Riverside Lab data shows a <b>22% spike</b> in resistance to Fluoroquinolones in urine isolates since October.`,
        `1. Stop empirical Ampicillin immediately. 2. Implement IPC protocols in Harmony Medical. 3. Monitor geriatric trends.`,
        `Beta strategy focuses on <b>stewardship education</b> and wound care for younger age groups to prevent skin/soft tissue resistance.`
    ];

    win.innerHTML += `<div class="bg-primary text-white p-5 rounded-3xl rounded-tr-none max-w-[80%] ml-auto text-sm font-bold shadow-lg shadow-primary/20">${q[i]}</div>`;
    setTimeout(() => {
        win.innerHTML += `
            <div class="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-700 max-w-[90%] text-sm leading-relaxed border-l-4 border-l-primary fade-in shadow-sm text-slate-800 dark:text-slate-200">
                <h4 class="font-black text-xs uppercase text-primary mb-3">Intelligence Analysis</h4>
                ${a[i]}
                <hr class="my-4 border-slate-200 dark:border-slate-700">
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Follow up: Generate stewardship report?</p>
            </div>`;
        win.scrollTop = win.scrollHeight;
    }, 600);
}

function runManualAI() {
    const q = document.getElementById('manual-ai-query').value;
    if(!q) return;
    const win = document.getElementById('ai-chat-window');
    win.innerHTML += `<div class="bg-primary text-white p-5 rounded-3xl rounded-tr-none max-w-[80%] ml-auto text-sm font-bold shadow-lg">${q}</div>`;
    document.getElementById('manual-ai-query').value = '';
    setTimeout(() => {
        win.innerHTML += `<div class="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-700 max-w-[90%] text-sm leading-relaxed border-l-4 border-l-primary fade-in italic text-slate-600 dark:text-slate-400">Deep AI analysis linked to facility EMRs is required for this query. For demo purposes, please use the pre-loaded intelligence prompts above.</div>`;
        win.scrollTop = win.scrollHeight;
    }, 800);
}

/* =========================================
   PATIENT DASHBOARD
========================================= */
function renderPatientNav(nav) {
    nav.innerHTML = `
        <button onclick="renderPatientHome()" class="nav-btn active"><i class="fas fa-clipboard-check mr-3"></i>Lab Reports</button>
        <button onclick="renderPatientEducation()" class="nav-btn"><i class="fas fa-lightbulb mr-3"></i>Health Intelligence</button>
    `;
    renderPatientHome();
}

function renderPatientHome() {
    document.getElementById('main-stage').innerHTML = `
        <div class="fade-in max-w-4xl">
            <div class="mb-10">
                <h1 class="text-4xl font-extrabold mb-1 text-slate-900 dark:text-white">Welcome, ${state.name}!</h1>
                <p class="text-slate-600 dark:text-slate-500 font-medium">Accessing your secure National Health Record.</p>
            </div>

            <div class="p-8 bg-primary/10 border border-primary/20 rounded-[2.5rem] mb-8 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-6">
                    <div class="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white text-2xl shadow-lg shadow-primary/30 animate-pulse">
                        <i class="fas fa-bell"></i>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-xl text-slate-900 dark:text-white">Digital Notification</h4>
                        <p class="text-sm opacity-80 text-slate-600 dark:text-slate-400">Finalized lab results for <b>#UDUS-902</b> are ready. Encrypted SMS sent.</p>
                    </div>
                </div>
                <span class="text-[10px] font-black bg-primary text-white px-5 py-2 rounded-full uppercase tracking-widest">Active Report</span>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-12 shadow-sm">
                <div class="flex justify-between items-center mb-12 pb-12 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <p class="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Official Result ID</p>
                        <h2 class="text-2xl font-black text-slate-900 dark:text-white">#UDUS-902 / Culture Isolate</h2>
                    </div>
                    <button onclick="generateHighEndPDF()" class="px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-sm shadow-xl transition hover:scale-105 active:scale-95">
                        <i class="fas fa-file-pdf mr-2"></i> EXPORT SECURE PDF
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Isolate Detected</p>
                        <p class="font-black text-2xl italic text-primary">Klebsiella pneumoniae</p>
                    </div>
                    <div class="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sensitivity Insight</p>
                        <p class="font-black text-2xl text-emerald-500">Sensitive to Meropenem</p>
                    </div>
                </div>
            </div>
        </div>`;
}

function renderPatientEducation() {
    const tips = [
        { icon: 'fa-user-nurse', title: 'Professional Consultation', text: 'Never buy antibiotics over the counter without a direct prescription from a qualified clinician.', color: 'blue' },
        { icon: 'fa-capsules', title: 'Complete The Dose', text: 'Halting antibiotic use early allows resistant bacteria to multiply, leading to treatment failure later.', color: 'red' },
        { icon: 'fa-virus-slash', title: 'No Virus Use', text: 'Antibiotics kill bacteria, NOT viruses like the common cold or flu. Using them incorrectly fuels AMR.', color: 'emerald' },
        { icon: 'fa-shield-heart', title: 'Hygiene First', text: 'Consistent hand washing and vaccination reduce infection rates, minimizing the need for antibiotics.', color: 'purple' },
        { icon: 'fa-utensils', title: 'Food Safety', text: 'Properly cooking animal products helps prevent the spread of drug-resistant bacteria in the food chain.', color: 'orange' }
    ];
    document.getElementById('main-stage').innerHTML = `
        <div class="fade-in max-w-5xl">
            <h2 class="text-3xl font-extrabold mb-10 tracking-tight text-slate-900 dark:text-white">Public Health Intelligence</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${tips.map(t => `
                    <div class="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-${t.color}-500 transition-all duration-300 shadow-sm group">
                        <div class="w-16 h-16 bg-${t.color}-500/10 text-${t.color}-500 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition">
                            <i class="fas ${t.icon}"></i>
                        </div>
                        <h4 class="font-black text-lg mb-4 uppercase tracking-tighter text-${t.color}-500">${t.title}</h4>
                        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-500 font-medium">${t.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
}

/* =========================================
   CHART ENGINE
========================================= */
let complexBar = null;
let complexLine = null;

function updateCharts() {
    const fac = document.getElementById('facility-filter').value;
    const res = { 'Harmony Medical': 82, 'Unity Hospital': 65, 'Sunrise Clinic': 44, 'Beacon Health': 38, 'Evergreen Hospital': 29, 'Riverside Lab': 55 };
    const tests = { 'Harmony Medical': 1200, 'Unity Hospital': 850, 'Sunrise Clinic': 500, 'Beacon Health': 400, 'Evergreen Hospital': 700, 'Riverside Lab': 950 };
    
    document.getElementById('stat-tests').innerText = tests[fac].toLocaleString();
    document.getElementById('stat-res').innerText = res[fac] + '%';
    document.getElementById('alert-text').innerText = `${fac} reporting critical resistance profiles in local isolates.`;
    
    const newData = Array.from({length: 4}, () => Math.floor(Math.random() * 90));
    complexBar.data.datasets[0].data = newData;
    complexBar.update();
}

function initComplexCharts() {
    const barCtx = document.getElementById('complexBarChart').getContext('2d');
    complexBar = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Ampicillin', 'Ciprofloxacin', 'Nitrofurantoin', 'Gentamicin'],
            datasets: [
                { label: 'Facility Resistance %', data: [82, 75, 12, 45], backgroundColor: '#3b82f6', borderRadius: 8 },
                { label: 'Regional Baseline %', data: [65, 60, 15, 38], backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 }
            ]
        },
        options: { 
            plugins: { legend: { labels: { color: '#94a3b8', font: { weight: 'bold', size: 10 } } } },
            scales: { 
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });

    const lineCtx = document.getElementById('complexLineChart').getContext('2d');
    complexLine = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Oct', 'Nov', 'Dec', 'Jan'],
            datasets: [
                { label: 'State Alpha Avg', data: [45, 52, 68, 72], borderColor: '#3b82f6', tension: 0.4, fill: true, backgroundColor: 'rgba(59,130,246,0.1)' },
                { label: 'State Beta Avg', data: [38, 41, 44, 48], borderColor: '#10b981', tension: 0.4 }
            ]
        },
        options: { 
            plugins: { legend: { labels: { color: '#94a3b8', font: { weight: 'bold', size: 10 } } } },
            scales: { 
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
            }
        }
    });
}

/* =========================================
   HARDWARE & AI ENGINE
========================================= */
async function runCamera() {
    const v = document.getElementById('webcam');
    const o = document.getElementById('cam-overlay');
    const s = document.getElementById('scan-bar');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        v.srcObject = stream;
        v.classList.remove('hidden');
        o.classList.add('hidden');
        s.classList.remove('hidden');
        v.play();
        setTimeout(() => {
            stream.getTracks().forEach(t => t.stop());
            v.classList.add('hidden');
            s.classList.add('hidden');
            o.classList.remove('hidden');
            document.getElementById('bc-field').value = "SPEC-2026-X911";
            alert("AI Node Capture: Isolate identified. Zone inhibition detected at 21mm.");
        }, 4000);
    } catch(e) { alert("Camera Access Required for Hardware Simulation."); }
}

function runScanner(type) { runCamera(); }
function runVoiceSim() {
    const f = document.getElementById('voice-field');
    f.value = "Listening...";
    setTimeout(() => f.value = "Klebsiella pneumoniae", 1500);
}

function generateHighEndPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(59, 130, 246); // Blue
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("AMR INTEL HEALTH RECORD", 14, 20);
    
    // Patient Info
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(12);
    doc.text(`Patient Name: ${state.name}`, 14, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 45);
    doc.text(`Ref ID: #UDUS-902`, 14, 55);
    doc.text(`Facility: Harmony Medical Centre`, 14, 65);

    // Table
    doc.autoTable({
        startY: 75,
        head: [['Parameter', 'Result', 'Clinical Note']],
        body: [
            ['Pathogen', 'Klebsiella pneumoniae', 'Confirmed Isolate'],
            ['Resistance', 'Sensitive', 'Respond to Meropenem'],
            ['Status', 'Active Infection', 'Treatment Required']
        ],
        headStyles: { fillColor: [59, 130, 246] },
        alternateRowStyles: { fillColor: [240, 245, 255] }
    });

    // Warnings
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setTextColor(220, 38, 38); // Red
    doc.setFontSize(14);
    doc.text("CRITICAL WARNINGS:", 14, finalY);
    
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text("1. Always complete the full course of your prescribed antibiotic.", 14, finalY + 10);
    doc.text("2. Never share your medication with others. Each infection is unique.", 14, finalY + 16);
    doc.text("3. If symptoms persist, return to the clinic immediately.", 14, finalY + 22);

    doc.save(`AMR_Report_${state.name.replace(' ', '_')}.pdf`);
}