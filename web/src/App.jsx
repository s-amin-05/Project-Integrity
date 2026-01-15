import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Dashboard from './Home.jsx';
import About from './About.jsx';
import ProjectRegistry from './ProjectRegistry.jsx';
import EvidenceReview from './EvidenceReview.jsx';
import Audit from './Audit.jsx';
import Upload from './Upload.jsx';
import ProjectView from './Projectview.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectRegistry />} />
        <Route path="projects/:id" element={<ProjectView />} />
        <Route path="create" element={<Upload />} />
        <Route path="evidence-review" element={<EvidenceReview />} />
        <Route path="audit" element={<Audit />} />
        <Route path="audit/:reportId" element={<Audit />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<div className="p-4 text-red-500 font-bold">404: Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;