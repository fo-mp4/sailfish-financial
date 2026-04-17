export default function Logo({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sailfish-logo.png"
      alt="Sailfish Financial"
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}
