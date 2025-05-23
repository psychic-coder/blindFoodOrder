import { configureStore,combineReducers  } from '@reduxjs/toolkit'
import userReducer from './reducers/userslice'
import orderReducer from './reducers/orderSlice'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




const rootReducer=combineReducers({
  user:userReducer,
  order:orderReducer

});  


 const persistConfig={
  key:'root',
  storage,
  version:1,

 };

const persistedReducer=persistReducer(persistConfig,rootReducer);


export const store=configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({ serializableCheck:false}),
});

export const persistor=persistStore(store);
