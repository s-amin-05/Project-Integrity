import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  Search, 
  Calendar, 
  ChevronDown, 
  User, 
  CheckSquare, 
  GitMerge, 
  Ban, 
  MapPin, 
  AlertTriangle, 
  Check, 
  Clock, 
  RefreshCcw, 
  MoreHorizontal,
  Lightbulb,
  Zap,
  Info
} from 'lucide-react';

// Mock Data based on the image content
const initialReports = [
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

const EvidenceReview = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [severityFilter, setSeverityFilter] = useState('All');
    const [reports, setReports] = useState(initialReports);

    const toggleSelection = (id) => {
        setReports(reports.map(report => 
            report.id === id ? { ...report, selected: !report.selected } : report
        ));
    };

    const selectedCount = reports.filter(r => r.selected).length;

    const handleMerge = () => {
        if (selectedCount < 2) return;
        
        const selectedItems = reports.filter(r => r.selected);
        // Keep the first one as primary, remove others
        const primaryReport = selectedItems[0];
        const duplicates = selectedItems.slice(1);
        const duplicateIds = new Set(duplicates.map(r => r.id));

        const updatedReports = reports.filter(r => !duplicateIds.has(r.id)).map(r => {
            if (r.id === primaryReport.id) {
                return {
                    ...r,
                    status: 'MERGED', // Or keep original status? Maybe NEEEDS REVIEW -> MERGED? Let's keep it clear.
                    tags: [...new Set([...r.tags, 'Merged'])],
                    selected: false,
                    desc: `${r.desc} (Merged ${duplicates.length} duplicates: ${duplicates.map(d => d.id).join(', ')})`,
                    aiInsight: { type: 'recurring', text: `Merged ${duplicates.length} reports`, icon: 'git-merge' }
                };
            }
            return r;
        });

        setReports(updatedReports);
    };

    const filteredReports = reports.filter(report => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            report.id.toLowerCase().includes(query) ||
            report.title.toLowerCase().includes(query) ||
            report.desc.toLowerCase().includes(query) ||
            report.type.toLowerCase().includes(query) ||
            report.tags.some(tag => tag.toLowerCase().includes(query));

        if (!matchesSearch) return false;

        if (severityFilter !== 'All' && report.status !== severityFilter) {
            return false;
        }

        return true;
    });

  return (
    <div className="flex-1 bg-gray-50 font-sans text-slate-800 overflow-auto">
      
      {/* MAIN CONTENT */}
      <main className="p-8">
        
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Incoming Evidence Review</h1>
            <p className="text-sm text-gray-500 mt-1">Processing citizen reports from Mobile App v4.2 and Web Portal.</p>
          </div>
          <div className="flex gap-4">
            <StatCard label="NEW REPORTS" value="142" color="border-blue-200 text-blue-600 bg-blue-50" />
            <StatCard label="CRITICAL" value="12" color="border-red-200 text-red-600 bg-red-50" />
            <StatCard label="DUPLICATES" value="8" color="border-yellow-200 text-yellow-600 bg-yellow-50" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 space-y-4">
          
          {/* Top Row: Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Reference ID, Tags..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <Dropdown label="All Wards" />
            <div className="relative">
                <select 
                    className="appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                >
                    <option value="All">Severity: All</option>
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="NEEDS REVIEW">NEEDS REVIEW</option>
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="DUPLICATE?">DUPLICATE?</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
              <Calendar size={20} />
            </button>
          </div>

          {/* Bottom Row: Actions */}
          <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
             <span className={`text-sm font-medium px-2 transition-opacity ${selectedCount > 0 ? 'text-blue-600 opacity-100' : 'opacity-0'}`}>
                {selectedCount} selected
             </span>
             <ActionButton icon={<CheckSquare size={16}/>} label="Assign to Ward" primary disabled={selectedCount === 0} />
             <ActionButton 
                icon={<GitMerge size={16}/>} 
                label="Merge Duplicates" 
                disabled={selectedCount < 2} 
                onClick={handleMerge}
             />
             <button disabled={selectedCount === 0} className="p-2 text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 rounded disabled:opacity-50">
               <Ban size={18} />
             </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredReports.map((report) => (
            <ReportCard 
                key={report.id} 
                report={report} 
                onToggle={() => toggleSelection(report.id)} 
                onVerify={() => navigate(`/audit/${encodeURIComponent(report.id)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

// --- Sub-Components ---

const StatCard = ({ label, value, color }) => (
  <div className={`border px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px] ${color}`}>
    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const Dropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-100">
    {label}
    <ChevronDown size={14} className="text-gray-400" />
  </button>
);

const ActionButton = ({ icon, label, primary, disabled, onClick }) => (
  <button 
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${primary ? 'bg-[#0e6f96] text-white hover:bg-[#095575]' : 'bg-white border border-gray-300 text-slate-700 hover:bg-gray-50'}`}
  >
    {icon}
    {label}
  </button>
);

const ReportCard = ({ report, onToggle, onVerify }) => {
  const isResolved = report.status === 'RESOLVED';
  
  return (
    <div 
        onClick={onToggle}
        className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col h-full transition-all group cursor-pointer ${report.selected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:shadow-md'} ${isResolved ? 'opacity-75' : ''}`}
    >
      
      {/* Header */}
      <div className="p-3 flex items-start justify-between bg-white z-10">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={report.selected} 
            onChange={onToggle}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 pointer-events-none" 
            readOnly 
          />
          <span className="text-xs font-bold text-slate-800">{report.id}</span>
        </div>
        <span className="text-[10px] font-semibold text-gray-400 uppercase">{report.date}</span>
      </div>

      {/* Visuals (Split) */}
      <div className="h-32 flex border-t border-b border-gray-100 relative">
         {/* Left: Evidence Image Placeholder */}
         <div className={`w-1/2 ${report.imageColor} relative overflow-hidden group-hover:opacity-90 transition-opacity`}>
            {/* Using a pattern to simulate image content */}
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">Evidence</div>
         </div>
         
         {/* Right: Map Placeholder */}
         <div className={`w-1/2 ${report.mapColor} relative`}>
            {/* Grid lines to look like map */}
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600">
               <MapPin size={24} fill="currentColor" className="text-white drop-shadow-md" strokeWidth={1.5} />
            </div>
         </div>
         
         {/* Checkmark overlay for selected items */}
         {report.selected && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-0.5 shadow-sm border-2 border-white">
               <Check size={12} strokeWidth={4} />
            </div>
         )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <StatusBadge status={report.status} />
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded border border-gray-200">{report.type}</span>
          {report.tags.map(tag => (
             <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded border border-gray-200">{tag}</span>
          ))}
        </div>

        {/* Text */}
        <h3 className={`text-sm font-bold mb-1 ${isResolved ? 'text-gray-500 line-through' : 'text-slate-800'}`}>{report.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{report.desc}</p>

        {/* Insights / Metadata */}
        <div className="mt-auto space-y-2">
          {report.aiInsight && (
            <InsightRow type={report.aiInsight.type} text={report.aiInsight.text} />
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-gray-100 flex gap-2">
        {isResolved ? (
          <>
            <button className="flex-1 py-1.5 border border-gray-200 rounded text-xs font-bold text-slate-600 hover:bg-gray-50">Re-open</button>
            <button className="flex-1 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-400">Archive</button>
          </>
        ) : (
          <>
             <button className="flex-1 py-1.5 border border-gray-200 rounded text-xs font-bold text-slate-700 hover:bg-gray-50">Details</button>
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onVerify();
                }}
                className="flex-1 py-1.5 bg-[#0e6f96] text-white rounded text-xs font-bold hover:bg-[#095575] shadow-sm"
             >
                Verify
             </button>
          </>
        )}
      </div>

    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'CRITICAL': 'bg-red-50 text-red-600 border-red-100',
    'NEEDS REVIEW': 'bg-yellow-50 text-yellow-600 border-yellow-100',
    'ELECTRICAL': 'bg-blue-50 text-blue-600 border-blue-100',
    'RESOLVED': 'bg-green-50 text-green-600 border-green-100',
    'DUPLICATE?': 'bg-orange-50 text-orange-600 border-orange-100',
  };

  const styleClass = styles[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border ${styleClass}`}>
      {status}
    </span>
  );
};

const InsightRow = ({ type, text }) => {
  let icon = null;
  let colorClass = "text-gray-500";

  switch (type) {
    case 'match':
      icon = <Lightbulb size={12} />;
      colorClass = "text-yellow-600 bg-yellow-50 px-2 py-1 rounded";
      break;
    case 'recurring':
      icon = <RefreshCcw size={12} />;
      colorClass = "text-blue-600 bg-blue-50 px-2 py-1 rounded";
      break;
    case 'sla':
      icon = <Clock size={12} />;
      colorClass = "text-orange-600 font-medium";
      break;
    case 'closed':
      icon = <Check size={12} />;
      colorClass = "text-gr-600";
      break;
    default:
      icon = <Info size={12} />;
  }

  // Special layout for the "Match" and "Recurring" style badges seen in image
  if (type === 'match' || type === 'recurring') {
      return (
        <div className={`flex items-center gap-2 text-[10px] font-medium w-fit ${colorClass}`}>
           {type === 'match' && <span className="font-bold text-yellow-700">AI</span>}
           {icon}
           <span>{text}</span>
        </div>
      );
  }

  return (
    <div className={`flex items-center gap-2 text-[10px] pt-2 border-t border-gray-50 border-dashed ${colorClass}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default EvidenceReview;