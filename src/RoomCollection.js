import Room from './Room';

class RoomCollection {
    constructor(rooms) {
        this.rooms = rooms;
    }

    findAvailableRooms(occupiedRoomNumbers) {
        return this.rooms.filter(room => !occupiedRoomNumbers.includes(room.number))
    }

    findRoomsRevenue(rooms) {
        return rooms.reduce((acc, room) => {
            acc += room.costPerNight
            return acc
        }, 0).toFixed(2)
    }

    calculatePercentageOccupied(occupiedRoomNumbers) {
        return occupiedRoomNumbers.length / this.rooms.length * 100
    }

    filterByRoomType(roomType, availableRooms) {
        return availableRooms.filter(room => room.roomType === roomType)
    }

    findAllByNumbers(roomNumbers) {
        return this.rooms.filter(room => roomNumbers.includes(room.number))
    }


    // Async assignData() {
    //     this.rooms = await fetch()
    // }

    // static loadFromData() {
    //     return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    //         .then(response => response.json())
    //         .then(data => data.rooms.map(room => new Room(room)))
    // }

    async assignData() {
        this.rooms = await fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
        .then(response => response.json())
        .then(data => data.rooms.map(room => new Room(room)))
    }
}
export default RoomCollection;