import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import GoogleMap from 'google-map-react';
import { DEFAULT_ZOOM, GMAPS_API_KEY } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { userFarmSelector } from '../../containers/userFarmSlice';
import { chooseFarmFlowSelector, endMapSpotlight } from '../ChooseFarm/chooseFarmFlowSlice';
import ExportMapModal from '../../components/Modals/ExportMapModal';
import { fieldsSelector } from '../fieldSlice';

import PureMapHeader from '../../components/Map/Header';
import PureMapFooter from '../../components/Map/Footer';
import CustomZoom from '../../components/Map/CustomZoom';
// import CustomNorthify from '../../components/Map/CustomNorthify';

export default function Map() {
  const { farm_name, grid_points, is_admin, farm_id } = useSelector(userFarmSelector);
  const { showMapSpotlight } = useSelector(chooseFarmFlowSelector);
  const fields = useSelector(fieldsSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  let [roadview, setRoadview] = useState(false);
  const [showMapFilter, setShowMapFilter] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // setCenter(grid_points);
  }, []);

  const getMapOptions = (maps) => {
    return {
      streetViewControl: false,
      scaleControl: true,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
      gestureHandling: 'greedy',
      disableDoubleClickZoom: true,
      minZoom: 1,
      maxZoom: 80,
      tilt: 0,
      mapTypeControl: true,
      mapTypeId: !roadview ? maps.MapTypeId.SATELLITE : maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [maps.MapTypeId.ROADMAP, maps.MapTypeId.SATELLITE],
      },
      // mapTypeId: maps.MapTypeId.SATELLITE,
      // mapTypeControlOptions: {
      //   style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
      //   position: maps.ControlPosition.BOTTOM_CENTER,
      //   mapTypeIds: [maps.MapTypeId.ROADMAP, maps.MapTypeId.SATELLITE, maps.MapTypeId.HYBRID],
      // },
      zoomControl: true,
      clickableIcons: false,
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
  };

  const handleGoogleMapApi = (map, maps) => {
    console.log(map);
    console.log(maps);

    const zoomControlDiv = document.createElement('div');
    ReactDOM.render(
      <CustomZoom
        style={{ margin: '12px' }}
        onClickZoomIn={() => map.setZoom(map.getZoom() + 1)}
        onClickZoomOut={() => map.setZoom(map.getZoom() - 1)}
      />,
      zoomControlDiv,
    );
    map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

    // const northifyControlDiv = document.createElement('div');
    // ReactDOM.render(<CustomNorthify onClick={() => console.log('hi')} />, northifyControlDiv);
    // map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(northifyControlDiv);

    // let farmBounds = new maps.LatLngBounds();
    // TODO: FILL IN HANDLE GOOGLE MAP API
  };

  const resetSpotlight = () => {
    dispatch(endMapSpotlight(farm_id));
  };

  const handleClickAdd = () => {
    setShowModal(false);
  };

  const handleClickFilter = () => {
    setShowModal(false);
    setShowMapFilter(!showMapFilter);
  };

  const handleClickExport = () => {
    setShowModal(!showModal);
  };

  const handleDismiss = () => {
    setShowModal(false);
  };

  const handleShowVideo = () => {
    console.log('show video clicked');
  };

  const handleDownload = () => {
    console.log('download clicked');
  };

  const handleShare = () => {
    console.log('share clicked');
  };

  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
    if (!open) setHeight(window.innerHeight / 2);
  };

  return (
    <div className={styles.pageWrapper}>
      <PureMapHeader
        className={styles.mapHeader}
        farmName={farm_name}
        showVideo={handleShowVideo}
      />
      <div className={styles.mapContainer}>
        <div className={styles.workaround}>
          <GoogleMap
            style={{ flexGrow: 1 }}
            bootstrapURLKeys={{
              key: GMAPS_API_KEY,
              libraries: ['drawing', 'geometry', 'places'],
              language: localStorage.getItem('litefarm_lang'),
            }}
            defaultCenter={grid_points}
            defaultZoom={DEFAULT_ZOOM}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleGoogleMapApi(map, maps)}
            options={getMapOptions}
          ></GoogleMap>
        </div>
      </div>

      <PureMapFooter
        className={styles.mapFooter}
        isAdmin={is_admin}
        showSpotlight={showMapSpotlight}
        resetSpotlight={resetSpotlight}
        onClickAdd={handleClickAdd}
        onClickFilter={handleClickFilter}
        onClickExport={handleClickExport}
        showModal={showModal}
        setHeight={setHeight}
        height={height}
        state={state}
        toggleDrawer={toggleDrawer}
      />
      {showModal && (
        <ExportMapModal
          onClickDownload={handleDownload}
          onClickShare={handleShare}
          dismissModal={handleDismiss}
        />
      )}
    </div>
  );
}
