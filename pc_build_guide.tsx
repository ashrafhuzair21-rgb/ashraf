import React, { useState } from 'react';
import { 
  Cpu, HardDrive, MonitorPlay, CheckCircle, Circle, ChevronDown, 
  ChevronUp, Zap, Fan, Server, Gamepad2, Wrench, Layers, Power,
  ShieldCheck, ArrowRight, Play, CheckSquare, ListChecks, BookOpen,
  Sparkles, Bot, Loader2, Send
} from 'lucide-react';

// --- DATA ---

const BUILD_TIERS = [
  {
    name: "Budget 1080p Entry",
    price: "~RM 3,500 - RM 4,200",
    color: "from-emerald-400 to-teal-500",
    target: "1080p Gaming / Esports / General Use",
    parts: [
      { label: "CPU", value: "AMD Ryzen 5 7600" },
      { label: "GPU", value: "NVIDIA RTX 4060 or AMD RX 7600" },
      { label: "RAM", value: "16GB DDR5-5600" },
      { label: "Motherboard", value: "B650M Micro-ATX" },
      { label: "Storage", value: "1TB PCIe Gen4 NVMe SSD" },
      { label: "PSU", value: "650W 80+ Bronze" }
    ]
  },
  {
    name: "Mid-Range 1440p Sweet Spot",
    price: "~RM 6,500 - RM 7,500",
    color: "from-blue-400 to-indigo-500",
    target: "1440p High Refresh Rate / Streaming",
    parts: [
      { label: "CPU", value: "AMD Ryzen 5 9600X or Intel Core Ultra 5" },
      { label: "GPU", value: "NVIDIA RTX 5070 12GB" },
      { label: "RAM", value: "32GB DDR5-6000 CL32" },
      { label: "Motherboard", value: "B650 or B860 ATX" },
      { label: "Storage", value: "2TB PCIe Gen4 NVMe SSD" },
      { label: "PSU", value: "750W 80+ Gold (ATX 3.1)" }
    ],
    featured: true
  },
  {
    name: "God-Tier 4K Enthusiast",
    price: "~RM 15,000+",
    color: "from-purple-400 to-pink-500",
    target: "4K Max Settings / Ray Tracing / Heavy Creation",
    parts: [
      { label: "CPU", value: "AMD Ryzen 7 9800X3D" },
      { label: "GPU", value: "NVIDIA RTX 5090 32GB" },
      { label: "RAM", value: "64GB DDR5-6000 CL30" },
      { label: "Motherboard", value: "X870E ATX" },
      { label: "Storage", value: "4TB PCIe Gen5 NVMe SSD" },
      { label: "PSU", value: "1200W 80+ Platinum (ATX 3.1)" }
    ]
  }
];

const COMPONENTS_GLOSSARY = [
  { icon: Cpu, name: "CPU (Processor)", desc: "The brain of the computer. It handles all instructions and calculations. Crucial for frame rates and multitasking." },
  { icon: Gamepad2, name: "GPU (Graphics Card)", desc: "Renders images, video, and 2D/3D graphics. The most important component for a gaming build." },
  { icon: Layers, name: "Motherboard", desc: "The main circuit board that connects all other components together. Dictates what parts are compatible." },
  { icon: Server, name: "RAM (Memory)", desc: "Short-term memory used by the CPU to store data it needs to access quickly. 32GB is the 2026 standard." },
  { icon: HardDrive, name: "Storage (NVMe SSD)", desc: "Where your operating system, games, and files are saved permanently. NVMe SSDs are incredibly fast." },
  { icon: Power, name: "Power Supply (PSU)", desc: "Converts wall power to usable power for your parts. Never cheap out on a PSU; bad ones can damage your system." },
  { icon: Fan, name: "Cooler", desc: "Dissipates heat from the CPU. Can be an air cooler (heatsink and fans) or an AIO (liquid cooling)." },
  { icon: ShieldCheck, name: "Case", desc: "The enclosure that holds everything. Good cases provide great airflow to keep components cool." }
];

