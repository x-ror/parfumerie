// Individual scent components ("notes"). The app uses these to compose a
// personalised fragrance pyramid (top / heart / base) for the user, and to
// power the build-your-own Atelier.
//
//   role   — 'top' | 'heart' | 'base'  (position in the fragrance pyramid)
//   family — links a note to a scent family (see families.js)
//   intensity — rough weight the note carries (1 light .. 5 heavy)

export const ingredients = [
  // ── TOP NOTES ──────────────────────────────────────────────
  { id: 'bergamot', name: 'Bergamot', role: 'top', family: 'citrus', intensity: 2, accent: '#e8c97a', desc: 'Sparkling, slightly bitter citrus — the classic bright opening.' },
  { id: 'lemon', name: 'Lemon', role: 'top', family: 'citrus', intensity: 2, accent: '#e8d44a', desc: 'Zesty and clean, instantly refreshing.' },
  { id: 'grapefruit', name: 'Pink grapefruit', role: 'top', family: 'citrus', intensity: 2, accent: '#e8956a', desc: 'Tart, juicy and a little fizzy.' },
  { id: 'yuzu', name: 'Yuzu', role: 'top', family: 'citrus', intensity: 2, accent: '#d8c84a', desc: 'Japanese citrus — sharp, green and aromatic.' },
  { id: 'mandarin', name: 'Mandarin', role: 'top', family: 'citrus', intensity: 2, accent: '#e8a04a', desc: 'Sweet, sunny and soft for a citrus.' },
  { id: 'mint', name: 'Mint', role: 'top', family: 'aromatic', intensity: 2, accent: '#7ac8a0', desc: 'Cool, tingling and wide-awake.' },
  { id: 'pink-pepper', name: 'Pink pepper', role: 'top', family: 'spicy', intensity: 2, accent: '#d87a7a', desc: 'Rosy, sparkling spice with a fizzy lift.' },
  { id: 'pear', name: 'Pear', role: 'top', family: 'fruity', intensity: 2, accent: '#bcd86a', desc: 'Dewy, watery and translucent fruit.' },
  { id: 'peach', name: 'White peach', role: 'top', family: 'fruity', intensity: 3, accent: '#e8956a', desc: 'Velvety, sun-warmed and nectar-sweet.' },
  { id: 'black-currant', name: 'Black currant', role: 'top', family: 'fruity', intensity: 3, accent: '#6a4a6a', desc: 'Tart, dark and slightly green-fruity.' },
  { id: 'sea-salt', name: 'Sea salt', role: 'top', family: 'aquatic', intensity: 2, accent: '#9ec4d0', desc: 'Mineral, airy and skin-like saline.' },
  { id: 'galbanum', name: 'Galbanum', role: 'top', family: 'green', intensity: 3, accent: '#7aa84a', desc: 'Intensely green, snapped-stem bitterness.' },
  { id: 'cardamom', name: 'Cardamom', role: 'top', family: 'spicy', intensity: 3, accent: '#c8a86a', desc: 'Aromatic, cool-warm and slightly resinous spice.' },
  { id: 'saffron', name: 'Saffron', role: 'top', family: 'spicy', intensity: 4, accent: '#c8694a', desc: 'Leathery, suede-like and faintly medicinal — opulent.' },
  { id: 'lavender', name: 'Lavender', role: 'top', family: 'aromatic', intensity: 3, accent: '#8a8ac0', desc: 'Herbaceous, soothing and barber-shop clean.' },

  // ── HEART NOTES ────────────────────────────────────────────
  { id: 'rose', name: 'Rose', role: 'heart', family: 'floral', intensity: 4, accent: '#e07a92', desc: 'The queen of flowers — lush, dewy and romantic.' },
  { id: 'jasmine', name: 'Jasmine', role: 'heart', family: 'floral', intensity: 4, accent: '#e8e0c0', desc: 'Heady, narcotic and richly white-floral.' },
  { id: 'tuberose', name: 'Tuberose', role: 'heart', family: 'floral', intensity: 5, accent: '#e8d0c0', desc: 'Creamy, opulent and almost intoxicating.' },
  { id: 'neroli', name: 'Neroli', role: 'heart', family: 'floral', intensity: 3, accent: '#e8e0b0', desc: 'Orange-blossom — bright, honeyed and joyful.' },
  { id: 'peony', name: 'Peony', role: 'heart', family: 'floral', intensity: 3, accent: '#e89ab0', desc: 'Fresh, rosy-watery and gently sweet.' },
  { id: 'iris', name: 'Iris', role: 'heart', family: 'floral', intensity: 4, accent: '#c8b8d0', desc: 'Cool, powdery and suede-soft — pure elegance.' },
  { id: 'gardenia', name: 'Gardenia', role: 'heart', family: 'floral', intensity: 4, accent: '#e8e8d0', desc: 'Creamy, buttery white flower with a green edge.' },
  { id: 'geranium', name: 'Geranium', role: 'heart', family: 'green', intensity: 3, accent: '#b07a8a', desc: 'Rosy and minty-green, crisp and aromatic.' },
  { id: 'fig-leaf', name: 'Fig leaf', role: 'heart', family: 'green', intensity: 3, accent: '#6a8a4a', desc: 'Milky, green and shady — coconut-leafy.' },
  { id: 'green-tea', name: 'Green tea', role: 'heart', family: 'green', intensity: 2, accent: '#9ec46a', desc: 'Bitter-fresh, calming and translucent.' },
  { id: 'cinnamon', name: 'Cinnamon', role: 'heart', family: 'spicy', intensity: 4, accent: '#b06a3a', desc: 'Sweet-hot baking spice, cosy and rich.' },
  { id: 'tobacco', name: 'Tobacco leaf', role: 'heart', family: 'leather', intensity: 4, accent: '#a06a3a', desc: 'Dry, honeyed and warm — pipe-tobacco comfort.' },
  { id: 'oud', name: 'Oud', role: 'heart', family: 'oud', intensity: 5, accent: '#7a4a3a', desc: 'Agarwood — smoky, animalic and intensely precious.' },
  { id: 'coconut', name: 'Coconut', role: 'heart', family: 'gourmand', intensity: 3, accent: '#e8d8b0', desc: 'Creamy, sun-lotion tropical softness.' },
  { id: 'suede', name: 'Suede', role: 'heart', family: 'leather', intensity: 3, accent: '#b08a6a', desc: 'Soft, powdery and refined leather.' },

  // ── BASE NOTES ─────────────────────────────────────────────
  { id: 'sandalwood', name: 'Sandalwood', role: 'base', family: 'woody', intensity: 4, accent: '#c8a06a', desc: 'Creamy, milky and warm — endlessly comforting wood.' },
  { id: 'cedar', name: 'Cedar', role: 'base', family: 'woody', intensity: 3, accent: '#a07a4a', desc: 'Dry, pencil-shaving wood — clean and structural.' },
  { id: 'vetiver', name: 'Vetiver', role: 'base', family: 'woody', intensity: 4, accent: '#6f8a4a', desc: 'Earthy, smoky-green root — sophisticated and grounding.' },
  { id: 'patchouli', name: 'Patchouli', role: 'base', family: 'chypre', intensity: 4, accent: '#6a4a3a', desc: 'Dark, earthy and a little sweet — boho depth.' },
  { id: 'oakmoss', name: 'Oakmoss', role: 'base', family: 'chypre', intensity: 4, accent: '#7a7a4a', desc: 'Damp forest floor — the soul of a chypre.' },
  { id: 'amber', name: 'Amber', role: 'base', family: 'amber', intensity: 4, accent: '#c8924a', desc: 'Golden, resinous and enveloping warmth.' },
  { id: 'vanilla', name: 'Vanilla', role: 'base', family: 'gourmand', intensity: 4, accent: '#d8b87a', desc: 'Sweet, balsamic and comforting — universal cosiness.' },
  { id: 'tonka', name: 'Tonka bean', role: 'base', family: 'gourmand', intensity: 3, accent: '#c89a6a', desc: 'Almond-vanilla warmth with a hay-like softness.' },
  { id: 'caramel', name: 'Salted caramel', role: 'base', family: 'gourmand', intensity: 3, accent: '#c8924a', desc: 'Buttery, burnt-sugar sweetness with a salty edge.' },
  { id: 'musk', name: 'White musk', role: 'base', family: 'musky', intensity: 2, accent: '#cfc4b8', desc: 'Soft, clean and skin-like — the great blender.' },
  { id: 'ambrette', name: 'Ambrette', role: 'base', family: 'musky', intensity: 2, accent: '#d0c4a8', desc: 'Plant musk — pear-skin soft and gently powdery.' },
  { id: 'leather', name: 'Leather', role: 'base', family: 'leather', intensity: 4, accent: '#8a5a4a', desc: 'Smoky, animalic and bold — birch-tar and hide.' },
  { id: 'frankincense', name: 'Frankincense', role: 'base', family: 'amber', intensity: 4, accent: '#8a7a5a', desc: 'Cool, resinous incense smoke — meditative and dry.' },
  { id: 'benzoin', name: 'Benzoin', role: 'base', family: 'amber', intensity: 3, accent: '#c8a06a', desc: 'Sweet, balsamic resin — vanilla-amber warmth.' },
  { id: 'driftwood', name: 'Driftwood', role: 'base', family: 'aquatic', intensity: 3, accent: '#9aa8a0', desc: 'Salt-bleached, dry-marine wood.' },
  { id: 'cashmere-wood', name: 'Cashmere wood', role: 'base', family: 'woody', intensity: 3, accent: '#b8a890', desc: 'Soft, velvety musky-wood — modern and cosy.' }
];

export const ingredientById = Object.fromEntries(ingredients.map((i) => [i.id, i]));
export const ingredientsByRole = {
  top: ingredients.filter((i) => i.role === 'top'),
  heart: ingredients.filter((i) => i.role === 'heart'),
  base: ingredients.filter((i) => i.role === 'base')
};
