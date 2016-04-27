import React from 'react';

export function parseMovie(parse) {
  const no = 'no information';
  let src = parse.poster_path ? 'https://image.tmdb.org/t/p/w300' + parse.poster_path
                              : 'img/no.png';
  let cast = parse.credits.cast.length
    ? parse.credits.cast.map((x)=> {
      let src = x.profile_path ? 'https://image.tmdb.org/t/p/w185' + x.profile_path
                               : 'img/no.png';
      return (
        <figure key = {x.id} onClick={this.onClickPoster.bind(this, [x.id, 'person'])}>
          <img src = {src}/>
            <figcaption>
              <p>{x.name}</p>
              <p>as</p>
              <p>{x.character}</p>
            </figcaption>
          </figure>
        );
      })
    : no;

  let countries = parse.production_countries.length
    ? parse.production_countries.map((x)=>
      <img src={`gif/${x.iso_3166_1.toLowerCase()}.gif`}
        key={x.iso_3166_1} title={x.name}/>)
    : no;

  let iframe = parse.videos.results.length
    ? <iframe src={
      `http://www.youtube.com/embed/${(parse.videos.results[1]
      ||parse.videos.results[0]).key}?&modestbranding=1&showinfo=0` }
      allowFullScreen="allowfullscreen" frameBorder="0"/>
    :'';

  let budget = ''+parse.budget;
  //let reiting = (208*100)*(parse.vote_average*10);
  return (
    <div className = "details">
        <div className = "left">
          <img src = {src}/>
          <div className="rating empty">
            <i className="fa fa-star-o" id="1" aria-hidden="true"/>
            <i className="fa fa-star-o" id="2" aria-hidden="true"/>
            <i className="fa fa-star-o" id="3" aria-hidden="true"/>
            <i className="fa fa-star-o" id="4" aria-hidden="true"/>
            <i className="fa fa-star-o" id="5" aria-hidden="true"/>
            <i className="fa fa-star-o" id="6" aria-hidden="true"/>
            <i className="fa fa-star-o" id="7" aria-hidden="true"/>
            <i className="fa fa-star-o" id="8" aria-hidden="true"/>
            <i className="fa fa-star-o" id="9" aria-hidden="true"/>
            <i className="fa fa-star-o" id="10" aria-hidden="true"/>
          </div>
          <div className="rating full" style={
              {
                width: (208/100)*(parse.vote_average*10)+7
              }}>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
            <i className="fa fa-star" aria-hidden="true"/>
          </div>
          <p>{parse.vote_average}/10 ({parse.vote_count} votes)</p>
          <p>Countries: {countries}</p>
          <p>Genres:
            {
            parse.genres.length
            ? parse.genres.map((x)=>
              <a href="#" onClick={::this.onClickGenr}
                id={x.id} key={`det${x.id}`}>
                {x.name}
              </a>)
            : no
            }
          </p>
          <p>Runtime: {parse.runtime||'-'} min.</p>
          <p>Budget: {`${budget.replace(/(\d)(?=(\d\d\d)+($))/g, '$1 ')}$`}</p>
        </div>
        <div className="right">
          {iframe}
          <h2>
            {parse.title}
            <span id="span">
              {parse.release_date.slice(0, 4)}
            </span>
          </h2>
          <h3>Overview</h3>
          <p>{parse.overview||no}</p>
          <h3>Cast</h3>
          <div className="cast" style={
              {
              maxHeight: this.state.classI[0]==='none'
                      ? '50px'
                      : ''
              }
            }>
            {cast}
          </div>
          <i className={`${this.state.classI[0]} fa fa-angle-double-up`}
            onClick={::this.onClickCastShow} aria-hidden="true"/>
          <i className={`${this.state.classI[1]} fa fa-angle-double-down`}
            onClick={::this.onClickCastShow} aria-hidden="true"/>
          <div className="comment"></div>
      </div>
    </div>
  );
}

export function parse(parse) {
  if (parse.length) {
    return parse.map((x)=> {
      if(x.media_type==='tv') return x='';
      let src = x.poster_path || x.profile_path
             ? `https://image.tmdb.org/t/p/w300${x.poster_path || x.profile_path})`
             : 'img/no.png',
          type = x.media_type || 'movie',
          style = {background: type==='movie'?'':'rgba(0, 137, 0, 0.7)'};
      return (
        <figure key={`${type[0]}${x.id}`} id={`${type}/${x.id}`}
                onClick={this.onClickPoster.bind(this, [x.id, type])}>
          <img src={src}/>
            <figcaption>
              <span style={style}>{type}</span>
              <span>{x.name || x.title}</span>
            </figcaption>
        </figure>
      );
    });
  }
  return (<div className="non"><h3>Total results: 0</h3></div>);
}
