import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";

import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Pages. RPS Studio inserts an import and a <Route> here when it generates a component
// (`withShowcaseRoutes`), so this block is the route registry and must stay a literal <Routes>.
import Overview from "./pages/Overview";
import ButtonPage from "./pages/ButtonPage";
import TagsPage from "./pages/TagsPage";
import ModalPage from "./pages/ModalPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * The sidebar discovers pages from the filesystem; routes are declared here. A page can therefore
 * exist for a beat before its route does — if RPS wrote the page but the router edit did not land.
 * Saying so beats a blank pane.
 */
function NoRoute() {
  return (
    <section className="content-section">
      <div className="page-header">
        <h1 className="section-title">No route registered</h1>
        <p className="lead">
          This page file exists but nothing routes to it yet. Add a <code>&lt;Route&gt;</code> for it
          in <code>apps/docs/src/App.jsx</code>.
        </p>
      </div>
      <Link to="/">Back to overview</Link>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Sidebar />
        <div className="content-wrapper">
          <div className="main-layout-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/button" element={<ButtonPage />} />
                <Route path="/tags" element={<TagsPage />} />
                <Route path="/modal" element={<ModalPage />} />
                <Route path="*" element={<NoRoute />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
