import { Solar } from 'lunar-typescript';

const GATE_SEQUENCE = ['休门', '生门', '伤门', '杜门', '景门', '死门', '惊门', '开门'];
const STAR_SEQUENCE = ['天蓬', '天任', '天冲', '天辅', '天英', '天芮', '天柱', '天心'];
const DEITY_SEQUENCE = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'];
const SANQI_LIUYI = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const STEM_SET = new Set(['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']);

const PALACE_CLOCKWISE = [2, 7, 6, 1, 8, 3, 4, 9];
const PALACE_COUNTER_CLOCKWISE = [2, 9, 4, 3, 8, 1, 6, 7];

const BRANCH_NUMBER = {
  子: 1,
  丑: 2,
  寅: 3,
  卯: 4,
  辰: 5,
  巳: 6,
  午: 7,
  未: 8,
  申: 9,
  酉: 10,
  戌: 11,
  亥: 12,
};

const PALACE_BRANCHES = {
  1: ['子'],
  2: ['未', '申'],
  3: ['卯'],
  4: ['辰', '巳'],
  5: [],
  6: ['戌', '亥'],
  7: ['酉'],
  8: ['丑', '寅'],
  9: ['午'],
};

const XUN_SHOU_VOIDNESS = {
  甲子: ['戌', '亥'],
  甲戌: ['申', '酉'],
  甲申: ['午', '未'],
  甲午: ['辰', '巳'],
  甲辰: ['寅', '卯'],
  甲寅: ['子', '丑'],
};

const LIUJIA_XUN = {
  甲子: '戊',
  甲戌: '己',
  甲申: '庚',
  甲午: '辛',
  甲辰: '壬',
  甲寅: '癸',
};

const POSITION_TO_TRIGRAM = {
  1: '坎',
  2: '坤',
  3: '震',
  4: '巽',
  5: '中',
  6: '乾',
  7: '兑',
  8: '艮',
  9: '离',
};

const DEITY_SYMBOL_MAP = {
  值符: '符',
  腾蛇: '蛇',
  螣蛇: '蛇',
  太阴: '阴',
  六合: '六',
  白虎: '白',
  玄武: '玄',
  九地: '地',
  九天: '天',
};

const STAR_SYMBOL_MAP = {
  天蓬: '蓬',
  天任: '任',
  天冲: '冲',
  天辅: '辅',
  天英: '英',
  天芮: '芮',
  天柱: '柱',
  天心: '心',
  天禽: '禽',
};

const ORIGINAL_STAR_BY_POSITION = {
  1: '天蓬',
  2: '天芮',
  3: '天冲',
  4: '天辅',
  5: '天禽',
  6: '天心',
  7: '天柱',
  8: '天任',
  9: '天英',
};

const ORIGINAL_GATE_BY_POSITION = {
  1: '休门',
  2: '死门',
  3: '伤门',
  4: '杜门',
  5: '无门',
  6: '开门',
  7: '惊门',
  8: '生门',
  9: '景门',
};

const PALACE_FIVE_ELEMENTS = {
  坎: '水',
  坤: '土',
  震: '木',
  巽: '木',
  中: '土',
  乾: '金',
  兑: '金',
  艮: '土',
  离: '火',
};

const GATE_FIVE_ELEMENTS = {
  休门: '水',
  生门: '土',
  伤门: '木',
  杜门: '木',
  景门: '火',
  死门: '土',
  惊门: '金',
  开门: '金',
};

const OVERCOME = {
  木: '土',
  土: '水',
  水: '火',
  火: '金',
  金: '木',
};

const STEM_TOMB_BRANCHES = {
  甲: ['未'],
  乙: ['戌'],
  丙: ['戌'],
  丁: ['丑'],
  戊: ['戌'],
  己: ['丑'],
  庚: ['丑'],
  辛: ['辰'],
  壬: ['辰'],
  癸: ['未'],
};

const LIUYI_JIXING = [
  { stem: '戊', palace: 3 },
  { stem: '己', palace: 2 },
  { stem: '庚', palace: 8 },
  { stem: '辛', palace: 9 },
  { stem: '壬', palace: 4 },
  { stem: '癸', palace: 4 },
];

