import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search )

  const heroes = getHeroesByName(q);

  const showSearch = (q === '');
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange }  = useForm({
    searchText: q
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    //if( searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText.toLowerCase().trim() }`);

  }

  return (
    <>
      <h1>Search Page</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input 
              type="text" 
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              value={ searchText }
              onChange={ onInputChange }
              autoComplete="off"
            />
            <button 
            className="btn btn-outline-primary mt-1"
            
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4> Result </h4>
          <hr />

          <div className="alert alert-primary" style={{ display: showSearch ? '' : 'none' }}>
            Search a hero
          </div>
          <div className="alert alert-danger" style={{ display: showError ? '' : 'none' }}>
            There's no result for <b>{ q }</b>
          </div>
          {
            heroes && heroes.map(hero =>(
              <HeroCard key={hero.id} {...hero} />
            ))
          }

        </div>
      </div>
    </>
  )
}
