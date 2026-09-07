import React, { Component } from 'react';

const PULSE_URL = 'https://lab.jbutler.dev/api/pulse.json';
const DASHBOARD_URL = 'https://lab.jbutler.dev';
const POLL_MS = 60000;

class LabPulse extends Component {
  constructor(props) {
    super(props);
    this.state = { pulse: null, error: false };
  }

  fetchPulse() {
    fetch(PULSE_URL, { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(pulse => this.setState({ pulse, error: false }))
      .catch(() => this.setState({ error: true }));
  }

  componentDidMount() {
    this.fetchPulse();
    this.timer = setInterval(this.fetchPulse, POLL_MS);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  hostDot(host, name) {
    const ok = host && host.ok !== false;
    const color = ok ? '#3fb950' : '#f85149';
    return (
      <span key={name} title={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <span style={{
          width: 9, height: 9, borderRadius: '50%',
          backgroundColor: color, display: 'inline-block',
        }} />
        <span style={{ fontSize: 12, color: '#8b949e' }}>{name}</span>
      </span>
    );
  }

  render() {
    const { pulse, error } = this.state;

    if (error) {
      return (
        <section id="lab" style={{ padding: '12px 0' }}>
          <div className="row">
            <div className="twelve columns" style={{
              border: '1px solid #30363d', borderRadius: 8, padding: '10px 16px',
              backgroundColor: '#161b22', fontSize: 13, color: '#8b949e',
            }}>
              <span style={{ color: '#d29922' }}>●</span> The Lab — telemetry temporarily unavailable
            </div>
          </div>
        </section>
      );
    }

    if (!pulse || !pulse.ts) {
      return (
        <section id="lab" style={{ padding: '12px 0' }}>
          <div className="row">
            <div className="twelve columns" style={{
              border: '1px solid #30363d', borderRadius: 8, padding: '10px 16px',
              backgroundColor: '#161b22', fontSize: 13, color: '#8b949e',
            }}>
              <span style={{ color: '#58a6ff' }}>●</span> The Lab — connecting…
            </div>
          </div>
        </section>
      );
    }

    const hostNames = ['mini', 'vram', 'smol', 'srv'];
    const laguna = pulse.laguna || {};
    const upCount = pulse.workloads_up != null ? pulse.workloads_up : '–';
    const totalCount = pulse.workloads_total != null ? pulse.workloads_total : '–';

    return (
      <section id="lab" style={{ padding: '4px 0' }}>
        <div className="row">
          <div className="twelve columns" style={{
            border: '1px solid #30363d', borderRadius: 8, padding: '10px 16px',
            backgroundColor: '#161b22', display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', gap: '6px 18px', fontSize: 13,
          }}>
            <span style={{ fontWeight: 600, color: '#e6edf3' }}>⚡ The Lab</span>
            {hostNames.map(n => this.hostDot(pulse.hosts ? pulse.hosts[n] : null, n))}
            <span style={{ color: '#8b949e', fontSize: 12 }}>
              workloads <span style={{ color: '#3fb950', fontWeight: 600 }}>{upCount}/{totalCount}</span> up
            </span>
            <span style={{ color: '#8b949e', fontSize: 12 }}>
              laguna <span style={{ color: laguna.up ? '#3fb950' : '#f85149', fontWeight: 600 }}>{laguna.up ? 'live' : 'offline'}</span>
            </span>
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: '#58a6ff', textDecoration: 'none', fontSize: 12, marginLeft: 'auto' }}>
              full dashboard →
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default LabPulse;
