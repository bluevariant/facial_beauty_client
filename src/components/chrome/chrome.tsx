/**
 * Chrome component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import React, { useState, useEffect } from "react";
import _ from "lodash";

import {
  EuiPopover,
  EuiSpacer,
  EuiAvatar,
  EuiHeader,
  EuiIcon,
  EuiButton,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiPinnableListGroup,
  EuiListGroupItem,
  EuiPinnableListGroupItemProps,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiShowFor,
} from "@elastic/eui";

import { DeploymentsGroup, KibanaNavLinks, SecurityGroup } from "./collapsable_nav_list";

import { HeaderSpacesMenu } from "./header_spaces_menu";

import HeaderUpdates from "./header_updates";

export const ThemeContext = React.createContext("dark");

if (localStorage.getItem("theme") === "dark") {
  require("../../themes/theme_dark.scss");
} else {
  require("../../themes/theme_light.scss");
}

const TopLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: "Home",
    iconType: "home",
    isActive: true,
    "aria-current": true,
    href: "#/navigation/collapsible-nav",
    pinnable: false,
  },
];

const KibanaLinks: EuiPinnableListGroupItemProps[] = KibanaNavLinks.map((link: any) => {
  return {
    ...link,
    href: "#/navigation/collapsible-nav",
  };
});

const LearnLinks: EuiPinnableListGroupItemProps[] = [
  { label: "Docs", href: "#/navigation/collapsible-nav" },
  { label: "Blogs", href: "#/navigation/collapsible-nav" },
  { label: "Webinars", href: "#/navigation/collapsible-nav" },
  { label: "Elastic.co", href: "https://elastic.co" },
];

export const Chrome = ({ children }: any) => {
  const initialTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const [themeIsLoading, setThemeIsLoading] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  window?.document?.body.classList.add("euiBody--headerIsFixed--double");

  useEffect(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    return () => {
      // Clean up the subscription
      localStorage.setItem("theme", newTheme);
      setThemeIsLoading(true);
      window.location.reload();
    };
  }, [theme]);

  const breadcrumbs = [
    {
      text: "Management",
      href: "#",
    },
    {
      text: "Facial Beauty",
    },
  ];

  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  );

  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem("openNavGroups"))) || ["Kibana", "Learn"]
  );

  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem("openNavGroups", JSON.stringify(openGroups));
  };
  /** Pinning */ const [pinnedItems, setPinnedItems] = useState<EuiPinnableListGroupItemProps[]>(
    JSON.parse(String(localStorage.getItem("pinnedItems"))) || []
  );
  const addPin = (item: any) => {
    if (!item || _.find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem("pinnedItems", JSON.stringify(newPinnedItems));
  };

  const removePin = (item: any) => {
    const pinIndex = _.findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem("pinnedItems", JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: EuiPinnableListGroupItemProps[],
    showPinned = false
  ): EuiPinnableListGroupItemProps[] {
    return links.map(link => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Unpin ${listItem.label}`;
  }

  const collapsibleNav = (
    <EuiCollapsibleNav
      id="guideCollapsibleNavAllExampleNav"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={"menu"} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      {/* Dark deployments section */}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        {DeploymentsGroup}
      </EuiFlexItem>

      {/* Shaded pinned section always with a home item */}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup
          background="light"
          className="eui-yScroll"
          style={{ maxHeight: "40vh" }}>
          <EuiPinnableListGroup
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true)
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      <EuiHorizontalRule margin="none" />

      {/* BOTTOM */}
      <EuiFlexItem className="eui-yScroll">
        {/* Kibana section */}
        <EuiCollapsibleNavGroup
          title="Kibana"
          iconType="logoKibana"
          isCollapsible={true}
          initialIsOpen={openGroups.includes("Kibana")}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, "Kibana")}>
          <EuiPinnableListGroup
            aria-label="Kibana" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(KibanaLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>

        {/* Security callout */}
        {SecurityGroup}

        {/* Learn section */}
        <EuiCollapsibleNavGroup
          title="Learn"
          iconType="training"
          isCollapsible={true}
          initialIsOpen={openGroups.includes("Learn")}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, "Learn")}>
          <EuiPinnableListGroup
            aria-label="Learn" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(LearnLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>

        {/* Docking button only for larger screens that can support it*/}
        <EuiShowFor sizes={["l", "xl"]}>
          <EuiCollapsibleNavGroup>
            <EuiListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? "Undock" : "Dock"} navigation`}
              onClick={() => {
                setNavIsDocked(!navIsDocked);
                localStorage.setItem("navIsDocked", JSON.stringify(!navIsDocked));
              }}
              iconType={navIsDocked ? "lock" : "lockOpen"}
            />
          </EuiCollapsibleNavGroup>
        </EuiShowFor>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  const headers = (
    <>
      <EuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <EuiHeaderLogo href={"https://github.com/bluevariant"} iconType="logoElastic">
                DXLab
              </EuiHeaderLogo>,
            ],
            borders: "none",
          },
          {
            items: [
              <EuiPopover
                button={
                  <EuiHeaderSectionItemButton
                    aria-label="Account menu"
                    onClick={() => setIsAccountOpen(!isAccountOpen)}>
                    <EuiAvatar name="DX" size="s" />
                  </EuiHeaderSectionItemButton>
                }
                isOpen={isAccountOpen}
                closePopover={() => setIsAccountOpen(false)}>
                <div>
                  <EuiButton
                    size="s"
                    iconType="invert"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    isLoading={themeIsLoading}>
                    Switch Theme
                  </EuiButton>
                </div>
              </EuiPopover>,
            ],
            borders: "none",
          },
        ]}
      />
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [collapsibleNav, <HeaderSpacesMenu />],
            breadcrumbs: breadcrumbs,
            borders: "right",
          },
          {
            items: [<HeaderUpdates />],
            borders: "none",
          },
        ]}
      />
    </>
  );

  return (
    <ThemeContext.Provider value={theme}>
      <EuiSpacer />
      {headers}
      {children}
    </ThemeContext.Provider>
  );
};
