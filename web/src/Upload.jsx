import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Search, 
  Bell, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  MoreHorizontal, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Loader2, 
  ZoomIn, 
  ExternalLink, 
  Sparkles, 
  ChevronDown, 
  Calendar 
} from 'lucide-react';

const UploadComponent = () => { // Renamed for clarity, exported as default
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    invoiceNum: 'INV-2023-0045',
    vendor: 'Apex Construction Ltd.',
    amount: '45,200.00',
    date: '2023-10-24',
    category: 'Infrastructure Maintenance'
  });

  const [files, setFiles] = useState([
   //{ id: 1, name: 'Inv_2023_Roadworks_Q4.pdf', size: '2.4 MB', user: 'J. Doe', status: 'Needs Review', date: 'Oct 24, 2023', type: 'pdf' },
  ]);
  const [selectedFileId, setSelectedFileId] = useState(1);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      user: 'You',
      status: 'Processing',
      date: 'Just now',
      type: file.name.split('.').pop().toLowerCase(),
      progress: 0,
      previewUrl: URL.createObjectURL(file),
      rawFile: file
    }));

    setFiles(prev => [...newFiles, ...prev]);
    simulateUpload(newFiles);
  };

  const simulateUpload = (newFiles) => {
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress } : f));
        
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'Needs Review', progress: undefined } : f));
        }
      }, 500);
    });
  };

  const selectedFile = files.find(f => f.id === selectedFileId) || files[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple 
        onChange={handleFileSelect} 
      />

     

      {/* Main Content Grid */}
      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-12 gap-6">
        
        {/* Left Column: Data Management */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          
          {/* Header & Upload Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
            <p className="text-gray-500 mt-1">Upload municipal contracts and invoices for AI verification.</p>
          </div>

          <div 
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-blue-200 rounded-xl bg-white p-12 flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Click or drag files to upload</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">Supported formats: PDF, JPG, PNG (Max 25MB).<br/>AI will automatically extract dates, vendor names, and totals.</p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm">
              Select Files
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">Recent Activity</h3>
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{files.filter(f => f.status === 'Needs Review').length} pending</span>
              </div>
              <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                View All <span className="text-lg">→</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Header Row */}
              <div className="grid grid-cols-12 px-6 py-3 border-l-4 border-transparent text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Document Name</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {files.map(file => (
                <div 
                  key={file.id} 
                  onClick={() => setSelectedFileId(file.id)}
                  className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 cursor-pointer ${selectedFileId === file.id ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`p-2 rounded ${file.status === 'Failed' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      <FileText size={20} />
                    </div>
                    <div className="w-full pr-4">
                      <div className="font-medium text-gray-900 truncate">{file.name}</div>
                      
                      {file.status === 'Processing' ? (
                         <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${file.progress}%` }}></div>
                         </div>
                      ) : (
                         <div className="text-xs text-gray-500">{file.size} • {file.user}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    {file.status === 'Processing' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                            <Loader2 size={12} className="animate-spin" /> Processing
                        </span>
                    )}
                    {file.status === 'Needs Review' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                             <AlertTriangle size={12} /> Needs Review
                        </span>
                    )}
                    {file.status === 'Success' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle size={12} /> Success
                        </span>
                    )}
                    {file.status === 'Failed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                             <XCircle size={12} /> Failed
                        </span>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">{file.date}</div>
                  <div className="col-span-2 text-right">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent double trigger if parent has one
                            setSelectedFileId(file.id);
                        }}
                        className="text-blue-700 font-medium text-sm hover:underline"
                    >
                        {file.status === 'Needs Review' ? 'Review' : 'View'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Verification Panel */}
        <div className="col-span-12 lg:col-span-5">
          {selectedFile ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col sticky top-24">
            
            {/* Panel Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Verification</div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900 truncate w-48" title={selectedFile.name}>{selectedFile.name}</h2>
                  {selectedFile.status === 'Needs Review' && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-medium border border-yellow-200">Low Confidence</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 text-gray-400">
                <button className="p-1 hover:text-gray-600 hover:bg-gray-100 rounded"><ZoomIn size={18} /></button>
                <button className="p-1 hover:text-gray-600 hover:bg-gray-100 rounded"><ExternalLink size={18} /></button>
              </div>
            </div>

            {/* Document Preview */}
            <div className="bg-gray-100 flex justify-center items-center border-b border-gray-200 h-[500px] overflow-hidden relative group">
              {selectedFile.previewUrl ? (
                selectedFile.type === 'pdf' ? (
                   <iframe src={selectedFile.previewUrl} className="w-full h-full border-none" title="PDF Preview"></iframe>
                ) : (
                   <img src={selectedFile.previewUrl} className="max-w-full max-h-full object-contain" alt="Preview"/>
                )
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-gray-400">
                    <div className="bg-white shadow-md w-48 h-64 transform rotate-1 transition-transform group-hover:rotate-0 duration-300 relative">
                        {/* Mock lines simulating a document */}
                        <div className="p-4 space-y-2">
                            <div className="w-16 h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                            <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                            
                            {/* The highlighted total section */}
                            <div className="mt-8 pt-4 border-t border-gray-200">
                            <div className="flex justify-end">
                                <div className="w-16 h-6 border-2 border-orange-400 bg-orange-50/30 rounded"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm font-medium">No preview available for this file</p>
                </div>
              )}
            </div>

            {/* Extracted Data Form */}
            <div className="p-6 flex-1 flex flex-col" key={selectedFile.id}>
              
              {/* Action Buttons */}
              <div className="mt-auto flex gap-3">
                <button 
                  onClick={async () => {
                    let documentData = null;
                    if (selectedFile && selectedFile.rawFile) {
                        try {
                            documentData = await new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onloadend = () => resolve(reader.result);
                                reader.readAsDataURL(selectedFile.rawFile);
                            });
                        } catch (err) {
                            console.error("Error converting file to Base64:", err);
                        }
                    }

                    const newProject = {
                        id: formData.invoiceNum,
                        type: formData.category,
                        budget: `$${formData.amount}`,
                        contractor: formData.vendor,
                        status: 'Pending Audit',
                        risk: Math.floor(Math.random() * 100),
                        overBudget: false,
                        date: formData.date,
                        documentName: selectedFile?.name,
                        documentData: documentData,
                        documentType: selectedFile?.type
                    };
                    const existing = JSON.parse(localStorage.getItem('newProjects') || '[]');
                    try {
                        localStorage.setItem('newProjects', JSON.stringify([newProject, ...existing]));
                        navigate('/projects');
                    } catch (e) {
                        alert("File too large for local storage demo. Please verify metadata only.");
                        // Fallback: save without documentData
                        const fallbackProject = { ...newProject, documentData: null };
                        localStorage.setItem('newProjects', JSON.stringify([fallbackProject, ...existing]));
                        navigate('/projects');
                    }
                  }}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <div className="bg-blue-600 p-0.5 rounded-full border border-blue-400">
                    <CheckCircle size={12} fill="white" className="text-blue-600" /> 
                  </div>
                  Confirm & Save
                </button>
                <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Reject
                </button>
              </div>

            </div>
          </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
               <FileText size={48} className="mb-4 text-gray-200" />
               <p>Select a file to view verification details</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default UploadComponent;