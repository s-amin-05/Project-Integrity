import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Database, 
  Cpu, 
  Scale, 
  Flag, 
  ShieldCheck, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  HelpCircle, 
  Search, 
  Filter, 
  Download,
  ExternalLink,
  ChevronRight,
  Info,
  MapPin
} from 'lucide-react';

const reportsData = [
  {
    id: '#RPT-2023-8921',
    date: 'TODAY, 09:42 AM',
    title: 'Large crater on Main St.',
    desc: 'Citizen reported: "Tire damage hazard, approximately 2ft wide..."',
    type: 'Pothole',
    tags: ['Asphalt'],
    status: 'CRITICAL',
    imageColor: 'bg-zinc-300',
    mapColor: 'bg-zinc-100',
    aiInsight: { type: 'match', text: 'Match prob. 95% with #8920', icon: 'bot' },
    selected: false,
    resolved: false
  },
  {
    id: '#RPT-2023-8922',
    date: 'TODAY, 08:15 AM',
    title: 'Illegal Dumping in Alley',
    desc: 'Construction debris left behind 4th Ave building. Blocking parti...',
    type: 'Sanitation',
    tags: [],
    status: 'NEEDS REVIEW',
    imageColor: 'bg-emerald-100', // mimic green vegetation in photo
    mapColor: 'bg-zinc-100',
    aiInsight: { type: 'recurring', text: 'Recurring location (3x this month)', icon: 'history' },
    selected: false,
    resolved: false
  },
  {
    id: '#RPT-2023-8925',
    date: 'YESTERDAY',
    title: 'Light Out - Sector 4',
    desc: 'Complete darkness at intersection. Safety concern for...',
    type: 'Electrical',
    tags: ['Lighting'],
    status: 'ELECTRICAL', // Using as a category/status hybrid
    imageColor: 'bg-blue-900', // mimic night shot
    mapColor: 'bg-slate-800', // dark mode map
    aiInsight: { type: 'sla', text: 'SLA breach in 4 hours', icon: 'clock' },
    selected: false, // Visually selected in image
    resolved: false
  },
  {
    id: '#RPT-2023-8890',
    date: 'OCT 22',
    title: 'Vandalism on Park Wall',
    desc: 'Offensive graffiti reported near playground entrance. Cleaned b...',
    type: 'Graffiti',
    tags: [],
    status: 'RESOLVED',
    imageColor: 'bg-orange-100', // mimic brick wall
    mapColor: 'bg-zinc-100',
    aiInsight: { type: 'closed', text: 'Closed by Admin', icon: 'check' },
    selected: false,
    resolved: true
  },
  {
    id: '#RPT-2023-8930',
    date: 'JUST NOW',
    title: 'Blocked Storm Drain',
    desc: 'Water pooling significantly after rain. Drain appears clogged with...',
    type: 'Drainage',
    tags: [],
    status: 'CRITICAL',
    imageColor: 'bg-slate-300', // wet pavement
    mapColor: 'bg-zinc-100',
    aiInsight: null,
    selected: false,
    resolved: false
  },
  {
    id: '#RPT-2023-8928',
    date: '1 HOUR AGO',
    title: 'Water on 5th Ave',
    desc: 'Same location as #8930. Reported by different user.',
    type: 'Drainage',
    tags: [],
    status: 'DUPLICATE?',
    imageColor: 'bg-slate-400',
    mapColor: 'bg-zinc-100',
    aiInsight: null,
    selected: false,
    resolved: false
  }
];

