import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { newProperty } from '../../mock_data/property_data'

import { Modal, Box } from '@mui/material';


function Map(props) {
    const mapContainer = useRef(null);


    mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

    const { selectedRent, selectedprice, selectedcity, selectedstate, searchQuery } = props
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const handleMarkerClick = (property) => {
        setSelectedProperty(property);
        setModalOpen(true);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleClose = () => setModalOpen(false)
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-118.242766, 34.053691],
            zoom: 2,
        });
        const zoomControl = new mapboxgl.NavigationControl();
        map.addControl(zoomControl, 'bottom-right');

        // Adjust the CSS of the zoom control
        const zoomControlContainer = map.getContainer().querySelector('.mapboxgl-ctrl-bottom-right');
        zoomControlContainer.style.bottom = '150px';
        const filteredProperties = newProperty.filter((property) => {
            return (
                (!selectedRent || property.status === selectedRent) &&
                (!selectedprice || property.price == selectedprice) &&
                (!selectedcity || property.city === selectedcity) &&
                (!selectedstate || property.state === selectedstate) &&
                (searchQuery === '' ||
                    property.price.toString().includes(searchQuery) ||
                    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    property.state.toLowerCase().includes(searchQuery.toLowerCase()))

            );
        });
        filteredProperties.forEach((property) => {
            const { latitude, longitude, name } = property;

            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .setPopup(null)
                .addTo(map);

            marker.getElement().addEventListener('click', () => {
                handleMarkerClick(property);
            });
        });

        return () => {
            map.remove();
        };
    }, [selectedRent, selectedprice, selectedcity, selectedstate, searchQuery]);

    return (
        <>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedProperty && (
                        <Box>
                            <p>PropertyName: {selectedProperty.name}</p>
                            <p>Latitude: {selectedProperty.latitude}</p>
                            <p>Longitude: {selectedProperty.longitude}</p>
                            <p>Address: {selectedProperty.address}</p>
                            <p>City: {selectedProperty.city}</p>
                            <p>State: {selectedProperty.state}</p>
                            <p>Description: {selectedProperty.description}</p>
                            <p>Price: {selectedProperty.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '$ ')}</p>
                            <p>Type: {selectedProperty.type}</p>
                            <p>Status: {selectedProperty.status}</p>
                            <img
                                src={selectedProperty.imageUrl}
                                alt={selectedProperty.name}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Box>
                    )}
                </Box>
            </Modal>

            <div style={{ height: '1000px', }} ref={mapContainer} />
        </>
    );
}

export default Map;
