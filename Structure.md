### Client 접속하면  등록된 방 정보를 가져온다. 
  id  
  name  
  maxNumber  
  joinedNumber  
  readyNumber  
  players 
  state ( joinedNumber = readyNumber => starting)

### 방 만들기 
- client    
  Name, maxNumber, players, joinedNumber => store commit('addRoom') => emit('make-room')
- server  
  on('make-room') => db insert => broadcast('room-made')
- client 
  on('room-made') => store add
