import axios from 'axios';

const baseURI = '/api/v1/room';

async function getRooms() {
  const { data } = await axios.get(`${baseURI}`);
  return data;
}

async function addRoom(room) {
  const { id } = await axios.post(`${baseURI}`, {
    params: room,
  });

  return id;
}

export {
  getRooms,
  addRoom,
};
