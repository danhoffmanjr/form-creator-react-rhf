import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Grid, FormControl, FormLabel, Input, Select, IconButton, Button } from "@chakra-ui/react";
import { PlusSquareIcon, DeleteIcon } from "@chakra-ui/icons";
import { FormValues } from "../app/models/formValues";

const Form = ({
    startingState = {
      title: "Title 1",
      fields: [{ type: "", name: "", placeholder: "", options: "", required: "" }],
    },
  }) => {
    const fieldTypes = [
      { value: "Text", display: "Text" },
      { value: "Dropdown", display: "Dropdown" },
      { value: "Checkbox", display: "Checkbox" },
      { value: "Radio", display: "Radio" },
      { value: "Textarea", display: "textarea" },
      { value: "File", display: "File" },
    ];
  
    const isRequired = [
      { value: "Yes", display: "Yes" },
      { value: "No", display: "No" },
    ];
  
    const { register, errors, handleSubmit, formState, watch } = useForm({
      mode: "all",
      reValidateMode: "onChange",
      defaultValues: startingState,
    });
  
    const { isDirty, isSubmitting } = formState;
  
    const [fieldIds, setFieldIds] = useState(Object.keys(startingState.fields));
  
    const addField = () => {
      let max = findmax(fieldIds);
      setFieldIds([...fieldIds, (max + 1).toString()]);
    };
  
    const removeField = (index: string) => {
      setFieldIds(fieldIds.filter((i) => i !== index));
    };
  
    const onSubmit = (data: FormValues) => {
      console.log({
        ...data,
        fields: Object.values(data.fields),
      });
    };
  
    const findmax = (array: string[]) => {
      var fieldIds = array.map(Number),
        max = 0,
        len = array.length,
        counter;
  
      for (counter = 0; counter < len; counter++) {
        if (fieldIds[counter] > max) {
          max = fieldIds[counter];
        }
      }
      return max;
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box colorScheme="blue" w="auto" p={2} m="auto">
          <FormControl isInvalid={!!errors.title}>
            {errors.title ? (
              <FormLabel color="red" fontSize="sm">
                {errors.title.message}
              </FormLabel>
            ) : (
              <FormLabel fontSize="sm">Title</FormLabel>
            )}
            <Input type="text" name="title" placeholder="Title" size="sm" isInvalid={!!errors.title} ref={register({ required: "Title is Required*" })} />
          </FormControl>
        </Box>
        <Box colorScheme="blue" w="auto" paddingLeft={3} paddingRight={1}>
          <Grid templateColumns="repeat(5, 1fr) 35px" gap={2}>
            <FormLabel fontSize="sm">Type</FormLabel>
            <FormLabel fontSize="sm">Name</FormLabel>
            <FormLabel fontSize="sm">Placeholder</FormLabel>
            <FormLabel fontSize="sm">Options</FormLabel>
            <FormLabel fontSize="sm">Required</FormLabel>
            <div></div>
          </Grid>
        </Box>
        {fieldIds.map((id) => (
          <Box key={id} colorScheme="blue" w="auto" p={2} m="auto">
            <Grid templateColumns="repeat(5, 1fr) 35px" gap={2}>
              <FormControl isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.type}>
                <Select name={`fields[${id}].type`} placeholder="Select Field Type" size="sm" ref={register({ required: true })} isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.type}>
                  {fieldTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </Select>
              </FormControl>
  
              <FormControl isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.name}>
                <Input
                  type="text"
                  name={`fields[${id}].name`}
                  placeholder="Field Name"
                  size="sm"
                  isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.name}
                  ref={register({ required: "Name is Required*" })}
                />
              </FormControl>
  
              <FormControl isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.placeholder}>
                <Input
                  type="text"
                  name={`fields[${id}].placeholder`}
                  placeholder="Placeholder text"
                  size="sm"
                  isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.placeholder}
                  ref={register({ required: "Placeholder is Required*" })}
                />
              </FormControl>
              <FormControl isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.options}>
                <Input
                  type="text"
                  name={`fields[${id}].options`}
                  placeholder="Comma separated list"
                  size="sm"
                  disabled={watch(`fields[${id}].type`) !== "Dropdown"}
                  ref={register({
                    required: watch(`fields[${id}].type`) === "Dropdown",
                  })}
                />
              </FormControl>
              <FormControl isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.required}>
                <Select
                  name={`fields[${id}].required`}
                  placeholder="Select Field Type"
                  size="sm"
                  ref={register({ required: "Is Required is Required*" })}
                  isInvalid={errors.fields && !!errors.fields[parseInt(id)]?.required}
                >
                  {isRequired.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <IconButton colorScheme="red" variant="outline" aria-label="Delete Form Field" icon={<DeleteIcon />} size="sm" onClick={() => removeField(id)} />
              </FormControl>
            </Grid>
          </Box>
        ))}
        {/* <div>{fieldIds.join(",")}</div> */}
        <Box p={2} m="auto">
          <Button leftIcon={<PlusSquareIcon />} colorScheme="blue" variant="solid" onClick={() => addField()}>
            Add Field
          </Button>
        </Box>
        <Box p={2} m="auto">
          <Button type="submit" isLoading={isSubmitting} colorScheme="whatsapp" variant="solid" disabled={!isDirty}>
            Submit
          </Button>
        </Box>
      </form>
    );
  }

export default Form