const YANG_DUN_SOLAR_TERMS = new Set([
  '冬至',
  '小寒',
  '大寒',
  '立春',
  '雨水',
  '惊蛰',
  '春分',
  '清明',
  '谷雨',
  '立夏',
  '小满',
  '芒种',
]);

const JIAZI = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥',
];

const TIME_BRANCH_START_HOUR = {
  子: 23,
  丑: 1,
  寅: 3,
  卯: 5,
  辰: 7,
  巳: 9,
  午: 11,
  未: 13,
  申: 15,
  酉: 17,
  戌: 19,
  亥: 21,
};

const FIVE_ZI_START_STEM_BY_HOUR_STEM = {
  甲: '甲',
  己: '甲',
  乙: '丙',
  庚: '丙',
  丙: '戊',
  辛: '戊',
  丁: '庚',
  壬: '庚',
  戊: '壬',
  癸: '壬',
};

const getHourBranchByUtcHour = (hour) => {
  const normalized = ((Number(hour) % 24) + 24) % 24;
  const idx = Math.floor(((normalized + 1) % 24) / 2);
  return BRANCHES[idx] || '子';
};

const getStableDayPillar = (lunar) => {
  // 阴盘奇门子时按子初换日：23:00-00:59 统一视作同一日柱。
  if (lunar && typeof lunar.getDayInGanZhiExact === 'function') {
    const exact = String(lunar.getDayInGanZhiExact() || '').trim();
    if (exact) return exact;
  }
  if (lunar && typeof lunar.getDayInGanZhiExact2 === 'function') {
    const exact2 = String(lunar.getDayInGanZhiExact2() || '').trim();
    if (exact2) return exact2;
  }
  if (lunar && typeof lunar.getDayInGanZhi === 'function') {
    const normal = String(lunar.getDayInGanZhi() || '').trim();
    if (normal) return normal;
  }
  return '-';
};

const buildHourPillarByDayStem = (dayPillar, hourBranch) => {
  const dayStem = String(dayPillar || '').slice(0, 1);
  const startStem = FIVE_ZI_START_STEM_BY_HOUR_STEM[dayStem];
  const branchIdx = BRANCHES.indexOf(hourBranch);
  if (!startStem || branchIdx < 0) return '';
  const startStemIdx = STEMS.indexOf(startStem);
  if (startStemIdx < 0) return '';
  const hourStem = STEMS[(startStemIdx + branchIdx + 10) % 10] || '';
  if (!hourStem) return '';
  return `${hourStem}${hourBranch}`;
};

const normalize = (value, fallback = '-') => {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
};

const splitStems = (text) => String(text || '').split('').filter((ch) => STEM_SET.has(ch));

const mergeStems = (base, extra) => {
  const merged = [...splitStems(base), ...splitStems(extra)];
  const uniq = Array.from(new Set(merged)).join('');
  return uniq || '-';
};

const rotateByStart = (list, start) => {
  const idx = list.indexOf(start);
  if (idx === -1) return [...list];
  return [...list.slice(idx), ...list.slice(0, idx)];
};

const formatDateCn = (date) => {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const h = String(date.getUTCHours()).padStart(2, '0');
  const mm = String(date.getUTCMinutes()).padStart(2, '0');
  return `${y}年${m}月${d}日 ${h}时${mm}分`;
};

const normalizeGateName = (gate) => {
  const text = normalize(gate, '').replaceAll('門', '门').trim();
  if (!text) return '';
  if (GATE_SEQUENCE.includes(text)) return text;
  const first = text.slice(0, 1);
  if ('休生伤杜景死惊开'.includes(first)) return `${first}门`;
  return '';
};

const toGateSymbol = (gate) => {
  const text = normalizeGateName(gate);
  return text ? text.replace('门', '') : '-';
};

const toStarSymbol = (star) => {
  const text = normalize(star, '-');
  if (text === '-') return text;
  return STAR_SYMBOL_MAP[text] || text.replace(/^天/, '').slice(0, 1) || '-';
};

