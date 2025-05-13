export type BottleSize =
  | 'SPLIT_187ML'
  | 'HALF_375ML'
  | 'STANDARD_750ML'
  | 'MAGNUM_1_5L'
  | 'JEROBOAM_3L'
  | 'REHOBOAM_4_5L'
  | 'METHUSELAH_6L'
  | 'SALMANAZAR_9L'
  | 'BALTHAZAR_12L'
  | 'NEBUCHADNEZZAR_15L'
  | 'SOLOMON_18L'
  | 'MELCHIOR_18L'
  | 'SOVEREIGN_26_25L'
  | 'GOLIATH_27L'
  | 'PRIMAT_27L'
  | 'MELCHIZEDEK_30L'
  | 'OTHER'

export const bottleSizeLabels: Record<BottleSize, string> = {
  SPLIT_187ML: 'Split (187 ml)',
  HALF_375ML: 'Half Bottle (375 ml)',
  STANDARD_750ML: 'Standard (750 ml)',
  MAGNUM_1_5L: 'Magnum (1.5 L)',
  JEROBOAM_3L: 'Jeroboam (3 L)',
  REHOBOAM_4_5L: 'Rehoboam (4.5 L)',
  METHUSELAH_6L: 'Methuselah (6 L)',
  SALMANAZAR_9L: 'Salmanazar (9 L)',
  BALTHAZAR_12L: 'Balthazar (12 L)',
  NEBUCHADNEZZAR_15L: 'Nebuchadnezzar (15 L)',
  SOLOMON_18L: 'Solomon (18 L)',
  MELCHIOR_18L: 'Melchior (18 L)',
  SOVEREIGN_26_25L: 'Sovereign (26.25 L)',
  GOLIATH_27L: 'Goliath (27 L)',
  PRIMAT_27L: 'Primat (27 L)',
  MELCHIZEDEK_30L: 'Melchizedek (30 L)',
  OTHER: 'Other',
}
