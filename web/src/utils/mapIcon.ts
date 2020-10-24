import Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [40, 50],
    iconAnchor: [22, 50],
    popupAnchor: [170, 2]
})

export default mapIcon