const toDeitySymbol = (deity) => {
  const text = normalize(deity, '-');
  return DEITY_SYMBOL_MAP[text] || text.replaceAll('九', '').replaceAll('值', '').slice(0, 1) || text;
};

const getXunShou = (hourGanZhi) => {
  const idx = JIAZI.indexOf(hourGanZhi);
  if (idx === -1) return '甲子';
  const xunIdx = Math.floor(idx / 10) * 10;
  return JIAZI[xunIdx];
};

const getHourOffsetInXun = (hourGanZhi, xunShou) => {
  const hourIdx = JIAZI.indexOf(hourGanZhi);
  const xunIdx = JIAZI.indexOf(xunShou);
  if (hourIdx === -1 || xunIdx === -1) return 0;
  return (hourIdx - xunIdx + 60) % 10;
};

const shiftPalaceByNine = (startPalace, step, isYang) => {
  const offset = isYang ? step : -step;
  const moved = ((startPalace - 1 + offset) % 9 + 9) % 9 + 1;
  if (moved === 5) return 2;
  return moved;
};

const getKeSlotIndex = (date, hourBranch) => {
  const startHour = TIME_BRANCH_START_HOUR[hourBranch];
  if (startHour === undefined) return 0;
  const nowMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  const startMinutes = startHour * 60;
  const delta = (nowMinutes - startMinutes + 24 * 60) % (24 * 60);
  // 本产品采用每个时辰从第 0 分钟开始、每 10 分钟一刻的口径。
  return Math.floor(delta / 10) % 12;
};

const buildKePillar = (date, hourPillar) => {
  const hourStem = hourPillar.slice(0, 1);
  const hourBranch = hourPillar.slice(1, 2);
  const slot = getKeSlotIndex(date, hourBranch);

  const startStem = FIVE_ZI_START_STEM_BY_HOUR_STEM[hourStem] || '甲';
  const startStemIdx = STEMS.indexOf(startStem);
  const keStem = STEMS[(startStemIdx + slot + 10) % 10];
  const keBranch = BRANCHES[slot % 12];
  return `${keStem}${keBranch}`;
};

const buildEarthOrder = (juNumber, isYang) => {
  const base = isYang ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [9, 8, 7, 6, 5, 4, 3, 2, 1];
  return rotateByStart(base, juNumber);
};

const arrangeEarthStems = (earthOrder) => {
  const result = new Map();
  for (let i = 0; i < 9; i += 1) {
    result.set(earthOrder[i], SANQI_LIUYI[i]);
  }
  return result;
};

const getTimeStemEarthPalace = (earthStems, timeStem, dunStem) => {
  const actualTimeStem = timeStem === '甲' ? dunStem : timeStem;
  let startPos = 1;
  for (const [pos, stem] of earthStems.entries()) {
    if (stem === actualTimeStem) {
      startPos = pos;
      break;
    }
  }
  return startPos;
};

const getTimeStemLuoGong = (earthStems, timeStem, dunStem) => {
  const startPos = getTimeStemEarthPalace(earthStems, timeStem, dunStem);
  return startPos === 5 ? 2 : startPos;
};

const getStarOriginalPalace = (star) => {
  for (const [posText, starName] of Object.entries(ORIGINAL_STAR_BY_POSITION)) {
    if (starName === star) return Number(posText);
  }
  return 1;
};

const arrangeTianPanByZhiFu = (earthStems, zhiFuStar, zhiFuLuoGong) => {
  const startPos = zhiFuLuoGong === 5 ? 2 : zhiFuLuoGong;
  const order = rotateByStart(PALACE_CLOCKWISE, startPos);

  const startStar = zhiFuStar === '天禽' ? '天芮' : zhiFuStar;
  const starOrder = rotateByStart(STAR_SEQUENCE, startStar);

  const stars = new Map();
  const heavenStems = new Map();
  for (let i = 0; i < 8; i += 1) {
    const palace = order[i];
    const star = starOrder[i];
    stars.set(palace, star);
    const originPalace = getStarOriginalPalace(star);
    heavenStems.set(palace, normalize(earthStems.get(originPalace), ''));
  }

  stars.set(5, '天禽');
  heavenStems.set(5, normalize(earthStems.get(5), ''));

  let tianRuiPos = startPos;
  for (const [pos, star] of stars.entries()) {
    if (star === '天芮') {
      tianRuiPos = pos;
      break;
    }
  }

  if (zhiFuStar === '天禽' && startPos !== 5) {
    const centerStem = normalize(earthStems.get(5), '');
    const current = normalize(heavenStems.get(startPos), '');
    heavenStems.set(startPos, mergeStems(current, centerStem));
  }

  return {
    stars,
    heavenStems,
    zhiFuPos: startPos,
    tianRuiPos,
  };
};

