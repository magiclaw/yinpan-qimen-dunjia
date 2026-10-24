import assert from 'node:assert/strict';
import { calculatePan } from '../src/pan-engine.js';

const summarize = (request) => {
  const result = calculatePan(request);
  const pan = result.pan;
  return {
    pillars: [
      pan.yearPillar,
      pan.monthPillar,
      pan.dayPillar,
      pan.hourPillar,
      ...(result.mode === 'ke' ? [pan.kePillar] : []),
    ],
    juText: pan.juText,
    xunShou: pan.xunShou,
    zhiFu: pan.zhiFu,
    zhiFuPosition: pan.palaces.find((item) => item[1].isZhiFu)?.[0] || 0,
    zhiShi: pan.zhiShi,
    zhiShiPosition: pan.palaces.find((item) => item[1].isZhiShi)?.[0] || 0,
    kongText: pan.kongText,
    horseBranch: String(pan.maText || '').slice(0, 1),
    timeNodeText: pan.timeNodeText,
  };
};

const cases = [
  {
    id: 'ordinary-yang-hour',
    request: { dateTime: '2024-04-30T10:00', panMode: 'hour', keIndex: 0 },
    expected: {
      pillars: ['甲辰', '戊辰', '甲子', '己巳'],
      juText: '阳遁9局', xunShou: '甲子戊', zhiFu: '天英', zhiFuPosition: 1,
      zhiShi: '景门', zhiShiPosition: 2, kongText: '戌亥', horseBranch: '亥',
      timeNodeText: '2024年04月30日 10时00分',
    },
  },
  {
    id: 'ordinary-yang-ke',
    request: { dateTime: '2024-04-30T10:00', panMode: 'ke', keIndex: 0 },
    expected: {
      pillars: ['甲辰', '戊辰', '甲子', '己巳', '庚午'],
      juText: '阳遁7局', xunShou: '甲子戊', zhiFu: '天柱', zhiFuPosition: 9,
      zhiShi: '惊门', zhiShiPosition: 4, kongText: '戌亥', horseBranch: '申',
      timeNodeText: '2024年04月30日 10时00分 第7刻',
    },
  },
  {
    id: 'summer-solstice-yin-ke',
    request: { dateTime: '2024-06-21T05:10', panMode: 'ke', keIndex: 1 },
    expected: {
      pillars: ['甲辰', '庚午', '丙辰', '辛卯', '己丑'],
      juText: '阴遁5局', xunShou: '甲申庚', zhiFu: '天冲', zhiFuPosition: 4,
      zhiShi: '伤门', zhiShiPosition: 7, kongText: '午未', horseBranch: '亥',
      timeNodeText: '2024年06月21日 05时10分 第2刻',
    },
  },
  {
    id: 'ordinary-yin-ke',
    request: { dateTime: '2024-07-15T14:30', panMode: 'ke', keIndex: 3 },
    expected: {
      pillars: ['甲辰', '辛未', '庚辰', '癸未', '辛酉'],
      juText: '阴遁3局', xunShou: '甲寅癸', zhiFu: '天柱', zhiFuPosition: 9,
      zhiShi: '惊门', zhiShiPosition: 9, kongText: '子丑', horseBranch: '亥',
      timeNodeText: '2024年07月15日 14时30分 第10刻',
    },
  },
  {
    id: 'current-yin-ke',
    request: { dateTime: '2026-07-21T19:20', panMode: 'ke', keIndex: 2 },
    expected: {
      pillars: ['丙午', '乙未', '丙申', '戊戌', '甲寅'],
      juText: '阴遁8局', xunShou: '甲寅癸', zhiFu: '天冲', zhiFuPosition: 3,
      zhiShi: '伤门', zhiShiPosition: 3, kongText: '子丑', horseBranch: '申',
      timeNodeText: '2026年07月21日 19时20分 第3刻',
    },
  },
  {
    id: 'late-zi-hour',
    request: { dateTime: '2024-04-30T23:00', panMode: 'hour', keIndex: 0 },
    expected: {
      pillars: ['甲辰', '戊辰', '乙丑', '丙子'],
      juText: '阳遁5局', xunShou: '甲戌己', zhiFu: '天心', zhiFuPosition: 3,
      zhiShi: '开门', zhiShiPosition: 8, kongText: '申酉', horseBranch: '寅',
      timeNodeText: '2024年04月30日 23时00分',
    },
  },
  {
    id: 'early-zi-hour',
    request: { dateTime: '2024-05-01T00:00', panMode: 'hour', keIndex: 0 },
    expected: {
      pillars: ['甲辰', '戊辰', '乙丑', '丙子'],
      juText: '阳遁5局', xunShou: '甲戌己', zhiFu: '天心', zhiFuPosition: 3,
      zhiShi: '开门', zhiShiPosition: 8, kongText: '申酉', horseBranch: '寅',
      timeNodeText: '2024年05月01日 00时00分',
    },
  },
  {
    id: 'late-zi-ke',
    request: { dateTime: '2024-04-30T23:00', panMode: 'ke', keIndex: 0 },
    expected: {
      pillars: ['甲辰', '戊辰', '乙丑', '丙子', '戊子'],
      juText: '阳遁6局', xunShou: '甲申庚', zhiFu: '天任', zhiFuPosition: 6,
      zhiShi: '生门', zhiShiPosition: 3, kongText: '午未', horseBranch: '寅',
      timeNodeText: '2024年04月30日 23时00分 第1刻',
    },
  },
  {
    id: 'early-zi-ke',
    request: { dateTime: '2024-05-01T00:00', panMode: 'ke', keIndex: 0 },
    expected: {
      pillars: ['甲辰', '戊辰', '乙丑', '丙子', '甲午'],
      juText: '阳遁3局', xunShou: '甲午辛', zhiFu: '天心', zhiFuPosition: 6,
      zhiShi: '开门', zhiShiPosition: 6, kongText: '辰巳', horseBranch: '申',
      timeNodeText: '2024年05月01日 00时00分 第7刻',
    },
  },
  {
    id: 'true-solar-ke-boundary',
    request: {
      dateTime: '2024-04-30T09:00', panMode: 'ke', keIndex: 0,
      useTrueSolarTime: true, timezoneOffsetMinutes: -480,
      location: { lat: 31, lng: 121 },
    },
    expected: {
      pillars: ['甲辰', '戊辰', '甲子', '己巳', '甲子'],
      juText: '阳遁1局', xunShou: '甲子戊', zhiFu: '天蓬', zhiFuPosition: 1,
      zhiShi: '休门', zhiShiPosition: 1, kongText: '戌亥', horseBranch: '寅',
      timeNodeText: '2024年04月30日 09时00分 第1刻',
    },
  },
];

