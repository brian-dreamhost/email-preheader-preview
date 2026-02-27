import { useState } from 'react'

const CLIENTS = [
  { id: 'gmail-desktop', name: 'Gmail (Desktop)', maxSubject: 70, maxPreheader: 90, subjectWeight: 'bold', preheaderColor: '#5f6368', bgColor: '#ffffff', fontFamily: 'Google Sans, Roboto, Arial, sans-serif', fontSize: '14px' },
  { id: 'gmail-mobile', name: 'Gmail (Mobile)', maxSubject: 40, maxPreheader: 50, subjectWeight: 'bold', preheaderColor: '#5f6368', bgColor: '#ffffff', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '14px' },
  { id: 'outlook-desktop', name: 'Outlook (Desktop)', maxSubject: 60, maxPreheader: 50, subjectWeight: '600', preheaderColor: '#605e5c', bgColor: '#ffffff', fontFamily: 'Segoe UI, Calibri, Arial, sans-serif', fontSize: '14px' },
  { id: 'outlook-mobile', name: 'Outlook (Mobile)', maxSubject: 35, maxPreheader: 40, subjectWeight: 'bold', preheaderColor: '#8a8886', bgColor: '#ffffff', fontFamily: 'Segoe UI, Arial, sans-serif', fontSize: '13px' },
  { id: 'apple-desktop', name: 'Apple Mail (Mac)', maxSubject: 65, maxPreheader: 80, subjectWeight: 'bold', preheaderColor: '#8e8e93', bgColor: '#ffffff', fontFamily: '-apple-system, SF Pro, Helvetica, Arial, sans-serif', fontSize: '13px' },
  { id: 'apple-mobile', name: 'Apple Mail (iPhone)', maxSubject: 35, maxPreheader: 55, subjectWeight: 'bold', preheaderColor: '#8e8e93', bgColor: '#ffffff', fontFamily: '-apple-system, SF Pro, Helvetica, Arial, sans-serif', fontSize: '15px' },
  { id: 'yahoo', name: 'Yahoo Mail', maxSubject: 55, maxPreheader: 60, subjectWeight: 'bold', preheaderColor: '#6e6d7a', bgColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px' },
]

const DARK_OVERRIDES = {
  'gmail-desktop': { bgColor: '#1a1a2e', subjectColor: '#e8eaed', preheaderColor: '#9aa0a6', senderColor: '#e8eaed' },
  'gmail-mobile': { bgColor: '#1a1a2e', subjectColor: '#e8eaed', preheaderColor: '#9aa0a6', senderColor: '#e8eaed' },
  'outlook-desktop': { bgColor: '#212121', subjectColor: '#d4d4d4', preheaderColor: '#8a8886', senderColor: '#d4d4d4' },
  'outlook-mobile': { bgColor: '#212121', subjectColor: '#d4d4d4', preheaderColor: '#8a8886', senderColor: '#d4d4d4' },
  'apple-desktop': { bgColor: '#1c1c1e', subjectColor: '#f5f5f7', preheaderColor: '#8e8e93', senderColor: '#f5f5f7' },
  'apple-mobile': { bgColor: '#1c1c1e', subjectColor: '#f5f5f7', preheaderColor: '#8e8e93', senderColor: '#f5f5f7' },
  'yahoo': { bgColor: '#1d1d2b', subjectColor: '#e0e0e0', preheaderColor: '#9090a0', senderColor: '#e0e0e0' },
}

function truncate(text, max) {
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, '') + '...'
}

