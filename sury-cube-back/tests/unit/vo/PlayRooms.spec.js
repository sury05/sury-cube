import PlayRooms from '@/vo/PlayRooms';
import PlayRoom from '@/vo/PlayRoom';
import logger from 'morgan';

let playRooms;

describe('vo/PlayRooms', () => {

  beforeEach(() => {
    logger.info = jest.fn();
    playRooms = new PlayRooms();
  });

  it('should throw expection when parameter room is not a instance of PlayRoom', () => {
    try{
      playRooms.addRoom({});
    }catch (e) {
      expect(e.message).toEqual('room is not a instance of PlayRoom');
    }
  });

  it('should add room', () => {
    expect(playRooms.getRooms()).toEqual([]);

    const addedRoom = new PlayRoom({
      id: 'id',
      name: 'name',
      maxNumber: 3,
      joinedNumber: 1,
      readyNumber: 1,
      cards: {},
      players: [],
      state: 'waiting',
    });
    playRooms.addRoom(addedRoom);

    expect(playRooms.getRooms()).toStrictEqual([addedRoom]);
  });

  it('should get room with room userId', () => {
    const addedRoom1 = new PlayRoom({
      id: 'id1',
      name: 'name',
      maxNumber: 3,
      joinedNumber: 1,
      readyNumber: 1,
      cards: {},
      players: [],
      state: 'waiting',
    });
    const addedRoom2 = new PlayRoom({
      id: 'id2',
      name: 'name',
      maxNumber: 3,
      joinedNumber: 1,
      readyNumber: 1,
      cards: {},
      players: [],
      state: 'waiting',
    });

    playRooms.addRoom(addedRoom1);
    playRooms.addRoom(addedRoom2);

    expect(playRooms.getRoom('id2')).toStrictEqual(addedRoom2);
  });

  it('should update room', function () {
    const oldRoom = new PlayRoom({
      id: 'id',
      name: 'name',
      maxNumber: 3,
      joinedNumber: 1,
      readyNumber: 1,
      cards: {},
      players: [],
      state: 'waiting',
    });
    playRooms.addRoom(oldRoom);

    const newRoom = new PlayRoom({
      id: 'id',
      name: 'name2',
      maxNumber: 3,
      joinedNumber: 2,
      readyNumber: 1,
      cards: {},
      players: [],
      state: 'waiting',
    });
    playRooms.updateRoom(newRoom);

    expect(playRooms.getRoom('id')).toStrictEqual(newRoom);
  });
});
