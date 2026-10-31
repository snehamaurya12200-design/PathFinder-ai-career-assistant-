type SkillRadarProps = {
  compact?: boolean;
  development?: boolean;
  skills?: Record<string, number>;
};
export function SkillRadar({ compact = false, development = false, skills }: SkillRadarProps) {
  const rings = [1, 0.8, 0.6, 0.4, 0.2];
  const point = (i: number, r: number) =>
    `${160 + Math.sin((i * Math.PI) / 3) * 105 * r},${150 - Math.cos((i * Math.PI) / 3) * 105 * r}`;

  // If dynamic skills provided, pick top 6 skills
  const dynamicKeys = skills ? Object.keys(skills).slice(0, 6) : [];
  const dynamicValues =
    skills && dynamicKeys.length === 6
      ? dynamicKeys.map((k) => Math.max(0.15, Math.min(1, (skills[k] ?? 50) / 100)))
      : null;
  const dynamicLabels =
    skills && dynamicKeys.length === 6
      ? dynamicKeys.map((k) => `${k.slice(0, 3).toUpperCase()} ${skills[k] ?? 0}`)
      : null;

  const values = dynamicValues
    ? dynamicValues
    : development
      ? [0.8, 0.65, 0.6, 0.75, 0.9, 0.65]
      : [0.84, 0.58, 0.37, 0.32, 0.92, 0.74];
  const labels = dynamicLabels
    ? dynamicLabels
    : development
      ? ["1", "2", "3", "4", "5", "6"]
      : ["RES 84", "CON 58", "LEA 37", "PT 32", "VIS 92", "INT 74"];

  return (
    <svg
      viewBox="0 0 320 300"
      className={compact ? "mx-auto w-full max-w-72" : "mx-auto w-full max-w-96"}
      role="img"
      aria-label={
        development ? "Current, theoretical and expected skill comparison" : "Skill graph"
      }
    >
      {rings.map((r) => (
        <polygon
          key={r}
          points={Array.from({ length: 6 }, (_, i) => point(i, r)).join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={i}
          x1="160"
          y1="150"
          x2={point(i, 1).split(",")[0]}
          y2={point(i, 1).split(",")[1]}
          stroke="var(--border)"
        />
      ))}
      <polygon
        points={values.map((r, i) => point(i, r)).join(" ")}
        fill={development ? "var(--chart-green)" : "var(--violet)"}
        fillOpacity=".3"
        stroke={development ? "var(--chart-green)" : "var(--violet)"}
        strokeWidth="3"
      />
      {development ? (
        <polygon
          points={[0.28, 0.15, 0.35, 0.3, 0.85, 0.2].map((r, i) => point(i, r)).join(" ")}
          fill="var(--chart-cyan)"
          fillOpacity=".35"
          stroke="var(--chart-cyan)"
          strokeWidth="2"
        />
      ) : (
        values.map((r, i) => (
          <circle
            key={i}
            cx={point(i, r).split(",")[0]}
            cy={point(i, r).split(",")[1]}
            r="5"
            fill="var(--violet)"
            stroke="var(--card)"
            strokeWidth="2"
          />
        ))
      )}
      {labels.map((label, i) => (
        <text
          key={i}
          x={point(i, 1.22).split(",")[0]}
          y={Number(point(i, 1.22).split(",")[1]) + 4}
          textAnchor="middle"
          fill="var(--foreground)"
          fontSize="10"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
