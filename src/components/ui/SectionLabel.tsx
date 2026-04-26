interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export default function SectionLabel({ number, label, className = '' }: SectionLabelProps) {
  return (
    <div
      className={className}
      style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: '2rem',
      }}
    >
      [{number} — {label}]
    </div>
  );
}

