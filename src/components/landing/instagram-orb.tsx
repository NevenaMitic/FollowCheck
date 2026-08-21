"use client";

import { useEffect, useMemo, useRef } from "react";

type OrbNode = {
  base: {
    x: number;
    y: number;
    z: number;
  };
  kind: "avatar" | "dot";
  size: number;
  color: string;
  username?: string;
};

const COLORS = ["#A855F7", "#EC4899", "#22D3EE"];

const USERNAMES = [
  "@sofia.muse",
  "@mila.rose",
  "@lena.frames",
  "@alex.noir",
  "@nina.lens",
  "@leo.visuals",
];

const NODE_COUNT = 32;
const SPHERE_RADIUS = 170;

function fibonacciSphere(count: number, radius: number) {
  const points: { x: number; y: number; z: number }[] = [];

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }

  return points;
}

function buildNodes(): OrbNode[] {
  const positions = fibonacciSphere(NODE_COUNT, SPHERE_RADIUS);

  let usernameIndex = 0;

  return positions.map((base, i) => {
    const isAvatar = i % 4 === 0;
    const hasUsername = i % 6 === 0;

    const username = hasUsername
      ? USERNAMES[usernameIndex++ % USERNAMES.length]
      : undefined;

    return {
      base,
      kind: isAvatar ? "avatar" : "dot",
      size: isAvatar ? 24 : 7,
      color: COLORS[i % COLORS.length],
      username,
    };
  });
}

function buildEdges(nodes: OrbNode[]) {
  const edges: { a: number; b: number }[] = [];

  nodes.forEach((node, i) => {
    if (node.kind === "avatar") {
      edges.push({
        a: i,
        b: -1,
      });
    }
  });

  for (let i = 0; i < nodes.length; i++) {
    if (i % 5 === 0) {
      edges.push({
        a: i,
        b: (i + 3) % nodes.length,
      });
    }
  }

  return edges;
}

export function InstagramOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  const nodes = useMemo(() => buildNodes(), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  const mouseTarget = useRef({
    x: 0,
    y: 0,
  });

  const rotation = useRef({
    autoYaw: 0,
    yaw: 0,
    pitch: 0,
  });

  useEffect(() => {
    let raf: number;

    const focal = 620;

    function tick(t: number) {
      rotation.current.autoYaw += 0.0016;

      rotation.current.yaw +=
        (mouseTarget.current.x * 0.35 - rotation.current.yaw) * 0.04;

      rotation.current.pitch +=
        (mouseTarget.current.y * 0.3 - rotation.current.pitch) * 0.04;

      const yaw =
        rotation.current.autoYaw + rotation.current.yaw;

      const pitch = rotation.current.pitch;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const projected: {
        x: number;
        y: number;
        scale: number;
        z: number;
      }[] = new Array(nodes.length);

      nodes.forEach((node, i) => {
        const x1 =
          node.base.x * cosY -
          node.base.z * sinY;

        const z1 =
          node.base.x * sinY +
          node.base.z * cosY;

        const y1 =
          node.base.y * cosX -
          z1 * sinX;

        const z2 =
          node.base.y * sinX +
          z1 * cosX;

        const scale =
          focal / (focal + z2);

        const sx = x1 * scale;
        const sy = y1 * scale;

        projected[i] = {
          x: sx,
          y: sy,
          scale,
          z: z2,
        };

        const el = nodeRefs.current[i];

        if (el) {
          const size = node.size * scale;

          el.style.transform =
            `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`;

          el.style.width = `${size}px`;
          el.style.height = `${size}px`;

          el.style.opacity = String(
            Math.min(
              1,
              Math.max(0.12, scale - 0.3)
            )
          );

          el.style.zIndex =
            String(Math.round(1000 + z2));
        }

        const label = labelRefs.current[i];

        if (label) {
          label.style.transform =
            `translate3d(${sx}px, ${
              sy - node.size * scale - 14
            }px, 0) translate(-50%, -100%)`;
        }
      });

      edges.forEach((edge, idx) => {
        const line = lineRefs.current[idx];

        if (!line) return;

        const p1 =
          edge.a === -1
            ? { x: 0, y: 0, z: 0 }
            : projected[edge.a];

        const p2 =
          edge.b === -1
            ? { x: 0, y: 0, z: 0 }
            : projected[edge.b];

        line.setAttribute("x1", String(p1.x));
        line.setAttribute("y1", String(p1.y));
        line.setAttribute("x2", String(p2.x));
        line.setAttribute("y2", String(p2.y));

        const avgZ = (p1.z + p2.z) / 2;

        const baseOpacity = Math.min(
          0.45,
          Math.max(0.04, (avgZ + 200) / 800)
        );

        const flicker =
          0.65 +
          0.35 *
            Math.sin(t / 900 + idx * 1.7);

        line.setAttribute(
          "opacity",
          String(baseOpacity * flicker)
        );
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [nodes, edges]);

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect =
      containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseTarget.current = {
      x:
        ((e.clientX - rect.left) /
          rect.width -
          0.5) *
        2,

      y:
        ((e.clientY - rect.top) /
          rect.height -
          0.5) *
        2,
    };
  }

  function handleMouseLeave() {
    mouseTarget.current = {
      x: 0,
      y: 0,
    };
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="instagram-orb"
    >
      <div className="instagram-orb__glow" />

      <div className="instagram-orb__ring instagram-orb__ring--1" />
      <div className="instagram-orb__ring instagram-orb__ring--2" />
      <div className="instagram-orb__ring instagram-orb__ring--3" />

      <svg
        className="instagram-orb__lines"
        style={{
          left: "50%",
          top: "50%",
        }}
      >
        <defs>
          <linearGradient
            id="instagram-orb-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#A855F7"
            />
            <stop
              offset="50%"
              stopColor="#EC4899"
            />
            <stop
              offset="100%"
              stopColor="#22D3EE"
            />
          </linearGradient>
        </defs>

        {edges.map((_, i) => (
          <line
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            stroke="url(#instagram-orb-gradient)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="instagram-orb__nodes">
        {nodes.map((node, i) => (
          <div
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="instagram-orb__node"
            style={{
              background:
                node.kind === "avatar"
                  ? `linear-gradient(135deg, ${node.color}, ${node.color}55)`
                  : node.color,

              boxShadow:
                `0 0 10px ${node.color}aa`,
            }}
          />
        ))}

        {nodes.map((node, i) =>
          node.username ? (
            <div
              key={`label-${i}`}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="instagram-orb__label"
              style={{
                animationDelay: `${(i % 6) * 1.3}s`,
              }}
            >
              {node.username}
            </div>
          ) : null
        )}
      </div>

      <div className="instagram-orb__center">
        <div className="instagram-orb__center-inner">
          <div className="instagram-orb__center-avatar" />
        </div>
      </div>

      <div className="instagram-orb__card instagram-orb__card--followers">
        <span>
          958{" "}
          <span className="instagram-orb__muted">
            Followers
          </span>
        </span>
      </div>

      <div className="instagram-orb__card instagram-orb__card--following">
        <span>
          625{" "}
          <span className="instagram-orb__muted">
            Following
          </span>
        </span>
      </div>

      <div className="instagram-orb__card instagram-orb__card--not-following">
        <span>
          84{" "}
          <span className="instagram-orb__pink">
            Not Following Back
          </span>
        </span>
      </div>
    </div>
  );
}