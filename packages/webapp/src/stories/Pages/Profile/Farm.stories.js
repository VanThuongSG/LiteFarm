import React from 'react';
import PureFarm from '../../../components/Profile/Farm';
import decorator from '../config/decorators';
import { chromaticSmallScreen } from '../config/chromatic';

export default {
  title: 'Form/Profile/Farm',
  decorators: decorator,
  component: PureFarm,
};

const Template = (args) => <PureFarm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  userFarm: {
    farm_name: 'liteFarm',
    last_name: 'last',
    farm_phone_number: '123456789',
    address: 'litefarm',
    units: {
      measurement: 'imperial',
      currency: 'CAD',
    },
  },
};
Primary.parameters = {
  ...chromaticSmallScreen,
};