const arrangeDeities = (startPos, isYang) => {
  const base = isYang ? PALACE_CLOCKWISE : PALACE_COUNTER_CLOCKWISE;
  const safeStart = base.includes(startPos) ? startPos : 2;
  const order = rotateByStart(base, safeStart);

  const deities = new Map();
  for (let i = 0; i < 8; i += 1) {
    deities.set(order[i], DEITY_SEQUENCE[i]);
  }

  return deities;
};

const arrangeGates = (xunShouPalace, zhiShiGate, hourOffset, isYang) => {
  const zhiShiPos = shiftPalaceByNine(xunShouPalace, hourOffset, isYang);

  const order = rotateByStart(PALACE_CLOCKWISE, zhiShiPos);
  const gateStartIdx = GATE_SEQUENCE.indexOf(zhiShiGate);
  const idx0 = gateStartIdx >= 0 ? gateStartIdx : 0;

  const gates = new Map();
  for (let i = 0; i < 8; i += 1) {
    gates.set(order[i], GATE_SEQUENCE[(idx0 + i) % 8]);
  }
  gates.set(5, '无门');

  return { gates, zhiShiPos };
};

const arrangeHiddenStems = (zhiShiPos, timeStemEarthPos, timeStem, earthStems, isYang) => {
  // 引干与值使宫地盘干相同（半伏吟/全伏吟）时，须改为时干入中宫飞布。
  // 若仍按八宫转排，引干会与地盘或天地盘完全重合，失去阴盘引干的作用。
  if (normalize(earthStems.get(zhiShiPos), '').includes(timeStem)) {
    const stemOrder = rotateByStart(SANQI_LIUYI, timeStem);
    const palaceOrder = isYang
      ? [5, 6, 7, 8, 9, 1, 2, 3, 4]
      : [5, 4, 3, 2, 1, 9, 8, 7, 6];
    const flyingHidden = new Map();
    for (let i = 0; i < palaceOrder.length; i += 1) {
      flyingHidden.set(palaceOrder[i], stemOrder[i]);
    }
    return applyCenterJiGong(flyingHidden);
  }

  const hidden = new Map();
  const cycle = isYang ? PALACE_CLOCKWISE : PALACE_COUNTER_CLOCKWISE;
  const safeWriteStart = cycle.includes(zhiShiPos) ? zhiShiPos : 2;
  const safeReadStart = cycle.includes(timeStemEarthPos) ? timeStemEarthPos : 2;
  const writeOrder = rotateByStart(cycle, safeWriteStart);
  const readOrder = rotateByStart(cycle, safeReadStart);

  for (let i = 0; i < 8; i += 1) {
    hidden.set(writeOrder[i], normalize(earthStems.get(readOrder[i]), ''));
  }
  hidden.set(5, normalize(earthStems.get(5), ''));

  return hidden;
};

const applyCenterJiGong = (earthStems) => {
  const result = new Map(earthStems);
  const centerEarth = normalize(result.get(5), '');
  if (centerEarth) {
    const kunEarth = normalize(result.get(2), '');
    result.set(2, mergeStems(kunEarth, centerEarth));
  }
  result.set(5, '');
  return result;
};

const getHorseByHourBranch = (hourBranch) => {
  if ('亥卯未'.includes(hourBranch)) return { branch: '巳', position: 4 };
  if ('申子辰'.includes(hourBranch)) return { branch: '寅', position: 8 };
  if ('寅午戌'.includes(hourBranch)) return { branch: '申', position: 2 };
  if ('巳酉丑'.includes(hourBranch)) return { branch: '亥', position: 6 };
  return { branch: '-', position: -1 };
};

