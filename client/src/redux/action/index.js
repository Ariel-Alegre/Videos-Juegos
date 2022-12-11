import axios from 'axios';
const { REACT_APP_SERVER_BACK } = process.env






export const ALL_VIDEOS_GAME = 'ALL_VIDEOS_GAME';
export const ALL_GENRES = 'ALL_GENRES';
export const GAME_DETAILS = 'GAME_DETAILS';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const GET_NAME = 'GET_NAME';
export const SORT_BY = 'SORT_BY';
export const FILTERS_BY_GENRES = 'FILTERS_BY_GENRES';
export const FILTER_ORDER = 'FILTER_ORDER';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const CLEAN = 'CLEAN';




export const allVideosgame =  () => {
    return  async (dispatch) => {
        const res = await axios.get(`${REACT_APP_SERVER_BACK}/videogames`);
        const data = await res.data;
        return dispatch({
            type: ALL_VIDEOS_GAME,
            payload: data
        })
}};


export const allGenres = () => {
    return async (dispatch) => {
        const res = await axios.get(`${REACT_APP_SERVER_BACK}/genres`);
        const data = await res.data;
        return dispatch({
            type: ALL_GENRES,
            payload: data
        })
    }
};


export const gameDetails = (id) => {
    return async (dispatch) => {
        const res = await axios.get(`${REACT_APP_SERVER_BACK}/videogame/${id}`);
        const data = await res.data;     

        return dispatch({
            type: GAME_DETAILS,
            payload: data
        })
    }
};


export const createVideogame = (videogame) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(
          `${REACT_APP_SERVER_BACK}/videogame`,
          videogame
        );
        return dispatch({
          type: CREATE_VIDEOGAME,
          payload: data,
        });
      } catch (err) {
        console.error(err);
      }
    };
  };

export const getName = (name) => {
    return async (dispatch) => {
        const res = await axios.get(`${REACT_APP_SERVER_BACK}/videogames?name=${name}`);        
        const data = await res.data

        return dispatch({
            type: GET_NAME,
            payload: data
        })
    }
};


export const sort = (payload) => {
     return { 
        type: SORT_BY,
        payload: payload
    }
};

export const FiltersByGenres = (payload) => {
    return {
        type: FILTERS_BY_GENRES,
        payload,
    }
};

export const filterOrder = (payload) => {
    return {
        type: FILTER_ORDER,
        payload,
    }
};


export const getPlatforms = () => {
    return async(dispatch) => {
        const res = await axios.get(`${REACT_APP_SERVER_BACK}/platforms`);
        const data = await res.data
        return dispatch({
            type: GET_PLATFORMS,
            payload: data
        })
    };
};


export const clean = () => {
    return {
        type: CLEAN,
        payload:[]
    }
}




