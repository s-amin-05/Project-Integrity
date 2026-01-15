import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Bell, 
  Download, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  LayoutList, 
  LayoutGrid, 
  ChevronDown, 
  Info, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

// Mock Data matching the image
const initialProjects = [
  { id: 'PRJ-24-892', type: 'Road Maintenance', budget: '$450,000.00', contractor: 'Apex Civil Eng.', status: 'In Progress', risk: 88, overBudget: true },
  { id: 'PRJ-24-893', type: 'Water Supply', budget: '$120,000.00', contractor: 'City Works Dept.', status: 'Completed', risk: 12, overBudget: false },
  { id: 'PRJ-24-894', type: 'Sanitation', budget: '$85,000.00', contractor: 'CleanTech Solutions', status: 'Pending Audit', risk: 45, overBudget: false },
  { id: 'PRJ-24-895', type: 'Road Maintenance', budget: '$1,200,000.00', contractor: 'MegaConstruct Inc.', status: 'In Progress', risk: 92, overBudget: true },
  { id: 'PRJ-24-896', type: 'Parks', budget: '$30,000.00', contractor: 'GreenSpaces Co.', status: 'Completed', risk: 5, overBudget: false },
  { id: 'PRJ-24-897', type: 'Lighting', budget: '$55,000.00', contractor: 'PowerGrid Ltd.', status: 'Delayed', risk: 60, overBudget: false },
  { id: 'PRJ-24-898', type: 'Civic Center', budget: '$3,450,000.00', contractor: 'Urban Builders Group', status: 'Action Required', risk: 99, overBudget: true },
];

const ProjectRegistry = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Projects');

    // Merge static initial data with any new projects from localStorage
    const allProjects = useMemo(() => {
        const localData = localStorage.getItem('newProjects');
        const newProjects = localData ? JSON.parse(localData) : [];
        return [...newProjects, ...initialProjects];
    }, []);

    const filteredProjects = useMemo(() => {
        return allProjects.filter(project => {
            const matchesSearch = 
                project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.type.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;
            
            if (activeFilter === 'High Risk') return project.risk > 80;
            if (activeFilter === 'Over Budget') return project.overBudget;
            if (activeFilter === 'Pending Audit') return project.status === 'Pending Audit';
            
            return true; 
        });
    }, [searchQuery, activeFilter, allProjects]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      

      {/* MAIN CONTENT */}
      <main className="p-8 max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Project Registry</h1>
            <p className="text-sm text-gray-500 max-w-2xl">
              Centralized database for municipal infrastructure projects, active audits, and algorithmic risk assessments.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 shadow-sm transition-colors">
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 px-4 py-2 bg-[#0e6f96] hover:bg-[#095575] rounded-lg text-sm font-medium text-white shadow-sm transition-colors"
            >
              <Plus size={16} />
              New Project
            </button>
          </div>
        </div>

        {/* Filters & Controls Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[650px]">
          
          {/* Top Control Bar */}
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID, Contractor, or Scope..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Filters:</span>
              <div className="flex items-center gap-2">
                <FilterBadge 
                  label="All Projects" 
                  active={activeFilter === 'All Projects'} 
                  onClick={() => setActiveFilter('All Projects')}
                />
                <FilterBadge 
                  label="High Risk" 
                  dotColor="bg-red-500" 
                  active={activeFilter === 'High Risk'}
                  onClick={() => setActiveFilter('High Risk')}
                />
                <FilterBadge 
                  label="Over Budget" 
                  active={activeFilter === 'Over Budget'}
                  onClick={() => setActiveFilter('Over Budget')}
                />
                <FilterBadge 
                  label="Pending Audit" 
                  active={activeFilter === 'Pending Audit'}
                  onClick={() => setActiveFilter('Pending Audit')}
                />
              </div>
              <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
              <div className="flex items-center gap-2 text-gray-400">
                 <button className="p-1 text-blue-600 bg-blue-50 rounded"><LayoutList size={20} /></button>
                 <button className="p-1 hover:text-gray-600"><LayoutGrid size={20} /></button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100"><div className="flex items-center gap-1">Project ID <ArrowUpDown size={12}/></div></th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100"><div className="flex items-center gap-1">Type <ArrowUpDown size={12}/></div></th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100"><div className="flex items-center gap-1">Budget <ArrowUpDown size={12}/></div></th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100"><div className="flex items-center gap-1">Contractor <ArrowUpDown size={12}/></div></th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"><div className="flex items-center gap-1">AI Risk Score <Info size={12} /></div></th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {filteredProjects.map((project, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <td className="px-6 py-4 font-medium text-slate-700">{project.id}</td>
                    <td className="px-6 py-4 text-slate-600">{project.type}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{project.budget}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{project.contractor}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4">
                      <RiskBar score={project.risk} />
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-400 hover:text-gray-600">
                         <MoreHorizontal size={18} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 shrink-0">
             <div>
               Showing <span className="font-bold text-slate-800">{filteredProjects.length > 0 ? 1 : 0}-{filteredProjects.length}</span> of <span className="font-bold text-slate-800">{filteredProjects.length}</span> results
             </div>
             <div className="flex items-center gap-2">
               <button className="px-3 py-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>Previous</button>
               <button className="w-8 h-8 flex items-center justify-center bg-[#0e6f96] text-white rounded font-medium">1</button>
               <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-slate-600">2</button>
               <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-slate-600">3</button>
               <span className="px-1">...</span>
               <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-slate-600">12</button>
               <button className="px-3 py-1 text-slate-600 hover:text-slate-800 font-medium">Next</button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Helper Components

const NavLink = ({ label, active }) => (
  <a href="#" className={`text-sm font-medium py-1 border-b-2 ${active ? 'text-blue-900 border-blue-900' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
    {label}
  </a>
);

const FilterBadge = ({ label, active, dotColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${active ? 'bg-[#0e6f96] text-white border-[#0e6f96]' : 'bg-white text-slate-600 border-gray-300 hover:bg-gray-50'}`}
  >
    {dotColor && <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>}
    {label}
  </button>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";
  
  switch(status) {
    case 'In Progress':
      styles = "bg-blue-100 text-blue-700";
      dotColor = "bg-blue-600";
      break;
    case 'Completed':
      styles = "bg-green-100 text-green-700";
      dotColor = "bg-green-600";
      break;
    case 'Pending Audit':
      styles = "bg-gray-100 text-gray-600";
      dotColor = "bg-gray-500";
      break;
    case 'Delayed':
      styles = "bg-orange-100 text-orange-700";
      dotColor = "bg-orange-500";
      break;
    case 'Action Required':
      styles = "bg-red-100 text-red-700";
      dotColor = "bg-red-600";
      break;
    default:
      styles = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

const RiskBar = ({ score }) => {
  let colorClass = "bg-green-500";
  if (score > 40) colorClass = "bg-yellow-500";
  if (score > 80) colorClass = "bg-red-600";

  // Use width percentage but constrained for the visual style of the bar
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${colorClass}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <span className={`text-xs font-bold ${score > 80 ? 'text-red-600' : (score > 40 ? 'text-yellow-600' : 'text-green-600')}`}>
        {score.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default ProjectRegistry;