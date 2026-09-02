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
            <a href={p.repo} target="_blank" rel="noreferrer"><h3>{p.name}</h3></a>
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
            <h1>Selected Works <i className={icon} /></h1>
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
