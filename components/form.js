import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Label,
  Textarea,
  Input,
  Checkbox,
  Button,
  Radio,
  Select
} from 'theme-ui';
import BlockText from './block-text-serializer';

const Grid = styled('section')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  input:focus,
  textarea:focus {
    outline: 3px solid gold;
  }

  .fullwidth {
    grid-column: 1 / 3;
  }
  .inline {
    display: inline;
  }
`;

const RadioGroup = styled('fieldset')`
  input {
    width: initial;
  }
  label {
    display: inline;
    margin-left: 10px;
    padding-bottom: 0px;
  }
  legend {
    grid-column: 1 / 3;
  }
`;

const getFormField = field => {
  switch (field.input) {
    case 'textarea':
      return (
        <div className="fullwidth">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Textarea id={field.id} name={field.label} rows="8" />
        </div>
      );
    case 'select':
      return (
        <div>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Select id={field.id} name={field.label}>
            {field.values.map(value => (
              <option value={value}>{value}</option>
            ))}
          </Select>
        </div>
      );
    case 'radio':
      return (
        <RadioGroup>
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
              <Radio type="radio" id={value} name={field.id} value={value} />
              <Label htmlFor={value}>{value}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'checkbox':
      return (
        <div>
          <Checkbox type="checkbox" id={field.id} name={field.label} />
          <Label className="inline" htmlFor={field.id}>
            {field.label}
          </Label>
        </div>
      );
    default:
      return (
        <div>
          <Label htmlFor={field.id} required={field.required}>
            {field.label}
            {field.required ? <strong>*</strong> : ''}
          </Label>
          <Input type={field.input} id={field.id} name={field.label} />
        </div>
      );
  }
};

export default function Form({title, id, description, fields}) {
  return (
    <form id={id}>
      <fieldset>
        <h2>{title}</h2>
        <BlockText blocks={description} />
        <Grid>
          {fields.map(field => {
            return getFormField(field);
          })}
          <Button className="fullwidth" type="submit" value="Submit">Submit</Button>
        </Grid>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
};
