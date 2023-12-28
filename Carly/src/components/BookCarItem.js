export default function BookCarItem({car}) {
    return <div>
    <img src={car.photo} alt={car.name} style={{ width: '100px', height: '100px' }} />
    <h3>{car.brand} {car.model}</h3>
    <p>Cena: ${car.dailyPrice}</p>
  </div>
}