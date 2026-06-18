// The guided quiz is emotional, not technical. Each question shows a few
// vivid moods / scenes; the person picks what they feel drawn to *today*.
// Every option carries hidden weights that feed the recommendation engine.
//
// weights:
//   families   { familyId: number }   — pulls toward scent families
//   character  { tag: number }        — mood/personality
//   seasons    { season: number }
//   occasions  { occasion: number }
//   intensity  number (1..5)          — desired loudness (averaged across answers)

export const questions = [
  {
    id: 'feeling',
    kind: 'single',
    title: 'How do you want to feel today?',
    subtitle: 'Pick the mood you’re reaching for right now.',
    options: [
      {
        id: 'calm', label: 'Calm & serene', emoji: '🌿', accent: '#7fae8a',
        hint: 'Quiet, clean, unhurried.',
        weights: { families: { green: 2, aromatic: 2, musky: 2, aquatic: 1 }, character: { fresh: 3, natural: 2 }, intensity: 2 }
      },
      {
        id: 'passion', label: 'Bold & passionate', emoji: '🔥', accent: '#b04a3a',
        hint: 'Magnetic, sensual, impossible to ignore.',
        weights: { families: { amber: 2, oud: 2, spicy: 2, leather: 1 }, character: { bold: 3, mysterious: 2 }, intensity: 5 }
      },
      {
        id: 'joy', label: 'Joyful & alive', emoji: '☀️', accent: '#e8c04a',
        hint: 'Sunny, sparkling, ready for anything.',
        weights: { families: { citrus: 2, fruity: 2, floral: 1 }, character: { playful: 3, fresh: 2 }, intensity: 3 }
      },
      {
        id: 'cozy', label: 'Warm & comforted', emoji: '🍯', accent: '#c8924a',
        hint: 'Soft, sweet, wrapped in a blanket.',
        weights: { families: { gourmand: 2, amber: 2, woody: 1 }, character: { cozy: 3, romantic: 1 }, intensity: 3 }
      }
    ]
  },
  {
    id: 'scene',
    kind: 'single',
    title: 'Which scene would you step into right now?',
    subtitle: 'Trust your gut — go where you’d rather be.',
    options: [
      {
        id: 'grove', label: 'A sunlit citrus grove after rain', emoji: '🍋', accent: '#e8c97a',
        hint: 'Wet leaves, zest and bright air.',
        weights: { families: { citrus: 3, green: 2, aquatic: 1 }, character: { fresh: 2, natural: 1 }, seasons: { spring: 2, summer: 2 }, intensity: 2 }
      },
      {
        id: 'lounge', label: 'A velvet lounge at midnight', emoji: '🥂', accent: '#7a3a52',
        hint: 'Low light, perfume and a slow drink.',
        weights: { families: { amber: 2, floral: 2, gourmand: 1, leather: 1 }, character: { mysterious: 2, bold: 2, romantic: 1 }, seasons: { autumn: 1, winter: 2 }, occasions: { date: 2, special: 2 }, intensity: 4 }
      },
      {
        id: 'garden', label: 'A blooming spring garden', emoji: '🌸', accent: '#e89ab0',
        hint: 'Petals everywhere, soft and romantic.',
        weights: { families: { floral: 3, green: 1, fruity: 1 }, character: { romantic: 2, elegant: 1 }, seasons: { spring: 3 }, intensity: 3 }
      },
      {
        id: 'cabin', label: 'A cabin with woodsmoke & spice', emoji: '🪵', accent: '#8a5a4a',
        hint: 'Fireplace, resin and warm wood.',
        weights: { families: { woody: 3, amber: 2, spicy: 1, gourmand: 1 }, character: { cozy: 2, natural: 1, mysterious: 1 }, seasons: { autumn: 2, winter: 2 }, intensity: 4 }
      }
    ]
  },
  {
    id: 'craving',
    kind: 'single',
    title: 'Right now, you’re craving something…',
    subtitle: 'The texture you want close to your skin.',
    options: [
      { id: 'crisp', label: 'Crisp & airy', emoji: '💨', accent: '#6aa8c8', hint: 'Like a cold glass of water.', weights: { families: { aquatic: 2, citrus: 2, green: 1 }, character: { fresh: 3 }, intensity: 2 } },
      { id: 'creamy', label: 'Creamy & soft', emoji: '🍦', accent: '#e8d8b0', hint: 'Like cashmere on skin.', weights: { families: { gourmand: 2, musky: 2, floral: 1, woody: 1 }, character: { cozy: 2, romantic: 1, elegant: 1 }, intensity: 3 } },
      { id: 'spiced', label: 'Spiced & smoky', emoji: '🌶️', accent: '#c8694a', hint: 'Like embers and cardamom.', weights: { families: { spicy: 3, leather: 1, oud: 1, amber: 1 }, character: { bold: 2, mysterious: 2 }, intensity: 4 } },
      { id: 'green', label: 'Green & dewy', emoji: '🍃', accent: '#8fae6a', hint: 'Like crushed leaves and stems.', weights: { families: { green: 3, aromatic: 1, fruity: 1 }, character: { natural: 3, fresh: 1 }, intensity: 2 } }
    ]
  },
  {
    id: 'occasion',
    kind: 'single',
    title: 'Where will you wear it today?',
    subtitle: 'We’ll tune the projection to suit the moment.',
    options: [
      { id: 'everyday', label: 'Just being me', emoji: '🚶', accent: '#9ec46a', hint: 'Errands, coffee, life.', weights: { occasions: { everyday: 3 }, intensity: 2 } },
      { id: 'office', label: 'Work & focus', emoji: '💼', accent: '#8a9aa0', hint: 'Close-to-skin and polished.', weights: { occasions: { office: 3 }, character: { elegant: 1, fresh: 1 }, intensity: 2 } },
      { id: 'date', label: 'A date or night out', emoji: '🌙', accent: '#7a3a52', hint: 'Something with pull.', weights: { occasions: { date: 3, special: 1 }, character: { romantic: 1, bold: 1, mysterious: 1 }, intensity: 4 } },
      { id: 'sport', label: 'Moving & active', emoji: '🏃', accent: '#5ab0a0', hint: 'Fresh and energising.', weights: { occasions: { sport: 3 }, character: { fresh: 2 }, intensity: 2 } }
    ]
  },
  {
    id: 'season',
    kind: 'single',
    title: 'What’s the weather of your mood?',
    subtitle: 'Not the forecast — how it feels inside.',
    options: [
      { id: 'spring', label: 'Fresh spring morning', emoji: '🌱', accent: '#9ec46a', weights: { seasons: { spring: 3 }, families: { green: 1, floral: 1 } } },
      { id: 'summer', label: 'Hot bright summer', emoji: '🌞', accent: '#e8c04a', weights: { seasons: { summer: 3 }, families: { citrus: 1, aquatic: 1, fruity: 1 } } },
      { id: 'autumn', label: 'Golden crisp autumn', emoji: '🍂', accent: '#c8924a', weights: { seasons: { autumn: 3 }, families: { woody: 1, chypre: 1, amber: 1 } } },
      { id: 'winter', label: 'Cold cosy winter', emoji: '❄️', accent: '#9ec4d0', weights: { seasons: { winter: 3 }, families: { amber: 1, gourmand: 1, oud: 1 } } }
    ]
  },
  {
    id: 'intensity',
    kind: 'single',
    title: 'How loud should it be?',
    subtitle: 'From a private whisper to an entrance.',
    options: [
      { id: 'whisper', label: 'A whisper', emoji: '🤫', accent: '#cfc4b8', hint: 'Only those close will notice.', weights: { intensity: 1, character: { elegant: 1 } } },
      { id: 'soft', label: 'Soft halo', emoji: '🌫️', accent: '#bcd0c0', hint: 'A gentle aura around you.', weights: { intensity: 2 } },
      { id: 'present', label: 'Confidently present', emoji: '✨', accent: '#e8c97a', hint: 'Noticeable, not overwhelming.', weights: { intensity: 4 } },
      { id: 'statement', label: 'A statement', emoji: '💥', accent: '#b04a3a', hint: 'You walk in, it announces you.', weights: { intensity: 5, character: { bold: 2 } } }
    ]
  },
  {
    id: 'lean',
    kind: 'single',
    title: 'Any style lean?',
    subtitle: 'Totally optional — pick whatever fits today.',
    options: [
      { id: 'feminine', label: 'Feminine', emoji: '🌷', accent: '#e89ab0', weights: { gender: { feminine: 2 } } },
      { id: 'masculine', label: 'Masculine', emoji: '🖤', accent: '#8a9aa0', weights: { gender: { masculine: 2 } } },
      { id: 'unisex', label: 'Unisex', emoji: '⚪', accent: '#cfc4b8', weights: { gender: { unisex: 2 } } },
      { id: 'surprise', label: 'No preference', emoji: '🎲', accent: '#c8a24a', weights: {} }
    ]
  }
];
