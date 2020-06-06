## typescript-fsaについて
reduxでtypescriptを使うときにはswitch文でactionを管理するのが億劫になるらしい...
そこで登場するのが`typescript-fsa`。

`typescript-fsa`を使うことで各actionの型情報を失わずに簡単に定義できる。
以下だと、`<Partial<Profile>>`で`Profile`の項目のうち必要なものだけを渡すことができる。
`{ name: xxx, gender: xxx }`ではなく、`{ name: xxx }`, `{ gender: xxx }`で更新していく。

```ts
//--------Profileの型-----

export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
};

//-----------------------

import actionCreatorFactory from 'typescript-fsa';
import { Profile } from '../../domain/entity/profile';

const actionCreator = actionCreatorFactory();

const profileActions = {
  setProfile: actionCreator<Partial<Profile>>('SET_PROFILE'),
};

export default profileActions;
```

## typescript-fsa-reducers の reducerWithInitialState
`reducerWithInitialState`を使用することでそのreducerの初期値、`case`をチェーンすることで
それぞれのアクションを返している。

```ts
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';

const init: Profile = {
  name: '',
  description: '',
  birthday: '',
  gender: '',
};

const profileReducer = reducerWithInitialState(init).case(profileActions.setProfile, (state, payload) => ({
  ...state,
  ...payload,
}));

export default profileReducer;
```

## createStoreするときのredux dev toolsを使う

```ts
import { createStore, combineReducers } from 'redux';
import profileReducer from './profile/reducer';
import { RootState } from '../domain/entity/rootState';

const store = createStore(
  combineReducers<RootState>({ // 複数のreducersをcombineする
    profile: profileReducer,
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
```

## useDispatchについて
reduxの状態更新のために新しい状態を送る(dispatch)が、そのdispatchをするための関数を作成してくれる。

```ts
const Basic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label="名前"
        value={profile.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        className={classes.formField}
        rows={5}
        label="自己紹介"
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
      />
    </>
  );
};
```

## actionCreatorで非同期処理を行う
`actionCreator.async`で非同期処理を行うことができる。
なお、genericsの3つの型引数はこのstart、done、failに対応していて、そのときにどんな型の payload を渡すのかを定義できる。

```ts
const profileActions = {
  setProfile: actionCreator<Partial<Profile>>('SET_PROFILE'),
  setAddress: actionCreator<Partial<Address>>('SET_ADDRESS'),
  // <{}, Partial<Address>, {}>がその３つの引数
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>('SEARCH_ADDRESS'),
};
```

- 非同期を行うとき
- 成功したとき
- 失敗したとき

に受けとるactionのpayloadの型は以下の３種類。
`result`や`params`は固定なので注意する。

```ts
// started: Params
// done: { params: Params } & { result: Result }
// failed: { params: Params } & { error: Error }

dispatch(profileActions.searchAddress.done({ result: address, params: {} }));
```

## redux-thunkを使う
applyMiddlewareは redux-thunk という外部ライブラリを redux に登録するためのもの。
composeはReduxDevToolとmiddlewareをまとめてstoreに登録するもの。

```ts
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from './profile/reducer';
import { RootState } from '../domain/entity/rootState';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
  }),
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
```

## Partialって何？
