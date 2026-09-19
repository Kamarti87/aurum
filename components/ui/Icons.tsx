type IconProps = { className?: string };

const base = "none";

function Svg({ className = "h-6 w-6", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={base}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconCash = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="4" width="18" height="10" rx="2" />
    <path d="M7 18h10l-.7 3H7.7z" />
    <path d="M7 8h4M7 11h6" />
    <circle cx="17" cy="9" r="1.4" />
  </Svg>
);

export const IconChip = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
    <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
  </Svg>
);

export const IconKey = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="8" cy="14" r="4" />
    <path d="M11 11l9-9M17.5 4.5l2 2M15 7l2 2" />
  </Svg>
);

export const IconCube = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
    <path d="M4 7.2l8 4.4 8-4.4M12 11.6V21" />
  </Svg>
);

export const IconShield = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6z" />
    <path d="M9.2 12.2l2 2 3.6-3.8" />
  </Svg>
);

export const IconClock = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.4 2" />
  </Svg>
);

export const IconDoc = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Svg>
);

export const IconWrench = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M14.5 4.5a4.5 4.5 0 00-5.9 5.6L4 14.7 6.9 17.6l4.6-4.6a4.5 4.5 0 005.6-5.9l-2.6 2.6-2.1-2.1z" />
    <path d="M16.5 15.5l3.5 3.5" />
  </Svg>
);

export const IconCheck = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </Svg>
);

export const IconArrow = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5" />
  </Svg>
);

export const IconPhone = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4.5 5.5c0-1 .8-1.8 1.8-1.8h1.8c.8 0 1.5.5 1.7 1.3l.7 2.4c.2.7-.1 1.4-.7 1.8l-1.2.8a12 12 0 005.4 5.4l.8-1.2c.4-.6 1.1-.9 1.8-.7l2.4.7c.8.2 1.3.9 1.3 1.7v1.8c0 1-.8 1.8-1.8 1.8C10.9 19.5 4.5 13.1 4.5 5.5z" />
  </Svg>
);

export const IconMail = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7.5l7.2 5a1.4 1.4 0 001.6 0l7.2-5" />
  </Svg>
);

export const IconChat = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M20.5 12.4c0 3.9-3.8 7-8.5 7-1 0-2-.1-2.9-.4L4 20.5l1.6-4.2A6.5 6.5 0 013.5 12.4c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7z" />
    <path d="M8.6 12h.01M12 12h.01M15.4 12h.01" />
  </Svg>
);

export const IconMapPin = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const IconSpark = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
  </Svg>
);
