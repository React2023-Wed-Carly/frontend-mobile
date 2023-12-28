export default function CarFilter({ filter, setFilter, setIsFilter }) {
    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      setFilter({
        ...filter,
        [name]: value,
      });
    };

    const sumbitClick = (event) => {
        event.preventDefault();
        setIsFilter(false);
    }
  
    return (
      <form onSubmit={sumbitClick}>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={filter.brand}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={filter.model}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
        <button type="submit">Close</button>
      </form>
    );
  };
  