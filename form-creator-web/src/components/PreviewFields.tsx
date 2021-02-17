import { Box, FormControl, Grid, Input, FormLabel, Select, Textarea, Checkbox, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import { FormField } from "../app/models/formFieldValues";
import { FormValues } from "../app/models/formValues";

const PreviewFields = ({ control }: { control: Control<FormValues> }) => {
  const fieldArray = useWatch<FormField[]>({
    control,
    name: `fields`,
    defaultValue: [{ type: "", name: "[Name]", placeholder: "[Placeholder]", options: "", required: "Yes" }],
  });

  const createDropdownOptions = (options: string) => {
    let optionsArray = options.split(",");
    let dropdownOptions: { key: string; value: string; display: string }[] = [];
    optionsArray.map((option, index) => {
      dropdownOptions.push({ key: `${index}`, value: `${option}`, display: `${option}` });
      return true;
    });
    let jsx = dropdownOptions.map((option) => {
      return (
        <option key={option.key} value={option.value}>
          {option.display}
        </option>
      );
    });

    return jsx;
  };

  const [value, setValue] = React.useState();
  const createRadioOptions = (options: string) => {
    let optionsArray = options.split(",");
    let dropdownOptions: { key: string; value: string; display: string }[] = [];
    optionsArray.map((option, index) => {
      dropdownOptions.push({ key: `${index}`, value: `${option}`, display: `${option}` });
      return true;
    });
    let jsx = dropdownOptions.map((option) => {
      return (
        <Radio key={option.key} value={option.value}>
          {option.display}
        </Radio>
      );
    });

    return jsx;
  };

  return (
    <>
      <h1>Form Preview</h1>
      {/* <div>{JSON.stringify(fieldArray)}</div> */}
      <Box colorScheme="blue" w="auto" p={2} m="auto">
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {fieldArray.map((field) => {
            if (field.type === "Text")
              return (
                <FormControl>
                  <FormLabel paddingLeft={1}>{field.name ? field.name : "[Field Name]"}</FormLabel>
                  <Input type="text" name={field.name} placeholder={field.placeholder ? field.placeholder : "[input placeholder text]"} />
                </FormControl>
              );

            if (field.type === "Dropdown")
              return (
                <FormControl>
                  <FormLabel paddingLeft={1}>{field.name ? field.name : "[Field Name]"}</FormLabel>
                  <Select name={field.name} placeholder={field.placeholder ? field.placeholder : "[dropdown placeholder text]"}>
                    {createDropdownOptions(field.options)}
                  </Select>
                </FormControl>
              );

            if (field.type === "Textarea")
              return (
                <FormControl>
                  <FormLabel paddingLeft={1}>{field.name ? field.name : "[Field Name]"}</FormLabel>
                  <Textarea name={field.name} placeholder={field.placeholder ? field.placeholder : "[textarea placeholder text]"} resize="vertical" />
                </FormControl>
              );

            if (field.type === "Checkbox")
              return (
                <FormControl>
                  <FormLabel paddingLeft={1}>{field.name ? field.name : "[Field Name]"}</FormLabel>
                  <Checkbox>{field.placeholder ? field.placeholder : "[checkbox content = placeholder text]"}</Checkbox>
                </FormControl>
              );

            if (field.type === "Radio")
              return (
                <FormControl>
                  <FormLabel paddingLeft={1}>{field.name ? field.name : "[Field Name]"}</FormLabel>
                  <RadioGroup>
                    <Stack direction="row">{createRadioOptions(field.options)}</Stack>
                  </RadioGroup>
                </FormControl>
              );

            if (field.type === "File")
              return (
                <FormControl>
                  <FormLabel paddingLeft={1}>{field.name ? field.name : "[Field Name]"}</FormLabel>
                  <Input type="file" name={field.name} placeholder={field.placeholder ? field.placeholder : "[input placeholder text]"} />
                </FormControl>
              );

            return false;
          })}
        </Grid>
      </Box>
    </>
  );
};

export default PreviewFields;