const AuditLog = () => {
  const { reportId } = useParams();
  const [status, setStatus] = useState('In Audit');

  const report = useMemo(() => {
     if (!reportId) return null;
     const decodedId = decodeURIComponent(reportId);
     return reportsData.find(r => r.id === decodedId);
  }, [reportId]);
  
  // Default fallback if no report is found (or viewing /audit directly)
  const displayTitle = report ? report.title : "Main St. Resurfacing Phase II";
  const displayId = report ? report.id : "#8821-XJ9";
  const displayType = report ? report.type : "Resurfacing";
  const displayDesc = report ? report.desc : "Traceability record for AI decision agent.";

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR (Context) */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Project Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Map Placeholder */}
            <div className="h-32 bg-slate-200 relative group cursor-pointer">
              <div className="absolute inset-0 opacity-40" 
                   style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
              <div className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                Seattle, WA
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500">
                <MapPin size={32} />
              </div>
            </div>
            
            <div className="p-5">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Project</div>
              <h2 className="font-bold text-slate-900 leading-tight mb-2">{displayTitle}</h2>
              <p className="text-xs font-mono text-blue-600 mb-6 bg-blue-50 w-fit px-2 py-0.5 rounded">ID: {displayId}</p>

              <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                <div>
                  <p className="text-[10px] text-gray-400 mb-1">Status</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <span className={`w-2 h-2 rounded-full ${status === 'Verified' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {status}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 mb-1">Type</p>
                  <p className="text-sm font-bold text-slate-900">{displayType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Context Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">AI Agent Context</h3>
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-mono rounded font-bold">v2.4.1</span>
            </div>

            <div className="space-y-3 mb-6">
              <ContextRow icon={<Clock size={14}/>} label="Execution Time" value="450ms" />
              <ContextRow icon={<Cpu size={14}/>} label="Decision Nodes" value="14 Steps" />
              <ContextRow icon={<Scale size={14}/>} label="Regulations" value="3 Cited" />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Overall Compliance Score</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                <div className="h-full bg-green-500 w-[94%] rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs font-bold">
                 <span className="text-slate-500">Low Risk</span>
                 <span className="text-green-600">94%</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
             <Info className="text-blue-600 shrink-0" size={18} />
             <p className="text-xs text-blue-800 leading-relaxed">
               This audit log is immutable and cryptographically signed. Any changes to the underlying data will invalidate the audit hash.
             </p>
          </div>

        </aside>

        {/* RIGHT CONTENT (Timeline) */}
        <div className="lg:col-span-9">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                 <span>Home</span> <ChevronRight size={10}/> <span>Audits</span> <ChevronRight size={10}/> <span className="text-slate-900 font-medium">Log {displayId}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Agentic Audit Log</h1>
              <p className="text-sm text-gray-500 mt-1">{displayDesc}</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-medium text-slate-600 hover:bg-gray-50">
                 <Filter size={14} /> Filter
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm font-medium text-slate-600 hover:bg-gray-50">
                 <Search size={14} /> Search
               </button>
               {status !== 'Verified' && (
                 <button 
                    onClick={() => setStatus('Verified')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 border border-green-700 rounded-md text-sm font-bold text-white hover:bg-green-700 shadow-sm"
                 >
                   <ShieldCheck size={14} /> Verify Audit
                 </button>
               )}
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="relative pl-4 space-y-8">
            {/* The Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-gray-200"></div>

            {/* Step 1: Data Ingestion */}
            <TimelineNode 
              icon={<Database size={18} />}
              iconBg="bg-green-100 text-green-700"
              badge="COMPLETED"
              badgeColor="bg-green-100 text-green-700 border-green-200"
              title="Data Ingestion"
              time="T+00ms"
              confidence={100}
            >
              <p className="text-sm text-slate-600 mb-3">Retrieved geospatial data layers for project coordinates.</p>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 font-mono text-xs text-slate-600 flex gap-8">
                <div>
                   <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">SOURCE</span>
                   <span className="text-blue-600 font-bold">Muni-GIS-DB-01</span>
                </div>
                <div>
                   <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">LAYERS</span>
                   <span>['zoning_2023', 'topo_lidar', 'utilities_underground']</span>
                </div>
              </div>
            </TimelineNode>

            {/* Step 2: Semantic Analysis */}
            <TimelineNode 
              icon={<Cpu size={18} />}
              iconBg="bg-blue-100 text-blue-700"
              badge="PROCESSING"
              badgeColor="bg-blue-100 text-blue-700 border-blue-200"
              title="Semantic Zoning Analysis"
              time="T+120ms"
              confidence={98}
            >
              <p className="text-sm text-slate-600 mb-3">Analyzed zoning constraints against project scope "Resurfacing".</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <CodeBlock title="INPUT CONTEXT">
                  Zone: 'R-2'<br/>
                  Project_Type: 'Maintenance'<br/>
                  Time_of_day: '08:00-16:00'
                </CodeBlock>
                <CodeBlock title="INFERENCE OUTPUT" isOutput>
                  Result: 'PERMITTED_BY_RIGHT'<br/>
                  Reason: "Maintenance exception applies"
                </CodeBlock>
              </div>
            </TimelineNode>

            {/* Step 3: Rule Check (Warning) */}
            <TimelineNode 
              icon={<Scale size={18} />}
              iconBg="bg-amber-100 text-amber-700"
              badge="RULE CHECK"
              badgeColor="bg-amber-100 text-amber-700 border-amber-200"
              title="Applied Regulation 42.b"
              time="T+340ms"
              confidence={92}
              isWarning
            >
              <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg mb-3">
                 <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                 <div>
                   <h4 className="text-sm font-bold text-slate-800">Noise Control Ordinance Triggered</h4>
                   <p className="text-xs text-slate-600 mt-0.5">Project machinery list includes heavy compactors (&gt;90dB). Special check required.</p>
                 </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded p-4 relative">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Regulation Source: Municipal Code 42.b, Section 4</span>
                   <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-blue-600">
                     View Full Text <ExternalLink size={10} />
                   </button>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed border-l-2 border-gray-300 pl-3">
                  "No construction activity exceeding 85dB shall occur within 500ft of residential zones between the hours of 18:00 and 08:00, unless a special variance is granted by the City Engineer."
                </p>
              </div>
              <button className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
                 <ChevronRight size={12} /> View Logic Trace
              </button>
            </TimelineNode>

            {/* Step 4: Final Decision */}
            <TimelineNode 
              icon={<Flag size={18} />}
              iconBg="bg-[#0e6f96] text-white"
              badge="FINAL DECISION"
              badgeColor="bg-[#0e6f96] text-white border-transparent"
              title="Provisional Approval Issued"
              time="T+450ms"
              confidence={94}
              isLast
            >
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                The AI agent has provisionally approved this project based on standard resurfacing guidelines. A manual review is recommended for the <span className="font-bold text-amber-600">noise variance</span> condition identified in Step 3.
              </p>
              <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-bold text-slate-700 hover:bg-gray-50">
                  Override Decision
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0e6f96] rounded text-sm font-bold text-white hover:bg-[#095575] shadow-sm">
                  <CheckCircle2 size={16} /> Ratify & Sign
                </button>
              </div>
            </TimelineNode>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ContextRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-gray-500">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-mono font-bold text-slate-800">{value}</span>
  </div>
);

const TimelineNode = ({ icon, iconBg, badge, badgeColor, title, time, confidence, children, isWarning, isLast }) => {
  return (
    <div className="relative flex gap-6">
      {/* Icon Column */}
      <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>

      {/* Card Content */}
      <div className={`flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${isLast ? 'border-b-4 border-b-[#0e6f96]' : ''}`}>
        
        {/* Card Header */}
        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50 flex flex-wrap justify-between items-center gap-2">
           <div className="flex items-center gap-3">
             <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border ${badgeColor}`}>
               {badge}
             </span>
             <h3 className="font-bold text-slate-800 text-sm md:text-base">{title}</h3>
           </div>
           
           <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
             <span>{time}</span>
             <div className={`flex items-center gap-1 font-bold ${isWarning ? 'text-amber-600' : 'text-green-600'}`}>
               <ShieldCheck size={14} />
               {confidence}%
             </div>
           </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

const CodeBlock = ({ title, children, isOutput }) => (
  <div className={`p-4 rounded-lg border text-xs font-mono leading-relaxed ${isOutput ? 'bg-green-50/30 border-green-100 text-slate-700' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
    <span className={`block text-[10px] font-bold uppercase mb-2 ${isOutput ? 'text-green-700' : 'text-blue-400'}`}>
      {title}
    </span>
    <div className="whitespace-pre-wrap">
      {children}
    </div>
  </div>
);

export default AuditLog;