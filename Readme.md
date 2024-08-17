
# custom-scroll-picker

`custom-scroll-picker` is a customizable scroll picker component for React, featuring a fixed item height of 50px to ensure a consistent user experience. This component is ideal for use in time pickers or any other list where users select an item by scrolling.

## Features

- **Fixed Item Height**: Each item has a fixed height of 50px, ensuring a consistent layout across the component.
- **Customizable**: The `ScrollPickerLayout`, `ScrollPickerCenter`, and `ScrollPickerItem` components can be fully customized to match your design needs.
- **React Integration**: Seamlessly integrates with React projects, making it easy to implement.

## Installation

Install the package via npm:

```bash
npm install custom-scroll-picker
```

## Usage

Below is an example of how to use the `ScrollPicker` component with custom styles using `styled-components`.

```tsx
import React from "react";
import styled from "styled-components";
import ScrollPicker from "custom-scroll-picker";

// Custom styles for ScrollPicker layout
const CustomLayout = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 150px; // Height of the scrollable area
  overflow-y: scroll; // Enable vertical scrolling
  position: relative;
  &::-webkit-scrollbar {
    display: none; // Hide the scrollbar
  }
`;

// Custom styles for the center highlight area
const CustomCenter = styled.div`
  height: 50px; // Fixed height for the center area
  position: sticky;
  top: 50px; // Position in the middle of the scroll area
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid black;
`;

// Custom styles for each item
const CustomItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isSelected }) => (isSelected ? "black" : "gray")};
  font-size: ${({ isSelected }) => (isSelected ? "24px" : "20px")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  height: 50px; // Fixed height for each item
`;

const App = () => (
  <ScrollPicker
    list={["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"]}
    ScrollPickerLayout={CustomLayout}
    ScrollPickerCenter={CustomCenter}
    ScrollPickerItem={CustomItem}
    onSelectedChange={(selected) => console.log(selected)}
  />
);

export default App;
```

## Props

### `ScrollPickerProps`

- **`list: string[]`**: Array of items to display in the scroll picker.
- **`onSelectedChange?: (selected: string) => void`**: Callback function triggered when the selected item changes.
- **`ScrollPickerLayout?: React.ElementType`**: Custom component for the layout wrapper (default: `ul`).
- **`ScrollPickerCenter?: React.ElementType`**: Custom component for the center highlight area (default: `div`).
- **`ScrollPickerItem?: React.ElementType`**: Custom component for individual items (default: `li`).

## Fixed Item Height

Each item's height is fixed at 50px, ensuring a uniform and consistent appearance throughout the component. You can style the `ScrollPickerItem` component as needed, but the height will remain constant.

## License

MIT
