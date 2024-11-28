

export interface IFlight  {
    flightNumber: string;
    image: string;
    airline: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    price: number;
    availableSeats: string[]; 
    bookedSeats: string[];
    available:boolean
  }





/*

interface IFlight  {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  date: Date;
  time: string;
  price: number;
  availableSeats: string["A1","A2","B1","B2"]; 
  bookedSeats: string["B2"];
}


interface IBooking  {
  userId: string;
  flightId: string;
  seats: string["B2"];
  totalPrice: number;
  status: string;
}

1. when admin create flight in this time create all available seats or total seats like this =availableSeats: string["A1","A2","B1","B2"];
2. when user booked a ticket then this selected ticked is booke at seats: string["B2"]; here and also update and add booked ticket like bookedSeats: string["B2"];
3. calculate total tipice with ticket length and price.








*/