for (const testCase of cases) {
  assert.deepEqual(summarize(testCase.request), testCase.expected, testCase.id);
  console.log(`PASS ${testCase.id}`);
}

const leadStemCases = [
  {
    id: 'yang-full-fuyin-lead-stems',
    request: { dateTime: '2024-05-01T00:00', panMode: 'ke', keIndex: 0 },
    expected: { 1: '乙', 2: '戊辛', 3: '己', 4: '庚', 6: '壬', 7: '癸', 8: '丁', 9: '丙' },
  },
  {
    id: 'yin-half-fuyin-lead-stems',
    request: { dateTime: '2024-07-15T14:30', panMode: 'ke', keIndex: 3 },
    expected: { 1: '丙', 2: '丁辛', 3: '癸', 4: '壬', 6: '庚', 7: '己', 8: '戊', 9: '乙' },
  },
  {
    id: 'yang-half-fuyin-lead-stems',
    request: { dateTime: '2024-02-04T17:10', panMode: 'hour', keIndex: 1 },
    expected: { 1: '乙', 2: '戊辛', 3: '己', 4: '庚', 6: '壬', 7: '癸', 8: '丁', 9: '丙' },
  },
  {
    id: 'yin-full-fuyin-lead-stems',
    request: { dateTime: '2026-07-21T19:20', panMode: 'ke', keIndex: 2 },
    expected: { 1: '戊', 2: '乙癸', 3: '丙', 4: '丁', 6: '壬', 7: '辛', 8: '庚', 9: '己' },
  },
];

for (const testCase of leadStemCases) {
  const pan = calculatePan(testCase.request).pan;
  const actual = Object.fromEntries(
    pan.palaces.filter(([position]) => position !== 5).map(([position, palace]) => [position, palace.leadStem]),
  );
  assert.deepEqual(actual, testCase.expected, testCase.id);
  console.log(`PASS ${testCase.id}`);
}

console.log(`阴盘时盘/刻盘回归通过：${cases.length + leadStemCases.length}/${cases.length + leadStemCases.length}`);
