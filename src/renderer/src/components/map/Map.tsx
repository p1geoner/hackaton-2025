import {FC, useEffect, useState} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import Bounds from './Bounds';
import Markers from './Markers';
import { LatLng, LatLngExpression } from 'leaflet';

import {MapProps, TMapNode} from './types';

import 'leaflet/dist/leaflet.css';
import axios from "axios";

export const MapComponent: FC<MapProps> =
    ({
         zoom = 11,
         defaultCoords = [56.8641, 35.9285],
         mapsStyles = '',
         isMovable = true,
         isSingleMarker = false,
         type,
         setOpenList,
         setPage,
         page,
         setParamsToFetch,
         setIsModalFilterOpen,
     }) => {

    const [markers, setMarkers] = useState<TMapNode[]>([])

        const getData = async () => {
            const response = await axios.get('http://localhost:8000/api/map/alarms/?min_grade=0&max_grade=0');

            if('data' in response) {
                setMarkers(response.data);
            }
        }

        useEffect(() => {
            getData()
        }, []);

        const isMap =
            true

        const setBounds = (northWestVal: LatLng, southEastVal: LatLng, zoom: number) => {
            if (setParamsToFetch) {
                setParamsToFetch(
                    `&level=${zoom}&left_top_angle[latitude]=${northWestVal.lat.toFixed(
                        6,
                    )}&left_top_angle[longitude]=${northWestVal.lng.toFixed(
                        6,
                    )}&right_bottom_angle[latitude]=${southEastVal.lat.toFixed(
                        6,
                    )}&right_bottom_angle[longitude]=${southEastVal.lng.toFixed(6)}`,
                );
            }
        };
        const focusCoords = localStorage.getItem('focus_coords');
        const [marker] = useState<number[]>(
            !isMap
                ? defaultCoords
                : focusCoords !== null && focusCoords !== undefined
                    ? focusCoords.split(';').map((item) => parseFloat(item))
                    : defaultCoords,
        );

        return (
            // <MapPlug height={400} />
            <MapContainer
                center={marker as LatLngExpression}
                scrollWheelZoom={isMovable}
                doubleClickZoom={isMovable}
                dragging={isMovable}
                zoom={zoom}
                minZoom={6}
                className={mapsStyles}
                style={{height: 'calc(100vh - 0px)'}}
            >
                <Bounds setBounds={setBounds} />
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                <Markers
                    type={type}
                    items={markers}
                    setOpenList={setOpenList}
                    isSingleMarker={isSingleMarker}
                    defaultCoords={defaultCoords}
                    marker={marker}
                    setPage={setPage}
                    page={page}
                    isMap={isMap}
                    setIsModalFilterOpen={setIsModalFilterOpen}
                />
            </MapContainer>
        );
    }