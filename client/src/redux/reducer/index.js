import { 
    ALL_VIDEOS_GAME,
     ALL_GENRES, 
    GAME_DETAILS, 
    CREATE_VIDEOGAME,
     GET_NAME, 
     SORT_BY,
     FILTERS_BY_GENRES,
     FILTER_ORDER,
     GET_PLATFORMS, 
     CLEAN,
  

    
} from '../action/index';

const initialState = {
    allVideosGames: [],
    videogames: [],
    genres:[],
    gameDetail:[],
    platforms: [],
    reset: []
}

 export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_VIDEOS_GAME: 
        return {
            ...state,
            allVideosGames: action.payload,
            videogames: action.payload
        }      

        case ALL_GENRES: 
        return {
            ...state,
            genres: action.payload
        }
        case GAME_DETAILS: 

            return {
                ...state,
                gameDetail: action.payload
            }
        case CREATE_VIDEOGAME: 
        return {
            ...state
        }    
        case GET_NAME: 
        return {
            ...state,
            allVideosGames: action.payload
        }
        case SORT_BY: 
        let vgCopy = [...state.videogames]; 
        let ordenamiento

        switch (action.payload) {
            case 'All':
                ordenamiento = [...state.allVideosGames];
                break;
            case 'ASC':
                ordenamiento = vgCopy.sort(function(a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1
                    }
                    return 0;
                });
                break;
            case 'DESC':
                ordenamiento = vgCopy.sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                      }
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                      }
                      return 0;
                });
                break;
                case 'RatingAsc':
                    ordenamiento = vgCopy.sort(function(a, b) {
                        return a.rating - b.rating
                    })
                    break;
                case 'RatingDesc':
                    ordenamiento = vgCopy.sort(function(a, b) {
                        return b.rating - a.rating
                    })
                    break;
                default:
                    ordenamiento = vgCopy
                    break;
            }
     

        return {
            ...state, 
            videogames: ordenamiento,
            allVideosGames: ordenamiento
        }

        case FILTERS_BY_GENRES: 
        let orderGenres = !action.payload ? state.videogames : action.payload === "All" ? state.videogames : state.videogames.filter(genre => genre.genres.some(s => s.name.includes(action.payload)))
        
        if (orderGenres <= 0) {
            orderGenres = state.videogames
             alert('No se encontro')
        }
     
        return {
            ...state,
            allVideosGames: orderGenres,
        }
        case FILTER_ORDER:
            let getVg = state.videogames;
            let filtrado = []

            switch(action.payload) {
                case 'api': filtrado = getVg.filter(el => typeof (el.id) === 'number'); break;
                case 'created': filtrado = getVg.filter(el => isNaN(el.id)); break;
                default: filtrado = getVg; break;
            }

        return {
            ...state,
            allVideosGames: filtrado,
        }

        case GET_PLATFORMS:
        return {
            ...state,
            platforms: [...action.payload]
        }

        case CLEAN: 
        return {
            ...state,
            gameDetail: action.payload

        }
    
           
        default: return state
    }
}
