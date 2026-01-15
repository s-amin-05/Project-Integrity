import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  CheckCircle, 
  X,
  Search,
  User,
  ShieldAlert
} from 'lucide-react';

// Mock Data matching ProjectRegistry
const initialProjects = [
  { id: 'PRJ-24-892', type: 'Road Maintenance', budget: '$450,000.00', contractor: 'Apex Civil Eng.', status: 'In Progress', risk: 88, overBudget: true },
  { id: 'PRJ-24-893', type: 'Water Supply', budget: '$120,000.00', contractor: 'City Works Dept.', status: 'Completed', risk: 12, overBudget: false },
  { id: 'PRJ-24-894', type: 'Sanitation', budget: '$85,000.00', contractor: 'CleanTech Solutions', status: 'Pending Audit', risk: 45, overBudget: false },
  { id: 'PRJ-24-895', type: 'Road Maintenance', budget: '$1,200,000.00', contractor: 'MegaConstruct Inc.', status: 'In Progress', risk: 92, overBudget: true },
  { id: 'PRJ-24-896', type: 'Parks', budget: '$30,000.00', contractor: 'GreenSpaces Co.', status: 'Completed', risk: 5, overBudget: false },
  { id: 'PRJ-24-897', type: 'Lighting', budget: '$55,000.00', contractor: 'PowerGrid Ltd.', status: 'Delayed', risk: 60, overBudget: false },
  { id: 'PRJ-24-898', type: 'Civic Center', budget: '$3,450,000.00', contractor: 'Urban Builders Group', status: 'Action Required', risk: 99, overBudget: true },
];

