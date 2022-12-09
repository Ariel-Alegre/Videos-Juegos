import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, allGenres, getPlatforms } from "../../redux/action";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import style from './CreateGame.module.css';
import { AiFillHome } from 'react-icons/ai';




const  validate = (input) => {
  let errors = {};

  if(!input.name) {
    errors.name = 'El nombre es requerido'
  } 

  if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
    errors.image='invalid URL'
  }

  if(!input.description) {
    errors.description = 'La descripcion es requerida'
  } else if (input.description.length > 100) {
    errors.description = 'La descripcion es muy larga. (Max = 100 caracteres)'
  }

  if(!input.released) {
    errors.released = 'La fecha de lanzamiento es requerida'
  }

  if(!input.rating) {
    errors.rating = 'El rating es requerido'
  } else if(input.rating > 5) {
    errors.rating = 'El rating no debe ser mayor a 5'
  } else if(input.rating < 0) {
    errors.rating = 'El rating no puede ser un numero negativo'
  }

  return errors 
}

 function CreateGame() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: []
  });

  const [errors, setErrors] = useState({}); 
  
  const dispatch = useDispatch();
  const history = useHistory();

  const generos = useSelector((state) => state.genres);
  const platforms = useSelector(state => state.platforms);
  const allGames = useSelector(state => state.allVideosGames);


  
  useEffect(() => {
    dispatch(allGenres());
    dispatch(getPlatforms());
  }, [dispatch])
  
  function handleSubmit(e) {
    e.preventDefault();
    let noRepeat = allGames.filter(n => n.name === input.name)
    if(noRepeat.length !== 0) {
      alert('Ya existe un juego con ese nombre, por favor elija otro')
    } else {
      let error = Object.keys(validate(input))     
        if(error.length !== 0 || !input.genres.length || !input.platforms.length) { 
          alert('Llene los campos correctamente')
          return
        } else {
          dispatch(createVideogame(input));
          setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
          });
          alert("Felicidades, el juego fue creado exitosamente.");
        }
        history.push('/home')
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validate({
      ...input,
      [e.target.name]: [e.target.value]
    })
    )
  }

  function handleGenres(e) {
    if(!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  };

  function handlePlatforms(e) {
    if(!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      })
    }
  }

  function handleDeleteG(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e)
    });
  }

  function handleDeleteP(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e)
    });
  }

  return (
    <div>  
      <div>
      <Link to = "/home" >
        <button className={style.btn}>
        <AiFillHome/>
        </button>
        </Link>
        </div>
        <div className={style.createGameContainer }>
      <form onSubmit={(e) => handleSubmit(e)} className={style.formContainer}>
        <div className={style.form}>
          <h2 className={style.title}>Create Videogame!</h2>
          <div className={style.btnContainer}>
      <div className={style.buttonCreate}>
          <button className={style.btnCreate} type="submit">
            Create Game!
            </button>
      </div>
      <div className={style.buttonCancel} >
          <Link to={'/home'}>
            <button className={style.btnCancel}>
              Cancel
              </button>
              </Link> 
      </div>
      </div>
          <div className={style.nameContainer}>
          <strong className={style.name}>Name: </strong>
            <input
            className={style.inputName}
            placeholder="video game name..."
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              />        
            {errors.name && (
              <p className={style.error}>{errors.name}</p>
            )}
          </div>
          <div className={style.imageContainer}>
          <strong className={style.image}>Image URL: </strong>
            <input
            className={style.inputImage}
            placeholder='game image...'
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              />          
            {errors.image && (
              <p className={style.error}>{errors.image}</p>
            )}
          </div>
          <div className={style.releasedContainer} >
          <strong className={style.Release}>Release date: </strong>
            <input
            className={style.inputRelease}
              type='date'
              name="released"
              value={input.released}
              placeholder='yyyy-mm-dd'
              onChange={(e) => handleChange(e)}
              /> 
            {errors.released && (
              <p className={style.error}>{errors.released}</p>
            )}
          </div>
          <div className={style.ratingContainer}>
          <strong className={style.rating}>Rating: </strong>
            <input
            className={style.inputRating}
              type="number"
              name="rating"
              value={input.rating}
              onChange={(e) => handleChange(e)}
              /> 
            
            {errors.rating && (
              <p className={style.error}>{errors.rating}</p>
            )}
          </div>
          <div className={style.genresContainer}>
          <strong className={style.genres}>Genres: </strong>
            <select className={style.selectGenre} id="genres" onChange={ handleGenres}>
              <option value='all' >Elija los géneros...</option>
              { generos.map((g) => (
                  <option key={g.id} value={g.name}>{g.name}</option>
              )
                )}
            </select>           
            {input.genres.map((g) => (
              <div className={style.orderSelect} >
                <div className={style.letra}>{g}</div>
                <button className={style.x} onClick={() => handleDeleteG(g)} key={g} value={g}><span>X</span></button>
              </div>
        ))}
          </div>
          <div className={style.platformsContainer}>
          <strong className={style.platforms}>Platforms: </strong>
              <select className={style.selectPlatforms} id="platforms" onChange={(e) => handlePlatforms(e)}>
                  <option value="all" >Choose the platforms...</option>
                  {platforms?.map(a => (
                      <option  value={a.name} key={a.id}>{a.name}</option>
                  )
                    )}
              </select> 
              {input.platforms.map((p) => (
                <div className={style.orderSelect}>
                  <div className={style.letra} >{p}</div>
                  <button className={style.x} onClick={() => handleDeleteP(p)} key={p} value={p}><span>X</span></button>
                </div>
              ))}
          </div>
          <div className={style.descriptionContainer}>
          <strong className={style.description}>Description: </strong>
            <textarea
            className={style.textDescription}
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
              /> 
            
            {errors.description && (
              <p className={style.error}>{errors.description}</p>
            )}
          </div>
      </div> 
      </form>
    </div>
    </div>
  );
};

export default CreateGame;