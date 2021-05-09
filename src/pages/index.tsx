import React, { useState } from "react";
import {
  EuiButton,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiSwitch,
} from "@elastic/eui";

export default () => {
  const [isBigParent, setIsBigParent] = useState(false);

  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Điểm khuôn mặt</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection />
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiForm component={"form"}>
              <EuiFormRow
                label={"Chọn ảnh"}
                fullWidth={true}
                helpText={"Chọn bức ảnh selfie chưa qua chỉnh sửa:)"}>
                <EuiFilePicker fullWidth={true} initialPromptText={"Nhấn để chọn ảnh"} />
              </EuiFormRow>
              <EuiFormRow
                fullWidth={true}
                label={"Với tùy chọn này bạn sẽ auto 10 điểm"}
                hasChildLabel={false}>
                <EuiSwitch
                  name={"switch"}
                  label={"Bố làm to?"}
                  checked={isBigParent}
                  onChange={e => {
                    setIsBigParent(e.target.checked);
                  }}
                />
              </EuiFormRow>
              <EuiButton type="submit" fill fullWidth={true}>
                Bắt đầu chấm điểm
              </EuiButton>
            </EuiForm>
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
};
