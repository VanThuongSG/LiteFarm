import React from 'react';
import Field from '../../../components/AreaDetailsLayout/Field';
import decorator from '../../Pages/config/decorators';

export default {
  title: 'Components/Area/Field',
  decorators: decorator,
  component: Field,
};

const Template = (args) => <Field {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  history: (data) => console.log(data),
  submitForm: (data) => console.log(data),
  areaType: (data) => console.log(data),
};
Primary.parameters = {
  chromatic: { viewports: [320, 414, 768, 1024, 1800] },
};
