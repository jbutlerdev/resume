import React, { Component } from 'react';

class Portfolio extends Component {
  render() {

    if(this.props.data){
      var url = this.props.data.url;
      var icon = this.props.data.icon;
    }

    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns collapsed">
	    <a href={url}>
              <h1>Check Out Some of My Works <i class={icon} /></h1>
	    </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
