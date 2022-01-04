# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 專案呈現

https://kenkenliangproshopapplication.herokuapp.com/

用下方帳號以管理者的方式登入，或是自行建立一般使用者的帳號  
```bash
Email: admin@example.com
Password: 123456
```


## 專案功能

- 一般使用者
1. 註冊頁與登入頁  
   簡易註冊及登入
2. 商品頁  
   - 加入商品及數量到購物車  
   - 提交評分及留言，重複評論會顯示警告
   - 評論會儲存到資料庫，並重新計算評分顯示到畫面
3. 購物車頁  
   - 可以在此頁重新設定商品數量
   - 刪除商品
   - 將商品資料儲存在本地資料庫，因此不需要等待異步資料傳遞
4. 寄送地址頁  
   - 提交表單資料
   - 將地址資料儲存在本地資料庫，讓使用者不需重複輸入
5. 付款方式頁  
   - 選擇付款方式
   - 將付款方式儲存在本地資料庫，不需使用者重複更改
6. 確認訂單頁  
   讓使用者確認以上流程輸入的資料
7. 結帳頁
   - 串接Papal金流系統讓使用者付款
   - 立即付款成功後，會在付款狀態上顯示已付款
8. 個人訂單頁
   - 顯示每筆訂單資料
   - 可進入訂單資料查看內容
9. 個人資料頁
   - 顯示使用者的名稱及信箱
   - 如需修改資料，可以輸入表單提交表單修改
   - 可在此更改密碼
10. 搜尋功能
    搜尋商品名稱

- 網站管理員
1. 使用者管理頁
   - 顯示所有使用者
   - 可以進入修改頁，更改使用者的資料及身分
   - 刪除使用者
2. 商品清單頁  
   - 顯示所有商品
   - 建立新商品
   - 進入修改表單頁，更新商品基本資料或上傳圖片
   - 刪除飯店
3. 訂單頁  
   - 顯示所有訂單
   - 可以查看訂單細節

## 網頁效率評分
- GTmetrix
<img src="https://github.com/kenken0604/Bookit/blob/main/public/3.png" width="100%">

- PageSpeed Insights
<img src="https://github.com/kenken0604/Bookit/blob/main/public/4.png" width="100%">


## Production Deployment

https://kenkenliangproshopapplication.herokuapp.com/

You may login as an admin with account below,
or create your own one as a normal user.

```bash
Email: admin@example.com
Password: 123456
```

## Main Features

- As a normal user
1. Register and login
2. Search product by name
3. Add product with specific quantity into shopping cart
4. Leave comment and rating on every product at lower part of product page
5. Enter shopping cart to check the amount of each product, or reset, or delete
6. Submit order after filling the information of address and paying method
7. Pay by given payment info
8. Check order details and paid or delivered status
9. Check profile details or update

- As an admin
1. Check all the user accounts and details, update or delete if in need
2. Check all the room information, update or delete if in need
3. Check all the order results and details
4. Mark delivered status as permitted if the order get paid
5. Upload new product and edit

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
