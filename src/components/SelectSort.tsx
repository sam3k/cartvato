import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';

interface IProps {
  sortBy: string;
  onItemSelect: any;
}

interface ISelect {
  id:number; 
  query:string;
}

const UISelect = Select.ofType<ISelect>();

const SelectSort = (props: IProps) => {
  const { sortBy } = props;

  const options = [
    {id: 3, query: 'Name'},
    {id: 1, query: 'Type'},
    {id: 2, query: 'Price'},
  ];

  const itemRenderer = (item:{id:number; query:string;}, itemProps:IItemRendererProps) => {
    return (
      <MenuItem
        key={item.id}
        onClick={itemProps.handleClick}
        text={item.query}
      />
    );
  }

  return (
    <UISelect
      className="btn-select"
      items={options}
      filterable={false}
      inputProps={{ value: sortBy, onChange: props.onItemSelect }}
      itemRenderer={itemRenderer}
      onItemSelect={props.onItemSelect}
    >
      <Button text={`Sort by: ${sortBy}`} rightIcon="caret-down" />
    </UISelect>
  );
}

export default SelectSort;