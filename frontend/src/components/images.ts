const svgToDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const Logo = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80">
    <rect width="240" height="80" rx="18" fill="#ffffff"/>
    <circle cx="42" cy="40" r="22" fill="#138B3E"/>
    <path d="M42 20c9 6 14 14 14 24-10 0-19-5-24-14 0-10 5-18 10-10z" fill="#DDF5E4"/>
    <text x="78" y="36" font-family="Poppins, Arial, sans-serif" font-size="18" font-weight="700" fill="#138B3E">Citymali</text>
    <text x="78" y="56" font-family="Poppins, Arial, sans-serif" font-size="11" fill="#4B5563">Admin Panel</text>
  </svg>
`);

const FullLogo = Logo;

const WelcomePlant1 = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
    <rect width="320" height="240" rx="20" fill="#B7F7D0"/>
    <rect x="126" y="144" width="68" height="44" rx="8" fill="#8B5A2B"/>
    <path d="M160 80c-28 0-42 22-42 54 24 0 40-10 42-54z" fill="#1F8A46"/>
    <path d="M160 82c28 0 42 22 42 54-24 0-40-10-42-54z" fill="#2FA45A"/>
  </svg>
`);

const WelcomePlant2 = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
    <rect width="320" height="240" rx="20" fill="#D9F99D"/>
    <rect x="126" y="144" width="68" height="44" rx="8" fill="#8B5A2B"/>
    <path d="M144 106c-22 0-34 18-34 44 20 0 32-8 34-44z" fill="#166534"/>
    <path d="M176 106c22 0 34 18 34 44-20 0-32-8-34-44z" fill="#22C55E"/>
  </svg>
`);

const WelcomePlant3 = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
    <rect width="320" height="240" rx="20" fill="#BBF7D0"/>
    <rect x="126" y="144" width="68" height="44" rx="8" fill="#8B5A2B"/>
    <path d="M160 80c-28 0-42 22-42 54 24 0 40-10 42-54z" fill="#166534"/>
    <path d="M160 82c28 0 42 22 42 54-24 0-40-10-42-54z" fill="#16A34A"/>
  </svg>
`);

const SessionExpired = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480">
    <rect width="800" height="480" fill="#F8FAFC"/>
    <rect x="80" y="60" width="640" height="360" rx="24" fill="#ffffff" stroke="#E5E7EB" stroke-width="2"/>
    <circle cx="400" cy="175" r="54" fill="#FEE2E2"/>
    <path d="M400 130v58" stroke="#DC2626" stroke-width="16" stroke-linecap="round"/>
    <circle cx="400" cy="214" r="8" fill="#DC2626"/>
    <text x="400" y="290" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="34" font-weight="700" fill="#111827">Session Expired</text>
  </svg>
`);

export { Logo, FullLogo, WelcomePlant1, WelcomePlant2, WelcomePlant3, SessionExpired };
