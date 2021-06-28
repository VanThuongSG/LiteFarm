import React from 'react';
import PureSetCertificationSummary from '../../../components/SetCertificationSummary';
import { useDispatch, useSelector } from 'react-redux';
import { patchStepFour } from '../saga';
import history from '../../../history';
import {
  allCertificationTypesSelector,
  allCertifierTypesSelector,
  requestedCertifierSelector,
  selectedCertificationSelector,
  selectedCertifierSelector,
} from '../organicCertifierSurveySlice';

export default function OnboardingSetCertificationSummary() {
  const dispatch = useDispatch();
  const certifierType = useSelector(selectedCertifierSelector);
  const requestedCertifierData = useSelector(requestedCertifierSelector);
  const certificationType = useSelector(selectedCertificationSelector);
  const allSupportedCertificationTypes = useSelector(allCertificationTypesSelector);
  const selectedCertificationTranslation = allSupportedCertificationTypes.find(
    (cert) => cert.certification_id === certificationType.certificationID,
  )?.certification_translation_key;
  const allSupportedCertifierTypes = useSelector(allCertifierTypesSelector);

  const onSubmit = () => {
    dispatch(patchStepFour());
  };

  const onGoBack = () => {
    certificationType.certificationName === 'Other'
      ? history.push('/certification/certifier/request')
      : allSupportedCertifierTypes.length < 1
      ? history.push('/certification/certifier/request')
      : history.push('/certification/certifier/selection');
  };

  return (
    <>
      <PureSetCertificationSummary
        name={requestedCertifierData ? requestedCertifierData : certifierType.certifierName}
        requestedCertifierData={requestedCertifierData}
        onSubmit={onSubmit}
        onGoBack={onGoBack}
        allSupportedCertificationTypes={allSupportedCertificationTypes}
        certificationType={certificationType}
        certificationTranslation={selectedCertificationTranslation}
      />
    </>
  );
}
