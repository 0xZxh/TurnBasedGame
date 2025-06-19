export enum EffectSelTag {
  dft = 'dft',
  skill = 'skill',
  askill = 'askill',
  askill_a = 'askill_a',
  askill_fist_hurt = 'askill_fist_hurt',
  fist_eft = 'fist_eft',
  fist_hurt = 'fist_hurt',
  last_eft = 'last_eft',
  askill_eft_one = 'askill_eft_one',
  zi = 'zi',
  zi_huo = 'zi_huo',
  zi_zi_aoe = 'zi_zi_aoe',
  zi_di_aoe = 'zi_di_aoe',
  di_huo = 'di_huo',
  di_n = 'di_n',
  di_f = 'di_f',
  di_j = 'di_j',
  di_hp_low = 'di_hp_low',
  zi_hp_low = 'zi_hp_low',
  skill_di_aoe = 'skill_di_aoe',
  skill_zi_aoe = 'skill_zi_aoe',
  skill_di_mf_aoe = 'skill_di_mf_aoe',
  skill_di_rect = 'skill_di_rect',
  skill_zi_rect = 'skill_zi_rect',
  bulle = 'bulle',
  bulle_aoe = 'bulle_aoe'
}

export enum SkillType {
  pt = 'pt',
  dz = 'dz',
  bsk = 'bsk'
}

export enum EffectType {
  hurt_p = 'hurt_p',
  hurt_m = 'hurt_m',
  hurt_p_dz = 'hurt_p_dz',
  hurt_m_dz = 'hurt_m_dz',
  hurt3 = 'hurt3',
  add_buff = 'add_buff',
  add_buff_absorb = 'add_buff_absorb',
  del_buff = 'del_buff',
  heal = 'heal',
  move = 'move',
  call = 'call',
  attr = 'attr'
}

export enum BuffType {
  attr = 'attr',
  dot = 'dot',
  xuanyun = 'xuanyun',
  hurt_ex = 'hurt_ex',
  hurt_per = 'hurt_per',
  absorb = 'absorb',
  rebound = 'rebound',
  defBuff = 'defBuff',
  qishi_shanghai = 'qishi_shanghai',
  mpoff = 'mpoff',
  changeSkill = 'changeSkill'
}

export enum SkillStage {
  start = 'start',
  fang = 'fang',
  hit = 'hit',
  stop = 'stop'
}

export enum PassDo {
  create = 'create',
  neal_die = 'neal_die',
  die = 'die',
  kill = 'kill',
  otherDie = 'otherDie',
  buff_attr = 'buff_attr',
  buff_dot = 'buff_dot',
  at_s_pt = 'at_s_pt',
  at_e_pt = 'at_e_pt',
  at_e_mp = 'at_e_mp',
  hurt_a_f_s = 'hurt_a_f_s',
  hurt_a_s = 'hurt_a_s',
  hurt_a_e = 'hurt_a_e',
  hurt_b_e = 'hurt_b_e',
  hurt_a_e_pt = 'hurt_a_e_pt',
  hurt_a_e_bj = 'hurt_a_e_bj',
  shanbi_b_e = 'shanbi_b_e',
  subhp_b_e = 'subhp_b_e',
  heal_b_e = 'heal_b_e',
  changeSkill = 'changeSkill'
}

export interface PassParam {
  hpLow: number
  hpHig: number
  limit: number
  skills: number[]
  haveBuffZid: number
}

export interface CondParam {
  buff?: {
    type?: BuffType
    zid?: string
    id?: string
    notHave?: 0 | 1
  }
  isbuff?: {
    type?: BuffType
    isgood?: number
  }
  hpLow?: number
  hpLow_b?: number
  hpHight?: number
}
