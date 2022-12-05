import { Checkbox, Chip, createStyles, ListItemText, makeStyles, MenuItem } from "@material-ui/core";
import React from "react";

import { isNullish } from "../core/models";
import { ISelectInputProps, SelectInput } from "./select_input";

interface IProps<T> extends ISelectInputProps<T> {
  selectedOptions: T[];
}

const useStyles = makeStyles(() =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
      backgroundColor: "white",
      maxWidth: 100,
    },
    option: {
      maxWidth: 150,
    },
  }),
);

export function MultiSelectInput<T extends { id: string }>({ selectedOptions, renderLabel, ...rest }: IProps<T>) {
  const classes = useStyles();

  return (
    <SelectInput<T>
      renderValue={() => (
        <div className={classes.chips}>
          {selectedOptions.map((s) => (
            <Chip key={s.id} label={renderLabel(s)} className={classes.chip} />
          ))}
        </div>
      )}
      renderLabel={renderLabel}
      renderOption={(o) => (
        <MenuItem key={o.id} value={o as any}>
          <Checkbox checked={!isNullish(selectedOptions.find((s) => s.id === o.id))} />
          <ListItemText primary={renderLabel(o)} className={classes.option} />
        </MenuItem>
      )}
      {...rest}
      multiple
    />
  );
}
