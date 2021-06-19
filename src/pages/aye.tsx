import React, { useEffect } from "react";
import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiText } from "@elastic/eui";
import { runQuery } from "./index";

export default () => {
  useEffect(() => {
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
