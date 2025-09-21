import { LatLng } from 'leaflet';

export type MapProps = {
    zoom?: number;
    defaultCoords?: number[];
    mapsStyles: string;
    isMovable?: boolean;
    isSingleMarker?: boolean;
    setOpenList?: (openList: boolean) => void;
    type?: 'adverts' | 'externalAdverts';
    setPage?: (page: number) => void;
    page?: number;
    setParamsToFetch?: (paramsToFetch: string) => void;
    setIsModalFilterOpen?: (isModalFilterOpen: boolean) => void;
};

export type BoundsProps = {
    setBounds: (northWest: LatLng, southEast: LatLng, zoom: number) => void;
};

export type TMapNode = {
    latitude: number;
    longitude: number;
    grade: number;
    grade_humanize: string;
}

export type MarkersProps = {
    type?: 'adverts' | 'externalAdverts';
    setOpenList?: (openList: boolean) => void;
    getCoords?: (id: number, lat: number, lng: number) => void;
    isSingleMarker?: boolean;
    defaultCoords?: number[];
    marker: number[];
    setPage?: (page: number) => void;
    page?: number;
    items: TMapNode[];
    isMap?: boolean;
    setIsModalFilterOpen?: (isModalFilterOpen: boolean) => void;
};

export type TMapPoints = {
    ids: number[];
    coords: { lng: number; lat: number };
    id: number;
};