const MuniAuditProjectView = () => {
  const { id } = useParams();
  
  const project = useMemo(() => {
    try {
        const localData = localStorage.getItem('newProjects');
        const newProjects = localData ? JSON.parse(localData) : [];
        const allProjects = [...newProjects, ...initialProjects];
        return allProjects.find(p => p.id && String(p.id) === String(id));
    } catch (error) {
        console.error("Error loading project data:", error);
        return initialProjects.find(p => String(p.id) === String(id));
    }
  }, [id]);

  if (!project) {
    return (
        <div className="flex items-center justify-center min-h-screen text-gray-500 flex-col gap-2">
            <h2 className="text-xl font-bold">Project Not Found</h2>
            <p>Could not find project with ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span></p>
            <Link to="/projects" className="text-blue-600 hover:underline mt-4">Return to Registry</Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center text-sm text-gray-500">
            <Link to="/projects" className="hover:text-blue-600 flex items-center gap-1">
                <ChevronLeft size={16} /> Back to Registry
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-300" />
            <span className="font-medium text-gray-900">{project.type}</span>
        </div>
      </nav>

      {/* Main Content Grid */}
      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Project Details & Document Viewer (Allocated ~65% width) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Project Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.type} Project</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <span className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">#</span>
                Project ID: {project.id}
              </div>
            </div>
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">
              {project.status}
            </span>
          </div>

          {/* Metadata Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Official Metadata</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Contractor</label>
                <div className="font-semibold text-gray-900">{project.contractor}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Date</label>
                <div className="font-semibold text-gray-900">{project.date || 'Jan 15, 2024'}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Location</label>
                <div className="font-semibold text-gray-900">North District, Zone 4</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Contract Type</label>
                <div className="font-semibold text-gray-900">Fixed Price</div>
              </div>
            </div>
          </div>

          {/* Financial Progress Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Financial Progress</h3>
              <span className="text-xs font-bold text-blue-600">26% Utilized</span>
            </div>
            
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>$120,000</span>
              <span className="text-gray-400">{project.budget}</span>
            </div>

            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-blue-600 w-[26%] rounded-full"></div>
            </div>

            <div className="flex gap-8 text-sm">
              <div>
                <span className="text-xs text-gray-500 block">INVOICED</span>
                <span className="font-bold text-gray-900">$120,000</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">PAID</span>
                <span className="font-bold text-gray-900">$85,000</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">OUTSTANDING</span>
                <span className="font-bold text-gray-900">$35,000</span>
              </div>
            </div>
          </div>

          {/* Document Viewer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
            {/* Viewer Toolbar */}
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <FileText size={16} />
                {project.id}_invoice.pdf
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <ZoomOut size={16} className="cursor-pointer hover:text-gray-900" />
                <span className="text-xs font-medium">100%</span>
                <ZoomIn size={16} className="cursor-pointer hover:text-gray-900" />
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <Download size={16} className="cursor-pointer hover:text-gray-900" />
              </div>
            </div>

            {/* Document Content (Dynamic or Mock) */}
            <div className="flex-1 bg-gray-200 overflow-hidden flex justify-center h-full">
              {project.documentData ? (
                  project.documentType === 'pdf' ? (
                     <iframe src={project.documentData} className="w-full h-full border-none" title="PDF Verified"></iframe>
                  ) : (
                     <img src={project.documentData} className="max-w-full max-h-full object-contain p-4" alt="Verified Doc"/>
                  )
              ) : (
              <div className="bg-white shadow-lg w-full max-w-2xl min-h-[700px] p-10 text-sm relative overflow-y-auto mt-8 mb-8">
                
                {/* Invoice Mock Layout */}
                <div className="flex justify-between mb-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold text-gray-800 uppercase">Invoice</h2>
                    <div className="text-gray-500 mt-1">#{project.id}</div>
                    <div className="text-gray-500">{project.date || 'Jan 15, 2024'}</div>
                  </div>
                </div>

                <div className="mb-12">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Bill To:</h4>
                  <div className="font-bold text-gray-900">MuniAudit Treasury</div>
                  <div className="text-gray-600">Infrastructure Maintenance Div.</div>
                </div>

                {/* Invoice Table */}
                <div className="w-full">
                  <div className="flex border-b-2 border-gray-100 pb-2 mb-4 font-bold text-gray-500 text-xs uppercase">
                    <div className="flex-1">Description</div>
                    <div className="w-24 text-right">Amount</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start pb-4 border-b border-gray-50">
                      <div>
                        <div className="font-medium text-gray-900">{project.type} - Primary Services</div>
                        <div className="text-xs text-gray-400">Contracted Services</div>
                      </div>
                      <div className="font-medium text-gray-900">{project.budget}</div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex justify-center items-center gap-4 bg-white">
               <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={16} /></button>
               <span className="text-xs font-medium text-gray-600">Page 1 of 4</span>
               <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Analysis & Verdict (Allocated ~35% width) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          
          {/* AI Alert Header */}
          {project.overBudget ? (
            <>
              <div className="bg-red-600 text-white rounded-lg shadow-md p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <ShieldAlert size={120} />
                 </div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-red-100 text-xs font-bold uppercase tracking-wider">
                        <AlertTriangle size={14} /> AI Verdict Agent
                    </div>
                    <h2 className="text-xl font-bold mb-2">High Discrepancy Detected</h2>
                    <p className="text-red-100 text-sm leading-relaxed opacity-90">
                        Material specification mismatch found between invoice and master contract. Immediate review recommended.
                    </p>
                 </div>
              </div>

              {/* Audit Analysis Section (Problematic) */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-900 rounded-sm flex items-center justify-center text-white text-[10px]">AI</div>
                    Audit Analysis
                </h3>

                {/* Card 1: Critical */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">Material Grade Mismatch</h4>
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200">CRITICAL</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside marker:text-gray-300">
                        <li>Invoice explicitly lists <span className="font-bold text-gray-800">"Grade A Material"</span>.</li>
                        <li>Master Contract specifies usage of <span className="font-bold text-gray-800">"Grade B Material"</span>.</li>
                        <li>Cost variance detected: Grade A is approx. 20% more expensive.</li>
                    </ul>
                </div>

                {/* Card 2: Warning */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-400">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">Unapproved Cost Variance</h4>
                        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-200">WARNING</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Total line item cost is higher than projected estimate for this milestone. No change order found.
                    </p>
                </div>
              </div>
            </>
          ) : (
            <>
               <div className="bg-green-600 text-white rounded-lg shadow-md p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <CheckCircle size={120} />
                 </div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-green-100 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle size={14} /> AI Verdict Agent
                    </div>
                    <h2 className="text-xl font-bold mb-2">Verification Passed</h2>
                    <p className="text-green-100 text-sm leading-relaxed opacity-90">
                        All invoice items align with master contract specifications and budget allocations.
                    </p>
                 </div>
              </div>

               {/* Audit Analysis Section (Clean) */}
               <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-900 rounded-sm flex items-center justify-center text-white text-[10px]">AI</div>
                        Audit Analysis
                    </h3>
                    <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900 text-sm">Contract Compliance</h4>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-200">PASSED</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Unit rates, material specifications, and labor hours match the Master Service Agreement (MSA-2023-89).
                        </p>
                    </div>
               </div>
            </>
          )}

          {/* Evidence Section */}
          <div className="space-y-3 pt-2">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} /> Source Evidence
            </h3>

            {/* Evidence 1 */}
            <div className="bg-white rounded border border-gray-200 p-3 hover:border-blue-300 transition-colors group cursor-pointer">
                <div className="flex justify-between text-[10px] font-bold text-blue-600 uppercase mb-1">
                    <span>Contract PDF • Page 4</span>
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-gray-600 italic font-serif bg-gray-50 p-2 rounded border border-gray-100">
                    "...Contractor shall utilize Grade B Asphalt for all residential resurfacing zones unless explicitly authorized by the City Engineer..."
                </p>
            </div>

            {/* Evidence 2 */}
            <div className="bg-white rounded border border-gray-200 p-3 hover:border-blue-300 transition-colors group cursor-pointer">
                <div className="flex justify-between text-[10px] font-bold text-blue-600 uppercase mb-1">
                    <span>Invoice #4002 • Page 1</span>
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100 font-mono text-xs text-gray-700">
                    Line Item 2: Asphalt - Grade A | Qty: 300 Tons | Rate: $250.00
                </div>
            </div>
          </div>

          
        </div>
      </main>
    </div>
  );
};

export default MuniAuditProjectView;