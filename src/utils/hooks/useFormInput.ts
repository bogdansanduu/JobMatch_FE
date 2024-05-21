import { ChangeEvent, useCallback, useState } from "react";

const useFormInput = <
  T extends Record<string, string>,
  U extends Record<string, boolean>
>(
  initialFormState: T,
  initialDirtyState: U
) => {
  const [formData, setFormData] = useState<T>(initialFormState);
  const [dirty, setDirty] = useState<U>(initialDirtyState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      state: boolean
    ) => {
      const { name } = event.target;
      setDirty((prevDirty) => ({
        ...prevDirty,
        [name]: state,
      }));
    },
    []
  );

  return {
    formData,
    handleChange,
    handleBlur,
    setFormData,
    dirty,
    setDirty,
  };
};

export default useFormInput;