const getVoidPalaceSet = (voidBranches) => {
  const result = new Set();
  for (const [posRaw, branches] of Object.entries(PALACE_BRANCHES)) {
    const pos = Number(posRaw);
    if (branches.some((b) => voidBranches.includes(b))) {
      result.add(pos);
    }
  }
  return result;
};

const BRANCH_TO_PALACES = Object.freeze(
  Object.entries(PALACE_BRANCHES).reduce((acc, [posText, branches]) => {
    const pos = Number(posText);
    (Array.isArray(branches) ? branches : []).forEach((branch) => {
      if (!acc[branch]) acc[branch] = [];
      if (!acc[branch].includes(pos)) acc[branch].push(pos);
    });
    return acc;
  }, {})
);

const mapBranchToPalaces = (branchText) => {
  const branch = String(branchText || '').trim();
  if (!branch) return [];
  return Array.isArray(BRANCH_TO_PALACES[branch]) ? [...BRANCH_TO_PALACES[branch]].sort((a, b) => a - b) : [];
};

const buildFourGangPalaceMap = (mode, yearPillar, monthPillar, dayPillar, hourPillar, kePillar) => {
  const source = mode === 'ke'
    ? [
      ['month', '月', monthPillar],
      ['day', '日', dayPillar],
      ['hour', '时', hourPillar],
      ['ke', '刻', kePillar],
    ]
    : [
      ['year', '年', yearPillar],
      ['month', '月', monthPillar],
      ['day', '日', dayPillar],
      ['hour', '时', hourPillar],
    ];
  const result = {};
  const items = source.map(([key, label, pillar]) => {
    const branch = String(pillar || '').slice(1, 2) || '';
    const item = { key, label, branch, palaces: mapBranchToPalaces(branch) };
    result[key] = { label, branch, palaces: item.palaces };
    return item;
  });
  result.items = items;
  return result;
};

const isStemInTomb = (stemText, palaceBranches) => {
  const stems = splitStems(stemText);
  return stems.some((stem) => {
    const tombBranches = STEM_TOMB_BRANCHES[stem] || [];
    return palaceBranches.some((b) => tombBranches.includes(b));
  });
};

const hasJiXingByStem = (position, stemText) => {
  const stems = splitStems(stemText);
  return LIUYI_JIXING.some((cond) => cond.palace === position && stems.includes(cond.stem));
};

const isMenPo = (position, gateName) => {
  if (position === 5) return false;
  const trigram = POSITION_TO_TRIGRAM[position];
  const palaceElement = PALACE_FIVE_ELEMENTS[trigram];
  const gateElement = GATE_FIVE_ELEMENTS[gateName];
  if (!palaceElement || !gateElement) return false;
  return OVERCOME[gateElement] === palaceElement;
};

const emptyPalace = (position) => ({
  position,
  trigram: POSITION_TO_TRIGRAM[position] || '-',
  deitySymbol: '',
  gateSymbol: '',
  starSymbol: '',
  heavenlyStem: '',
  earthlyStem: '',
  leadStem: '',
  hasVoid: false,
  hasTomb: false,
  hasXing: false,
  heavenlyHasXing: false,
  earthlyHasXing: false,
  earthlyHasXingByFuYin: false,
  hasMenPo: false,
  heavenlyInTomb: false,
  earthlyInTomb: false,
  isHorse: false,
  isZhiFu: false,
  isZhiShi: false,
});

const getLateZiReferenceLunar = (date, hourBranch, currentLunar) => {
  if (hourBranch !== '子') return currentLunar;
  // 仅在晚子时（23:00-23:59）按次日取局，避免早子时（00:00-00:59）重复跨日。
  if (date.getUTCHours() !== 23) return currentLunar;
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  const nextSolar = Solar.fromYmdHms(
    nextDate.getUTCFullYear(),
    nextDate.getUTCMonth() + 1,
    nextDate.getUTCDate(),
    nextDate.getUTCHours(),
    nextDate.getUTCMinutes(),
    nextDate.getUTCSeconds(),
  );
  return nextSolar.getLunar();
};

