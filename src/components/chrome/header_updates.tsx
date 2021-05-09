import React, { useState, Fragment } from "react";

import {
  EuiIcon,
  EuiHeaderAlert,
  EuiHeaderSectionItemButton,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiLink,
  EuiFlyoutFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiText,
  EuiBadge,
} from "@elastic/eui";

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const alerts = [
    {
      title: "Facial Beauty",
      text: "First release.",
      action: <EuiLink href="#">Learn about feature controls</EuiLink>,
      date: "2021/04/09",
      badge: <EuiBadge>0.0.1</EuiBadge>,
    },
  ];

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setShowBadge(false);
    setIsFlyoutVisible(!isFlyoutVisible);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls="headerNewsFeed"
      aria-expanded={isFlyoutVisible}
      aria-haspopup="true"
      aria-label={`News feed: ${{ showBadge } ? "Updates available" : "No updates"}`}
      onClick={() => showFlyout()}
      notification={showBadge && "•"}>
      <EuiIcon type="cheer" size="m" />
    </EuiHeaderSectionItemButton>
  );

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        onClose={() => closeFlyout()}
        size="s"
        id="headerNewsFeed"
        aria-labelledby="flyoutSmallTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">What&apos;s new</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          {alerts.map((alert, i) => (
            <EuiHeaderAlert
              key={`alert-${i}`}
              title={alert.title}
              action={alert.action}
              text={alert.text}
              date={alert.date}
              badge={alert.badge}
            />
          ))}
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty iconType="cross" onClick={() => closeFlyout()} flush="left">
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText color="subdued" size="s">
                <p>Version 7.0</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  return (
    <Fragment>
      {button}
      {flyout}
    </Fragment>
  );
};
