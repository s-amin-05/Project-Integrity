import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardCheck, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  Bell, 
  Building2, 
  Users, 
  AlertTriangle, 
  MapPin, 
  FileCheck, 
  Plus, 
  Minus, 
  Layers,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Mock Data
const PROJECTS = [
  { id: 1, name: "Mumbai Metro Line 3", type: "Roads & Transport", status: "Ongoing", risk: "medium", lat: 19.0760, lng: 72.8777, location: "Mumbai" },
  { id: 2, name: "Pune Water Supply Project", type: "Water & Sanitation", status: "Halted", risk: "critical", lat: 18.5204, lng: 73.8567, location: "Pune" },
  { id: 3, name: "Nagpur Smart City Hall", type: "Public Buildings", status: "Completed", risk: "low", lat: 21.1458, lng: 79.0882, location: "Nagpur" },
  { id: 4, name: "Nashik Power Substation", type: "Utilities Grid", status: "Ongoing", risk: "low", lat: 19.9975, lng: 73.7898, location: "Nashik" },
  { id: 5, name: "Aurangabad Public School", type: "Public Buildings", status: "Ongoing", risk: "medium", lat: 19.8762, lng: 75.3433, location: "Aurangabad" },
  { id: 6, name: "Thane Creek Bridge", type: "Roads & Transport", status: "Halted", risk: "critical", lat: 19.2183, lng: 72.9781, location: "Thane" },
  { id: 7, name: "Navi Mumbai Waste Management", type: "Water & Sanitation", status: "Completed", risk: "low", lat: 19.0330, lng: 73.0297, location: "Navi Mumbai" },
  { id: 8, name: "Coastal Road Project", type: "Roads & Transport", status: "Ongoing", risk: "low", lat: 18.9750, lng: 72.8258, location: "Mumbai" },
  { id: 9, name: "Dharavi Redevelopment", type: "Public Buildings", status: "Halted", risk: "critical", lat: 19.0434, lng: 72.8567, location: "Mumbai" },
];