const BUILD_STEPS = [
  {
    title: "1. Prepare Workspace & Tools",
    content: "Clear a large, non-carpeted table. You will need a magnetic Phillips #2 screwdriver and a clean workspace. Keep the motherboard box—it makes a perfect anti-static test bench for the first few steps."
  },
  {
    title: "2. Install CPU",
    content: "Open the motherboard lever. Align the small triangle on the corner of the CPU with the triangle on the motherboard socket. Gently lower it in—do not push or use force. Lock the lever down."
  },
  {
    title: "3. Install M.2 NVMe SSD",
    content: "Remove the M.2 heatsink on the motherboard. Insert the M.2 drive at a 30-degree angle into the slot. Push it down flat and secure it with the tiny M.2 screw or toolless latch. Reattach the heatsink."
  },
  {
    title: "4. Install RAM",
    content: "Check your motherboard manual for the optimal slots (usually slots 2 and 4, or A2 and B2). Open the retaining clips, align the notch on the RAM stick with the slot, and push down firmly until it clicks."
  },
  {
    title: "5. Install CPU Cooler (If Air Cooling)",
    content: "If using an air cooler, apply a pea-sized drop of thermal paste to the CPU (if it isn't pre-applied). Mount the cooler bracket and screw down the heatsink. Plug the cooler's fan cable into the 'CPU_FAN' header. (If using an AIO liquid cooler, mount the block now, but wait to mount the radiator until the board is in the case)."
  },
  {
    title: "6. Mount Motherboard into Case",
    content: "If your motherboard doesn't have an integrated I/O shield, snap the loose shield into the back of the case now. Lay the case flat, align the motherboard with the standoffs, and secure it using the provided motherboard screws."
  },
  {
    title: "7. Install Power Supply (PSU)",
    content: "If using a modular PSU, plug in the cables you need first (24-pin Motherboard, 8-pin CPU, PCIe/12VHPWR for GPU). Slide the PSU into the basement of the case and screw it into the back panel."
  },
  {
    title: "8. Connect Motherboard Cables",
    content: "Route cables from the back of the case to the front. Plug in the thick 24-pin power cable, the 8-pin CPU power cable (top left), and the tiny, tedious front panel connectors (Power Switch, Reset Switch, USB headers)."
  },
  {
    title: "9. Install Graphics Card (GPU)",
    content: "Remove the PCIe slot covers on the back of the case. Push down the locking clip on the top PCIe x16 slot of the motherboard. Insert the GPU until it clicks, then screw the bracket into the case. Plug the PCIe power cables into the GPU."
  },
  {
    title: "10. First Boot & Install OS",
    content: "Plug your monitor directly into the GPU (not the motherboard). Turn on the PSU switch and press the case power button. If you see the BIOS screen, success! Plug in a USB drive with the Windows Installation Media, reboot, and follow the prompts."
  }
];

const INITIAL_CHECKLIST = [
  { id: 1, text: "Gather tools (Phillips #2 screwdriver, good lighting)", completed: false },
  { id: 2, text: "Install CPU into the motherboard", completed: false },
  { id: 3, text: "Install M.2 NVMe SSD(s)", completed: false },
  { id: 4, text: "Install RAM sticks (in slots 2 & 4 usually)", completed: false },
  { id: 5, text: "Install CPU Cooler & plug in CPU_FAN header", completed: false },
  { id: 6, text: "Install I/O Shield (if applicable)", completed: false },
  { id: 7, text: "Mount Motherboard into the case", completed: false },
  { id: 8, text: "Install Power Supply (PSU)", completed: false },
  { id: 9, text: "Connect Front Panel headers (Power button, USB)", completed: false },
  { id: 10, text: "Plug in 24-pin Motherboard & 8-pin CPU power cables", completed: false },
  { id: 11, text: "Install Graphics Card (GPU) in top slot", completed: false },
  { id: 12, text: "Connect PSU cables to GPU", completed: false },
  { id: 13, text: "Plug monitor into GPU, connect keyboard/mouse", completed: false },
  { id: 14, text: "Power on system and enter BIOS", completed: false },
  { id: 15, text: "Enable XMP/EXPO for RAM in BIOS", completed: false },
  { id: 16, text: "Install Operating System via USB flash drive", completed: false }
];

