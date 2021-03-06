import { useEffect, useState } from 'react';

export default function useForm(initial: IFormState = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (evt) => {
    let { value, name, type } = evt.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = evt.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, '']);
    setInputs(Object.fromEntries(blankState));
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

interface IFormState {
  [index: string]: any;
}
