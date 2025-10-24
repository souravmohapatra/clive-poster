import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  LabelList,
} from "recharts";

/** ----- DATA ----- **/
const data = [
  { cycle: "Baseline", value: 23.9 },
  { cycle: "PDSA 1", value: 21.4 },
  { cycle: "PDSA 2", value: 22.6 },
];

// Optional: NHS logo URL (or upload a file)
const NHS_LOGO_URL = ""; // e.g. "https://assets.nhs.uk/images/nhs-logo.png"

export default function App() {
  const [nhsLogo, setNhsLogo] = useState(NHS_LOGO_URL);
  const onPickNhs = (e) => {
    const f = e?.target?.files?.[0];
    if (f) setNhsLogo(URL.createObjectURL(f));
  };

  return (
    <>
      <style>{`
        :root{
          --ink:#0b1020;
          --heading:#0B6B3A;   /* dark green headings */
          --accent:#147D52;    /* green lines */
          --muted:#5b6475;
          --panel:#F7FBF5;     /* light card */
          --page:#ECF8EE;      /* light green page bg */
          --line:#DCE8D6;
          --white:#ffffff;
        }
        *{box-sizing:border-box}
        body{margin:0; background:var(--page); font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif; color:var(--ink)}

        /* A3 portrait inner canvas with safe printable area */
        .a3{
          width: 1400px;                 /* design width */
          height: 1984px;                /* design height */
          margin: 20px auto;
          background: var(--white);
          border:1px solid var(--line);
          box-shadow:0 10px 30px rgba(0,0,0,.06);
          display:flex; flex-direction:column;
          overflow:hidden;
        }

        .header{
          padding: 22px 36px 12px 36px;
          border-bottom:1px solid var(--line);
          display:grid;
          grid-template-columns: 1fr auto; /* reserve space for logo */
          align-items:start;
          gap:16px;
        }
        .title{ margin:0; font-size:40px; line-height:1.15; color:var(--ink) }
        .authors{ margin:10px 0 2px 0; font-size:18px; color:#1f2937; font-weight:600; white-space:pre-line }

        .nhsBox{ display:flex; flex-direction:column; align-items:flex-end; gap:8px; }
        .nhsLogo{
          width:130px; height:50px; background:#fff; border-radius:8px; display:grid; place-items:center;
          border:1px solid var(--line); font-weight:800; color:#005EB8; letter-spacing:.6px; padding:4px;
        }
        .toolbar{ display:flex; gap:8px; align-items:center; }

        .content{
          flex:1;
          padding: 16px 36px;
          display:grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows:min-content;
          gap:14px;
        }

        .panel{
          background:var(--panel);
          border:1px solid var(--line);
          border-radius:14px;
          padding:14px 16px;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        h2{ margin:0 0 8px 0; font-size:22px; color:var(--heading) }
        h3{ margin:10px 0 6px; font-size:15px; color:#1f2937; text-transform:uppercase; letter-spacing:.4px }
        p{ margin:6px 0; font-size:14.5px }
        ul{ margin:6px 0 0 18px; padding:0 }
        li{ margin:5px 0; font-size:14.5px }
        .span-2{ grid-column:1 / span 2 }
        .muted{ color:var(--muted) }

        .figure{
          width:100%;
          height: 250px;                 /* smaller to avoid overlap */
          background:#fff;
          border:1px solid var(--line);
          border-radius:12px;
          padding:8px;
          margin-bottom:6px;
        }

        .footer{
          padding:10px 36px 14px; border-top:1px solid var(--line);
          display:flex; justify-content:flex-end; align-items:center; background:#fff;
        }
        .btn{ background:var(--heading); color:#fff; border:none; padding:10px 14px; border-radius:10px; font-weight:600; cursor:pointer; }
        .btn:active{ transform:translateY(1px) }

        .refnote sup{ font-weight:700 }
        .refs{ font-size:14px; line-height:1.4 }

        /* PRINT RULES */
        @media print{
          @page{ size: A3 portrait; margin: 10mm; }
          body{ background:#fff }
          .a3{ width:auto; height:auto; margin:0; border:none; box-shadow:none; transform-origin: top left; }
          .btn, .toolbar{ display:none !important }
          .panel{ break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      <div className="a3">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1 className="title">
              Improving Plant-Based Meal Uptake in Hospital Inpatients: A Quality
              Improvement Project at King’s College Hospital
            </h1>
            <div className="authors">
{`Dr Clive Martin Rodrigues, IMT trainee, King’s College Hospital
Dr Anandita Pattnaik, Policy Officer, Asthma & Lung UK`}
            </div>
          </div>
          <div className="nhsBox">
            {nhsLogo ? (
              <img src={nhsLogo} alt="NHS" className="nhsLogo" style={{objectFit:"contain"}} />
            ) : (
              <div className="nhsLogo">NHS</div>
            )}
            <div className="toolbar">
              <input type="file" accept="image/*" onChange={onPickNhs} title="Add NHS logo" />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {/* INTRODUCTION */}
          <div className="panel span-2">
            <h2>Introduction</h2>
            <p>
              Hospital food service is a key opportunity to promote both patient health and
              environmental sustainability. Diets rich in plant-based foods are associated with
              lower risks of chronic diseases and can significantly reduce dietary greenhouse
              gas emissions <span className="refnote"><sup>[1]</sup></span>. The EAT-Lancet “Planetary Health Diet”
              recommends doubling consumption of fruits, vegetables, legumes, and nuts, while
              reducing red meat and sugar by over 50%, to improve health outcomes and environmental
              impact <span className="refnote"><sup>[1]</sup></span>. Aligning hospital menus with these guidelines could help achieve
              healthcare sustainability goals. The NHS has committed to a net-zero carbon footprint
              by 2045 <span className="refnote"><sup>[2]</sup></span>, yet a recent analysis of 36 UK hospital menus found limited progress
              toward plant-forward offerings—42% of hospitals surveyed had no fully plant-based main
              entrée option on the dinner menu <span className="refnote"><sup>[3]</sup></span>. There remains untapped potential for hospitals to
              reduce food-related carbon emissions by increasing plant-based meal options <span className="refnote"><sup>[3]</sup></span>.
            </p>
          </div>

          {/* AIM / OBJECTIVE / STANDARD */}
          <div className="panel">
            <h2>Aim, Objective & Standard</h2>
            <h3>Aim</h3>
            <p>
              Improve uptake of plant-based meals by inpatients to support patient choice,
              nutritional diversity, and a lower carbon footprint.
            </p>
            <h3>Objective</h3>
            <p>Increase the percentage of plant-based main meals selected on target wards.</p>
            <h3>Standard / Criteria</h3>
            <p className="refnote">
              Align with EAT-Lancet Planetary Health Diet <sup>[1]</sup>:
              <em> global consumption of fruits, vegetables, nuts, and legumes to double, and
              consumption of foods such as red meat and sugar to be reduced by more than 50%.</em>
            </p>
          </div>

          {/* METHODOLOGY (no dates in PDSA headings) */}
          <div className="panel">
            <h2>Methodology</h2>
            <p>
              QIP at two inpatient wards (Denmark Hill, London), March–May 2024. Baseline: patient
              menu choices (veg vs non-veg mains) in March. Two PDSA cycles followed:
            </p>
            <h3>PDSA 1 — Menu Redesign</h3>
            <ul>
              <li>Vegetarian options listed first (choice architecture; content unchanged).</li>
              <li>No labels added/removed; staff brief on layout (no formal training).</li>
            </ul>
            <h3>PDSA 2 — Information/Education Campaign</h3>
            <ul>
              <li>Leaflet “Plant-Powered Plates” (health & environmental benefits) + gentle prompts.</li>
              <li>Four-week distribution to raise awareness and support menu changes.</li>
            </ul>
          </div>

          {/* KEY RESULTS (smaller line graph) */}
          <div className="panel">
            <h2>Key Results</h2>
            <div className="figure">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 6, right: 18, left: 0, bottom: 6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dfe8d9" />
                  <XAxis dataKey="cycle" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 30]} tick={{ fontSize: 12 }}
                    label={{ value: "Plant-based meal uptake (%)", angle: -90, position: "insideLeft", offset: -4 }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }}>
                    <LabelList dataKey="value" position="top" formatter={(v)=>`${v}%`} />
                  </Line>
                  {data.map((d, i) => (
                    <ReferenceDot key={i} x={d.cycle} y={d.value} r={4} isFront fill="var(--accent)" stroke="white" strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <ul>
              <li><strong>Baseline:</strong> 23.9% plant-based (516/2163).</li>
              <li><strong>PDSA 1:</strong> 21.4% (466/2179) — drop of ~2.5 pp; menu change alone insufficient.</li>
              <li><strong>PDSA 2:</strong> 22.6% (589/2612) — very minimal rise vs Apr; still ~baseline.</li>
              <li><strong>Overall:</strong> No significant net gain by end of Cycle 2 (~22.6% vs 23.9% baseline).</li>
              <li className="muted"><strong>Important:</strong> Differences are very minimal and could plausibly be due to chance and/or month-to-month differences in patient case mix (short duration).</li>
            </ul>
          </div>

          {/* DISCUSSION */}
          <div className="panel">
            <h2>Discussion</h2>
            <ul>
              <li>Menu re-ordering + short IEC had <em>very minimal</em> impact in isolation; likely within normal variation.</li>
              <li>Patient turnover and case mix varied — part of the difference may reflect chance rather than true effects.</li>
              <li>For nudges to work, patients must actually see and consider the menu; visibility and point-of-order workflow are critical.</li>
              <li>Education raised awareness but did not reliably change choices without human facilitation at ordering.</li>
              <li><strong>Main learning:</strong> Passive interventions alone are unlikely to produce meaningful change.</li>
            </ul>
          </div>

          {/* LIMITATIONS (last bullet removed) */}
          <div className="panel">
            <h2>Limitations</h2>
            <ul>
              <li>Short QIP duration; limited time for behaviour change to consolidate.</li>
              <li>Institutional change needs decision-maker support and frontline engagement; staff may need training and consistent messaging.</li>
              <li>Possible differences in meal availability/quality not assessed; negative experiences may deter selection.</li>
            </ul>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="panel">
            <h2>Recommendations / Next Steps</h2>
            <ul>
              <li><strong>Train ordering staff</strong> to offer plant-based first with positive framing; script and coach prompts.</li>
              <li>Add <strong>low-carbon icons</strong> / clear labels; improve taste/appeal of veg dishes; consider small “default-veg” pilots.</li>
              <li>Run longer PDSA cycles; monitor fidelity (menu visibility, staff prompts) and case mix.</li>
            </ul>
          </div>

          {/* REFERENCES */}
          <div className="panel span-2">
            <h2>References</h2>
            <ol className="refs">
              <li>
                EAT-Lancet Commission. <em>Summary Report</em>.<br/>
                <a href="https://eatforum.org/eat-lancet/summary-report/" target="_blank" rel="noreferrer">
                  https://eatforum.org/eat-lancet/summary-report/
                </a>
              </li>
              <li>
                NHS England. <em>Delivering a ‘Net Zero’ National Health Service</em> (Greener NHS).<br/>
                <a href="https://www.england.nhs.uk/greenernhs/" target="_blank" rel="noreferrer">
                  https://www.england.nhs.uk/greenernhs/
                </a>
              </li>
              <li>
                Holmes M, Wellstead A, et&nbsp;al. <em>How Sustainable Are Hospital Menus in the United Kingdom?</em> J Hum Nutr Diet. 2025.<br/>
                <a href="https://onlinelibrary.wiley.com/doi/10.1111/jhn.70019" target="_blank" rel="noreferrer">
                  https://onlinelibrary.wiley.com/doi/10.1111/jhn.70019
                </a>
              </li>
            </ol>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <button className="btn" onClick={() => window.print()}>Print / Save as PDF</button>
        </div>
      </div>
    </>
  );
}
