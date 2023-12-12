import axios from 'axios';

const headers = {
  'X-Api-Key': 'f-4qugse_712ci8Rxp0oYFmztDSHaTrK',
  'Content-Type': 'application/json'
};

const api = axios.create({
  baseURL:'https://api.intern.d-tt.nl/api/houses',
  headers: headers
});

  const state = {
    houses: [],
    house: null,
    searchQuery: '',
    filteredHouses: [],
  };

 const mutations = {
    SET_HOUSES(state, houses) {
      state.houses = houses;
    },
    SET_HOUSE(state, house) {
      state.house = house;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_FILTERED_HOUSES(state, filteredHouses) {
      state.filteredHouses = filteredHouses;
    },
    SET_SORTED_HOUSES(state, sortedHouses) {
      state.houses = sortedHouses;
    },
  }

  const actions = {
    async fetchHouses({ commit }) {
      try {
        const response = await api.get('/');
        commit('SET_HOUSES', response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    },

    async fetchHouseById({ commit }, houseId) {
      try {
        const response = await api.get(`/${houseId}`);
        commit('SET_HOUSE', response.data);
        return response.data; 
      } catch (error) {
        console.error(error);

      }
    },

      async submitHouseForm({ commit }, payload) {

        const apiKey = 'f-4qugse_712ci8Rxp0oYFmztDSHaTrK'; 
        try {
          const response = await axios.post('https://api.intern.d-tt.nl/api/houses', payload, {
            headers: {
              'X-Api-Key': apiKey,
            },
          });
          commit('SET_HOUSES', response.data);
        return response.data;
      }  catch (error) {
        console.error('Error submitting house form:', error);
      }
    },

    async uploadHouseImage({ commit }, { houseId, formData }) {
      try {
        const response = await axios.post(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, formData, {
          headers: {
            'X-Api-Key': 'f-4qugse_712ci8Rxp0oYFmztDSHaTrK',
          },
        });
        console.log('response',response)
        commit('SET_HOUSES', response.data);
        return response.data;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },

    async deleteHouse({ commit, state }, houseId) {
      const houseToDelete = state.houses.find(house => house.id === houseId);
      const plainHouseToDelete = JSON.parse(JSON.stringify(houseToDelete));
      console.log(plainHouseToDelete);
      if (plainHouseToDelete.madeByMe === true) {
          try {
            await api.delete(`/${houseId}`);
            const updatedHouses = state.houses.filter(house => house.id !== houseId);
            commit('SET_HOUSES', updatedHouses);
          } catch (error) {
            console.log(error)
      }} else {
  
        console.error('Cannot delete house: House not made by the user or madeByme property is false');
      }
    },

    async editHouse({ commit }, { houseId, formData }) {
      console.log('formData:', Object.fromEntries(formData));
      console.log(houseId)
      try {
        const response = await axios.post(`https://api.intern.d-tt.nl/api/houses/${houseId}`,   formData, {
          headers: {
            'X-Api-Key': 'f-4qugse_712ci8Rxp0oYFmztDSHaTrK',
          },
        });
  
        commit('SET_HOUSE', response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateSearchQuery({ commit, dispatch }, query) {
      commit('SET_SEARCH_QUERY', query);
      dispatch('filterHouses');
    },

    filterHouses({ commit, state }) {
      let filtered;
      if (state.searchQuery) {
        filtered = state.houses.filter(house =>
          house.location.street.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      } else {
        filtered = state.houses;
      }
      commit('SET_FILTERED_HOUSES', filtered);
    },
    sortHouses({ commit, state }, criterion) {
      let sortedHouses = [...state.houses]; 
      if (criterion === 'price') {
        sortedHouses.sort((a, b) => a.price - b.price);
      } else if (criterion === 'size') {
        sortedHouses.sort((a, b) => a.size - b.size);
      }
  
      commit('SET_SORTED_HOUSES', sortedHouses);
   }
  }
 const getters= {
    allHouses: state => state.houses,
    getHouse: state => state.house,
    filteredHouses: state => state.filteredHouses,
    searchQuery: state => state.searchQuery,
  };

  export default {
    state,
    mutations,
    actions,
    getters
}