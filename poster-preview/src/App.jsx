import React, { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import nhsLogoImg from "./assets/nhs.jpeg";
import {
  Area,
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

const authors = [
  "Dr Clive Martin Rodrigues, IMT trainee, King’s College Hospital",
  "Dr Anandita Pattnaik, Policy Officer, Asthma & Lung UK",
  "Dr Shireen Kassam, Consultant Haematologist, King’s College Hospital",
];

// Optional: NHS logo URL (or upload a file)
export default function App() {
  const [isPrintMode, setIsPrintMode] = useState(false);
  const posterRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("print");
    const triggerResize = () =>
      window.requestAnimationFrame(() =>
        window.dispatchEvent(new Event("resize"))
      );
    const enterPrint = () => {
      setIsPrintMode(true);
      triggerResize();
    };
    const exitPrint = () => {
      setIsPrintMode(false);
      triggerResize();
    };
    const handleMediaChange = (event) =>
      event.matches ? enterPrint() : exitPrint();

    window.addEventListener("beforeprint", enterPrint);
    window.addEventListener("afterprint", exitPrint);

    if (mediaQuery) {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleMediaChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleMediaChange);
      }
    }

    return () => {
      window.removeEventListener("beforeprint", enterPrint);
      window.removeEventListener("afterprint", exitPrint);

      if (mediaQuery) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleMediaChange);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleMediaChange);
        }
      }
    };
  }, []);

  const onExportImage = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "poster.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export poster image", err);
    }
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
          --print-scale:1;
        }
        *{box-sizing:border-box}
        body{margin:0; background:var(--page); font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif; color:var(--ink)}

        .page{
          display:flex;
          justify-content:center;
          padding:20px 0;
        }

        /* A3 landscape inner canvas with safe printable area */
        .a3{
          width: 1984px;                 /* design width (landscape) */
          height: 1400px;                /* design height (landscape) */
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
        .title{
          margin:0;
          font-size:36px;
          line-height:1.1;
          color:var(--ink);
        }
        .authors{
          margin:10px 0 2px 0;
          font-size:18px;
          color:#1f2937;
          font-weight:600;
          white-space:normal;
          line-height:1.35;
        }

        .nhsBox{ display:flex; flex-direction:column; align-items:flex-end; gap:8px; }
        .nhsLogo{
          width:130px; height:50px; background:#fff; border-radius:8px; display:grid; place-items:center;
          border:1px solid var(--line); font-weight:800; color:#005EB8; letter-spacing:.6px; padding:4px;
        }

        .content{
          flex:1;
          padding: 12px 32px;
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-areas:
            "intro intro intro"
            "aimethod resdisc menurecs"
            "aimethod resdisc references";
          grid-auto-rows:min-content;
          gap:12px;
        }

        .intro{
          grid-area:intro;
          gap:8px;
          
        }
        
        .aimethod{
          grid-area:aimethod;
          display:flex;
          flex-direction:column;
          gap:16px;
          align-self:start;
        }
        .aimethod .panel{
          margin:0;
        }
        .aim{
          gap:8px;
        }
        .method{
          gap:8px;
        }

        .resdisc{
          grid-area:resdisc;
          display:flex;
          flex-direction:column;
          gap:16px;
          align-self:start;
        }
        .resdisc .panel{
          margin:0;
        }
        .results{
          gap:8px;
          align-self:start;
        }
          
        .discussion{
          gap:8px;
          align-self:start;
          
        }

        .limitations{
          gap:8px;
          align-self:start;
        }

        .menurecs{
          grid-area:menurecs;
          display:flex;
          flex-direction:column;
          gap:16px;
          align-self:start;
        }

        .menuPanel{
          gap:10px;
             align-self:start;
        }

        .recommendations{
          display:flex;
          flex-direction:column;
          gap:8px;
             align-self:start;
        }
        
        .references{ 
          grid-area:references;
          display:flex;
          flex-direction:column;
          gap:8px;
          align-self:start;
        }

        .panel{
          background:var(--panel);
          border:1px solid var(--line);
          border-radius:14px;
          padding:12px 14px;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        h2{ margin:0 0 8px 0; font-size:21px; color:var(--heading) }
        h3{ margin:8px 0 6px; font-size:14px; color:#1f2937; text-transform:uppercase; letter-spacing:.35px }
        p{ margin:5px 0; font-size:14px }
        ul{ margin:6px 0 0 18px; padding:0 }
        li{ margin:4px 0; font-size:14px }
        .muted{ color:var(--muted) }

        .figure{
          width:100%;
          height: clamp(200px, 16vw, 280px);  /* responsive height */
          background:#fff;
          border:1px solid var(--line);
          border-radius:12px;
          padding:8px;
          margin-bottom:4px;
        }

        .menuImg{
          width:100%;
          max-width:900px;
          height:auto;
          border-radius:12px;
          border:1px solid var(--line);
          background:#fff;
          box-shadow:0 10px 28px rgba(0,0,0,.08);
        }

        .footer{
          padding:10px 36px 14px; border-top:1px solid var(--line);
          display:flex; justify-content:flex-end; align-items:center; gap:10px; background:#fff;
        }
        .btn{ background:var(--heading); color:#fff; border:none; padding:10px 14px; border-radius:10px; font-weight:600; cursor:pointer; }
        .btn.secondary{ background:var(--accent); }
        .btn:active{ transform:translateY(1px) }

        .refnote sup{ font-weight:700 }
        .refs{ font-size:14px; line-height:1.4; margin:0; padding-left:20px; }
        .refs li{ margin:4px 0 }

        /* PRINT RULES */
        @media print{
          :root{ --print-scale:0.8; }
          @page{ size: A3 landscape; margin: 8mm; }
          body{
            background:#fff;
            margin:0;
            display:flex;
            justify-content:center;
          }
          .page{
            width: calc(420mm - 16mm);
            height: calc(297mm - 16mm);
            margin:0;
            padding:0;
            display:flex;
            justify-content:center;
            align-items:flex-start;
          }
          .a3{
            width:1984px;
            height:1400px;
            margin:0;
            border:none;
            box-shadow:none;
            overflow:visible;
            transform-origin: top left;
            zoom: var(--print-scale);
          }
          .figure{
            height:55mm;
          }
          .btn{ display:none !important }
          .panel{ break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      <div className="page">
        <div className="a3" ref={posterRef}>
          {/* HEADER */}
          <div className="header">
            <div>
              <h1 className="title">
                Improving Plant-Based Meal Uptake in Hospital Inpatients: A Quality
                Improvement Project at King’s College Hospital
              </h1>
              <div className="authors">
                {authors.map((author) => (
                  <div key={author}>{author}</div>
                ))}
              </div>
            </div>
            <div className="nhsBox">
              <img src={nhsLogoImg} alt="NHS" className="nhsLogo" style={{objectFit:"contain"}} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">
            {/* INTRODUCTION */}
            <div className="panel intro">
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

            {/* AIM + METHODOLOGY STACK */}
            <div className="aimethod">
              <div className="panel aim">
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

              <div className="panel method">
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

              <div className="panel limitations">
                <h2>Limitations</h2>
                <ul>
                  <li>Short QIP duration; limited time for behaviour change to consolidate.</li>
                  <li>Institutional change needs decision-maker support and frontline engagement; staff may need training and consistent messaging.</li>
                  <li>Possible differences in meal availability/quality not assessed; negative experiences may deter selection.</li>
                </ul>
              </div>
            </div>

            {/* RESULTS + DISCUSSION STACK */}
            <div className="resdisc">
              <div className="panel results">
                <h2>Key Results</h2>
                <div className="figure">
                  <ResponsiveContainer
                    key={isPrintMode ? "print" : "screen"}
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={data}
                      margin={{ top: 28, right: 28, left: 56, bottom: 40 }}
                    >
                      <defs>
                        <linearGradient id="uptakeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        stroke="var(--line)"
                        strokeDasharray="3 6"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="cycle"
                        axisLine={{ stroke: "var(--line)" }}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "var(--muted)", fontWeight: 500 }}
                        dy={10}
                      />
                      <YAxis
                        domain={[18, 32]}
                        padding={{ top: 2, bottom: 2 }}
                        axisLine={{ stroke: "var(--line)" }}
                        tickLine={false}
                        tickMargin={14}
                        tick={{ fontSize: 12, fill: "var(--muted)", fontWeight: 500 }}
                        label={{
                          value: "Plant-based meal uptake (%)",
                          angle: -90,
                          position: "insideLeft",
                          offset: 14,
                          dx: -32,
                          style: {
                            fill: "var(--muted)",
                            fontSize: 12,
                            fontWeight: 600,
                            textAnchor: "middle",
                          },
                        }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Uptake"]}
                        labelFormatter={(label) => `Cycle: ${label}`}
                        contentStyle={{
                          borderRadius: "10px",
                          borderColor: "var(--line)",
                          boxShadow: "0 6px 18px rgba(11,16,32,0.08)",
                          fontSize: "13px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="none"
                        fill="url(#uptakeGradient)"
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--accent)"
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#fff", stroke: "var(--accent)", strokeWidth: 2 }}
                        activeDot={{ r: 8, stroke: "var(--accent)", strokeWidth: 2 }}
                      >
                        <LabelList
                          dataKey="value"
                          position="top"
                          dy={-12}
                          formatter={(v) => `${v}%`}
                          style={{ fill: "var(--muted)", fontWeight: 500, fontSize: 11 }}
                        />
                      </Line>
                      {data.map((d, i) => (
                        <ReferenceDot
                          key={i}
                          x={d.cycle}
                          y={d.value}
                          r={6}
                          isFront
                          fill="#fff"
                          stroke="var(--accent)"
                          strokeWidth={2}
                        />
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

              <div className="panel discussion">
                <h2>Discussion</h2>
                <ul>
                  <li>Menu re-ordering + short IEC had <em>very minimal</em> impact in isolation; likely within normal variation.</li>
                  <li>Patient turnover and case mix varied — part of the difference may reflect chance rather than true effects.</li>
                  <li>For nudges to work, patients must actually see and consider the menu; visibility and point-of-order workflow are critical.</li>
                  <li>Education raised awareness but did not reliably change choices without human facilitation at ordering.</li>
                  <li><strong>Main learning:</strong> Passive interventions alone are unlikely to produce meaningful change.</li>
                </ul>
              </div>
            </div>

            {/* REFERENCES */}
            <div className="panel references">
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

            {/* MENU + RECOMMENDATIONS STACK */}
            <div className="menurecs">
              <div className="panel menuPanel">
                <h2>Menu Snapshot</h2>
                <img src="/menu-1.png" alt="Sample menu used during the project" className="menuImg" />
                <p className="muted">
                  Extract from the redesigned menu highlighting plant-forward meal placement used in PDSA Cycle 1.
                </p>
              </div>

              <div className="panel recommendations">
                <h2>Recommendations / Next Steps</h2>
                <ul>
                  <li><strong>Train ordering staff</strong> to offer plant-based with positive framing; script &amp; coach prompts.</li>
                  <li>Add <strong>low-carbon icons</strong> / clear labels; improve taste/appeal of veg dishes; consider small “default-veg” pilots.</li>
                  <li>Run longer PDSA cycles; monitor fidelity (menu visibility, staff prompts) and case mix.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="footer">
            <button className="btn secondary" onClick={onExportImage}>Download PNG</button>
            <button className="btn" onClick={() => window.print()}>Print / Save as PDF</button>
          </div>
        </div>
      </div>
    </>
  );
}
