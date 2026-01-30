# amr-intel
Democratizing Antimicrobial Resistance (AMR) Data. A real-time surveillance platform and AI-clinical assistant (ResistanceIQ) transforming laboratory results into actionable intelligence for healthcare providers.


# AMR Intelligence Platform 🛡️

**Democratizing Antimicrobial Resistance Data: From Silos to Actionable Intelligence.**

> **Current Version:** 1.0.0 (Prototype)
> **Status:** MVP / Hackathon Build

## 📖 Overview
The **AMR Intelligence Platform** is a high-fidelity frontend prototype designed to address the global crisis of Antimicrobial Resistance (AMR). In many low-resource settings, lab data remains trapped in paper records ("digital silos"), forcing clinicians to prescribe antibiotics blindly.

This solution bridges that gap by visualizing real-time resistance trends and providing an AI-driven clinical assistant (**ResistanceIQ**) to guide empirical therapy decisions.

## 🚀 Key Features

### 1. 📊 Live Surveillance Dashboard
* **Real-Time Antibiograms:** Visualizes resistance patterns dynamically.
* **Multi-State Support:** Switch between **State Alpha** (High Ampicillin resistance) and **State Beta** (High Cephalosporin resistance) to see how data changes decision-making.
* **Drill-Down Metrics:** Tracks sentinel centres, test volumes, and critical alerts.

### 2. 🤖 ResistanceIQ (Clinical AI)
* **Context-Aware Guidance:** A simulated AI chatbot that recommends specific antibiotics based on local facility data.
* **Education:** Provides CLSI guideline checks and trend analysis on demand.
* **Typing Simulation:** Realistic interaction latency to mimic live backend processing.

### 3. 🏥 Smart Data Visualization
* **Interactive Charts:** Powered by **Chart.js** to show susceptibility percentages.
* **Responsive Design:** Optimized for tablets and desktops (simulating a hospital workstation).

## 🛠️ Tech Stack (Zero-Dependency)

This project is built to be lightweight, fast, and runnable without a complex build process.

* **Structure:** Semantic HTML5
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via Play CDN)
* **Logic:** Vanilla JavaScript (ES6+)
* **Visualization:** [Chart.js](https://www.chartjs.org/)
* **Icons:** [Lucide Icons](https://lucide.dev/)

## 🏃‍♂️ How to Run

Since this is a static prototype, you do not need `npm`, `node`, or a build server.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/amr-platform.git](https://github.com/YOUR_USERNAME/amr-platform.git)
    ```

2.  **Open the Application**
    * Navigate to the project folder.
    * Double-click **`index.html`** to open it in your browser.
    * *Optional:* For the best experience, use the "Live Server" extension in VS Code.

## 🧪 Demonstration Scenarios

To demonstrate the platform's capabilities, use the following data triggers:

| Scenario | Trigger | Expected Outcome |
| :--- | :--- | :--- |
| **State Alpha** | Click "State Alpha" in Sidebar | Shows high resistance to **Ampicillin** & **Ciprofloxacin**. Recommends Nitrofurantoin. |
| **State Beta** | Click "State Beta" in Sidebar | Shows high resistance to **Cephalosporins**. Recommends Carbapenems only for severe cases. |
| **AI Analysis** | Click "Therapy for Alpha" chip | AI explains that Ampicillin is ineffective in this region. |

## 📂 Project Structure

```text
/
├── index.html      # Main application structure (Landing + App)
├── style.css       # Custom animations and glassmorphism effects
├── script.js       # Business logic, Chart config, and AI simulation
└── README.md       # Documentation