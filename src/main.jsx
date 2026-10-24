import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { calculatePan } from './pan-engine.js';
import './style.css';

const GRID = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
const OUTER_POSITIONS = [
  { position: 9, style: { left: '50%', top: '-6%', transform: 'translate(-50%, -50%)' } },
  ...[4, 3, 8].map((position, index) => ({ position, style: { right: '100%', top: `${(index + 0.5) * 100 / 3}%`, transform: 'translate(-6px, -50%)' } })),
  ...[2, 7, 6].map((position, index) => ({ position, style: { left: '100%', top: `${(index + 0.5) * 100 / 3}%`, transform: 'translate(6px, -50%)' } })),
  { position: 1, style: { left: '50%', bottom: '-6%', transform: 'translate(-50%, 50%)' } },
];
const HORSE_POSITIONS = {
  4: { right: '100%', bottom: '100%', transform: 'translate(-6px, -6px)' },
  2: { left: '100%', bottom: '100%', transform: 'translate(6px, -6px)' },
  8: { right: '100%', top: '100%', transform: 'translate(-6px, 6px)' },
  6: { left: '100%', top: '100%', transform: 'translate(6px, 6px)' },
};

function beijingNow() {
  return new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 16);
}

function App() {
  const [input, setInput] = useState({ dateTime: beijingNow(), panMode: 'hour', manualJu: '', question: '', useTrueSolarTime: false, longitude: '116.4', latitude: '39.9' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [screen, setScreen] = useState('input');
  const update = (key, value) => setInput(current => ({ ...current, [key]: value }));

  useEffect(() => {
    const onBack = () => setScreen(window.location.hash === '#result' && result ? 'result' : 'input');
    window.addEventListener('hashchange', onBack);
    return () => window.removeEventListener('hashchange', onBack);
  }, [result]);

  function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const next = calculatePan({
        dateTime: input.dateTime,
        panMode: input.panMode,
        keIndex: Math.floor(Number(input.dateTime.slice(14, 16)) / 10),
        manualJu: input.manualJu === '' ? null : Number(input.manualJu),
        question: input.question,
        useTrueSolarTime: input.useTrueSolarTime,
        timezoneOffsetMinutes: -480,
        location: input.useTrueSolarTime ? { lng: Number(input.longitude), lat: Number(input.latitude), fetchedAt: 0 } : null,
      });
      setResult(next);
      setScreen('result');
      window.location.hash = 'result';
      window.scrollTo(0, 0);
    } catch (cause) {
      setError(cause.message || '无法排盘，请检查填写的信息。');
    }
  }

  if (screen === 'result' && result) {
    const pan = result.pan;
    const palaces = new Map(pan.palaces);
    const pillars = [['年柱', pan.yearPillar], ['月柱', pan.monthPillar], ['日柱', pan.dayPillar], ['时柱', pan.hourPillar], ...(pan.kePillar ? [['刻柱', pan.kePillar]] : [])];
    const summary = [['旬首', pan.xunShou], ['值符', pan.zhiFu], ['值使', pan.zhiShi], ['马星', pan.maText.slice(0, 1)], ['空亡', pan.kongText]];
    return <main>
      <header className="result-header">
        <a href="#input" onClick={() => setScreen('input')}>返回填写</a>
        <h1>排盘结果</h1>
      </header>
      <div className="meta">
        {pan.question && <p>事项：{pan.question}</p>}
        <p>日期：{result.sourceDateTime}（北京时间）</p>
        {(result.trueSolarInfo || result.mode === 'ke') && <p>计算时间：{result.calcDateTime}{result.trueSolarInfo ? '（真太阳时）' : ''}</p>}
        <p>农历：{pan.lunarText}　节气：{pan.solarTermText}</p>
        <p>类型：{pan.mode === 'ke' ? '刻盘' : '时盘'}　{pan.juText}</p>
        <p>{pillars.map(([label, value]) => `${label}：${value}`).join('　')}</p>
        <p>{summary.map(([label, value]) => `${label}：${value}`).join('　')}</p>
      </div>
      <div className="board-space">
        <div className="board-wrap">
          <div className="board" role="group" aria-label="阴盘奇门九宫盘">
            {GRID.flat().map(position => {
              const palace = palaces.get(position);
              return <div key={position} className="palace" aria-label={position === 5 ? '中五宫' : `${palace.trigram}${position}宫`}>
                {position !== 5 && <>
                  <span className="deity">{palace.deitySymbol}</span>
                  {palace.hasVoid && <span className="void" aria-label="空亡">○</span>}
                  <div className="middle"><span>{palace.heavenlyStem}</span><span>{palace.starSymbol}</span></div>
                  <span className="earth-stem">{palace.earthlyStem}</span>
                  <span className="gate">{palace.gateSymbol}</span>
                </>}
              </div>;
            })}
          </div>
          {OUTER_POSITIONS.map(({ position, style }) => <span key={position} className="outer-stem" style={style} aria-label={`${palaces.get(position).trigram}${position}宫引干`}>{palaces.get(position).leadStem}</span>)}
          {HORSE_POSITIONS[pan.horsePosition] && <span className="horse" style={HORSE_POSITIONS[pan.horsePosition]} aria-label="驿马">马</span>}
        </div>
      </div>
    </main>;
  }

  return <main>
    <h1>阴盘奇门排盘</h1>
    <form onSubmit={submit}>
      <p><label className="field" htmlFor="dateTime">时间（北京时间）</label>
        <input id="dateTime" type="datetime-local" min="1900-01-01T00:00" max="2100-12-31T23:59" step="60" required value={input.dateTime} onChange={event => update('dateTime', event.target.value)} />{' '}
        <button type="button" onClick={() => update('dateTime', beijingNow())}>现在</button>
      </p>
      <fieldset><legend>排盘类型</legend>
        <label><input type="radio" name="panMode" value="hour" checked={input.panMode === 'hour'} onChange={() => update('panMode', 'hour')} />时盘</label>{'　'}
        <label><input type="radio" name="panMode" value="ke" checked={input.panMode === 'ke'} onChange={() => update('panMode', 'ke')} />刻盘</label>
      </fieldset>
      <p><label htmlFor="manualJu">局数：</label>
        <select id="manualJu" value={input.manualJu} onChange={event => update('manualJu', event.target.value)}>
          <option value="">自动定局</option>
          {Array.from({ length: 9 }, (_, index) => index + 1).map(ju => <option key={ju} value={ju}>{ju}局</option>)}
        </select>
      </p>
      <p><label><input type="checkbox" checked={input.useTrueSolarTime} onChange={event => update('useTrueSolarTime', event.target.checked)} />使用真太阳时</label></p>
      {input.useTrueSolarTime && <fieldset><legend>地点</legend>
        <p><label htmlFor="longitude">经度：</label><input id="longitude" type="number" min="-180" max="180" step="any" required value={input.longitude} onChange={event => update('longitude', event.target.value)} /></p>
        <p><label htmlFor="latitude">纬度：</label><input id="latitude" type="number" min="-90" max="90" step="any" required value={input.latitude} onChange={event => update('latitude', event.target.value)} /></p>
      </fieldset>}
      <p><label htmlFor="question" className="field">事项（选填）</label><textarea id="question" rows="3" maxLength="500" value={input.question} onChange={event => update('question', event.target.value)} /></p>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit">开始排盘</button>
    </form>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