const buildPanResult = (date, mode, question, options) => {
  const solar = Solar.fromYmdHms(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  const lunar = solar.getLunar();

  const yearPillar = lunar.getYearInGanZhiExact();
  const monthPillar = lunar.getMonthInGanZhiExact();
  const dayPillar = getStableDayPillar(lunar);
  const clockHourBranch = getHourBranchByUtcHour(date.getUTCHours());
  const fallbackHourPillar = String(lunar.getTimeInGanZhi() || '').trim();
  const hourPillar = buildHourPillarByDayStem(dayPillar, clockHourBranch) || fallbackHourPillar || `甲${clockHourBranch}`;
  const hourBranch = hourPillar.slice(1, 2) || clockHourBranch;
  const keSlot = getKeSlotIndex(date, hourBranch);
  const kePillar = mode === 'ke' ? buildKePillar(date, hourPillar) : undefined;
  const activePillar = mode === 'ke' && kePillar ? kePillar : hourPillar;
  const activeStem = activePillar.slice(0, 1);
  const activeBranch = activePillar.slice(1, 2);

  const yearBranch = yearPillar.slice(1, 2);

  const lateZiRefLunar = getLateZiReferenceLunar(date, hourBranch, lunar);
  const juRefLunar = lateZiRefLunar;
  const lunarMonth = Math.abs(juRefLunar.getMonth());
  const lunarDay = juRefLunar.getDay();

  const solarTerm = lunar.getPrevJieQi(false)?.getName() || '-';
  const isYang = YANG_DUN_SOLAR_TERMS.has(solarTerm);

  const branchYearNum = BRANCH_NUMBER[yearBranch] || 0;
  const branchHourNum = BRANCH_NUMBER[hourBranch] || 0;
  let juNumber = (branchYearNum + branchHourNum + lunarMonth + lunarDay) % 9;
  if (juNumber === 0) juNumber = 9;

  if (mode === 'ke') {
    const keOffset = keSlot + 1;
    // 刻盘在时盘局数上按第 1～12 刻连续递增；阴阳遁只控制排布方向。
    juNumber = ((juNumber - 1 + keOffset) % 9 + 9) % 9 + 1;
  }

  const manualJu = options?.manualJu;
  if (typeof manualJu === 'number' && manualJu >= 1 && manualJu <= 9) {
    juNumber = manualJu;
  }

  const earthOrder = buildEarthOrder(juNumber, isYang);
  const earthStems = arrangeEarthStems(earthOrder);
  const earthStemsWithJiGong = applyCenterJiGong(earthStems);

  const xunShou = getXunShou(activePillar);
  const dunStem = LIUJIA_XUN[xunShou] || '戊';

  let xunShouPalace = 1;
  for (const [pos, stem] of earthStems.entries()) {
    if (stem === dunStem) {
      xunShouPalace = pos;
      break;
    }
  }

  const zhiFuStar = ORIGINAL_STAR_BY_POSITION[xunShouPalace] || '天蓬';
  const zhiShiGate = xunShouPalace === 5
    ? '死门'
    : (ORIGINAL_GATE_BY_POSITION[xunShouPalace] || '休门');

  const hourOffset = getHourOffsetInXun(activePillar, xunShou);
  const { gates, zhiShiPos } = arrangeGates(xunShouPalace, zhiShiGate, hourOffset, isYang);
  const timeStemEarthPos = getTimeStemEarthPalace(earthStems, activeStem, dunStem);
  const zhiFuLuoGong = getTimeStemLuoGong(earthStems, activeStem, dunStem);
  const { stars, heavenStems, zhiFuPos, tianRuiPos } = arrangeTianPanByZhiFu(earthStems, zhiFuStar, zhiFuLuoGong);
  const deities = arrangeDeities(zhiFuLuoGong, isYang);
  const hiddenStems = arrangeHiddenStems(
    zhiShiPos,
    timeStemEarthPos,
    activeStem === '甲' ? dunStem : activeStem,
    earthStemsWithJiGong,
    isYang,
  );
  const isFuYin = zhiFuPos === zhiShiPos;

  const centerHeaven = heavenStems.get(5) || '';
  if (centerHeaven) {
    const targetPos = tianRuiPos === 5 ? 2 : tianRuiPos;
    const targetHeaven = heavenStems.get(targetPos) || '';
    heavenStems.set(targetPos, mergeStems(targetHeaven, centerHeaven));
  }
  heavenStems.set(5, '');
  hiddenStems.set(5, '');

  const voidBranches = XUN_SHOU_VOIDNESS[xunShou] || ['-', '-'];
  const voidPalaceSet = getVoidPalaceSet(voidBranches);

  const horse = getHorseByHourBranch(activeBranch);

  const palaces = new Map();
  for (let pos = 1; pos <= 9; pos += 1) {
    if (pos === 5) {
      palaces.set(5, {
        ...emptyPalace(5),
        trigram: '',
      });
      continue;
    }

    const gateName = normalizeGateName(gates.get(pos));
    const heavenlyStem = normalize(heavenStems.get(pos), '');
    const earthlyStem = normalize(earthStemsWithJiGong.get(pos), '');
    const leadStem = normalize(hiddenStems.get(pos), '');
    const starName = normalize(stars.get(pos), '-');
    const deityName = normalize(deities.get(pos), '-');
    const palaceBranches = PALACE_BRANCHES[pos] || [];

    const heavenlyInTomb = isStemInTomb(heavenlyStem, palaceBranches);
    const earthlyInTomb = isStemInTomb(earthlyStem, palaceBranches);
    const hasTomb = heavenlyInTomb || earthlyInTomb;

    const heavenlyHasXing = hasJiXingByStem(pos, heavenlyStem);
    const earthlyHasXingRaw = hasJiXingByStem(pos, earthlyStem);
    const earthlyHasXingByFuYin = false;
    const earthlyHasXing = earthlyHasXingRaw;
    const hasXing = heavenlyHasXing || earthlyHasXing;
    const hasMenPo = isMenPo(pos, gateName);

    palaces.set(pos, {
      position: pos,
      trigram: POSITION_TO_TRIGRAM[pos] || '-',
      deitySymbol: toDeitySymbol(deityName),
      gateSymbol: toGateSymbol(gateName),
      starSymbol: toStarSymbol(starName),
      heavenlyStem,
      earthlyStem,
      leadStem,
      hasVoid: voidPalaceSet.has(pos),
      hasTomb,
      hasXing,
      heavenlyHasXing,
      earthlyHasXing,
      earthlyHasXingByFuYin,
      hasMenPo,
      heavenlyInTomb,
      earthlyInTomb,
      isHorse: horse.position === pos,
      isZhiFu: pos === zhiFuPos,
      isZhiShi: pos === zhiShiPos,
    });
  }

  const modeText = mode === 'ke'
    ? `${formatDateCn(date)} 第${keSlot + 1}刻`
    : formatDateCn(date);
  const fourGangPalaceMap = buildFourGangPalaceMap(
    mode,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    kePillar,
  );

  return {
    mode,
    question,
    dateText: formatDateCn(date),
    timeNodeText: modeText,
    lunarText: lateZiRefLunar.toString(),
    solarTermText: solarTerm,
    juText: `${isYang ? '阳遁' : '阴遁'}${juNumber}局`,
    yuanText: '-',
    xunShou: `${xunShou}${dunStem}`,
    zhiFu: zhiFuStar,
    zhiShi: zhiShiGate,
    kongText: `${voidBranches[0]}${voidBranches[1]}`,
    maText: horse.position > 0 ? `${horse.branch}（${POSITION_TO_TRIGRAM[horse.position]}${horse.position}宫）` : horse.branch,
    horsePosition: horse.position,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    kePillar,
    tombBranchMap: STEM_TOMB_BRANCHES,
    palaceBranchMap: PALACE_BRANCHES,
    branchPalaceMap: BRANCH_TO_PALACES,
    fourGangPalaceMap,
    palaces,
  };
};

const serializePanResult = (pan) => ({
  ...pan,
  palaces: Array.from(pan.palaces.entries()),
});

const parseDateTimeLocalUtc = (value) => {
  if (typeof value !== 'string') return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})$/);
  if (!match) return null;

  const [, y, m, d, h, mm] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  const hour = Number(h);
  const minute = Number(mm);

  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));
  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
    || date.getUTCHours() !== hour
    || date.getUTCMinutes() !== minute
  ) {
    return null;
  }
  return date;
};

