import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
// import geoJson from "./solution.json";
import {
  TruckIcon,
  WrenchIcon,
  FlagIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { getProblems } from "../../utilities/problems-service";
import { getSolution } from "../../utilities/mapbox-service";
import SolutionCard from "../../components/SolutionCard";
import "./Solutions.css";

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const ContrastColors = [
  "#0074D9", // Blue
  "#FF4136", // Red
  "#2ECC40", // Green
  "#FFDC00", // Yellow
  "#AAAAAA", // Gray
  "#FF851B", // Orange
  "#001F3F", // Navy
  "#39CCCC", // Teal
  "#FFD700", // Gold
  "#DDDDDD", // Light Gray
];

// Function to convert ISO 8601 to datetime-local format
function isoToDatetimeLocal(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const Marker = ({
  /*onClick,*/
  children,
  stop,
  type,
  stopNumber,
  backgroundColorByRoute,
}) => {
  // const _onClick = () => {
  //   onClick(stop.location);
  // };

  return (
    // <button onClick={_onClick} className="marker">
    //   {children}
    // </button>
    <div className="marker" /*onClick={_onClick}*/>
      {children}
      {type === "start" || type === "end" ? (
        <FlagIcon />
      ) : type === "pickup" || type === "dropoff" ? (
        <TruckIcon />
      ) : type === "service" ? (
        <WrenchIcon />
      ) : (
        <MapPinIcon />
      )}
      <div
        className="marker-number"
        style={{ backgroundColor: backgroundColorByRoute }}
      >
        {stopNumber}
      </div>
      {/* <div className="marker-text">{feature.properties.title}</div> */}
    </div>
  );
};

const Solutions = () => {
  const [isProblemsLoading, setIsProblemsLoading] = useState(true);
  const [isSolutionLoading, setIsSolutionLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [solution, setSolution] = useState(null);
  const mapContainerRef = useRef(null);
  // Declare mapRef as a useRef
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  // const popupRef = useRef(
  //   new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
  // );

  // Initialize map when component mounts
  useEffect(() => {
    handleGet();
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: [-114.063124, 51.044297],
      zoom: 10,
    });

    // Set mapRef to the map instance
    mapRef.current = map;

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  async function handleGet() {
    try {
      const problemsData = await getProblems();
      setProblems(problemsData);
      setIsProblemsLoading(false);
      // console.log(problemsData);
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleGetSolution(id) {
    try {
      const solutionData = await getSolution(id);
      setSolution(solutionData);
      setIsSolutionLoading(false);

      const map = mapRef.current;

      // Remove existing markers
      markers.forEach((marker) => {
        marker.remove();
      });

      // Clear the list of markers
      setMarkers([]);

      solutionData.routes.forEach((route, routeIndex) => {
        let stopNumber = 0;
        let backgroundColorByRoute = ContrastColors[routeIndex];
        route.stops.forEach((stop) => {
          if (
            stop.type === "start" ||
            stop.type === "service" ||
            stop.type === "pickup" ||
            stop.type === "dropoff" ||
            stop.type === "end"
          ) {
            stopNumber++;
            // Create a popup, but don't add it to the map yet.
            const popup = new mapboxgl.Popup({
              // closeButton: false,
              // closeOnClick: false,
              offset: 25,
            }).setHTML(`
            <h1 style="font-weight: bold">${stop.location}</h1>
            <h1 style="font-weight: bold">${
              route.vehicle
            }, stop#${stopNumber}</h1>
            <p>Coordinates: ${stop.location_metadata.supplied_coordinate[0]}, ${
              stop.location_metadata.supplied_coordinate[1]
            }</p>
            <p>ETA: ${isoToDatetimeLocal(stop.eta)}</p>
            <p>Type: ${stop.type}</p>
            ${
              stop.services
                ? `<p>Services: ${stop.services.join(", ")}</p>`
                : ""
            }
            ${stop.duration ? `<p>Duration: ${stop.duration / 60} min</p>` : ""}
            ${stop.wait ? `<p>Duration: ${stop.wait / 60} min</p>` : ""}
            ${
              stop.odometer ? `<p>Odometer: ${stop.odometer / 1000} km</p>` : ""
            }
          `);

            // Create a React ref
            const ref = React.createRef();

            // Create a new DOM node and save it to the React ref
            ref.current = document.createElement("div");
            // Render a Marker Component on our new DOM node

            createRoot(ref.current).render(
              <Marker
                /*onClick={markerClicked}*/
                stop={stop}
                type={stop.type}
                stopNumber={stopNumber}
                backgroundColorByRoute={backgroundColorByRoute}
              />
            );

            // Create a Mapbox Marker at our new DOM node
            const marker = new mapboxgl.Marker(ref.current)
              .setLngLat(stop.location_metadata.supplied_coordinate)
              .setPopup(popup)
              .addTo(map);

            // Add the new marker to the list of markers
            setMarkers((prevMarkers) => [...prevMarkers, marker]);
          }
        });
      });
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  // const markerClicked = (title) => {
  //   window.alert(title);
  // };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">
        {"solutions".toUpperCase()}
      </h1>
      {!isProblemsLoading ? (
        <SolutionCard
          problems={problems}
          handleGetSolution={handleGetSolution}
          isSolutionLoading={isSolutionLoading}
          solution={solution}
        />
      ) : (
        ""
      )}
      <div className="map-container" ref={mapContainerRef} />
    </>
  );
};

export default Solutions;
