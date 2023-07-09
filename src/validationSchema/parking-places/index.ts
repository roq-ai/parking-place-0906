import * as yup from 'yup';

export const parkingPlaceValidationSchema = yup.object().shape({
  status: yup.string().required(),
  location: yup.string().required(),
  organization_id: yup.string().nullable(),
});
