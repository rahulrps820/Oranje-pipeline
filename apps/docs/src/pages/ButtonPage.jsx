import { Button } from "../../../../src/index";

const VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"];
const SIZES = ["sm", "md", "lg"];

export default function ButtonPage() {
  return (
    <section className="content-section">
      <div className="page-header">
        <h1 className="section-title">Button</h1>
        <p className="lead">Triggers an action. The system's only hand-written component.</p>
      </div>

      <section className="section">
        <h2 className="section-subtitle">Variants</h2>
        <div className="demo-box">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-subtitle">Sizes</h2>
        <div className="demo-box">
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              Size {size}
            </Button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-subtitle">States</h2>
        <div className="demo-box">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="danger" loading>
            Deleting…
          </Button>
        </div>
        <p>
          <code>loading</code> also disables the button — one that looks busy but still fires is the
          failure this avoids.
        </p>
      </section>

      <section className="section">
        <h2 className="section-subtitle">Props</h2>
        <table className="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Values</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>variant</code></td>
              <td><code>primary secondary outline ghost danger</code></td>
              <td><code>primary</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>sm md lg</code></td>
              <td><code>md</code></td>
            </tr>
            <tr>
              <td><code>block</code></td>
              <td><code>true false</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td><code>true false</code></td>
              <td><code>false</code></td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
}
