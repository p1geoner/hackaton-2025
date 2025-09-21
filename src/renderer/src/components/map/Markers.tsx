import { FC, useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';

import { LatLngExpression, divIcon } from 'leaflet';

import { MarkersProps, TMapPoints } from './types';
import {HeatMapOutlined} from "@ant-design/icons";

import IconMap from '../../assets/map.svg?react'
import {useStyles} from "./styles";


const Markers: FC<MarkersProps> =
    ({
         setOpenList,
         type,
         isSingleMarker,
         defaultCoords,
         marker,
        items,
         setPage,
         page,
         isMap,
         setIsModalFilterOpen,
     }) => {

    const {styles} = useStyles();

        const screenWidth = window.innerWidth;
        const isDesktopWidth = screenWidth > 1150;

        const iconMarkup = renderToStaticMarkup(<IconMap className={styles.green}/>);
        const iconMarkupOrange = renderToStaticMarkup(<IconMap className={styles.orange} />);
        const iconMarkupRed = renderToStaticMarkup(<IconMap className={styles.red} />);

        const [advertsIds, setAdvertsIds] = useState<number[]>([]);

        const [activeMarcerCoords, setActiveMarkerCoords] = useState<[number, number]>([0, 0]);
        const [points, setPoints] = useState<TMapPoints[] | null>(null);

        useEffect(() => {

        }, [page]);

        useEffect(() => {
            // if (mapPoints.amount) {
            //     if (type === 'adverts') {
            //         setPoints(
            //             mapPoints.advertsPointsList.map((item) => {
            //                 return {
            //                     coords: item.coords,
            //                     id: item.id,
            //                     ids: item.advertsIds,
            //                 };
            //             }),
            //         );
            //     } else {
            //         setPoints(
            //             mapPoints.externalAdvertsPointsList.map((item) => {
            //                 return {
            //                     coords: item.coords,
            //                     id: item.id,
            //                     ids: item.externalAdvertsIds,
            //                 };
            //             }),
            //         );
            //     }
            // }
        }, []);

        useEffect(() => {
            if (isMap) {
                setActiveMarkerCoords([0, 0]);
                setPoints(null);
            }
        }, []);

        const onMarkerClick = (ids: number[], coords: [number, number]) => {
            document.getElementById('adverts-list')?.scrollTo(0, 0);
            setActiveMarkerCoords(coords);
            setAdvertsIds(ids);

            if (!isDesktopWidth && setOpenList) {
                setOpenList(true);
            }
            if (setIsModalFilterOpen && isMap) setIsModalFilterOpen(false);
            if (setPage) setPage(1);
        };

        const markerIcon = (grade: number) => {
            if (grade < 29) {
                return divIcon({
                    html: iconMarkup,
                    iconAnchor: [0, 0],
                });
            } else {
                if(grade <70) {
                    return divIcon({
                        html: iconMarkup,
                        iconAnchor: [0, 0],
                    });
                } else {
                    return divIcon({
                        html: iconMarkupRed,
                        iconAnchor: [0, 0],
                    });
                }

            }
        };

        const customMarkerIcon = divIcon({
            html: iconMarkup,
            iconAnchor: [0, 0],
        });

        return (
            <>
                {
                    items &&
                    items.map((item, index) => {
                            const itemCoords: [number, number] = [item.latitude, item.longitude];
                            return (
                                <Marker
                                    position={itemCoords}
                                    key={index}
                                    icon={markerIcon(item.grade)}
                                    eventHandlers={{
                                        click: () => {
                                            onMarkerClick(item.ids, itemCoords);
                                        },
                                    }}
                                />
                            );
                    })}


            </>
        );
    }

export default Markers;