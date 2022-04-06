import { Box } from "@creditas-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuLabel,
  MenuList,
} from "@creditas-ui/menu";
import {
  renderWithThemeProvider,
  ResizeObserver,
} from "@creditas-ui/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

const onPressEnabledMenuItem = jest.fn();
const onPressDisabledMenuItem = jest.fn();

// Super simple menu
const setup = () => (
  <Menu>
    <MenuButton>
      <Box role="button">Test Menu</Box>
    </MenuButton>

    <MenuList>
      <MenuItem role="menuitem" onSelect={onPressEnabledMenuItem}>
        <MenuLabel>Enabled</MenuLabel>
      </MenuItem>
      <MenuItem disabled onSelect={onPressDisabledMenuItem}>
        <MenuLabel>Disabled</MenuLabel>
      </MenuItem>
    </MenuList>
  </Menu>
);

describe("<Menu />", () => {
  beforeAll(() => {
    // @ts-ignore
    global.DOMRect = {};
    global.DOMRect.fromRect = jest.fn();
    global.ResizeObserver = jest.fn(() => new ResizeObserver());
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("renders MenuList when press MenuButton", () => {
    renderWithThemeProvider(setup());

    const menuButton = screen.getByRole("button");
    userEvent.click(menuButton);

    // This fails
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // This fails too
    const menuItem1 = screen.getByRole("menuitem", { name: "Enabled" });
    expect(menuItem1).toBeInTheDocument();

    // This fails too
    const menuItem2 = screen.getByRole("menuitem", { name: "Disabled" });
    expect(menuItem2).toBeInTheDocument();
  });
});
