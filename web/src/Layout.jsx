import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">Integrity</div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li><Link to="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link></li>
            <li><Link to="/about" className="block p-2 hover:bg-gray-700 rounded">About</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="flex flex-col w-full h-full overflow-hidden">
        <header className="flex-shrink-0 h-16 bg-white border-b flex items-center px-6">
          <div className="text-gray-600 font-medium">Search Bar Placeholder</div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
