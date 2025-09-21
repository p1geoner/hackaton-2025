import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';

import { BoundsProps } from './types';

const Bounds: FC<BoundsProps> = ({ setBounds }) => {
    const mapRef = useMapEvents({
        layeradd: () => {
            const northWestBounds = mapRef.getBounds().getNorthWest();
            const southEastBounds = mapRef.getBounds().getSouthEast();
            const zoom = mapRef.getZoom();
            setBounds(northWestBounds, southEastBounds, zoom);
        },
        moveend: () => {
            const northWestBounds = mapRef.getBounds().getNorthWest();
            const southEastBounds = mapRef.getBounds().getSouthEast();
            const zoom = mapRef.getZoom();
            setBounds(northWestBounds, southEastBounds, zoom);
        },
    });

    return <div></div>;
};

export default Bounds;