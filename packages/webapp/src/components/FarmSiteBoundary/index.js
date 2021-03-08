import React from 'react';
import { useTranslation } from 'react-i18next';
import AreaDetails from '../AreaDetails';

export default function PureFarmSiteBoundary({ onGoBack }) {
  const { t } = useTranslation();

  return (
    <div>
      <AreaDetails
        title={t('FARM_MAP.FARM_SITE_BOUNDARY.TITLE')}
        name={t('FARM_MAP.FARM_SITE_BOUNDARY.NAME')}
        onBack={onGoBack}
      />
    </div>
  );
}
