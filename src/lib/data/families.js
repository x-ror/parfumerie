// Scent family taxonomy used across the quiz, scoring engine and UI.
export const FAMILIES = {
  citrus: { label: 'Citrus', emoji: '🍋', accent: '#e8c97a', blurb: 'Bright, zesty and effervescent — lemon, bergamot, grapefruit.' },
  floral: { label: 'Floral', emoji: '🌸', accent: '#e89ab0', blurb: 'Petals and bouquets — rose, jasmine, peony, tuberose.' },
  fruity: { label: 'Fruity', emoji: '🍑', accent: '#e8956a', blurb: 'Juicy and ripe — peach, blackcurrant, apple, pear.' },
  green: { label: 'Green', emoji: '🍃', accent: '#8fae6a', blurb: 'Crushed leaves, stems and dewy grass — fresh and vivid.' },
  aquatic: { label: 'Aquatic', emoji: '🌊', accent: '#6aa8c8', blurb: 'Sea spray, ozone and rain — clean and breezy.' },
  aromatic: { label: 'Aromatic', emoji: '🌿', accent: '#7fae8a', blurb: 'Herbs and barber-shop freshness — lavender, sage, mint.' },
  spicy: { label: 'Spicy', emoji: '🌶️', accent: '#c8694a', blurb: 'Warm and piquant — cardamom, pepper, cinnamon, clove.' },
  woody: { label: 'Woody', emoji: '🪵', accent: '#a07a4a', blurb: 'Dry and grounding — sandalwood, cedar, vetiver.' },
  amber: { label: 'Amber', emoji: '🟠', accent: '#c8924a', blurb: 'Resinous and golden warmth — amber, labdanum, benzoin.' },
  gourmand: { label: 'Gourmand', emoji: '🍯', accent: '#c89a6a', blurb: 'Edible and sweet — vanilla, caramel, chocolate, coffee.' },
  chypre: { label: 'Chypre', emoji: '🍂', accent: '#8a8a5a', blurb: 'Mossy, earthy elegance — oakmoss, patchouli, citrus.' },
  leather: { label: 'Leather', emoji: '🧥', accent: '#8a5a4a', blurb: 'Smoky, animalic and bold — suede, birch tar, tobacco.' },
  musky: { label: 'Musky', emoji: '🤍', accent: '#cfc4b8', blurb: 'Soft, skin-like and intimate — white musk, ambrette.' },
  oud: { label: 'Oud', emoji: '🟤', accent: '#7a4a3a', blurb: 'Rich, deep and opulent — agarwood, resins, spice.' }
};

export const familyList = Object.entries(FAMILIES).map(([id, v]) => ({ id, ...v }));

export const CHARACTER = {
  fresh: 'Fresh & clean',
  bold: 'Bold & loud',
  elegant: 'Elegant & refined',
  cozy: 'Warm & cozy',
  mysterious: 'Dark & mysterious',
  playful: 'Playful & sweet',
  romantic: 'Soft & romantic',
  natural: 'Earthy & natural'
};

export const SEASONS = {
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  winter: 'Winter'
};

export const OCCASIONS = {
  everyday: 'Everyday',
  office: 'Office',
  date: 'Date night',
  special: 'Special occasion',
  sport: 'Active / sport'
};
