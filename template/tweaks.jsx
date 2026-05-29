// Tweaks for Teramo Bike Experience site
// Hero image variants + accent color + treatment

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "sunset",
  "accent": ["#C8102E", "#F39C12"],
  "treatment": "cinematic"
}/*EDITMODE-END*/;

const HERO_OPTIONS = [
  { value: "sunset",         label: "Tramonto",  src: "assets/sunset-rider.jpg" },
  { value: "unsplashAlps",   label: "Salita",    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=2400&q=85" },
  { value: "unsplashNight",  label: "Gruppo",    src: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=2400&q=85" },
  { value: "unsplashRoad",   label: "Strada",    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2400&q=85" },
];

// Each accent option is [primary, hot-accent]
const ACCENT_OPTIONS = [
  ["#C8102E", "#F39C12"], // Rosso TBE
  ["#E67E22", "#FFC93C"], // Amber
  ["#008C45", "#C8102E"], // Tricolore
  ["#0A0A0A", "#C8102E"], // Noir
];

const TREATMENT_OPTIONS = [
  { value: "cinematic", label: "Cinematic", overlay: "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 50%, rgba(10,10,10,0.85) 100%), radial-gradient(ellipse at 80% 50%, rgba(200,16,46,0.18), transparent 60%)" },
  { value: "poster",    label: "Poster",    overlay: "linear-gradient(180deg, rgba(74,4,16,0.55), rgba(10,10,10,0.85))" },
  { value: "minimal",   label: "Minimal",   overlay: "linear-gradient(180deg, transparent 0%, transparent 60%, rgba(10,10,10,0.7) 100%)" },
];

function TbeTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    // Hero image
    const opt = HERO_OPTIONS.find(o => o.value === t.hero) || HERO_OPTIONS[0];
    document.querySelectorAll('#heroBg img').forEach(img => { img.src = opt.src; });

    // Accent color
    const accentArr = Array.isArray(t.accent) ? t.accent : ACCENT_OPTIONS[0];
    const [primary, hot] = accentArr;
    document.documentElement.style.setProperty('--accent', primary);
    document.documentElement.style.setProperty('--tbe-red', primary);
    document.documentElement.style.setProperty('--accent-hot', hot);
    document.documentElement.style.setProperty('--tbe-amber', hot);

    // Treatment
    const treatment = TREATMENT_OPTIONS.find(o => o.value === t.treatment) || TREATMENT_OPTIONS[0];
    const vignette = document.querySelector('.hero-vignette');
    if (vignette) vignette.style.background = treatment.overlay;
  }, [t.hero, t.accent, t.treatment]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero" />
      <TweakSelect
        label="Immagine"
        value={t.hero}
        onChange={(v) => setTweak('hero', v)}
        options={HERO_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
      />
      <TweakSelect
        label="Trattamento"
        value={t.treatment}
        onChange={(v) => setTweak('treatment', v)}
        options={TREATMENT_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
      />
      <TweakSection label="Colore brand" />
      <TweakColor
        label="Accent"
        value={t.accent}
        onChange={(v) => setTweak('accent', v)}
        options={ACCENT_OPTIONS}
      />
    </TweaksPanel>
  );
}

// Mount
const __tweakMount = document.createElement('div');
document.body.appendChild(__tweakMount);
ReactDOM.createRoot(__tweakMount).render(<TbeTweaks />);
