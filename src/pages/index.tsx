import React from "react";
import MyComponent from "../components/my_component";
import {
  EuiButton,
  EuiCode,
  EuiFlyoutFooter,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from "@elastic/eui";

export default () => (
  <EuiPage restrictWidth>
    <EuiPageBody>
      {/*<EuiPageHeader>*/}
      {/*  <EuiPageHeaderSection>*/}
      {/*    <EuiTitle size="l">*/}
      {/*      <h1>Face shaming:)</h1>*/}
      {/*    </EuiTitle>*/}
      {/*  </EuiPageHeaderSection>*/}
      {/*</EuiPageHeader>*/}
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Chấm điểm khuôn mặt</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection />
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiSpacer />
          <EuiText>
            <p>
              <EuiIcon type="alert" /> Dự án có phần <sub>toxic</sub> nhưng mục đích là mang tính
              vui nhộn, kết quả không mang tính{" "}
              <span style={{ textDecoration: "line-through" }}>chính xác</span> cũng như không cổ
              súy face shaming.
            </p>
            <p>
              Database:
              <pre>
                {`
@article{liang2017SCUT,
  title     = {SCUT-FBP5500: A Diverse Benchmark Dataset for Multi-Paradigm Facial Beauty Prediction},
  author    = {Liang, Lingyu and Lin, Luojun and Jin, Lianwen and Xie, Duorui and Li, Mengru},
  jurnal    = {ICPR},
  year      = {2018}
}
                `.trim()}
              </pre>
            </p>
          </EuiText>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
