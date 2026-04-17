import SignupForm from './SignupForm'

export const metadata = {
  title: 'Get Started — Sailfish Financial',
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: '#00060E' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Let's get your books <span className="italic text-teal-400">handled.</span>
          </h1>
          <p className="text-silver/60 text-base leading-relaxed">
            Fill out the form below and Ford will follow up within one business day to discuss your needs and get you set up.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/8 rounded-xl p-8">
          <SignupForm />
        </div>

        <p className="text-silver/25 text-xs text-center mt-6">
          Prefer to talk first? Call or text (770) 580-9850 or email FordFox@sailfishfinancial.com
        </p>
      </div>
    </main>
  )
}