function PreviewRow({ client, subject, preheader, senderName, darkMode }) {
  const dark = darkMode ? DARK_OVERRIDES[client.id] : null
  const bgColor = dark?.bgColor || client.bgColor
  const subjectColor = dark?.subjectColor || '#1a1a1a'
  const phColor = dark?.preheaderColor || client.preheaderColor
  const senderColor = dark?.senderColor || '#1a1a1a'

  const truncSubject = truncate(subject || 'Your subject line here', client.maxSubject)
  const truncPreheader = truncate(preheader || 'Preview text appears here...', client.maxPreheader)

  const isMobile = client.id.includes('mobile')

  return (
    <div className="card-gradient border border-metal/20 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-metal/10">
        <span className="text-xs font-medium text-cloudy">{client.name}</span>
        <div className="flex items-center gap-2 text-xs text-galactic">
          <span>Subj: {client.maxSubject}ch</span>
          <span className="text-metal">|</span>
          <span>PH: {client.maxPreheader}ch</span>
        </div>
      </div>
      <div className="p-3" style={{ background: bgColor, fontFamily: client.fontFamily }}>
        <div className={`${isMobile ? 'max-w-[360px]' : 'max-w-full'}`}>
          {/* Sender row */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: '#0073EC' }}>
              {(senderName || 'A')[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm truncate" style={{ color: senderColor, fontSize: client.fontSize }}>{senderName || 'Your Brand'}</span>
                <span className="text-xs shrink-0 ml-2" style={{ color: phColor }}>10:30 AM</span>
              </div>
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="truncate shrink-0" style={{ color: subjectColor, fontWeight: client.subjectWeight, fontSize: client.fontSize }}>{truncSubject}</span>
              </div>
              <div className="truncate" style={{ color: phColor, fontSize: `calc(${client.fontSize} - 1px)` }}>{truncPreheader}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [subject, setSubject] = useState('')
  const [preheader, setPreheader] = useState('')
  const [senderName, setSenderName] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const subjectLen = subject.length
  const preheaderLen = preheader.length

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/email-marketing/" className="text-azure hover:text-white transition-colors">Email Marketing</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Email Preheader Preview</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 border border-turtle text-turtle rounded-full text-sm font-medium mb-6">Free Tool</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Email Preheader Preview</h1>
          <p className="text-cloudy text-lg max-w-2xl mx-auto">Preview how your subject line and preheader text appear across 7 email clients — desktop and mobile, light and dark mode.</p>
        </div>

        {/* Inputs */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-6 mb-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-cloudy">Sender Name</label>
            </div>
            <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Your Brand Name" className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-2.5 text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-cloudy">Subject Line</label>
              <span className={`text-xs ${subjectLen > 60 ? 'text-tangerine' : subjectLen > 0 ? 'text-turtle' : 'text-galactic'}`}>{subjectLen} characters</span>
            </div>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Your email subject line..." className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-2.5 text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors text-lg" />
            <div className="mt-2 h-1.5 bg-metal/20 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${subjectLen <= 40 ? 'bg-turtle' : subjectLen <= 60 ? 'bg-azure' : subjectLen <= 70 ? 'bg-tangerine' : 'bg-coral'}`} style={{ width: `${Math.min(100, (subjectLen / 80) * 100)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-galactic mt-1">
              <span>Mobile safe: 35–40</span>
              <span>Desktop ideal: 50–60</span>
              <span>Max visible: 70</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-cloudy">Preheader Text</label>
              <span className={`text-xs ${preheaderLen > 90 ? 'text-tangerine' : preheaderLen > 0 ? 'text-turtle' : 'text-galactic'}`}>{preheaderLen} characters</span>
            </div>
            <textarea value={preheader} onChange={(e) => setPreheader(e.target.value)} placeholder="Preview text that appears after the subject line in the inbox..." rows={2} className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-2.5 text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors resize-none" />
            <div className="mt-2 h-1.5 bg-metal/20 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${preheaderLen <= 50 ? 'bg-turtle' : preheaderLen <= 90 ? 'bg-azure' : preheaderLen <= 120 ? 'bg-tangerine' : 'bg-coral'}`} style={{ width: `${Math.min(100, (preheaderLen / 130) * 100)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-galactic mt-1">
              <span>Minimum: 40</span>
              <span>Ideal: 50–90</span>
              <span>Max useful: ~120</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${darkMode ? 'border-prince/50 text-prince bg-prince/10' : 'border-metal/30 text-galactic hover:text-white hover:border-metal/50'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
              {darkMode ? 'Dark Mode On' : 'Dark Mode Off'}
            </button>
          </div>
        </div>

        {/* Previews */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Inbox Previews</h2>
          {CLIENTS.map(client => (
            <PreviewRow key={client.id} client={client} subject={subject} preheader={preheader} senderName={senderName} darkMode={darkMode} />
          ))}
        </div>

        {/* Tips */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-6 mt-8">
          <h3 className="font-semibold text-white mb-4">Preheader Best Practices</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { title: 'Complement, don\'t repeat', text: 'The preheader should add context, not echo the subject line. It\'s your second chance to convince readers to open.' },
              { title: 'Front-load the value', text: 'Put the most compelling info in the first 40 characters. Mobile clients show much less than desktop.' },
              { title: 'Use 40–90 characters', text: 'Too short and email clients fill the space with "View in browser" or body text. Too long and it gets cut off.' },
              { title: 'Create urgency or curiosity', text: 'Use the preheader to add urgency ("Ends tonight") or a teaser ("We found 3 ways to...") that the subject line hints at.' },
              { title: 'Include a CTA', text: 'Preheaders like "Open to see your results" or "Here\'s what you missed" drive higher open rates.' },
              { title: 'Hide filler text', text: 'If your preheader is shorter than the visible space, add hidden whitespace characters to prevent body text from showing.' },
            ].map((tip, i) => (
              <div key={i} className="bg-midnight/50 rounded-lg p-3">
                <p className="font-medium text-azure mb-1">{tip.title}</p>
                <p className="text-galactic text-xs">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-metal/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-galactic">
          Free marketing tools by <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">DreamHost</a>
        </div>
      </footer>
    </div>
  )
}
