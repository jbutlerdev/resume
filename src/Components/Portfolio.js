import React, { Component } from 'react';

class Portfolio extends Component {
  render() {

    if(this.props.data){
      var url = this.props.data.url;
      var icon = this.props.data.icon;
      var projects = this.props.data.projects || [];
      var cards = projects.map(function(p){
        return (
          <div key={p.name} className="four columns portfolio-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <a href={p.repo} target="_blank" rel="noreferrer"><h3>{p.name}</h3></a>
              {p.live ? <a href={p.live} target="_blank" rel="noreferrer" style={{ fontSize: '0.8em', color: '#3fb950', whiteSpace: 'nowrap', marginLeft: '8px' }}>Try it live&nbsp;&#8594;</a> : null}
            </div>
            <p>{p.blurb}</p>
            <p className="repo-link"><i className={icon}></i> <span>{p.repo.replace('https://', '')}</span></p>
          </div>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Open Source Projects <i className={icon} /></h1>
          </div>
        </div>
        <div className="row bgrid-quarters">
          {cards}
        </div>
        <div className="row">
          <div className="twelve columns" style={{ textAlign: 'center' }}>
            <a href={url} target="_blank" rel="noreferrer" className="more-repos">More on GitHub <i className={icon} /></a>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
