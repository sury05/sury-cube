import { socketOn, playRooms } from '@/socket/handler';
import EventEmitter from 'events';
import PlayRoom from '@/vo/PlayRoom';
import Player from '@/vo/Player';
import { giveCardToPlayers } from '@/service/card';
import Card from '@/vo/Card';

jest.mock('@/service/card', () => ({
  giveCardToPlayers: jest.fn(),
}));

describe('/socket/handler', () => {
  let mockIo;
  let socketEventEmitter;
  let mockIoEmit = jest.fn();
  let mockToIoEmit = jest.fn();

  beforeEach(() => {
    socketEventEmitter = new EventEmitter();
    socketEventEmitter.id = 'user2';

    mockIo = {
      on: jest.fn(),
      to: jest.fn(),
      emit: mockIoEmit,
    };

    mockIo.to.mockImplementation(() => ({
      emit: mockToIoEmit,
    }));

    socketOn(mockIo);

    const callback = mockIo.on.mock.calls[0][1];
    callback(socketEventEmitter);
  });

  afterEach(() => {
    mockIo.on.mockReset();
    mockIoEmit.mockReset();
    giveCardToPlayers.mockReset();
    playRooms.clearRoom();
    // mockIoEmit.mockReset();
  });

  describe('make-room', () => {
    it('should add room on playRooms and broadcast "room-made" with added room',  () => {
      socketEventEmitter.emit('make-room', {
        id: 'id',
        name: 'name',
        maxNumber: 3,
        playerName: 'sury',
      });

      const addedPlayRoom = new PlayRoom({
        id: 'id',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 1,
        readyNumber: 0,
        cards: {},
        players: [new Player('user2', 'sury')],
        state: 'waiting',
      });

      expect(playRooms.getRooms()).toStrictEqual([addedPlayRoom]);
      expect(mockIoEmit).toBeCalledWith('room-made', {
        id: 'id',
        name: 'name',
        joinedNumber: 1,
        maxNumber: 3,
        readyNumber: 0,
        cards: {},
        players: [{userId: 'user2', name: 'sury'}],
        state: 'waiting',
      });
    });
  });

  describe('join-room', () => {
    beforeAll(() => {
      playRooms.addRoom(new PlayRoom({
        id: '12345',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 1,
        readyNumber: 0,
        cards: {},
        players: [new Player('user1', 'sury')],
        state: 'waiting'}));
    });

    it('should update players and broadcast "room-updated" with updated room', () => {
      socketEventEmitter.emit('join-room', {
        id: '12345',
        playerName: 'hello',
      });

      // TODO : class copy 하는 방법
      const updatedRoom = new PlayRoom({
        id: '12345',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 2,
        readyNumber: 0,
        cards: {},
        players: [new Player('user1', 'sury'), new Player('user2', 'hello')],
        state: 'waiting'
      });

      expect(playRooms.getRoom('12345')).toStrictEqual(updatedRoom);
      expect(mockIoEmit).toBeCalledWith('room-updated', {
        id: '12345',
        name: 'name',
        joinedNumber: 2,
        maxNumber: 3,
        readyNumber: 0,
        cards: {},
        players: [{userId: 'user1', name: 'sury'}, {userId: 'user2', name: 'hello'}],
        state: 'waiting',
      });
    });
  });

  describe('ready-room', () => {
    beforeEach(() => {
      playRooms.addRoom(new PlayRoom({
        id: '67890',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 2,
        readyNumber: 0,
        cards: {},
        players: [new Player('user1', 'sury'), new Player('user2', 'hello')],
        state: 'waiting'
      }));
    });
    it('should update readyNumber on targeted room and broadcast "room-updated" with updated room when readyNumber is lesser than joinedNumber', () => {
      socketEventEmitter.emit('ready-room', {
        id: '67890',
        readyNumber: 1,
      });

      const updatedRoom = new PlayRoom({
        id: '67890',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 2,
        readyNumber: 1,
        cards: {},
        players: [new Player('user1', 'sury'), new Player('user2', 'hello')],
        state: 'waiting'});

      expect(playRooms.getRoom('67890')).toStrictEqual(updatedRoom);
      expect(mockIoEmit).toBeCalledWith('room-updated', {
        id: '67890',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 2,
        readyNumber: 1,
        cards: {},
        players: [{userId: 'user1', name: 'sury'}, {userId: 'user2', name: 'hello'}],
        state: 'waiting',
      });
    });

    it('should update readyNumber on targeted room and broadcast "room-updated" with provided cards when readyNumber is equal to joinedNumber', () => {
      giveCardToPlayers.mockReturnValue({
        opened : [],
        left : [new Card('red',1),new Card('red',2)],
        players : {
          user1: [new Card('red',3),new Card('red',4)],
          user2: [new Card('red',6),new Card('red',5)],
        }
      });

      socketEventEmitter.emit('ready-room', {
        id: '67890',
        readyNumber: 2,
      });

      const updatedRoom = new PlayRoom({
        id: '67890',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 2,
        readyNumber: 2,
        cards: {
          opened: [],
          left : [new Card('red',1),new Card('red',2)],
          players : {
            user1: [new Card('red',3),new Card('red',4)],
            user2: [new Card('red',6),new Card('red',5)],
          }
        },
        players: [new Player('user1', 'sury'), new Player('user2', 'hello')],
        state: 'playing'});

      expect(playRooms.getRoom('67890')).toStrictEqual(updatedRoom);

      expect(mockToIoEmit.mock.calls[0][0]).toEqual('game-start');
      expect(mockToIoEmit.mock.calls[0][1].cards).toEqual({
        players: {
          user1: [{
            color: 'red', number: 3,
          },
          {
            color: 'red', number: 4,
          }],
        }
      });
      expect(mockToIoEmit.mock.calls[1][0]).toEqual('game-start');
      expect(mockToIoEmit.mock.calls[1][1].cards).toEqual({
        players: {
          user2: [{
            color: 'red', number: 6,
          },
          {
            color: 'red', number: 5,
          }],
        }
      });
    });
  });

  describe('update-room', () => {
    it('should ', () => {
      playRooms.addRoom(new PlayRoom({
        id: 'id',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 1,
        readyNumber: 0,
        cards: {},
        players: [new Player('user1', 'sury')],
        state: 'waiting',
      }));

      socketEventEmitter.emit('update-room', {
        room: {
          id: 'id',
          name: 'name',
          maxNumber: 3,
          joinedNumber: 2,
          readyNumber: 1,
          cards: {},
          players: [
            {
              userId: 'user1', name: 'sury'
            },
            {
              userId: 'user2', name: 'lee'
            }],
          state: 'waiting',
        }
      });

      expect(playRooms.getRoom('id')).toStrictEqual(new PlayRoom({
        id: 'id',
        name: 'name',
        maxNumber: 3,
        joinedNumber: 2,
        readyNumber: 1,
        cards: {},
        players: [new Player('user1', 'sury'),new Player('user2', 'lee')],
        state: 'waiting',
      }));
    });
  });
});
