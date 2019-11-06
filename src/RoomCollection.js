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

    findByNumber(roomNumber) {
        return this.rooms.find(room => roomNumber === room.number)
    }
}

export default RoomCollection;