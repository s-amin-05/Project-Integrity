import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import About from './About.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<div className="p-4 text-red-500 font-bold">404: Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;