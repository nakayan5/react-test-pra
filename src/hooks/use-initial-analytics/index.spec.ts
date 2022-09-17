import { renderHook } from "@testing-library/react";

import * as analyticsModule from "../../libs/analytics";
import { useInitialAnalytics } from ".";

// これはファイル冒頭で analyticsModule といった名前空間を定義しインポートしたモジュールが提供する
// setStatus という関数に対してスパイをすることを明示しています。
// jest.spyOn でスパイすると、実際の関数を監視してどういった引数で呼ばれたか何回よばれたかをなどを格納するインスタンスを返します。
// このインスタンスに対して呼び出し有無や引数が適切かをテストするといったアプローチをとっていきます。
const spiedSetStatus = jest.spyOn(analyticsModule, "setStatus");
const spiedSendPageview = jest.spyOn(analyticsModule, "sendPageview");

test("useInitialAnalytics 初回実行", () => {
  // A.Hooks を呼び出すためのヘルパー関数
  renderHook(() => useInitialAnalytics({ id: "foo", role: "bar" }));

  // Hooks が実行された後の関数がどう呼び出されたかのテストは下記のとおりです。

  // setStatus は { id: "foo", role: "bar" } といったオブジェクトを引数にして呼び出された
  expect(spiedSetStatus).toBeCalledWith({ id: "foo", role: "bar" });
  // sendPageview は呼び出された
  expect(spiedSendPageview).toBeCalled();
});
