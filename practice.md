#
## ディレクトリ構成
```
.
├── components
├── domain
│   ├── entity
│   └── services
└── store
    ├── alert
    ├── colleges
    ├── profile
    └── validation
```

### components/
表示に関わるコンポーネントを配置している場所です。全て単体のファイルで構成されています。表示だけを行い、状態の管理やロジックは内包しません。

### domain/entity/
データ構造を定義する場所です。profile やバリデーションの項目がどのようなデータを持っているのかを定義しています。

### domain/services/
ビジネスロジックを記載しています。具体的には、郵便番号に関わる処理や定数などを定義しています。この層があることでビューとロジックを分離できます。

### store/
状態管理を行う場所です。redux の action や reducer を記載します。

## redux の状態
このアプリでは、以下の 4 つの状態を管理しています。

alert
colleges
profile
validation
これらの状態に関しては、出てきたときに説明していきます。


## TS オプショナルな属性
```js
// このようなtypeがあったとしましょう。
type OptionalObject =
  | undefined
  | {
      name: string;
    };

// どちらのも型を満たしています。
const hoge = { name: "hoge" };
const fuga = undefined;

// このような呼び出しでエラーとなってしまうため、nameにアクセスするには hoge やfugaがundefinedでないことをチェックしないといけません。
const piyo = fuga.name;

// そのため、以下のようなチェックをする必要があります。

// ifでチェック①
if (hoge) {
  const piyo = fuga.name;
}

// 論理演算②
const piyo = fuga && fuga.name;

// これだと面倒なので、Optional Chainingの登場です。
// やっていることは②と同じです。
const piyo = fuga?.name;
```

## Generics
React の props なんかは Generics を使わないと宣言できません。
```js
const someFunc = (name: T)<T> => {
    return name
}

const hoge = someFunc<string>("hoge") // hogeはstring型
```

##  Redux with TypeScript
redux を TypeScript で記述するのはとても大変。
アクションタイプによって渡される payload は異なるのですが、それをswitch caseでうまく扱うことは難しい。

```js
// このような型だとします。
type Todo = {
    id: number;
    content: string;
}
type State = Todo[]

const todoReducer = (state: State = init, action: Action) => { // ←Action型は複数のactionの複合型
    switch {
        case ADD_TODO:
            return [...state, action.payload] // payload: Todo
        case DELETE_TODO:
            return state.filter(s => s.id === action.payload) // payload(id): number
        default:
            return state
    }
}
```
typescript-fsaというライブラリを用いることでこの問題を解決できます。Redux with TypeScript の開発ではデファクトとなっている。
typescript-fsaを用いることでかなりスッキリかつ型安全にコードを記述していくことができます

## Redux with hooks
Redux を React で用いるときはreact-reduxのconnect()で接続するのがデファクトだったが難しい、、
React の hooks API の登場とともにreact-reduxも hooks に対応して一気に使いやすくなりました

```js
import React from "react";
import { useSelector } from "react-redux";

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter);
  return <div>{counter}</div>;
};
```
状態を参照したいところでuseSelectorを使うことで store から状態を参照することができるようになります
dispatchも以下のようにすぐに使えるようになって便利
```js
const dispatch = useDispatch();
```

## 実装の流れ
- ディレクトリ構成を理解しよう
- データ構造を定義しよう
- action を作成しよう
- reducer を作成しよう
- store をアプリケーションに登録しよう

## re-ducksパターン
redux のディレクトリ構成として re-ducks パターンというものを採用
redux で管理する状態単位で module に分けていく構成

https://noah.plus/blog/021/
Ducks パターンが解決すること： actionType、action、reducerが散らばっててつらい
Re-ducksパターンが解決すること：ducksパターンにおける module がだんだん肥大化していってつらい

## actionの設定
typescript-fsaを使うことで型情報を失わず簡単に定義することができます。actionCreatorにはジェネリクス（型引数）が使われています。setProfileという action のpayload（reducer に渡す値）の型をこれで定義することができます。

また、Partial<Profile>という記法ができました。これは、Profileという型の部分集合で、Profileの項目のうち必要なものだけを渡すことができます。含まれなかったProfileの項目はundefinedとして扱われます。そもそもProfileに含まれない項目を含んでいる場合はコンパイルエラーとなります。

input での入力を制御するときは、{ name: "入力された値" }や{ gender: "male" }のように一つずつ更新していきたいので、Partial<Profile>としました。{ name: "入力された値", gender: "male" }とすることもできますが、今回はこのような複数の項目を同時に渡すような実装はありません。

## reducerの設定
まずは、Profile型のinitという初期値を定義。redux では reducer で state の初期値を定義するのが一般的です。
```js
const init: Profile = {
  name: "",
  description: "",
  birthday: "",
  gender: ""
}
```
reducerWithInitialStateというtypescript-fsa-reducersの関数に渡す。これで reducer が作成される
```js
const profileReducer = reducerWithInitialState(init);
```
そこに.case()をチェーンさせることでそれぞれのアクションでの処理を記述していっています。このcase()は第一引数にアクションを第二引数にコールバック関数を渡しています。この第二引数の関数の引数は、第一引数が直前のprofileという state そのもの、第二引数がアクションから渡ってきたpayloadとなっています。そして新しい state を return します。
```js
const profileReducer = reducerWithInitialState(init).case(
  profileActions.setProfile,
  (state, payload) => ({
    ...state,
    ...payload
  })
);
```
payloadがPartial<Profile>なので、もとのstateに今回の更新分を反映した新しいProfileを return しています。
JavaScript では、Object 内に同じ項目があった場合は後の項目が優先されるので、payloadを後からスプレッド構文で展開することで、payloadの分だけ更新した新しい配列を返すことができます。

## store をアプリケーションに登録
combineReducersという redux の API を用いて reducer をひとつにまとめます
それをcreateStoreという API に食わせることで store として動くようになります。