const Dashboard = () => {
  // State for filters (UI State)
  const [infrastructureFilters, setInfrastructureFilters] = useState({
    "Roads & Transport": true,
    "Water & Sanitation": true,
    "Public Buildings": true,
    "Utilities Grid": true
  });
  
  const [statusFilter, setStatusFilter] = useState("Ongoing");
  
  const [riskFilters, setRiskFilters] = useState({
    "critical": true,
    "medium": true,
    "low": true
  });

  const [locationFilter, setLocationFilter] = useState("Mumbai");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  // Applied Filters State (Actual Map Filters)
  const [appliedFilters, setAppliedFilters] = useState({
    infrastructure: {
      "Roads & Transport": true,
      "Water & Sanitation": true,
      "Public Buildings": true,
      "Utilities Grid": true
    },
    status: "Ongoing",
    risk: {
      "critical": true,
      "medium": true,
      "low": true
    },
    location: "Mumbai"
  });

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const typeMatch = appliedFilters.infrastructure[project.type];
      const statusMatch = project.status === appliedFilters.status;
      const riskMatch = appliedFilters.risk[project.risk];
      const locationMatch = appliedFilters.location === "All Locations" || project.location === appliedFilters.location;
      
      return typeMatch && statusMatch && riskMatch && locationMatch;
    });
  }, [appliedFilters]);

  // Derived locations
  const locations = useMemo(() => {
    const locs = [...new Set(PROJECTS.map(p => p.location))];
    return ["All Locations", ...locs];
  }, []);

  // Handlers
  const toggleInfrastructure = (type) => {
    setInfrastructureFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleRisk = (level) => {
    setRiskFilters(prev => ({ ...prev, [level]: !prev[level] }));
  };

  const resetFilters = () => {
    const defaultInfra = {
      "Roads & Transport": true,
      "Water & Sanitation": true,
      "Public Buildings": true,
      "Utilities Grid": true
    };
    const defaultRisk = {
      "critical": true,
      "medium": true,
      "low": true
    };
    
    // Convert UI to Default
    setInfrastructureFilters(defaultInfra);
    setStatusFilter("Ongoing");
    setRiskFilters(defaultRisk);
    setLocationFilter("Mumbai");

    // Apply Immediately on Reset (Optional, but usually expected)
    setAppliedFilters({
      infrastructure: defaultInfra,
      status: "Ongoing",
      risk: defaultRisk,
      location: "Mumbai"
    });
  };

  const handleUpdateView = () => {
    setAppliedFilters({
      infrastructure: infrastructureFilters,
      status: statusFilter,
      risk: riskFilters,
      location: locationFilter
    });
  };

  return (
    <div className="flex h-full w-full">
      {/* CENTER MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LayoutDashboard size={16} />
            <span>/</span>
            <span className="font-medium text-slate-800">Overview Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded text-sm font-medium text-slate-700">
                <Building2 size={16} />
                {locationFilter}
                <ChevronDown size={14} />
              </button>
              
              {isLocationDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocationFilter(loc);
                        setIsLocationDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-slate-700"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-900 text-white rounded text-sm font-medium">
              Q1 2026
              <FileText size={14} />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard 
              title="Total Projects" 
              value="1,248" 
              trend="+12%" 
              trendColor="text-green-500" 
              icon={<Users size={20} className="text-blue-600" />}
              iconBg="bg-blue-50"
              progressColor="bg-blue-600"
            />
            <StatCard 
              title="Active Discrepancies" 
              value="84" 
              badge="Action Required"
              icon={<AlertTriangle size={20} className="text-red-500" />}
              iconBg="bg-red-50"
              progressColor="bg-red-500"
              isCritical
            />
            <StatCard 
              title="High-Risk Zones" 
              value="3" 
              subtext="Wards 4, 9, 12"
              icon={<MapPin size={20} className="text-orange-500" />}
              iconBg="bg-orange-50"
              progressColor="bg-orange-500"
            />
            <StatCard 
              title="Pending Audits" 
              value="156" 
              subtext="On Track"
              subtextClass="text-green-600"
              icon={<FileCheck size={20} className="text-green-600" />}
              iconBg="bg-green-50"
              progressColor="bg-green-500"
            />
          </div>

          {/* Map Area */}
          <div className="bg-gray-200 rounded-lg border border-gray-300 h-[600px] relative overflow-hidden shadow-inner group z-0">
             {/* React Leaflet Map */}
             <MapContainer center={[19.0760, 72.8777]} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredProjects.map(project => (
                  <Marker key={project.id} position={[project.lat, project.lng]}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-slate-800">{project.name}</h3>
                        <p className="text-xs text-gray-500">{project.type}</p>
                        <div className="mt-2 text-xs">
                          <span className={`px-2 py-1 rounded-full text-white font-bold ${
                            project.risk === 'critical' ? 'bg-red-500' : 
                            project.risk === 'medium' ? 'bg-orange-400' : 'bg-green-500'
                          }`}>
                            {project.risk.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
             </MapContainer>

            {/* Float Info - Keeping the original overlay style, maybe dynamic later */}
            <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded shadow-sm flex items-center gap-2 z-[1000]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-slate-700">Live Monitoring</span>
            </div>

          </div>
        </div>
      </main>

      {/* RIGHT FILTER PANEL */}
      <aside className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Filter size={18} />
            Filters & Controls
          </div>
        </div>

        <div className="p-6 flex-1 overflow-auto space-y-8">
          
          {/* Infrastructure Type */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Infrastructure Type</h4>
            <div className="space-y-3">
              <Checkbox 
                label="Roads & Transport" 
                checked={infrastructureFilters["Roads & Transport"]} 
                onChange={() => toggleInfrastructure("Roads & Transport")}
              />
              <Checkbox 
                label="Water & Sanitation" 
                checked={infrastructureFilters["Water & Sanitation"]} 
                onChange={() => toggleInfrastructure("Water & Sanitation")}
              />
              <Checkbox 
                label="Public Buildings" 
                checked={infrastructureFilters["Public Buildings"]} 
                onChange={() => toggleInfrastructure("Public Buildings")}
              />
              <Checkbox 
                label="Utilities Grid" 
                checked={infrastructureFilters["Utilities Grid"]} 
                onChange={() => toggleInfrastructure("Utilities Grid")}
              />
            </div>
          </div>

          {/* Project Status */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Project Status</h4>
            <div className="flex gap-2">
              {["Ongoing", "Halted", "Completed"].map(status => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded shadow-sm transition-colors ${
                    statusFilter === status 
                    ? 'bg-blue-900 text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Level */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Risk Level</h4>
            <div className="space-y-3">
              <div 
                className={`flex items-center justify-between group cursor-pointer ${!riskFilters.critical && 'opacity-50'}`}
                onClick={() => toggleRisk("critical")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-white ${riskFilters.critical ? 'bg-red-500' : 'border border-gray-300'}`}>
                    {riskFilters.critical && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className="text-sm text-slate-700 font-medium">Critical</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>

              <div 
                className={`flex items-center justify-between group cursor-pointer ${!riskFilters.medium && 'opacity-50'}`}
                onClick={() => toggleRisk("medium")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-white ${riskFilters.medium ? 'bg-orange-400' : 'border border-gray-300'}`}>
                    {riskFilters.medium && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className="text-sm text-slate-700 font-medium">Medium / Review</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>

              <div 
                className={`flex items-center justify-between group cursor-pointer ${!riskFilters.low && 'opacity-50'}`}
                onClick={() => toggleRisk("low")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-white ${riskFilters.low ? 'bg-green-500' : 'border border-gray-300'}`}>
                     {riskFilters.low && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className="text-sm text-slate-700 font-medium">Low / Compliant</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-100 flex flex-col gap-3">
          <button 
            onClick={handleUpdateView}
            className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition">
             <Layers size={16} />
             Update View
          </button>
          
          <button 
            onClick={resetFilters}
            className="w-full py-3 bg-white border border-gray-200 text-slate-700 font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
             <RotateCcw size={16} />
             Reset Filters
          </button>
          
          <p className="text-center text-[10px] text-gray-400 mt-2">Last updated: Just now</p>
        </div>
      </aside>
    </div>
  );
};

// Helper Components

const StatCard = ({ title, value, trend, trendColor, badge, subtext, subtextClass, icon, iconBg, progressColor }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
        <div className="flex items-end gap-2">
          <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
          {trend && <span className={`text-xs font-bold mb-1 ${trendColor}`}>{trend}</span>}
        </div>
      </div>
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    
    <div>
      {badge && (
        <span className="inline-block px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 rounded">
          {badge}
        </span>
      )}
      {subtext && (
        <span className={`text-xs font-medium ${subtextClass || 'text-slate-600'}`}>{subtext}</span>
      )}
      <div className={`h-1 rounded-full mt-3 w-16 ${progressColor}`}></div>
    </div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-3 cursor-pointer" onClick={onChange}>
    <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-300'}`}>
      {checked && <Check size={12} strokeWidth={4} />}
    </div>
    <span className="text-sm text-slate-700 font-medium">{label}</span>
  </div>
);

export default Dashboard;