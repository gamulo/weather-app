import React, { useState, useEffect } from "react";

const WeatherApp = () => {
  const [search, setSearch] = useState("philippines");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let componentMounted = true;
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=aa8ecf62c033aebe6aafb1e281e4e77a`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };

    fetchWeather();
  }, [search]);

  let icon = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      icon = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      icon = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      icon = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      icon = "fa-cloud-rain";
    } else if (data.weather[0].main == "Snow") {
      icon = "fa-snowflake";
    } else {
      icon = "fa-smog";
    }
  } else {
    return <div>LOADING...</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div className='mb-3'>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='card text-white border-0 text-center '>
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                className='card-img'
                alt='...'
              />
              <div className='card-img-overlay'>
                <form onSubmit={handleSearch}>
                  <div className='input-group mb-4 w-75 mx-auto'>
                    <input
                      type='search'
                      className='form-control'
                      placeholder='Search Location'
                      aria-label='Search Location'
                      aria-describedby='basic-addon2'
                      name='search'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                      autoComplete='off'
                    />
                    <button
                      type='submit'
                      className='input-group-text bg-red-400'
                      id='basic-addon2'>
                      <h1>Search</h1>
                    </button>
                  </div>
                </form>
                <div className='bg-dark bg-opacity-50 py-3'>
                  <h1 className='card-title text-3xl font-semibold'>
                    <i className='fas fa-map-pin m-2'></i>
                    {data.name}, {data.sys.country}
                  </h1>
                  <p className='card-text lead'>
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <br />
                  <i className={`fas ${icon} fa-4x`}></i>
                  <h1 className='fw-bolder mb-2'>{temp} &deg;C</h1>
                  <p className='lead fw-bolder mt-0'>{data.weather[0].main}</p>
                  <p className='lead'>
                    {temp_min}&deg;C | {temp_max}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

// style={{
//     backgroundImage: `url(https://source.unsplash.com/600x900/?${data.weather[0].main})`,
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",

//   }}