// --- GEMINI API UTILS ---
const callGeminiAPI = async (userPrompt, systemPrompt) => {
  const apiKey = ""; // Provided by the execution environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  const maxRetries = 5;
  const baseDelay = 1000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw new Error("Failed to connect to the AI after multiple attempts. Please check your connection or try again later.");
      }
      await new Promise(res => setTimeout(res, baseDelay * Math.pow(2, attempt)));
    }
  }
};

// --- COMPONENTS ---

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Wrench className="w-6 h-6 text-indigo-500" />
              <span className="font-bold text-xl text-white tracking-tight">Build<span className="text-indigo-500">Core</span></span>
            </div>
            <div className="hidden md:flex space-x-1">
              <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={MonitorPlay}>Overview</NavButton>
              <NavButton active={activeTab === 'components'} onClick={() => setActiveTab('components')} icon={Layers}>Components</NavButton>
              <NavButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon={BookOpen}>Build Guide</NavButton>
              <NavButton active={activeTab === 'checklist'} onClick={() => setActiveTab('checklist')} icon={ListChecks}>Checklist</NavButton>
              <NavButton active={activeTab === 'ai-builder'} onClick={() => setActiveTab('ai-builder')} icon={Sparkles}>AI Builder</NavButton>
            </div>
            {/* Mobile menu fallback (simplified) */}
            <div className="md:hidden flex space-x-2 overflow-x-auto text-sm">
               <button onClick={() => setActiveTab('overview')} className={`px-3 py-1 rounded-full ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>Start</button>
               <button onClick={() => setActiveTab('guide')} className={`px-3 py-1 rounded-full ${activeTab === 'guide' ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>Guide</button>
               <button onClick={() => setActiveTab('checklist')} className={`px-3 py-1 rounded-full ${activeTab === 'checklist' ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>Checklist</button>
               <button onClick={() => setActiveTab('ai-builder')} className={`px-3 py-1 rounded-full flex items-center ${activeTab === 'ai-builder' ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}><Sparkles className="w-3 h-3 mr-1"/> AI</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-24">
        {activeTab === 'overview' && <OverviewView setActiveTab={setActiveTab} />}
        {activeTab === 'components' && <ComponentsView />}
        {activeTab === 'guide' && <GuideView />}
        {activeTab === 'checklist' && <ChecklistView />}
        {activeTab === 'ai-builder' && <AIBuilderView />}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-slate-500 text-sm">
        <p>BuildCore &copy; 2026. A comprehensive guide for PC enthusiasts.</p>
      </footer>
    </div>
  );
}

// --- SUB-VIEWS ---

function OverviewView({ setActiveTab }) {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* Hero */}
      <div className="text-center py-12 lg:py-20">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Master the Art of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            PC Building in 2026
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Whether you're crafting a budget esports rig or a god-tier 4K battlestation, our updated guide has everything you need to pick parts and build with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setActiveTab('guide')}
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
          >
            Start Building Guide <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button 
            onClick={() => setActiveTab('components')}
            className="flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Learn the Components
          </button>
        </div>
      </div>

      {/* Recommended Builds */}
      <div>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">2026 Recommended Builds</h2>
          <p className="text-slate-400">Curated parts lists representing the best value and performance in the current market.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUILD_TIERS.map((tier, idx) => (
            <div key={idx} className={`relative p-6 rounded-2xl bg-slate-900 border ${tier.featured ? 'border-indigo-500 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-800'} flex flex-col`}>
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Sweet Spot
                </div>
              )}
              <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${tier.color} mb-1`}>
                {tier.name}
              </h3>
              <div className="text-2xl font-black text-white mb-2">{tier.price}</div>
              <p className="text-sm text-slate-400 mb-6 pb-6 border-b border-slate-800">{tier.target}</p>
              
              <ul className="space-y-4 flex-grow">
                {tier.parts.map((part, pIdx) => (
                  <li key={pIdx} className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-semibold">{part.label}</span>
                    <span className="text-slate-200 font-medium">{part.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComponentsView() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">The Anatomy of a PC</h2>
        <p className="text-slate-400">Before you build, it helps to understand what each component does. Here is a quick breakdown of the core hardware inside every modern computer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMPONENTS_GLOSSARY.map((comp, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-indigo-400">
              <comp.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{comp.name}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{comp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuideView() {
  const [openStep, setOpenStep] = useState(0);
  const [issueQuery, setIssueQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAskAI = async () => {
    if (!issueQuery.trim()) return;
    setIsAnalyzing(true);
    setAiResponse('');
    
    const systemPrompt = "You are an expert PC building troubleshooting assistant. A user is currently physically building their PC and has encountered an issue. Provide concise, safe, and step-by-step troubleshooting advice. Keep your answer under 3 paragraphs and use formatting like bold text for emphasis.";
    
    try {
      const response = await callGeminiAPI(issueQuery, systemPrompt);
      setAiResponse(response);
    } catch (error) {
      setAiResponse(`Error: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Step-by-Step Assembly Guide</h2>
        <p className="text-slate-400">Take your time, read the manuals, and never force a component into place. Follow these steps sequentially for the easiest building experience.</p>
      </div>

      <div className="space-y-4">
        {BUILD_STEPS.map((step, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all">
            <button 
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-800/50"
              onClick={() => setOpenStep(openStep === idx ? -1 : idx)}
            >
              <h3 className={`text-lg font-bold ${openStep === idx ? 'text-indigo-400' : 'text-slate-200'}`}>
                {step.title}
              </h3>
              {openStep === idx ? (
                <ChevronUp className="w-5 h-5 text-indigo-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
            
            <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openStep === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-slate-400 leading-relaxed border-l-2 border-indigo-500/30 pl-4 mt-2">
                {step.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Troubleshooting Assistant */}
      <div className="mt-12 bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Stuck on a step?</h3>
            <p className="text-sm text-indigo-200/70">Ask our AI troubleshooting assistant for help.</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={issueQuery}
            onChange={(e) => setIssueQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
            placeholder="e.g., 'My motherboard won't align with the standoffs'"
            className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <button 
            onClick={handleAskAI}
            disabled={isAnalyzing || !issueQuery.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4 mr-2" /> Ask</>}
          </button>
        </div>

        {aiResponse && (
          <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
            {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
}

function ChecklistView() {
  // Persist to localStorage would be ideal, but keeping it in state for this self-contained demo
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const progress = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Builder's Checklist</h2>
        <p className="text-slate-400">Track your progress as you build to ensure you don't miss any critical steps.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between text-sm font-medium mb-3">
          <span className="text-slate-300">Build Progress</span>
          <span className="text-indigo-400">{progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5">
          <div 
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {checklist.map((item, idx) => (
          <div 
            key={item.id} 
            className={`flex items-start p-4 cursor-pointer hover:bg-slate-800/50 transition-colors ${idx !== checklist.length - 1 ? 'border-b border-slate-800/50' : ''}`}
            onClick={() => toggleCheck(item.id)}
          >
            <div className="flex-shrink-0 mt-0.5">
              {item.completed ? (
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              ) : (
                <Circle className="w-6 h-6 text-slate-600" />
              )}
            </div>
            <div className={`ml-4 text-base transition-colors ${item.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      
      {progress === 100 && (
        <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center animate-in zoom-in duration-500">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">Build Complete! 🎉</h3>
          <p className="text-emerald-500/80">Congratulations on your new PC! Enjoy the high frame rates and low temperatures.</p>
        </div>
      )}
    </div>
  );
}

// --- UTILS ---

function NavButton({ active, onClick, children, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
        active 
          ? 'bg-slate-800 text-indigo-400' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}

function AIBuilderView() {
  const [budget, setBudget] = useState('');
  const [useCase, setUseCase] = useState('');
  const [preferences, setPreferences] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [buildResult, setBuildResult] = useState('');

  const handleGenerateBuild = async () => {
    if (!budget || !useCase) return;
    setIsGenerating(true);
    setBuildResult('');

    const systemPrompt = "You are an expert PC builder in Malaysia advising a client. Generate a customized PC parts list based on their budget (in RM) and use case. Include estimated RM prices for each component (CPU, GPU, Motherboard, RAM, Storage, PSU, Case, Cooler). Format your response neatly using Markdown bullet points. Keep intro/outro brief. If the budget is completely unrealistic for the use case, politely explain what can be achieved instead.";
    
    const userPrompt = `Budget: RM ${budget}\nPrimary Use Case: ${useCase}\nSpecific Preferences/Notes: ${preferences || "None"}\n\nPlease generate a recommended parts list.`;

    try {
      const response = await callGeminiAPI(userPrompt, systemPrompt);
      setBuildResult(response);
    } catch (error) {
      setBuildResult(`Error generating build: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-indigo-400 mr-3" />
          AI Build Wizard
        </h2>
        <p className="text-slate-400">Tell us your budget and what you want to do with your PC, and our Gemini-powered AI will generate a custom parts list just for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="md:col-span-1 space-y-6 bg-slate-900 p-6 rounded-xl border border-slate-800 h-fit">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Total Budget (RM)</label>
            <input 
              type="number" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Primary Use Case</label>
            <select 
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none"
            >
              <option value="" disabled>Select an option...</option>
              <option value="1080p Gaming">1080p Gaming (e.g. Valorant, Apex)</option>
              <option value="1440p AAA Gaming">1440p AAA Gaming (e.g. Cyberpunk)</option>
              <option value="4K Gaming & Streaming">4K Gaming & Streaming</option>
              <option value="Video Editing & Rendering">Video Editing / 3D Rendering</option>
              <option value="Office & Web Browsing">Basic Office & Web Browsing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Preferences (Optional)</label>
            <textarea 
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g. Needs Wi-Fi, all white aesthetic, RGB, mini-ITX..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          <button 
            onClick={handleGenerateBuild}
            disabled={isGenerating || !budget || !useCase}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center transition-all shadow-lg shadow-indigo-900/20"
          >
            {isGenerating ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Crafting Build...</>
            ) : (
              <><Sparkles className="w-5 h-5 mr-2" /> ✨ Generate Custom Build</>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className="md:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6 min-h-[400px]">
          {isGenerating ? (
             <div className="h-full flex flex-col items-center justify-center text-indigo-400 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin" />
                <p className="font-medium animate-pulse">Scanning the market for the best parts...</p>
             </div>
          ) : buildResult ? (
            <div className="prose prose-invert prose-indigo max-w-none">
              {/* Very basic markdown rendering using split by newline, replacing **text** with styled spans */}
              {buildResult.split('\n').map((line, i) => {
                 if (line.startsWith('* ') || line.startsWith('- ')) {
                   const formattedLine = line.substring(2).split(/(\*\*.*?\*\*)/g).map((part, j) => 
                     part.startsWith('**') && part.endsWith('**') 
                     ? <strong key={j} className="text-white">{part.slice(2, -2)}</strong> 
                     : part
                   );
                   return <li key={i} className="text-slate-300 ml-4 list-disc marker:text-indigo-500 mb-1">{formattedLine}</li>;
                 }
                 if (line.startsWith('##')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace(/#/g, '').trim()}</h3>;
                 if (line.startsWith('#')) return <h2 key={i} className="text-2xl font-bold text-indigo-400 mt-4 mb-2">{line.replace(/#/g, '').trim()}</h2>;
                 
                 const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, j) => 
                     part.startsWith('**') && part.endsWith('**') 
                     ? <strong key={j} className="text-white">{part.slice(2, -2)}</strong> 
                     : part
                 );
                 return <p key={i} className="text-slate-300 mb-2 leading-relaxed">{formattedLine}</p>;
              })}
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <Bot className="w-16 h-16 opacity-20" />
                <p>Your AI-generated build will appear here.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}