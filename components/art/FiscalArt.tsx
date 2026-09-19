/** Фискальный накопитель — плата в корпусе с чипом и маркировкой. */
export function FiscalDriveArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} role="img" aria-label="Фискальный накопитель">
      <defs>
        <linearGradient id="fn-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b3346" />
          <stop offset="55%" stopColor="#181d2a" />
          <stop offset="100%" stopColor="#0a0d14" />
        </linearGradient>
        <linearGradient id="fn-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9fb0d0" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#9fb0d0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="fn-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8348" />
          <stop offset="100%" stopColor="#cf4a12" />
        </linearGradient>
        <radialGradient id="fn-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b2c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="120" cy="80" rx="118" ry="64" fill="url(#fn-glow)" />
      <ellipse cx="120" cy="132" rx="76" ry="10" fill="#000" opacity="0.45" />

      {/* корпус */}
      <rect x="38" y="34" width="164" height="86" rx="12" fill="url(#fn-body)" />
      <rect
        x="38.75"
        y="34.75"
        width="162.5"
        height="84.5"
        rx="11.5"
        fill="none"
        stroke="url(#fn-edge)"
        strokeWidth="1.5"
      />

      {/* чип */}
      <rect x="56" y="52" width="46" height="36" rx="6" fill="url(#fn-chip)" opacity="0.9" />
      <g stroke="#05060a" strokeOpacity="0.45" strokeWidth="2">
        <line x1="64" y1="52" x2="64" y2="88" />
        <line x1="79" y1="52" x2="79" y2="88" />
        <line x1="94" y1="52" x2="94" y2="88" />
      </g>

      {/* маркировка */}
      <rect x="116" y="52" width="66" height="6" rx="3" fill="#fff" opacity="0.5" />
      <rect x="116" y="65" width="48" height="5" rx="2.5" fill="#fff" opacity="0.24" />
      <rect x="116" y="76" width="56" height="5" rx="2.5" fill="#fff" opacity="0.18" />

      {/* контакты */}
      <g fill="#e8c675" opacity="0.85">
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={62 + i * 18} y="100" width="11" height="8" rx="2" />
        ))}
      </g>
    </svg>
  );
}

/** USB-токен для ЭЦП (Рутокен). */
export function TokenArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} role="img" aria-label="USB-токен для электронной подписи">
      <defs>
        <linearGradient id="tk-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3d4557" />
          <stop offset="60%" stopColor="#232a38" />
          <stop offset="100%" stopColor="#0d1017" />
        </linearGradient>
        <linearGradient id="tk-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe6f3" />
          <stop offset="100%" stopColor="#8e99ad" />
        </linearGradient>
        <radialGradient id="tk-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b2c" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="120" cy="76" rx="116" ry="60" fill="url(#tk-glow)" />
      <ellipse cx="120" cy="126" rx="70" ry="9" fill="#000" opacity="0.4" />

      {/* USB-разъём */}
      <rect x="40" y="58" width="44" height="34" rx="4" fill="url(#tk-metal)" />
      <rect x="46" y="66" width="30" height="18" rx="2" fill="#0a0d14" opacity="0.55" />

      {/* корпус */}
      <rect x="80" y="44" width="118" height="62" rx="18" fill="url(#tk-body)" />
      <rect
        x="80.75"
        y="44.75"
        width="116.5"
        height="60.5"
        rx="17.5"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />

      {/* окошко индикатора и «ключ» */}
      <circle cx="176" cy="75" r="7" fill="#ff6b2c" opacity="0.95" />
      <path
        d="M112 62 h34 M112 75 h22 M112 88 h30"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