const getDayOfYearUtc = (date) => {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const current = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((current - start) / 86400000);
};

const calcTrueSolarAdjust = (clockDate, location, timezoneOffsetMinutes = 0) => {
  const dayIndex = getDayOfYearUtc(clockDate);
  const b = (2 * Math.PI * (dayIndex - 81)) / 364;
  const equationMinutes = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const timezoneOffsetHours = -Number(timezoneOffsetMinutes || 0) / 60;
  const timezoneMeridian = timezoneOffsetHours * 15;
  const longitudeCorrectionMinutes = 4 * (location.lng - timezoneMeridian);
  const deltaMinutes = longitudeCorrectionMinutes + equationMinutes;

  const adjustedDate = new Date(clockDate.getTime() + deltaMinutes * 60000);
  return {
    deltaMinutes,
    equationMinutes,
    longitudeCorrectionMinutes,
    timezoneMeridian,
    sourceDateText: formatDateCn(clockDate),
    adjustedDateText: formatDateCn(adjustedDate),
    location: {
      lat: Number(location.lat),
      lng: Number(location.lng),
      accuracy: Number.isFinite(Number(location.accuracy)) ? Number(location.accuracy) : undefined,
      fetchedAt: Number.isFinite(Number(location.fetchedAt)) ? Number(location.fetchedAt) : Date.now(),
    },
  };
};

