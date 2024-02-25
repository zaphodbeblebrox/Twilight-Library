export type TypeNames = {
  first_name: string;
  last_name: string;
  nickname: string;
}

export type TypeChecks = {
  is_retired: boolean;
  is_dead: boolean;
  is_male: boolean;
  has_lifetime_reroll: boolean;
  skip_next_hunt: boolean;
  cannot_use_fighting_arts: boolean;
}

export type TypeAttributes = {
  hunt_xp: number;
  survival: number;
  insanity: number;
  lumi: number;
  movement: number;
  accuracy: number;
  strength: number;
  evasion: number;
  luck: number;
  speed: number;
  systemic_pressure: number;
  torment: number;
  courage: number;
  understanding: number;
}

export type TypeAbilities = {
  fighting_arts: string[];
  secret_fighting_art: string[];
  disorders: string[];
  abilities_impairments: string[];
}

export type TypeKnowledge = {
  philosophy: string|null;
  philosophy_rank: number|null;
  knowledges: { name: string; observation: number }[];
}

export type TypeServerSurvivor = TypeNames & TypeChecks & TypeAttributes & TypeAbilities & TypeKnowledge & {
  id: number;
  player_creator: string;
  mother: string;
  father: string;
  death_story: string;
  weapon_type: string|null;
  weapon_xp: number;
};
