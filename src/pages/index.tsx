import React, { useEffect, useState } from "react";
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
  EuiModal,
  EuiModalHeader,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeaderTitle,
  EuiImage,
} from "@elastic/eui";
import axios from "axios";
import { useUnmount } from "react-use";

const API_ENDPOINT = "https://temp.dongnv.dev/v1/graphql";

export default () => {
  const [isBigParent, setIsBigParent] = useState(false);
  const [file, setFile]: any = useState(null);
  const [base64Body, setBase64Body]: any = useState(null);
  const [loading, setLoading]: any = useState(false);
  const [result, setResult]: any = useState(null);

  const _onSubmit = () => {
    if (!file) {
      return alert("Vui lòng chọn ảnh hợp lệ:)");
    }

    if (isBigParent) {
      return alert(
        "10.00 điểm, bạn thật tuyệt vời. Quý bạn có chị/em/con gái tuổi 18-24 vui lòng liên hệ tác giả, cảm ơn:)"
      );
    }

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const imageBase64: any = reader.result;
        const bodyBase64: any = imageBase64.split(",")[1];

        setBase64Body(bodyBase64);
      },
      false
    );
    reader.readAsDataURL(file);
    setLoading(true);
    setFile(null);
    // @ts-ignore
    document.querySelector(".euiFilePicker__clearButton")?.click();
  };

  useEffect(() => {
    if (base64Body) {
      // axios
      //   .post(API_ENDPOINT + "/call", {
      //     image_file: base64Body,
      //   })
      //   .then(({ data }) => {
      //     console.log("data", data);
      //
      //     setResult(data);
      //   })
      //   .catch(() => alert("Có lỗi xảy ra, vui lòng thử lại!"))
      //   .finally(() => setLoading(false));
      runQuery(
        `
        mutation MyMutation($data: String) {
          insert_trigger_one(object: {data: $data, type: "FACIAL_BEAUTY_PREDICTION"}) {
            id
          }
        }
      `,
        {
          data: JSON.stringify({ image_file: base64Body }),
        }
      )
        .then(({ data }) => {
          waitResult(data.data?.insert_trigger_one?.id)
            .then((data: any) => {
              if (data.error) {
                alert(data.error);
              } else {
                setResult(data);
              }
            })
            .finally(() => setLoading(false));
        })
        .catch(() => setLoading(false));
    }
  }, [base64Body]);

  return (
    <>
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
              {result && (
                <EuiModal onClose={() => setResult(null)}>
                  <EuiModalHeader>
                    <EuiModalHeaderTitle>
                      <h1>Kết quả</h1>
                    </EuiModalHeaderTitle>
                  </EuiModalHeader>
                  <EuiModalBody>
                    <EuiText>
                      <p>
                        Điểm: <b>{result.score}</b>
                      </p>
                    </EuiText>
                    <EuiSpacer />
                    <img
                      src={"data:image/png;base64," + result.scored_image}
                      alt={"Face"}
                      style={{
                        maxWidth: "100%",
                      }}
                    />
                  </EuiModalBody>
                  <EuiModalFooter>
                    <EuiButton onClick={() => setResult(null)} fill>
                      Close
                    </EuiButton>
                  </EuiModalFooter>
                </EuiModal>
              )}
              <EuiForm
                component={"form"}
                onSubmit={e => {
                  e.preventDefault();
                  _onSubmit();
                }}>
                <EuiFormRow
                  label={"Chọn ảnh"}
                  fullWidth={true}
                  helpText={"Chọn bức ảnh selfie chưa qua chỉnh sửa:)"}>
                  <EuiFilePicker
                    fullWidth={true}
                    initialPromptText={"Nhấn để chọn ảnh"}
                    onChange={files => {
                      if (files && files.length > 0) {
                        const file: any = files[0];

                        if (file.type.startsWith("image/jpeg")) {
                          setFile(file);
                        }
                      }
                    }}
                  />
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
                <EuiButton type="submit" fill fullWidth={true} isLoading={loading}>
                  {loading ? "Đang chấm điểm..." : "Bắt đầu chấm điểm"}
                </EuiButton>
              </EuiForm>
              <EuiSpacer />
              <EuiText>
                <p>
                  <EuiIcon type="alert" /> Dự án có phần <sub>toxic</sub> nhưng mục đích là mang
                  tính vui nhộn, kết quả không mang tính{" "}
                  <span style={{ textDecoration: "line-through" }}>chính xác</span> cũng như không
                  cổ súy face shaming.
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
    </>
  );
};

function waitResult(id: any) {
  return new Promise(rel => {
    runQuery(
      `
    query MyQuery($_eq1: Int = 10) {
      trigger(where: {target_id: {_eq: $_eq1}}) {
        created_at
        data
        id
        type
      }
    }
  `,
      {
        _eq1: id,
      }
    ).then(({ data }) => {
      if (data.data.trigger.length > 0) {
        const trigger = data.data.trigger[0];

        runQuery(
          `
          mutation MyMutation($_in: [Int!]) {
            delete_trigger(where: {id: {_in: $_in}}) {
              affected_rows
            }
          }
        `,
          {
            _in: data.data.trigger.map((v: any) => v.id),
          }
        ).catch(console.error);

        return rel(JSON.parse(trigger.data));
      }

      setTimeout(() => {
        rel(waitResult(id));
      }, 1000);
    });
  });
}

function runQuery(query: string, variables = {}) {
  return axios.post(API_ENDPOINT, {
    query,
    variables,
  });
}
