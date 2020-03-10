/** @jsx jsx */
import PropTypes from 'prop-types';
import {
  Label,
  Textarea,
  Input,
  Checkbox,
  Button,
  Radio,
  Select,
  Grid,
  Box,
  Styled,
  jsx
} from 'theme-ui';
import BlockText from './block-text-serializer';

const getFormField = field => {
  switch (field.input) {
    case 'textarea':
      return (
        <div key={field.id} sx={{gridColumn: '1/3'}}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Textarea id={field.id} name={field.label} rows="8" />
        </div>
      );
    case 'select':
      return (
        <div key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Select id={field.id} name={field.label}>
            {field.values.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>
      );
    case 'radio':
      return (
        <fieldset key={field.label}>
          <legend sx={{gridColumn: '1/3'}}>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
              <Radio
                type="radio"
                sx={{width: 'initial'}}
                id={value}
                name={field.id}
                value={value}
              />
              <Label
                sx={{display: 'inline', ml: '10px', pb: '0px'}}
                htmlFor={value}
              >
                {value}
              </Label>
            </div>
          ))}
        </fieldset>
      );
    case 'checkbox':
      return (
        <div key={field.id}>
          <Checkbox type="checkbox" id={field.id} name={field.label} />
          <Label sx={{display: 'inline'}} htmlFor={field.id}>
            {field.label}
          </Label>
        </div>
      );
    default:
      return (
        <div key={field.id}>
          <Label htmlFor={field.id} required={field.required}>
            {field.label}
            {field?.required && <strong>*</strong>}
          </Label>
          <Input type={field.input} id={field.id} name={field.label} />
        </div>
      );
  }
};

const Form = ({title, id, description, fields}) => {
  return (
    <Box as="form" id={id}>
      <fieldset>
        <Styled.h2>{title}</Styled.h2>
        {description && <BlockText blocks={description} />}
        <Grid gap={20} columns={['1fr, 1fr']}>
          {fields.map(field => {
            return getFormField(field);
          })}
          <Button sx={{gridColumn: '1/3'}} type="submit" value="Submit">
            Submit
          </Button>
        </Grid>
      </fieldset>
    </Box>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.array,
  fields: PropTypes.array.isRequired
};

export default Form;
