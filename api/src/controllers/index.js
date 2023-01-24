const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db.js");

//traer la info que necesito de la api
const ApiGames = async () => {
    let videojuegos = []
    let url = "https://api.rawg.io/api/games?key=7c0cc7f197aa433b8e6e3a060f72732e"
    try {
        for (let i = 0; i < 5; i++) {
            const respuesta = await axios.get(url)

            respuesta.data.results.map(info => {
                videojuegos.push({
                    id: info.id,
                    name: info.name,
                    image: info.background_image,
                    rating: info.rating,
                    platforms: info.platforms?.map(s => s.platform.name),
                    genres: info.genres,
                })
            });

            url = respuesta.data.next
        }


    } catch (e) {
        console.log(e)
    }

    return videojuegos

};

const infoDatabase = async () => {
    try {
        return await Videogame.findAll({
            include: [{
                model: Genre,
                attributes: ["name"],
                throught: {
                    attributes: []
                }
            }]
        });
    } catch (error) {
        console.log("controllers/index.js :", error);

    }
};


const infoEnd = async () => {

    try {
        const dataApi = await ApiGames();
        const dataDb = await infoDatabase();
        const infoComplete = dataDb.concat(dataApi)
        return infoComplete
    } catch (error) {
        console.log("controllers/index.js :", error);
    }

};

const nameGame = async (name) => {
    const infoName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=7c0cc7f197aa433b8e6e3a060f72732e`)
    try {
        const gameName = await infoName.data.results?.map(data => {
            return {
                id: data.id,
                name: data.name,
                plataforms: data.platforms?.map(info => info.platform.name),
                rating: data.rating,
                image: data.background_image,
                genres: data.genres?.map(info => info.name)
            }
        })

        return gameName;

    } catch (error) {
        console.log("/controllers/index.js :", error);
    }
};


const apiId = async (id) => {
    try {
        const infoForId = await axios.get(`https://api.rawg.io/api/games/${id}?key=7c0cc7f197aa433b8e6e3a060f72732e`);
        if (infoForId) {
            const infoId = await infoForId.data;
            const data = {
                id: infoId.id,
                name: infoId.name,
                genres: infoId.genres,
                platforms: infoId.platforms?.map(data => data.platform.name).toString(),
                released: infoId.released,
                rating: infoId.rating,
                image: infoId.background_image,
                description: infoId.description.replace(/\<[^>]*>?/g, ".")
            }
            return data;
        } else {
            return "Not found Id"
        }

    } catch (error) {
        console.log(error);
    }
};


const idDb = async (id) => {
    try {
        return await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })

    } catch (error) {
        console.log(error)
    }
};



const videogames = async (id) => {
    const dbId = id.includes("-");
    if (dbId) {
        const infodb = await idDb(id);
        return infodb;
    } else {
        const infoApi = await apiId(id);
        return infoApi;
    }
};

const gamePlatforms = async () => {
    const genresInApi = await axios.get("https://api.rawg.io/api/platforms?key=7c0cc7f197aa433b8e6e3a060f72732e");
    const apiData = genresInApi.data.results;

    apiData.forEach((x) => {
        Platform.findOrCreate({
            where: { name: x.name }
        });
    });

    return "datos subidos a la base de datos";
}







module.exports = {
    ApiGames,
    infoDatabase,
    infoEnd,
    nameGame,
    apiId,
    idDb,
    videogames,
    gamePlatforms

}