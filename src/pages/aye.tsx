import React from "react";
import { Link } from "gatsby";

import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiText } from "@elastic/eui";
import { useMount } from "react-use";
import { runQuery } from "./index";

export default () => {
  useMount(() => {
    runQuery(
      `
      mutation MyMutation($value: String) {
        insert_temp(objects: { key: "guest", value: $value }) {
          affected_rows
        }
      }
    `,
      {
        value: navigator.userAgent || "unknown",
      }
    );
  });

  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentBody>
            <EuiText>
              <p>Anh còn yêu em nhiều lắm, em vào đây anh biết đó. Em bỏ chặn anh nhé!</p>
            </EuiText>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