export function calculatePan(payload) {
  const mode = payload?.panMode === 'ke' ? 'ke' : 'hour';
  const question = typeof payload?.question === 'string' ? payload.question.trim() : '';
  const inputDate = parseDateTimeLocalUtc(payload?.dateTime);
  if (!inputDate) {
    const err = new Error('排盘时间格式无效。');
    err.code = 400;
    throw err;
  }
  const sourceDate = new Date(inputDate);

  const safeKe = Math.max(0, Math.min(5, Number(payload?.keIndex) || 0));
  if (mode === 'ke') {
    sourceDate.setUTCMinutes(safeKe * 10, 0, 0);
  }

  let calcDate = new Date(sourceDate);
  let trueSolarInfo = null;

  const useTrueSolarTime = payload?.useTrueSolarTime === true;
  if (useTrueSolarTime) {
    const loc = payload?.location;
    const lat = Number(loc?.lat);
    const lng = Number(loc?.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      const err = new Error('未获取定位，无法计算真太阳时');
      err.code = 400;
      throw err;
    }
    trueSolarInfo = calcTrueSolarAdjust(inputDate, loc, Number(payload?.timezoneOffsetMinutes) || 0);
    calcDate = new Date(sourceDate.getTime() + trueSolarInfo.deltaMinutes * 60000);
  }

  const rawManualJu = payload?.manualJu;
  const hasManualJu = rawManualJu !== null
    && rawManualJu !== undefined
    && String(rawManualJu).trim() !== ''
    && Number.isFinite(Number(rawManualJu));
  const manualJu = hasManualJu
    ? Math.max(1, Math.min(9, Number(rawManualJu)))
    : null;

  const pan = buildPanResult(calcDate, mode, question, { manualJu });
  if (mode === 'ke') {
    pan.dateText = formatDateCn(inputDate);
    const calcHourBranch = pan.hourPillar.slice(1, 2) || getHourBranchByUtcHour(calcDate.getUTCHours());
    const calcKeSlot = getKeSlotIndex(calcDate, calcHourBranch);
    pan.timeNodeText = `${formatDateCn(inputDate)} 第${calcKeSlot + 1}刻`;
  }

  return {
    pan: serializePanResult(pan),
    trueSolarInfo,
    sourceDateTime: formatDateCn(inputDate),
    calcDateTime: formatDateCn(calcDate),
    mode,
    keIndex: safeKe,
  };
}
