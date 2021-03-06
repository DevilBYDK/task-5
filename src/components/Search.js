import React, { Component } from 'react';
import Form from './Form';

export default class Search extends Component {

  render() {
    let gen = this.props.genres;

    gen = gen.map((x)=> {
      if(x.name==='TV Movie') return x='';

      return (
        <li key={x.id}>
          <a id={x.id}
             onClick={::this.onClickGenre}>
              { x.name }
          </a>
        </li>);
    });

    return (
      <div className="search">
        <img id="top_rated" onClick={::this.onClickGenre} src="/img/logo.png"/>
        <Form request={this.props.request}/>
          <ul className="rated">
            <li>
              <a>
                Genres
              </a>
              <ul id="genre">{ gen }</ul>
            </li>
            <li>
              <a id="popular"
                 onClick={::this.onClickGenre}>
                 Popular
               </a>
            </li>
            <li>
              <a id="top_rated"
                 onClick={::this.onClickGenre}>
                 Top rated
               </a>
            </li>
          </ul>
      </div>
    );
  }

  onClickGenre(e) {
    let type = +e.target.id ?'genre':'movie';

    this.props.request(type, e.target.id, 'search');
  }
}
