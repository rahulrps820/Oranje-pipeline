import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * The component index.
 *
 * DISCOVERED, NOT LISTED. The obvious version of this file is a hand-written array of
 * `{ path, label }`, which is what the BGIL-LIBRARY docs app this is modelled on does. That array
 * is a second registry: RPS Studio adds a component, a page and a route, and the sidebar silently
 * stays one entry short until a human remembers. For a repository whose whole purpose is to
 * demonstrate components arriving through pull requests, a nav that does not notice them is the
 * one bug worth designing out.
 *
 * So the list is derived from the page files themselves. `import.meta.glob` is resolved by Vite at
 * build time, so this costs nothing at runtime and cannot drift: a page file exists or it does not.
 * `.tsx` is globbed alongside `.jsx` because `showcasePageFor` writes TypeScript pages.
 */
const PAGE_MODULES = import.meta.glob("../pages/*Page.{jsx,tsx}", { eager: true });

/**
 * Which components arrived through RPS rather than being written by hand.
 *
 * Read from the DIRECTORY, not from a list: `rps-agent.md` names `src/components/figma` as the
 * generation target, so everything there came from a pull request by construction. `Button.tsx`
 * sits a level up and predates the pipeline. Nothing to maintain — move a file and the badge moves.
 */
// `eager` only to keep Vite from warning that these are both statically imported (via the
// package barrel) and dynamically imported here. Nothing is added to the bundle: the modules
// are already in it, and only the KEYS are read.
const GENERATED_MODULES = import.meta.glob("../../../../src/components/figma/*.{ts,tsx}", {
  eager: true,
});

const generatedNames = new Set(
  Object.keys(GENERATED_MODULES).map((path) => path.split("/").pop().replace(/\.tsx?$/, "")),
);

/** `ButtonPage.jsx` -> `Button`. The filename convention `showcasePageFor` writes. */
function componentNameOf(modulePath) {
  return modulePath.split("/").pop().replace(/Page\.[jt]sx$/, "");
}

/** `StarFour` -> `star-four` — must match `routeSlugFor`, or the link and the route disagree. */
function routeSlugFor(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
}

/** `StarFour` -> `Star Four`, so the nav reads as prose rather than as identifiers. */
function labelFor(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export const components = Object.keys(PAGE_MODULES)
  .map(componentNameOf)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({
    name,
    label: labelFor(name),
    path: `/${routeSlugFor(name)}`,
    generated: generatedNames.has(name),
  }));

function Sidebar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <>
      <button
        className="mobile-nav-toggle"
        onClick={() => setIsMobileNavOpen((open) => !open)}
        aria-label="Open navigation"
      >
        ☰
      </button>

      <nav className={`sidebar ${isMobileNavOpen ? "mobile-open" : ""}`} aria-label="Components">
        <div className="sidebar-header">
          <h2>
            <Link to="/" onClick={closeMobileNav}>
              Oranje Design System
            </Link>
          </h2>
          <p className="sidebar-subtitle">Maintained with RPS Studio</p>
          <button className="mobile-nav-close" onClick={closeMobileNav} aria-label="Close navigation">
            ✕
          </button>
        </div>

        <ul>
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""} onClick={closeMobileNav}>
              Overview
            </Link>
          </li>

          <li className="sidebar-section-item">
            <div className="sidebar-section">
              <span>Components</span>
              <span className="sidebar-section-count">{components.length}</span>
            </div>
          </li>

          {components.map((component) => (
            <li key={component.path} className="sidebar-nested-item">
              <Link
                to={component.path}
                className={isActive(component.path) ? "active" : ""}
                onClick={closeMobileNav}
              >
                {component.label}
                {component.generated && (
                  <span className="sidebar-generated-flag" title="Added by an RPS Studio pull request">
                    RPS
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
