export const metadata = {
  title: 'Connecting to QuickBooks — Sailfish Financial',
}

export default function CallbackPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#071830' }}>
      <div className="text-center">
        <p className="text-silver/60 text-sm">Authorization received. You may close this window.</p>
      </div>
    </main>
  )
}
